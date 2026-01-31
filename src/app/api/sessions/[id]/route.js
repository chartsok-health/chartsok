import { NextResponse } from 'next/server';
import { getSessionDetailData } from '@/lib/services';

/**
 * GET /api/sessions/[id]
 * Fetch session detail with all related data (patient, chart, transcription)
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const sessionData = getSessionDetailData(id);

    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

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
