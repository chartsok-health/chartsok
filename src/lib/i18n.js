'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  ko: {
    // Navigation
    nav: {
      home: '홈',
      features: '기능',
      howItWorks: '이용 방법',
      specialties: '전문 분야',
      pricing: '요금제',
      contact: '문의하기',
      login: '로그인',
      getStarted: '무료로 시작',
      startTrial: '14일 무료 체험',
    },
    // Hero Section
    hero: {
      badge: '의사 전용 AI 차트 어시스턴트',
      title: '진료에 집중하세요',
      titleHighlight: '차트는 AI가',
      titleEnd: '완성합니다',
      subtitle: '환자 선택부터 EMR 연동까지. 차트쏙은 진료 전 과정을 AI로 자동화합니다. 전문과별 맞춤 AI 어시스턴트가 정확한 SOAP 기록을 생성합니다.',
      cta: '무료로 시작하기',
      demo: '데모 영상 보기',
      badges: [
        { icon: 'security', text: 'HIPAA 준수' },
        { icon: 'speed', text: '실시간 처리' },
        { icon: 'ai', text: 'AI 정확도 98%' },
      ],
    },
    // Stats Section
    stats: {
      title: '숫자로 보는 차트쏙',
      items: [
        { value: '73', suffix: '%', label: '차트 작성 시간 절감' },
        { value: '98', suffix: '%', label: 'AI 분석 정확도' },
        { value: '5', suffix: '분', label: '평균 차트 완성' },
        { value: '500', suffix: '+', label: '도입 병의원' },
      ],
    },
    // Features Section
    features: {
      title: '의사를 위한 스마트 기능',
      subtitle: '진료 효율을 극대화하는 AI 기반 솔루션',
      cta: '모든 기능 보기',
      items: [
        {
          title: 'EMR 환자 연동',
          description: '기존 EMR의 환자 목록을 그대로 불러오거나 새 환자를 간편하게 등록합니다.',
          icon: 'patient',
          features: ['EMR 환자 목록 동기화', '신규 환자 간편 등록', '환자 이력 자동 로드', '중복 등록 방지'],
        },
        {
          title: '진료 전 정보 입력',
          description: '바이탈 사인과 사전 정보를 구조화된 양식에 빠르게 입력합니다.',
          icon: 'vitals',
          features: ['바이탈 사인 템플릿', '과거력 자동 참조', '주호소 사전 입력', '검사 결과 연동'],
        },
        {
          title: '실시간 음성 녹음',
          description: '진료 대화를 실시간으로 녹음하고 의학 용어를 정확하게 인식합니다.',
          icon: 'mic',
          features: ['의학 용어 특화 인식', '다중 화자 구분', '노이즈 필터링', '오프라인 녹음'],
        },
        {
          title: 'AI SOAP 자동 생성',
          description: '전문과별 맞춤 AI가 대화를 분석하여 정확한 SOAP 기록을 생성합니다.',
          icon: 'ai',
          features: ['전문과별 AI 모델', 'SOAP 자동 구조화', '진단 코드 추천', '이전 기록 참조'],
        },
        {
          title: '검토 및 편집',
          description: '생성된 차트를 검토하고 필요한 부분만 빠르게 수정합니다.',
          icon: 'edit',
          features: ['실시간 편집', '음성 하이라이트', '템플릿 저장', '자주 사용 문구'],
        },
        {
          title: 'EMR 자동 연동',
          description: '확인된 차트를 원클릭으로 EMR에 전송합니다.',
          icon: 'integration',
          features: ['원클릭 전송', '주요 EMR 호환', 'API 직접 연동', '전송 이력 관리'],
        },
      ],
    },
    // How It Works Section
    howItWorks: {
      title: '5단계 스마트 워크플로우',
      subtitle: '환자 선택부터 EMR 전송까지, 모든 과정이 연결됩니다',
      steps: [
        {
          step: '01',
          title: '환자 선택',
          description: 'EMR에서 환자를 선택하거나 새 환자를 등록합니다.',
          detail: '기존 환자 정보와 과거 진료 기록이 자동으로 로드됩니다.',
          icon: 'patient',
        },
        {
          step: '02',
          title: '사전 정보 입력',
          description: '바이탈 사인과 주호소를 입력합니다.',
          detail: 'BP, HR, BT, SpO2 등을 구조화된 양식에 빠르게 입력합니다.',
          icon: 'vitals',
        },
        {
          step: '03',
          title: '진료 녹음',
          description: '녹음 버튼을 누르고 환자와 대화합니다.',
          detail: 'AI가 대화를 실시간으로 기록하고 의학 용어를 정확하게 인식합니다.',
          icon: 'mic',
        },
        {
          step: '04',
          title: 'AI 차트 생성',
          description: '진료 종료 후 AI가 SOAP 차트를 생성합니다.',
          detail: '전문과별 맞춤 AI가 정확하고 체계적인 기록을 작성합니다.',
          icon: 'ai',
        },
        {
          step: '05',
          title: '확인 및 전송',
          description: '차트를 검토하고 EMR로 전송합니다.',
          detail: '수정이 필요하면 빠르게 편집하고 원클릭으로 EMR에 저장합니다.',
          icon: 'send',
        },
      ],
    },
    // Specialties Section (replacing UserRoles)
    specialties: {
      title: '전문과별 AI 어시스턴트',
      subtitle: '각 전문 분야에 최적화된 AI가 정확한 차트를 생성합니다',
      comingSoon: '출시 예정',
      items: [
        {
          id: 'internal',
          name: '내과',
          nameEn: 'Internal Medicine',
          description: '만성질환 관리, 건강검진 해석, 약물 상호작용 분석에 특화된 AI',
          features: ['만성질환 모니터링', '다약제 검토', '검사 결과 해석'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: '이비인후과',
          nameEn: 'ENT',
          description: '청력 검사, 내시경 소견, 수술 기록에 최적화된 AI',
          features: ['청력검사 해석', '내시경 소견 기술', '수술 기록 생성'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: '정형외과',
          nameEn: 'Orthopedics',
          description: '영상 소견, 재활 계획, 수술 기록에 특화된 AI',
          features: ['X-ray/MRI 소견', '재활 프로토콜', '수술 기록'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: '피부과',
          nameEn: 'Dermatology',
          description: '피부 병변 기술, 시술 기록, 경과 관찰에 최적화된 AI',
          features: ['병변 상세 기술', '시술 기록', '사진 기반 비교'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: '소아청소년과',
          nameEn: 'Pediatrics',
          description: '성장 발달 평가, 예방접종 관리, 보호자 설명에 특화된 AI',
          features: ['성장 곡선 분석', '발달 평가', '예방접종 스케줄'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: '정신건강의학과',
          nameEn: 'Psychiatry',
          description: '정신상태 검사, 상담 기록, 약물 관리에 최적화된 AI',
          features: ['MSE 구조화', '상담 요약', '약물 반응 추적'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section
    demo: {
      title: '실제 워크플로우를 확인하세요',
      subtitle: '환자 선택부터 EMR 전송까지의 전체 과정',
      tabs: {
        patient: '환자 선택',
        vitals: '사전 정보',
        recording: '진료 녹음',
        soap: 'AI 차트',
        emr: 'EMR 전송',
      },
      patientSelect: {
        title: '환자 선택',
        searchPlaceholder: '환자 검색...',
        recentPatients: '최근 진료 환자',
        newPatient: '새 환자 등록',
      },
      vitalsInput: {
        title: '바이탈 사인 입력',
        bp: '혈압',
        hr: '심박수',
        bt: '체온',
        spo2: 'SpO2',
        chiefComplaint: '주호소',
      },
      recording: {
        status: '녹음 중',
        time: '02:34',
        transcript: '의사: 어디가 불편하세요?\n환자: 3일 전부터 두통이 있어요. 특히 오후에 심해지고요.\n의사: 어떤 종류의 두통인가요?\n환자: 조이는 느낌이에요. 목도 좀 뻣뻣하고요.',
      },
      soapPreview: {
        title: 'AI 생성 SOAP 차트',
        s: '3일 전부터 시작된 두통. 오후 악화 양상. 조이는 듯한 통증, 경부 뻣뻣함 동반.',
        o: 'V/S: BP 120/80, HR 72, BT 36.5°C\n경부 근육 긴장 (+), 압통 (+)',
        a: '긴장성 두통 (Tension-type headache, G44.2)',
        p: '생활습관 교정 교육\n경부 스트레칭 권고\n진통제 처방 (PRN)\n증상 지속시 재내원',
      },
      emrSync: {
        title: 'EMR 전송',
        status: '전송 준비 완료',
        button: 'EMR로 전송',
        success: '전송 완료',
      },
    },
    // Testimonials Section
    testimonials: {
      title: '의료진의 생생한 후기',
      subtitle: '차트쏙을 도입한 의사들의 실제 경험',
      items: [
        {
          quote: '진료 후 차트 작성에 쓰던 시간이 거의 사라졌어요. 이제 더 많은 환자를 볼 수 있고, 퇴근 시간도 빨라졌습니다. 내과 전용 AI가 만성질환 관리 기록을 정말 잘 작성해줍니다.',
          author: '김○○ 원장',
          role: '내과 전문의',
          hospital: '서울 소재 의원',
          specialty: '내과',
          stat: '일일 2시간 절감',
        },
        {
          quote: '이비인후과 특화 AI가 청력검사 결과와 내시경 소견을 정확하게 기록해줘서 놀랐습니다. 특히 수술 기록 작성이 훨씬 편해졌어요.',
          author: '이○○ 원장',
          role: '이비인후과 전문의',
          hospital: '경기도 소재 의원',
          specialty: '이비인후과',
          stat: '차트 정확도 98%',
        },
        {
          quote: 'EMR 연동이 정말 편리해요. 환자 선택하고 바이탈 입력하고 녹음만 하면 끝. 확인 후 바로 EMR로 전송되니까 업무 효율이 크게 올랐습니다.',
          author: '박○○ 원장',
          role: '정형외과 전문의',
          hospital: '부산 소재 의원',
          specialty: '정형외과',
          stat: '업무 효율 40% 향상',
        },
      ],
    },
    // Integrations Section
    integrations: {
      title: 'EMR 시스템과 완벽 연동',
      subtitle: '국내 주요 EMR과 원활하게 연결됩니다',
      description: '원클릭으로 차트를 EMR에 전송하세요. API 직접 연동 또는 클립보드 복사 모두 지원합니다.',
      systems: ['비트컴퓨터', '유비케어', '포스데이타', '이지케어텍', '인성정보', '더존ICT'],
      cta: '연동 문의하기',
    },
    // Pricing Section
    pricing: {
      title: '합리적인 요금제',
      subtitle: '병원 규모에 맞는 플랜을 선택하세요',
      monthly: '월간',
      yearly: '연간',
      yearlyDiscount: '2개월 무료',
      perDoctor: '/의사당',
      plans: [
        {
          name: 'Starter',
          description: '개인 의원에 적합',
          price: '99,000',
          period: '/월',
          features: ['의사 1명', '월 100건 진료 기록', '기본 AI 어시스턴트 1개', '기본 EMR 연동', '이메일 지원'],
          cta: '시작하기',
          popular: false,
        },
        {
          name: 'Professional',
          description: '성장하는 의원에 추천',
          price: '249,000',
          period: '/월',
          features: ['의사 3명까지', '무제한 진료 기록', '전문과 AI 3개 선택', '고급 EMR 연동', '우선 지원', '분석 대시보드'],
          cta: '14일 무료 체험',
          popular: true,
        },
        {
          name: 'Enterprise',
          description: '병원 및 의료기관',
          price: '문의',
          period: '',
          features: ['무제한 의사', '모든 전문과 AI', '맞춤형 EMR 연동', '전용 서버 옵션', 'SLA 보장', '전담 매니저'],
          cta: '문의하기',
          popular: false,
        },
      ],
    },
    // FAQ Section
    faq: {
      title: '자주 묻는 질문',
      items: [
        {
          question: '환자 정보는 안전하게 보호되나요?',
          answer: '차트쏙은 의료정보 보호법과 HIPAA를 준수합니다. 모든 데이터는 AES-256 암호화로 보호되며, 국내 인증 데이터센터에서 운영됩니다. 정기적인 보안 감사를 실시합니다.',
        },
        {
          question: '우리 병원 EMR과 연동할 수 있나요?',
          answer: '네, 국내 주요 EMR 시스템(비트컴퓨터, 유비케어, 이지케어텍 등)과 호환됩니다. API 직접 연동 또는 클립보드 복사 방식 모두 지원합니다.',
        },
        {
          question: '녹음 파일은 어떻게 처리되나요?',
          answer: '녹음 파일은 텍스트 변환 후 서버에서 즉시 삭제됩니다. 암호화된 텍스트 기록만 저장되며, 원하시면 텍스트 기록도 삭제할 수 있습니다.',
        },
        {
          question: '환자 녹음 동의는 어떻게 받나요?',
          answer: '앱 내에서 녹음 동의서를 전자 서명으로 받을 수 있습니다. 동의 기록은 타임스탬프와 함께 안전하게 저장되어 법적 요건을 충족합니다.',
        },
        {
          question: '다른 전문과 AI도 추가될 예정인가요?',
          answer: '네, 현재 내과, 이비인후과, 정형외과, 피부과 AI가 제공되며, 소아청소년과, 정신건강의학과 등 추가 전문과 AI를 개발 중입니다.',
        },
        {
          question: '기존 환자 데이터를 가져올 수 있나요?',
          answer: '네, EMR 연동을 통해 기존 환자 목록을 자동으로 동기화할 수 있습니다. 과거 진료 기록도 참조하여 더 정확한 차트를 생성합니다.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: '지금 바로 시작하세요',
      subtitle: '14일 무료 체험으로 차트쏙의 효율성을 직접 경험해보세요.',
      button: '무료로 체험하기',
      demo: '데모 예약하기',
      note: '신용카드 없이 시작 가능',
    },
    // Footer
    footer: {
      description: '의사를 위한 AI 기반 스마트 차트 솔루션',
      product: '제품',
      company: '회사',
      support: '지원',
      legal: '법적 고지',
      features: '기능',
      pricing: '요금제',
      demo: '데모',
      integrations: 'EMR 연동',
      about: '회사 소개',
      careers: '채용',
      blog: '블로그',
      contact: '연락처',
      help: '도움말',
      docs: '개발자 문서',
      status: '서비스 상태',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      security: '보안',
      copyright: '© 2025 ChartSok. All rights reserved.',
      address: '서울특별시 강남구',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      specialties: 'Specialties',
      pricing: 'Pricing',
      contact: 'Contact',
      login: 'Log In',
      getStarted: 'Get Started Free',
      startTrial: '14-Day Free Trial',
    },
    // Hero Section
    hero: {
      badge: 'AI Chart Assistant for Doctors',
      title: 'Focus on Care,',
      titleHighlight: 'AI Completes',
      titleEnd: 'Your Charts',
      subtitle: 'From patient selection to EMR sync. ChartSok automates your entire charting workflow with specialty-specific AI assistants that generate accurate SOAP notes.',
      cta: 'Start for Free',
      demo: 'Watch Demo',
      badges: [
        { icon: 'security', text: 'HIPAA Compliant' },
        { icon: 'speed', text: 'Real-time Processing' },
        { icon: 'ai', text: '98% AI Accuracy' },
      ],
    },
    // Stats Section
    stats: {
      title: 'ChartSok by Numbers',
      items: [
        { value: '73', suffix: '%', label: 'Charting Time Saved' },
        { value: '98', suffix: '%', label: 'AI Accuracy Rate' },
        { value: '5', suffix: 'min', label: 'Avg Chart Completion' },
        { value: '500', suffix: '+', label: 'Clinics Onboarded' },
      ],
    },
    // Features Section
    features: {
      title: 'Smart Features for Doctors',
      subtitle: 'AI-powered solutions to maximize your clinical efficiency',
      cta: 'View All Features',
      items: [
        {
          title: 'EMR Patient Sync',
          description: 'Import your existing patient list from EMR or easily register new patients.',
          icon: 'patient',
          features: ['EMR patient list sync', 'Quick new patient registration', 'Auto-load patient history', 'Duplicate prevention'],
        },
        {
          title: 'Pre-visit Info Entry',
          description: 'Quickly input vital signs and pre-visit information in structured forms.',
          icon: 'vitals',
          features: ['Vital signs templates', 'Auto past history reference', 'Chief complaint pre-entry', 'Lab results integration'],
        },
        {
          title: 'Real-time Voice Recording',
          description: 'Record consultations in real-time with accurate medical terminology recognition.',
          icon: 'mic',
          features: ['Medical terminology specialized', 'Multi-speaker detection', 'Noise filtering', 'Offline recording'],
        },
        {
          title: 'AI SOAP Generation',
          description: 'Specialty-specific AI analyzes conversations to generate accurate SOAP notes.',
          icon: 'ai',
          features: ['Specialty-specific AI models', 'Auto SOAP structuring', 'Diagnosis code suggestions', 'Previous record reference'],
        },
        {
          title: 'Review & Edit',
          description: 'Review generated charts and quickly edit only what needs changes.',
          icon: 'edit',
          features: ['Real-time editing', 'Audio highlights', 'Template saving', 'Frequently used phrases'],
        },
        {
          title: 'EMR Auto-sync',
          description: 'Send confirmed charts to your EMR with one click.',
          icon: 'integration',
          features: ['One-click send', 'Major EMR compatible', 'Direct API integration', 'Transfer history tracking'],
        },
      ],
    },
    // How It Works Section
    howItWorks: {
      title: '5-Step Smart Workflow',
      subtitle: 'From patient selection to EMR sync, everything is connected',
      steps: [
        {
          step: '01',
          title: 'Select Patient',
          description: 'Select a patient from EMR or register a new one.',
          detail: 'Existing patient info and past records are automatically loaded.',
          icon: 'patient',
        },
        {
          step: '02',
          title: 'Enter Pre-visit Info',
          description: 'Input vital signs and chief complaint.',
          detail: 'Quickly enter BP, HR, BT, SpO2 in structured forms.',
          icon: 'vitals',
        },
        {
          step: '03',
          title: 'Record Consultation',
          description: 'Press record and have your conversation.',
          detail: 'AI records in real-time and accurately recognizes medical terms.',
          icon: 'mic',
        },
        {
          step: '04',
          title: 'AI Chart Generation',
          description: 'AI generates SOAP chart after the visit.',
          detail: 'Specialty-specific AI creates accurate, structured documentation.',
          icon: 'ai',
        },
        {
          step: '05',
          title: 'Confirm & Send',
          description: 'Review the chart and send to EMR.',
          detail: 'Quick edit if needed and save to EMR with one click.',
          icon: 'send',
        },
      ],
    },
    // Specialties Section
    specialties: {
      title: 'Specialty AI Assistants',
      subtitle: 'Optimized AI for each medical specialty generates accurate charts',
      comingSoon: 'Coming Soon',
      items: [
        {
          id: 'internal',
          name: 'Internal Medicine',
          nameEn: 'Internal Medicine',
          description: 'AI specialized in chronic disease management, health screening interpretation, and drug interaction analysis',
          features: ['Chronic disease monitoring', 'Polypharmacy review', 'Lab result interpretation'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: 'ENT',
          nameEn: 'ENT',
          description: 'AI optimized for hearing tests, endoscopy findings, and surgical records',
          features: ['Audiometry interpretation', 'Endoscopy findings description', 'Surgical record generation'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: 'Orthopedics',
          nameEn: 'Orthopedics',
          description: 'AI specialized in imaging findings, rehabilitation plans, and surgical records',
          features: ['X-ray/MRI findings', 'Rehab protocols', 'Surgical records'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: 'Dermatology',
          nameEn: 'Dermatology',
          description: 'AI optimized for skin lesion description, procedure records, and progress tracking',
          features: ['Detailed lesion description', 'Procedure records', 'Photo-based comparison'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: 'Pediatrics',
          nameEn: 'Pediatrics',
          description: 'AI specialized in growth assessment, vaccination management, and parent education',
          features: ['Growth curve analysis', 'Developmental assessment', 'Vaccination schedule'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: 'Psychiatry',
          nameEn: 'Psychiatry',
          description: 'AI optimized for mental status exam, counseling records, and medication management',
          features: ['MSE structuring', 'Session summaries', 'Medication response tracking'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section
    demo: {
      title: 'See the Complete Workflow',
      subtitle: 'From patient selection to EMR sync',
      tabs: {
        patient: 'Patient Select',
        vitals: 'Pre-visit Info',
        recording: 'Recording',
        soap: 'AI Chart',
        emr: 'EMR Sync',
      },
      patientSelect: {
        title: 'Select Patient',
        searchPlaceholder: 'Search patients...',
        recentPatients: 'Recent Patients',
        newPatient: 'Register New Patient',
      },
      vitalsInput: {
        title: 'Vital Signs Entry',
        bp: 'Blood Pressure',
        hr: 'Heart Rate',
        bt: 'Body Temp',
        spo2: 'SpO2',
        chiefComplaint: 'Chief Complaint',
      },
      recording: {
        status: 'Recording',
        time: '02:34',
        transcript: 'Doctor: What brings you in today?\nPatient: I\'ve had a headache for 3 days. It gets worse in the afternoon.\nDoctor: What kind of headache is it?\nPatient: It\'s a pressing feeling. My neck is stiff too.',
      },
      soapPreview: {
        title: 'AI Generated SOAP Chart',
        s: 'Headache for 3 days. Worsens in afternoon. Pressing quality with neck stiffness.',
        o: 'V/S: BP 120/80, HR 72, BT 36.5°C\nCervical muscle tension (+), tenderness (+)',
        a: 'Tension-type headache (G44.2)',
        p: 'Lifestyle modification education\nNeck stretching recommended\nAnalgesic PRN\nReturn if symptoms persist',
      },
      emrSync: {
        title: 'EMR Sync',
        status: 'Ready to Send',
        button: 'Send to EMR',
        success: 'Sent Successfully',
      },
    },
    // Testimonials Section
    testimonials: {
      title: 'What Doctors Say',
      subtitle: 'Real experiences from doctors using ChartSok',
      items: [
        {
          quote: 'The time I spent charting after clinic virtually disappeared. Now I can see more patients and leave work earlier. The internal medicine AI creates excellent chronic disease management records.',
          author: 'Dr. Kim',
          role: 'Internal Medicine',
          hospital: 'Seoul Clinic',
          specialty: 'Internal Medicine',
          stat: '2 hours saved daily',
        },
        {
          quote: 'I was amazed how the ENT-specific AI accurately records hearing test results and endoscopy findings. Surgical documentation has become so much easier.',
          author: 'Dr. Lee',
          role: 'ENT Specialist',
          hospital: 'Gyeonggi Clinic',
          specialty: 'ENT',
          stat: '98% chart accuracy',
        },
        {
          quote: 'The EMR integration is seamless. Select patient, enter vitals, record, and done. Charts go straight to EMR after review. Workflow efficiency improved dramatically.',
          author: 'Dr. Park',
          role: 'Orthopedic Surgeon',
          hospital: 'Busan Clinic',
          specialty: 'Orthopedics',
          stat: '40% efficiency increase',
        },
      ],
    },
    // Integrations Section
    integrations: {
      title: 'Seamless EMR Integration',
      subtitle: 'Connects smoothly with major Korean EMR systems',
      description: 'Send charts to your EMR with one click. We support both direct API integration and clipboard copy.',
      systems: ['BitComputer', 'Ubicare', 'Posdata', 'EasyCare Tech', 'Insung Info', 'Douzone ICT'],
      cta: 'Contact for Integration',
    },
    // Pricing Section
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that fits your practice',
      monthly: 'Monthly',
      yearly: 'Yearly',
      yearlyDiscount: '2 months free',
      perDoctor: '/doctor',
      plans: [
        {
          name: 'Starter',
          description: 'Perfect for solo practices',
          price: '99',
          period: '/mo',
          features: ['1 Doctor', '100 visits/month', '1 Basic AI Assistant', 'Basic EMR integration', 'Email support'],
          cta: 'Get Started',
          popular: false,
        },
        {
          name: 'Professional',
          description: 'Recommended for growing practices',
          price: '249',
          period: '/mo',
          features: ['Up to 3 doctors', 'Unlimited visits', '3 Specialty AIs of choice', 'Advanced EMR integration', 'Priority support', 'Analytics dashboard'],
          cta: '14-Day Free Trial',
          popular: true,
        },
        {
          name: 'Enterprise',
          description: 'For hospitals & healthcare systems',
          price: 'Contact',
          period: '',
          features: ['Unlimited doctors', 'All Specialty AIs', 'Custom EMR integration', 'Dedicated server option', 'SLA guarantee', 'Dedicated manager'],
          cta: 'Contact Us',
          popular: false,
        },
      ],
    },
    // FAQ Section
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is patient data secure?',
          answer: 'ChartSok complies with healthcare privacy regulations and HIPAA. All data is protected with AES-256 encryption and operated from certified data centers with regular security audits.',
        },
        {
          question: 'Can it integrate with our EMR?',
          answer: 'Yes, we\'re compatible with major Korean EMR systems (BitComputer, Ubicare, EasyCare Tech, etc.). We support both direct API integration and clipboard copy methods.',
        },
        {
          question: 'How are recordings handled?',
          answer: 'Audio files are deleted immediately after text conversion. Only encrypted text records are stored, and you can delete text records as well if desired.',
        },
        {
          question: 'How is patient recording consent obtained?',
          answer: 'Recording consent can be obtained via electronic signature in the app. Consent records are securely stored with timestamps to meet legal requirements.',
        },
        {
          question: 'Will more specialty AIs be added?',
          answer: 'Yes, we currently offer Internal Medicine, ENT, Orthopedics, and Dermatology AIs. Pediatrics, Psychiatry, and more specialty AIs are in development.',
        },
        {
          question: 'Can I import existing patient data?',
          answer: 'Yes, through EMR integration you can automatically sync your existing patient list. Past records are also referenced to generate more accurate charts.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'Get Started Today',
      subtitle: 'Experience ChartSok\'s efficiency with a 14-day free trial.',
      button: 'Start Free Trial',
      demo: 'Schedule Demo',
      note: 'No credit card required',
    },
    // Footer
    footer: {
      description: 'AI-powered smart charting solution for doctors',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      legal: 'Legal',
      features: 'Features',
      pricing: 'Pricing',
      demo: 'Demo',
      integrations: 'EMR Integration',
      about: 'About Us',
      careers: 'Careers',
      blog: 'Blog',
      contact: 'Contact',
      help: 'Help Center',
      docs: 'Developer Docs',
      status: 'System Status',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      security: 'Security',
      copyright: '© 2025 ChartSok. All rights reserved.',
      address: 'Seoul, South Korea',
    },
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('ko');

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[locale];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'ko' ? 'en' : 'ko'));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export default translations;
