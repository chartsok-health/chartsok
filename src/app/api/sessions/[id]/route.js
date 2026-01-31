import { NextResponse } from 'next/server';
import {
  recordingSessionService,
  transcriptionService,
  transcriptionSegmentService,
  chartService,
  chartContentService,
  chartVitalsService,
  patientService,
  templateService,
  templateSectionService,
} from '@/lib/firestore';
import { formatDuration } from '@/lib/helpers';
import { SpeakerTypeLabels } from '@/lib/constants';

/**
 * GET /api/sessions/[id]
 * Fetch session detail with all related data (patient, chart, transcription)
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Get session
    const session = await recordingSessionService.getById(id);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get related data in parallel
    const [patient, chart, transcription] = await Promise.all([
      session.patientId ? patientService.getById(session.patientId) : null,
      chartService.getBySessionId(id),
      transcriptionService.getBySessionId(id),
    ]);

    // Get chart-related data if chart exists
    let vitals = null;
    let chartContents = [];
    let template = null;
    let templateSections = [];

    if (chart) {
      [vitals, chartContents, template] = await Promise.all([
        chartVitalsService.getByChartId(chart.id),
        chartContentService.getByChartId(chart.id),
        chart.templateId ? templateService.getById(chart.templateId) : null,
      ]);

      if (template) {
        templateSections = await templateSectionService.getByTemplateId(template.id);
      }
    }

    // Get transcription segments if transcription exists
    let transcriptionSegments = [];
    if (transcription) {
      transcriptionSegments = await transcriptionSegmentService.getByTranscriptionId(transcription.id);
    }

    // Build chart data object based on template sections
    const chartData = {};
    chartContents.forEach(c => {
      chartData[c.sectionKey] = c.content;
    });

    // Format transcription for display
    const formattedTranscription = transcriptionSegments.map(seg => ({
      speaker: SpeakerTypeLabels.ko[seg.speaker] || seg.speaker,
      text: seg.text,
      timestamp: seg.timestamp,
    }));

    // Extract chief complaint from subjective
    const chiefComplaint = chartData.subjective?.split('.')[0] || '';

    const sessionData = {
      id: session.id,
      date: session.date,
      time: session.time,
      createdAt: session.createdAt,
      duration: session.duration,
      durationFormatted: formatDuration(session.duration),
      diagnosis: chart?.diagnosis || '',
      icdCode: chart?.icdCode || '',
      templateId: chart?.templateId || '',
      template,
      templateSections,
      patientId: patient?.id,
      patientName: patient?.name || '환자',
      patientAge: patient?.age || '',
      patientGender: patient?.gender || '',
      chartNo: patient?.chartNo || '',
      allergies: patient?.allergies || null,
      chiefComplaint,
      vitals: vitals ? {
        systolic: vitals.systolic,
        diastolic: vitals.diastolic,
        heartRate: vitals.pulse,
        temperature: vitals.temperature,
        respiration: vitals.respiration,
        spO2: vitals.spO2,
        weight: vitals.weight,
        height: vitals.height,
      } : null,
      transcription: formattedTranscription,
      chartData,
      soap: chartData, // Alias for backward compatibility
      isTranscriptionDeleted: transcription?.deletedAt !== null,
    };

    return NextResponse.json({
      session: sessionData,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/sessions/[id]
 * Update a session
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, duration } = body;

    const existing = await recordingSessionService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (duration !== undefined) updateData.duration = duration;

    const updated = await recordingSessionService.update(id, updateData);

    return NextResponse.json({
      session: updated,
      message: 'Session updated successfully',
    });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/sessions/[id]
 * Delete a session and related data
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existing = await recordingSessionService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get related data
    const [chart, transcription] = await Promise.all([
      chartService.getBySessionId(id),
      transcriptionService.getBySessionId(id),
    ]);

    // Delete chart and related data if exists
    if (chart) {
      await chartService.deleteWithRelated(chart.id);
    }

    // Delete transcription and segments if exists
    if (transcription) {
      await transcriptionSegmentService.deleteByTranscriptionId(transcription.id);
      await transcriptionService.delete(transcription.id);
    }

    // Delete session
    await recordingSessionService.delete(id);

    return NextResponse.json({
      message: 'Session deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}
