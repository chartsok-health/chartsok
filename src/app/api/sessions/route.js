import { NextResponse } from 'next/server';
import {
  recordingSessionService,
  transcriptionService,
  patientService,
  chartService,
} from '@/lib/firestore';
import { formatDuration } from '@/lib/helpers';

/**
 * GET /api/sessions
 * Fetch sessions with optional filters
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const patientId = searchParams.get('patientId');
    const date = searchParams.get('date');
    const limit = parseInt(searchParams.get('limit') || '50');

    let sessions;

    if (userId) {
      sessions = await recordingSessionService.getByUserId(userId, { limitCount: limit });
    } else if (patientId) {
      sessions = await recordingSessionService.getByPatientId(patientId, { limitCount: limit });
    } else {
      sessions = await recordingSessionService.getAll({
        orderByField: 'createdAt',
        orderDirection: 'desc',
        limitCount: limit
      });
    }

    // Filter by date if provided
    if (date) {
      sessions = sessions.filter(s => s.date === date);
    }

    // Enrich with patient info and chart info
    const enrichedSessions = await Promise.all(
      sessions.map(async (session) => {
        const [patient, chart, transcription] = await Promise.all([
          session.patientId ? patientService.getById(session.patientId) : null,
          chartService.getBySessionId(session.id),
          transcriptionService.getBySessionId(session.id),
        ]);

        return {
          id: session.id,
          patientId: session.patientId,
          patientName: patient?.name || 'Unknown',
          patientAge: patient?.age || '',
          patientGender: patient?.gender || '',
          chartNo: patient?.chartNo || '',
          date: session.date,
          time: session.time,
          createdAt: session.createdAt,
          duration: session.duration,
          durationFormatted: formatDuration(session.duration),
          diagnosis: chart?.diagnosis || '',
          icdCode: chart?.icdCode || '',
          templateId: chart?.templateId || '',
          status: session.status,
          isTranscriptionDeleted: transcription?.deletedAt !== null,
        };
      })
    );

    return NextResponse.json({
      sessions: enrichedSessions,
      total: enrichedSessions.length,
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sessions
 * Start a new recording session
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, patientId, hospitalId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const session = await recordingSessionService.startSession(
      userId,
      patientId || null,
      hospitalId || null
    );

    // Create transcription record for the session
    const transcription = await transcriptionService.createForSession(session.id);

    return NextResponse.json({
      session,
      transcription,
      message: 'Session started successfully',
    });
  } catch (error) {
    console.error('Error starting session:', error);
    return NextResponse.json(
      { error: 'Failed to start session' },
      { status: 500 }
    );
  }
}
