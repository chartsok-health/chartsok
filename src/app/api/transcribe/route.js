import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');
    const previousContext = formData.get('context'); // Previous conversation for context

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Step 1: Transcribe audio with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'ko',
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
    });

    if (!transcription.text || transcription.text.trim() === '') {
      return NextResponse.json({
        text: '',
        segments: [],
        speakers: [],
      });
    }

    // Step 2: Use GPT to detect speakers based on context
    const speakerDetectionPrompt = `당신은 의료 대화 분석 전문가입니다. 다음 진료실 대화 텍스트를 분석하여 각 문장이 의사의 말인지 환자의 말인지 구분해주세요.

의사의 특징:
- 질문을 많이 함 (어디가 아프세요?, 언제부터요?, 열이 있었나요?)
- 진단이나 처방을 설명함
- 전문 의학 용어 사용
- "~해 드릴게요", "~해 보겠습니다" 등의 표현

환자의 특징:
- 증상을 설명함 (아파요, 기침이 나요, 열이 났어요)
- 질문에 대답함
- 불편함을 호소함
- "~해요", "~았어요" 등의 표현

${previousContext ? `이전 대화 맥락:\n${previousContext}\n\n` : ''}

분석할 텍스트:
"${transcription.text}"

각 문장을 분석하여 다음 JSON 형식으로 반환하세요:
{
  "segments": [
    {"speaker": "의사" 또는 "환자", "text": "문장 내용"}
  ]
}

문장이 여러 개면 적절히 나누어 주세요. 한 문장씩 분석하세요.`;

    const speakerDetection = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 의료 대화를 분석하여 화자를 구분하는 전문가입니다. JSON 형식으로만 응답하세요.',
        },
        {
          role: 'user',
          content: speakerDetectionPrompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    let detectedSegments = [];
    try {
      const parsed = JSON.parse(speakerDetection.choices[0].message.content);
      detectedSegments = parsed.segments || [];
    } catch (e) {
      // Fallback: return as single segment with unknown speaker
      detectedSegments = [{ speaker: '의사', text: transcription.text }];
    }

    return NextResponse.json({
      text: transcription.text,
      segments: detectedSegments,
      duration: transcription.duration,
      language: transcription.language,
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: error.message || 'Transcription failed' },
      { status: 500 }
    );
  }
}
