import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-db';
import { collection, addDoc, getDocs, doc, updateDoc, query, where, increment } from 'firebase/firestore';
import {
  chartService,
  chartContentService,
  chartVitalsService,
  patientService,
} from '@/lib/firestore';

/**
 * GET /api/charts
 * Fetch charts - supports hospitalId-based fetching
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');
    const patientId = searchParams.get('patientId');
    const userId = searchParams.get('userId');
    const limitCount = parseInt(searchParams.get('limit') || '50');

    let charts = [];

    // Fetch from hospital's records subcollection if hospitalId is provided
    if (hospitalId) {
      const recordsRef = collection(db, 'hospitals', hospitalId, 'records');
      let q;

      if (patientId) {
        q = query(recordsRef, where('patientId', '==', patientId));
      } else if (userId) {
        q = query(recordsRef, where('userId', '==', userId));
      } else {
        q = query(recordsRef);
      }

      const snapshot = await getDocs(q);
      charts = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamps to ISO strings
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()
            ? data.createdAt.toDate().toISOString()
            : data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt,
        };
      });

      // Sort by createdAt descending
      charts.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });

      // Apply limit
      charts = charts.slice(0, limitCount);
    } else {
      // Fallback to global charts collection (legacy)
      if (patientId) {
        charts = await chartService.getByPatientId(patientId, { limitCount });
      } else {
        charts = await chartService.getAll({
          orderByField: 'createdAt',
          orderDirection: 'desc',
          limitCount
        });
      }
    }

    // Enrich with patient name
    const enrichedCharts = await Promise.all(
      charts.map(async (chart) => {
        let patientName = chart.patientName || 'Unknown';
        let patientChartNo = chart.patientChartNo || '';

        // Try to get patient info if not embedded
        if (chart.patientId && !chart.patientName) {
          try {
            const patient = await patientService.getById(chart.patientId);
            if (patient) {
              patientName = patient.name;
              patientChartNo = patient.chartNo || '';
            }
          } catch (e) {
            console.error('Error fetching patient:', e);
          }
        }

        return {
          ...chart,
          patientName,
          patientChartNo,
        };
      })
    );

    return NextResponse.json({
      charts: enrichedCharts,
      total: enrichedCharts.length,
    });
  } catch (error) {
    console.error('Error fetching charts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch charts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/charts
 * Save a new chart - saves under hospitals/{hospitalId}/records
 */
