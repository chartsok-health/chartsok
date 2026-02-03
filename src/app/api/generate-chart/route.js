import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const {
      transcription,
      specialty,
      template,
      vitals,
      patientInfo,
      aiTone,
      keywords
    } = await request.json();

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

    // Build vitals info if available
    let vitalsInfo = '';
    if (vitals) {
      const vitalsList = [];
      if (vitals.systolic && vitals.diastolic) {
        vitalsList.push(`혈압: ${vitals.systolic}/${vitals.diastolic} mmHg`);
      }
      if (vitals.heartRate) {
        vitalsList.push(`심박수: ${vitals.heartRate} bpm`);
      }
      if (vitals.temperature) {
        vitalsList.push(`체온: ${vitals.temperature}°C`);
      }
      if (vitals.spO2) {
        vitalsList.push(`산소포화도: ${vitals.spO2}%`);
      }
      if (vitals.chiefComplaint) {
        vitalsList.push(`주호소: ${vitals.chiefComplaint}`);
      }
      if (vitalsList.length > 0) {
        vitalsInfo = `\n\n사전 입력된 활력징후 및 주호소:\n${vitalsList.join('\n')}`;
      }
    }

    // Build patient info if available
    let patientContext = '';
    if (patientInfo) {
      const patientDetails = [];
      if (patientInfo.name) patientDetails.push(`환자명: ${patientInfo.name}`);
      if (patientInfo.age) patientDetails.push(`나이: ${patientInfo.age}세`);
      if (patientInfo.gender) patientDetails.push(`성별: ${patientInfo.gender}`);
      if (patientDetails.length > 0) {
        patientContext = `\n\n환자 정보:\n${patientDetails.join(', ')}`;
      }
    }

    // Build keywords context if available
    let keywordsContext = '';
    if (keywords && keywords.length > 0) {
      const keywordTerms = keywords.map(k => k.term || k).join(', ');
      keywordsContext = `\n\n자주 사용하는 의학 용어/약어: ${keywordTerms}`;
    }

    // Build AI tone instructions if available
    let toneInstructions = '';
    if (aiTone && aiTone.trim()) {
      toneInstructions = `\n\n작성 스타일 지침: ${aiTone}`;
    }

    // Determine if template is SOAP-based or custom text-based
    const isSOAPTemplate = !template ||
      template.category === 'soap' ||
      template.id === 'default-soap' ||
      (template.content && template.content.includes('[Subjective]'));

    let systemPrompt;
    let responseFormat;

    if (isSOAPTemplate) {
      // SOAP format
      systemPrompt = `당신은 숙련된 의료 차트 작성 전문가입니다. 의사와 환자의 대화 내용을 분석하여 SOAP 형식의 의료 차트를 작성하고, 환자 안내문과 후속 조치 항목도 함께 생성합니다.

전문 분야: ${specialty || '일반 진료'}${patientContext}${vitalsInfo}${keywordsContext}${toneInstructions}

다음 형식으로 정확하게 JSON을 반환하세요:
{
  "subjective": "주소(Chief Complaint)와 현병력(History of Present Illness)을 포함한 환자의 주관적 증상 기술",
  "objective": "활력징후와 신체검사 소견 등 객관적 데이터",
  "assessment": "진단명과 ICD 코드 (예: J03.9 급성 편도염)",
  "plan": "치료 계획, 처방, 환자 교육 사항",
  "patientInstructions": "환자에게 전달할 안내문. 쉬운 말로 작성. 진단명, 복약 안내, 생활 수칙, 주의사항, 재방문 일정을 포함. 줄바꿈으로 구분.",
  "followUpActions": ["처방전 출력", "다음 예약 잡기", "검사 의뢰서 작성 등 의료진이 해야 할 후속 조치 항목들"]
}

주의사항:
- 대화에서 언급된 정보만 사용하세요
- 사전 입력된 활력징후가 있으면 Objective에 포함하세요
- 추측하지 마세요
- 의학적으로 정확한 용어를 사용하세요
- 한국어로 작성하세요
- patientInstructions는 환자가 이해할 수 있는 쉬운 말로 작성하세요
- followUpActions는 구체적이고 실행 가능한 항목으로 3~5개 작성하세요`;

      responseFormat = { type: 'json_object' };
    } else {
      // Custom template format - use the template content as a guide
      const templateContent = template.content || '';

      systemPrompt = `당신은 숙련된 의료 차트 작성 전문가입니다. 의사와 환자의 대화 내용을 분석하여 지정된 템플릿 형식에 맞게 의료 차트를 작성하고, 환자 안내문과 후속 조치 항목도 함께 생성합니다.

전문 분야: ${specialty || '일반 진료'}${patientContext}${vitalsInfo}${keywordsContext}${toneInstructions}

사용할 템플릿 형식:
${templateContent}

다음 형식으로 JSON을 반환하세요:
{
  "content": "위의 템플릿 형식에 맞춰 작성된 전체 차트 내용",
  "patientInstructions": "환자에게 전달할 안내문. 쉬운 말로 작성. 진단명, 복약 안내, 생활 수칙, 주의사항, 재방문 일정을 포함. 줄바꿈으로 구분.",
  "followUpActions": ["처방전 출력", "다음 예약 잡기", "검사 의뢰서 작성 등 의료진이 해야 할 후속 조치 항목들"]
}

주의사항:
- 템플릿의 형식과 섹션 구조를 따르세요
- 대화에서 언급된 정보만 사용하세요
- 사전 입력된 활력징후가 있으면 적절한 위치에 포함하세요
- 추측하지 마세요
- 의학적으로 정확한 용어를 사용하세요
- 한국어로 작성하세요
- patientInstructions는 환자가 이해할 수 있는 쉬운 말로 작성하세요
- followUpActions는 구체적이고 실행 가능한 항목으로 3~5개 작성하세요`;

      responseFormat = { type: 'json_object' };
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `다음 진료 대화를 차트로 작성해주세요:\n\n${formattedTranscription}`,
        },
      ],
      temperature: 0.3,
      response_format: responseFormat,
    });

    const chartData = JSON.parse(completion.choices[0].message.content);

    // Extract new fields (backward-compatible: these may not exist in older responses)
    const patientInstructions = chartData.patientInstructions || '';
    const followUpActions = Array.isArray(chartData.followUpActions) ? chartData.followUpActions : [];

    // Return appropriate format based on template type
    if (isSOAPTemplate) {
      // Remove non-SOAP keys from the soap object
      const { patientInstructions: _pi, followUpActions: _fa, ...soapData } = chartData;
      return NextResponse.json({
        soap: soapData,
        patientInstructions,
        followUpActions,
        usage: completion.usage,
      });
    } else {
      return NextResponse.json({
        chartContent: chartData.content,
        patientInstructions,
        followUpActions,
        usage: completion.usage,
      });
    }
  } catch (error) {
    console.error('Chart generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Chart generation failed' },
      { status: 500 }
    );
  }
}
