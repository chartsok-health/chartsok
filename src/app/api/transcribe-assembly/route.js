import { NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload and transcribe with speaker diarization
    const transcript = await client.transcripts.transcribe({
      audio: buffer,
      language_code: 'ko', // Korean
      speaker_labels: true, // Enable speaker diarization
      speakers_expected: 2, // Doctor and patient
    });

    if (transcript.status === 'error') {
      return NextResponse.json(
        { error: transcript.error || 'Transcription failed' },
        { status: 500 }
      );
    }

    // Process utterances into segments with speaker labels
    const segments = [];
    if (transcript.utterances && transcript.utterances.length > 0) {
      transcript.utterances.forEach((utterance, index) => {
        // Map speaker labels (A, B) to (의사, 환자)
        // Assume first speaker is the doctor
        const speaker = utterance.speaker === 'A' ? '의사' : '환자';

        segments.push({
          speaker,
          text: utterance.text,
          start: utterance.start,
          end: utterance.end,
          confidence: utterance.confidence,
        });
      });
    } else if (transcript.text) {
      // Fallback if no utterances
      segments.push({
        speaker: '의사',
        text: transcript.text,
      });
    }

    return NextResponse.json({
      text: transcript.text,
      segments,
      duration: transcript.audio_duration,
      confidence: transcript.confidence,
    });
  } catch (error) {
    console.error('AssemblyAI transcription error:', error);
    return NextResponse.json(
      { error: error.message || 'Transcription failed' },
      { status: 500 }
    );
  }
}