export async function POST(request) {
  try {
    const body = await request.json();
    console.log('POST /api/charts - Request body:', JSON.stringify(body, null, 2));
    const {
      sessionId,
      patientId,
      templateId,
      diagnosis,
      icdCode,
      chartData,
      vitals,
      // Required for hospital-based storage
      hospitalId,
      userId,
      doctorId,
      doctorName,
      transcription,
      recordingDuration,
      // Optional patient info to embed
      patientName,
      patientChartNo,
      // New B2B fields
      patientInstructions,
      followUpActions,
    } = body;

    if (!chartData) {
      return NextResponse.json(
        { error: 'chartData is required' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Build record data
    const recordData = {
      sessionId: sessionId || null,
      patientId: patientId || null,
      patientName: patientName || null,
      patientChartNo: patientChartNo || null,
      templateId: templateId || 'default-soap',
      diagnosis: diagnosis || '',
      icdCode: icdCode || '',
      status: 'completed',
      hospitalId: hospitalId || null,
      userId: userId || null,
      doctorId: doctorId || userId || null,
      doctorName: doctorName || '',
      transcription: transcription || [],
      recordingDuration: recordingDuration || '00:00',
      chartData: chartData,
      vitals: vitals || null,
      patientInstructions: patientInstructions || '',
      followUpActions: Array.isArray(followUpActions)
        ? followUpActions.map(action => typeof action === 'string' ? { text: action, completed: false } : action)
        : [],
      createdAt: now,
      updatedAt: now,
    };

    let savedRecord;

    // Save to hospital's records subcollection if hospitalId is provided
    if (hospitalId) {
      const recordsRef = collection(db, 'hospitals', hospitalId, 'records');
      const docRef = await addDoc(recordsRef, recordData);
      savedRecord = {
        id: docRef.id,
        ...recordData,
      };
      console.log(`Record saved to hospitals/${hospitalId}/records/${docRef.id}`);

      // Update patient's lastVisit and visitCount if patientId is provided
      if (patientId) {
        try {
          // Patients are stored in the global 'patients' collection
          const patientRef = doc(db, 'patients', patientId);
          await updateDoc(patientRef, {
            lastVisit: now,
            visitCount: increment(1),
            updatedAt: now,
          });
          console.log(`Updated lastVisit and visitCount for patient ${patientId}`);
        } catch (patientUpdateError) {
          console.error('Error updating patient lastVisit:', patientUpdateError);
          // Don't fail the whole request if patient update fails
        }
      }
    } else {
      // Fallback to global charts collection (legacy)
      const chart = await chartService.createWithContents(
        {
          sessionId: sessionId || null,
          patientId: patientId || null,
          templateId: templateId || 'default-soap',
          diagnosis: diagnosis || '',
          icdCode: icdCode || '',
          status: 'completed',
          hospitalId: hospitalId || null,
          userId: userId || null,
          doctorId: doctorId || userId || null,
          doctorName: doctorName || '',
          transcription: transcription || [],
          recordingDuration: recordingDuration || '00:00',
        },
        chartData,
        vitals || null
      );

      const contents = await chartContentService.getByChartId(chart.id);
      savedRecord = {
        ...chart,
        contents,
      };
    }

    return NextResponse.json({
      chart: savedRecord,
      message: 'Chart saved successfully',
    });
  } catch (error) {
    console.error('Error saving chart:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: `Failed to save chart: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/charts
 * Update an existing chart
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { chartId, hospitalId, diagnosis, icdCode, chartData, vitals, patientInstructions, followUpActions } = body;

    if (!chartId) {
      return NextResponse.json(
        { error: 'chartId is required' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Update in hospital's records subcollection if hospitalId is provided
    if (hospitalId) {
      const recordRef = doc(db, 'hospitals', hospitalId, 'records', chartId);
      const updateData = {
        updatedAt: now,
      };

      if (diagnosis !== undefined) updateData.diagnosis = diagnosis;
      if (icdCode !== undefined) updateData.icdCode = icdCode;
      if (chartData !== undefined) updateData.chartData = chartData;
      if (vitals !== undefined) updateData.vitals = vitals;
      if (patientInstructions !== undefined) updateData.patientInstructions = patientInstructions;
      if (followUpActions !== undefined) updateData.followUpActions = followUpActions;

      await updateDoc(recordRef, updateData);

      return NextResponse.json({
        chart: { id: chartId, ...updateData },
        message: 'Chart updated successfully',
      });
    }

    // Fallback to global charts collection (legacy)
    const existing = await chartService.getById(chartId);
    if (!existing) {
      return NextResponse.json(
        { error: 'Chart not found' },
        { status: 404 }
      );
    }

    const updateData = {};
    if (diagnosis !== undefined) updateData.diagnosis = diagnosis;
    if (icdCode !== undefined) updateData.icdCode = icdCode;

    if (chartData) {
      await chartService.updateWithContents(chartId, updateData, chartData);
    } else if (Object.keys(updateData).length > 0) {
      await chartService.update(chartId, updateData);
    }

    if (vitals) {
      await chartVitalsService.upsertVitals(chartId, vitals);
    }

    const updatedChart = await chartService.getFullChart(chartId);

    return NextResponse.json({
      chart: updatedChart,
      message: 'Chart updated successfully',
    });
  } catch (error) {
    console.error('Error updating chart:', error);
    return NextResponse.json(
      { error: 'Failed to update chart' },
      { status: 500 }
    );
  }
}
