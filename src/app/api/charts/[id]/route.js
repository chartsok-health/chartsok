import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { chartService } from '@/lib/firestore';

/**
 * GET /api/charts/[id]
 * Fetch a single chart by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');

    let chart = null;

    // Fetch from hospital's records subcollection if hospitalId is provided
    if (hospitalId) {
      const recordRef = doc(db, 'hospitals', hospitalId, 'records', id);
      const docSnap = await getDoc(recordRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        chart = {
          id: docSnap.id,
          ...data,
          // Convert Firestore Timestamps to ISO strings
          createdAt: data.createdAt?.toDate?.()
            ? data.createdAt.toDate().toISOString()
            : data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt,
        };
      }
    } else {
      // Fallback to global charts collection (legacy)
      chart = await chartService.getFullChart(id);
    }

    if (!chart) {
      return NextResponse.json(
        { error: 'Chart not found' },
        { status: 404 }
      );
    }

    // Transform to expected format
    const session = {
      id: chart.id,
      date: chart.createdAt ? chart.createdAt.split('T')[0] : '',
      time: chart.createdAt
        ? new Date(chart.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : '',
      patientName: chart.patientName || 'Unknown',
      patientAge: chart.patientAge || '',
      patientGender: chart.patientGender || '',
      chartNo: chart.patientChartNo || '',
      diagnosis: chart.diagnosis || chart.chartData?.assessment?.split('\n')[0] || '',
      icdCode: chart.icdCode || '',
      chiefComplaint: chart.vitals?.chiefComplaint || '',
      vitals: chart.vitals || {},
      chartData: chart.chartData || {},
      transcription: chart.transcription || [],
      doctorName: chart.doctorName || '',
      templateId: chart.templateId || 'default-soap',
      createdAt: chart.createdAt,
      updatedAt: chart.updatedAt,
    };

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error fetching chart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chart' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/charts/[id]
 * Delete a chart by ID
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');

    if (hospitalId) {
      const recordRef = doc(db, 'hospitals', hospitalId, 'records', id);
      await deleteDoc(recordRef);
    } else {
      await chartService.delete(id);
    }

    return NextResponse.json({
      message: 'Chart deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting chart:', error);
    return NextResponse.json(
      { error: 'Failed to delete chart' },
      { status: 500 }
    );
  }
}
