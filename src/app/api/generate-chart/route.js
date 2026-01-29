import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { transcription, specialty } = await request.json();

    if (!transcription || transcription.length === 0) {
      return NextResponse.json(
        { error: 'No transcription provided' },
        { status: 400 }
      );
    }

    // Format transcription for the prompt
    const formattedTranscription = transcription
      .map((item) => `[${item.speaker}] ${item.text}`)
      .join('\n');

    const systemPrompt = `당신은 숙련된 의료 차트 작성 전문가입니다. 의사와 환자의 대화 내용을 분석하여 SOAP 형식의 의료 차트를 작성합니다.

전문 분야: ${specialty || '일반 진료'}

다음 형식으로 정확하게 JSON을 반환하세요:
{
  "subjective": "주소(Chief Complaint)와 현병력(History of Present Illness)을 포함한 환자의 주관적 증상 기술",
  "objective": "활력징후와 신체검사 소견 등 객관적 데이터",
  "assessment": "진단명과 ICD 코드 (예: J03.9 급성 편도염)",
  "plan": "치료 계획, 처방, 환자 교육 사항"
}

주의사항:
- 대화에서 언급된 정보만 사용하세요
- 추측하지 마세요
- 의학적으로 정확한 용어를 사용하세요
- 한국어로 작성하세요`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `다음 진료 대화를 SOAP 형식의 차트로 작성해주세요:\n\n${formattedTranscription}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const chartData = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json({
      soap: chartData,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('Chart generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Chart generation failed' },
      { status: 500 }
    );
  }
}
