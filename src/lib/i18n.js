'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

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
      about: '소개',
      blog: '블로그',
      integrations: 'EMR 연동',
      login: '로그인',
      getStarted: '무료 체험',
      startTrial: '무료 체험',
      dashboard: '대시보드',
    },
    // Hero Section
    hero: {
      badge: '의사 전용 진료 차트 시스템',
      title: '진료에 집중하세요',
      titleHighlight: '차트는 AI가',
      titleEnd: '완성합니다',
      subtitle: '진료 중 대화를 기록하고, EMR에 바로 붙여넣을 수 있는 차트를 생성합니다. 전문과별 템플릿으로 원하는 형식의 차트를 빠르게 완성하세요.',
      cta: '무료 체험',
      demo: '차트 샘플 보기',
      badges: [
        { icon: 'security', text: '음성 파일 즉시 삭제' },
        { icon: 'speed', text: '클립보드 복사로 EMR 입력' },
        { icon: 'template', text: '전문과별 맞춤 템플릿' },
      ],
    },
    // Stats Section - Doctor protection + efficiency
    stats: {
      title: '진료에만 집중하세요',
      items: [
        { value: '70', suffix: '%', label: '차트 작성 시간 절감' },
        { value: '100', suffix: '%', label: '진료 내용 기록 보존' },
        { value: '95', suffix: '%+', label: '의학 용어 인식률' },
        { value: '24', suffix: 'h', label: '내 서버에서 음성 삭제' },
      ],
    },
    // Features Section - Focused on the 3 differentiators
    features: {
      title: '진료에 집중할 수 있도록',
      subtitle: '차트 작성에 걸리는 시간을 줄이고, EMR 입력을 간소화합니다',
      cta: '자세히 보기',
      items: [
        {
          title: '음성 파일 즉시 삭제',
          description: '녹음된 음성은 텍스트 변환 직후 서버에서 완전히 삭제됩니다. 음성 파일은 저장하지 않습니다.',
          icon: 'security',
          features: ['변환 완료 후 즉시 삭제', '서버에 음성 파일 미보관', '텍스트만 암호화 저장', '삭제 로그 확인 가능'],
        },
        {
          title: '텍스트 보관 기간 설정',
          description: '변환된 텍스트 기록의 보관 기간을 직접 설정할 수 있습니다. 필요에 따라 즉시 삭제부터 30일 보관까지 선택하세요.',
          icon: 'time',
          features: ['즉시 삭제 / 7일 / 30일 선택', '보관 기간 후 자동 삭제', '수동 삭제 언제든 가능', '삭제 일정 미리 알림'],
        },
        {
          title: 'EMR 입력 최적화',
          description: 'SOAP 형식뿐 아니라 EMR 필드에 맞춘 구조화된 출력을 제공합니다. 클립보드 복사로 바로 붙여넣기하세요.',
          icon: 'integration',
          features: ['EMR 필드 매핑 지원', 'SOAP / 자유 형식 선택', '원클릭 클립보드 복사', '필드별 개별 복사 가능'],
        },
        {
          title: '나만의 맞춤 템플릿',
          description: '선생님의 진료 스타일과 차트 작성 방식에 맞춘 개인화된 템플릿을 만드세요. 전문과별 기본 템플릿도 제공됩니다.',
          icon: 'template',
          features: ['개인 진료 스타일 반영', '차트 형식 자유 설정', '자주 쓰는 문구 저장', '전문과별 기본 템플릿'],
        },
        {
          title: '실시간 녹음 및 변환',
          description: '진료 중 대화를 녹음하면 실시간으로 텍스트가 표시됩니다. 녹음이 끝나면 바로 차트 초안이 생성됩니다.',
          icon: 'mic',
          features: ['실시간 텍스트 미리보기', '의사/환자 자동 구분', '의학 용어 인식', '녹음 중 메모 추가'],
        },
        {
          title: '차트 검토 및 편집',
          description: '생성된 차트를 검토하고 필요한 부분만 수정합니다. 수정 내역은 기록으로 남습니다.',
          icon: 'edit',
          features: ['섹션별 빠른 편집', '이전 버전 비교', '자주 수정하는 부분 학습', '편집 히스토리 저장'],
        },
      ],
    },
    // Trust & Safety Section - NEW
    trust: {
      badge: '데이터 처리 정책',
      title: '안심하고 사용하세요',
      subtitle: '차트쏙은 의료 데이터를 신중하게 다룹니다',
      items: [
        {
          icon: 'delete',
          title: '음성 파일 즉시 삭제',
          description: '녹음된 음성은 텍스트 변환이 완료되는 즉시 서버에서 삭제됩니다. 음성 파일은 별도로 저장하거나 보관하지 않습니다.',
        },
        {
          icon: 'timer',
          title: '텍스트 보관 기간 선택',
          description: '변환된 텍스트의 보관 기간을 선택할 수 있습니다. 즉시 삭제, 7일, 30일 중 병원 정책에 맞게 설정하세요. 설정한 기간이 지나면 자동으로 삭제됩니다.',
        },
        {
          icon: 'encrypt',
          title: '암호화 저장',
          description: '모든 텍스트 데이터는 AES-256 암호화로 저장됩니다. 전송 중에도 TLS 1.3으로 보호됩니다.',
        },
        {
          icon: 'compliance',
          title: '국내 규정 준수',
          description: '개인정보보호법, 의료법 등 국내 법규를 준수합니다. 데이터는 국내 클라우드 인프라에서 처리됩니다.',
        },
      ],
    },
    // Custom Templates Section
    customTemplates: {
      badge: '개인화 템플릿',
      title: '선생님만의 차트 스타일',
      subtitle: '진료 스타일과 차트 작성 방식에 맞춘 개인화된 템플릿',
      description: '선생님이 평소 작성하시는 차트 형식 그대로 AI가 생성합니다. SOAP, 서술형, EMR 필드 형식 등 원하는 스타일로 설정하세요.',
      cta: '나만의 템플릿 만들기',
      features: [
        {
          icon: 'layout',
          title: '진료 스타일 반영',
          description: '선생님의 진료 패턴과 차트 작성 습관을 반영한 맞춤형 템플릿을 만들 수 있습니다.',
        },
        {
          icon: 'ai',
          title: '차트 형식 자유 설정',
          description: '문장형, 요약형, 리스트형 등 선생님이 선호하는 형식으로 각 섹션을 구성하세요.',
        },
        {
          icon: 'star',
          title: '자주 쓰는 문구 저장',
          description: '반복 사용하는 문구와 표현을 저장해두면 차트 생성 시 자동으로 반영됩니다.',
        },
        {
          icon: 'copy',
          title: 'EMR 필드 매핑',
          description: '사용하시는 EMR의 입력 필드에 맞춰 차트 출력 구조를 설정할 수 있습니다.',
        },
      ],
      example: {
        title: '출력 예시',
        before: 'SOAP 형식',
        after: '나만의 형식',
      },
    },
    // How It Works Section - 5 steps matching record page workflow
    howItWorks: {
      title: '간단한 사용 방법',
      subtitle: '5단계 스마트 워크플로우',
      steps: [
        {
          step: '01',
          title: '환자 선택',
          description: '진료할 환자를 선택하거나 새 환자를 등록하세요.',
          detail: '최근 환자 목록에서 빠르게 선택하거나 이름으로 검색할 수 있습니다.',
          icon: 'patient',
        },
        {
          step: '02',
          title: '사전 정보',
          description: '바이탈, 주호소, 나만의 템플릿을 선택합니다.',
          detail: '선생님의 진료 스타일과 차트 작성 방식에 맞춘 개인화된 템플릿으로 차트를 생성합니다.',
          icon: 'vitals',
        },
        {
          step: '03',
          title: '진료 녹음',
          description: '녹음 버튼을 누르고 평소처럼 진료하세요.',
          detail: '대화가 실시간으로 텍스트로 변환됩니다. 녹음 중 일시정지도 가능합니다.',
          icon: 'mic',
        },
        {
          step: '04',
          title: 'AI 분석',
          description: 'AI가 의사/환자 발화를 자동 구분합니다.',
          detail: '화자 분리, 텍스트 변환, 대화 구조 분석이 자동으로 이루어집니다.',
          icon: 'chart',
        },
        {
          step: '05',
          title: 'EMR 연동',
          description: '완성된 차트를 EMR로 전송합니다.',
          detail: '현재는 클립보드 복사로 붙여넣기. API 자동 연동 곧 출시!',
          icon: 'clipboard',
        },
      ],
    },
    // Specialties Section
    specialties: {
      title: '전문과별 템플릿',
      subtitle: '진료과 특성에 맞는 차트 양식을 제공합니다',
      comingSoon: '준비 중',
      items: [
        {
          id: 'internal',
          name: '내과',
          nameEn: 'Internal Medicine',
          description: '만성질환 관리, 검사 결과 해석, 약물 처방에 적합한 템플릿',
          features: ['만성질환 경과 기록', '검사 결과 정리', '약물 조정 기록'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: '이비인후과',
          nameEn: 'ENT',
          description: '청력검사, 내시경 소견, 수술 기록에 적합한 템플릿',
          features: ['청력검사 기록', '내시경 소견 정리', '시술/수술 기록'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: '정형외과',
          nameEn: 'Orthopedics',
          description: '영상 소견, 재활 계획, 수술 기록에 적합한 템플릿',
          features: ['X-ray/MRI 소견 정리', '재활 치료 계획', '수술 기록'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: '피부과',
          nameEn: 'Dermatology',
          description: '피부 병변 기술, 시술 기록에 적합한 템플릿',
          features: ['병변 기술', '시술 기록', '경과 관찰 비교'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: '소아청소년과',
          nameEn: 'Pediatrics',
          description: '성장 발달 평가, 예방접종 기록에 적합한 템플릿',
          features: ['성장 발달 기록', '예방접종 확인', '보호자 설명 요약'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: '정신건강의학과',
          nameEn: 'Psychiatry',
          description: '정신상태 검사, 상담 기록에 적합한 템플릿',
          features: ['MSE 기록', '상담 내용 요약', '약물 반응 기록'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section - Show realistic output samples
    demo: {
      title: '차트 출력 예시',
      subtitle: '실제 생성되는 차트를 확인하세요',
      tabs: {
        patient: '환자 정보',
        vitals: '바이탈',
        recording: '녹음',
        soap: 'SOAP 형식',
        emr: 'EMR 형식',
      },
      patientSelect: {
        title: '환자 정보 입력',
        searchPlaceholder: '환자 검색...',
        recentPatients: '최근 환자',
        newPatient: '새 환자',
      },
      vitalsInput: {
        title: '바이탈 사인',
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
        title: 'SOAP 형식 출력',
        s: '3일 전부터 시작된 두통. 오후 악화 양상. 조이는 듯한 통증, 경부 뻣뻣함 동반.',
        o: 'V/S: BP 120/80, HR 72, BT 36.5°C\n경부 근육 긴장 (+), 압통 (+)',
        a: '긴장성 두통 (Tension-type headache, G44.2)',
        p: '생활습관 교정 교육\n경부 스트레칭 권고\n진통제 처방 (PRN)\n증상 지속시 재내원',
      },
      emrSync: {
        title: 'EMR 필드 형식',
        status: '클립보드 복사 준비',
        button: '복사하기',
        success: '복사 완료',
      },
    },
    // Testimonials Section
    testimonials: {
      title: '사용 후기',
      subtitle: '차트쏙을 사용하는 의료진의 경험',
      items: [
        {
          quote: '진료 후 차트 정리하는 시간이 많이 줄었습니다. 특히 내과 템플릿이 만성질환 환자 기록에 잘 맞아요. 클립보드 복사로 EMR 입력도 빨라졌습니다.',
          author: '김○○ 원장',
          role: '내과 전문의',
          hospital: '서울 소재 의원',
          specialty: '내과',
          stat: '',
        },
        {
          quote: '이비인후과 진료 특성상 청력검사나 내시경 소견 기록이 많은데, 템플릿 덕분에 일관된 형식으로 정리됩니다. 음성 파일이 저장되지 않는 점도 마음에 듭니다.',
          author: '이○○ 원장',
          role: '이비인후과 전문의',
          hospital: '경기도 소재 의원',
          specialty: '이비인후과',
          stat: '',
        },
        {
          quote: '정형외과는 X-ray 소견 기술이 중요한데, 템플릿에서 영상 소견 섹션을 따로 설정해두니까 편합니다. EMR 필드에 맞게 출력되어서 복사 붙여넣기가 수월해요.',
          author: '박○○ 원장',
          role: '정형외과 전문의',
          hospital: '부산 소재 의원',
          specialty: '정형외과',
          stat: '',
        },
      ],
    },
    // Integrations Section
    integrations: {
      title: 'EMR 자동 연동',
      subtitle: 'EMR에 직접 전송하는 자동 입력 기능 개발 중',
      description: '현재는 클립보드 복사로 EMR에 붙여넣기할 수 있습니다. 곧 EMR 필드에 직접 자동 입력하는 기능이 출시됩니다. 클릭 한 번으로 차트가 EMR에 바로 전송됩니다.',
      systems: ['비트컴퓨터', '유비케어', '이지케어텍', '기타 EMR'],
      cta: '자동 연동 사전 신청',
      comingSoon: '자동 입력 기능 곧 출시',
    },
    // Pricing Section
    pricing: {
      title: '요금 안내',
      subtitle: '병원 규모에 맞는 플랜을 선택하세요',
      monthly: '월간',
      yearly: '연간',
      yearlyDiscount: '2개월 무료',
      perDoctor: '/의사당',
      plans: [
        {
          name: 'Starter',
          description: '개인 의원',
          price: '1,000',
          yearlyPrice: '10,000',
          period: '/월',
          yearlyPeriod: '/년',
          features: ['의사 1명', '월 100건 진료 기록', '기본 템플릿', '클립보드 복사', '이메일 지원'],
          cta: '시작하기',
          popular: false,
        },
        {
          name: 'Professional',
          description: '그룹 의원',
          price: '문의',
          period: '',
          features: ['의사 3명까지', '무제한 진료 기록', '전문과 템플릿 선택', '맞춤 템플릿 설정', '우선 지원'],
          cta: '문의하기',
          popular: true,
        },
        {
          name: 'Enterprise',
          description: '병원 및 의료기관',
          price: '문의',
          period: '',
          features: ['무제한 의사', '모든 전문과 템플릿', 'API 연동 협의', '전담 담당자', 'SLA 보장'],
          cta: '문의하기',
          popular: false,
        },
      ],
    },
    // FAQ Section - Updated with data handling focus
    faq: {
      title: '자주 묻는 질문',
      items: [
        {
          question: '녹음 파일은 어떻게 처리되나요?',
          answer: '녹음된 음성 파일은 텍스트 변환이 완료되는 즉시 서버에서 삭제됩니다. 음성 파일은 별도로 저장하거나 보관하지 않습니다. 삭제 기록은 로그로 확인할 수 있습니다.',
        },
        {
          question: '텍스트 기록은 얼마나 보관되나요?',
          answer: '변환된 텍스트 기록의 보관 기간은 설정에서 선택할 수 있습니다. 즉시 삭제, 7일, 30일 중 병원 정책에 맞게 설정하세요. 설정한 기간이 지나면 자동으로 삭제되며, 필요시 수동 삭제도 가능합니다.',
        },
        {
          question: '우리 병원 EMR에서 사용할 수 있나요?',
          answer: '현재는 클립보드 복사 방식으로 모든 EMR과 함께 사용할 수 있습니다. 생성된 차트를 복사하여 EMR 입력 필드에 붙여넣기하면 됩니다. API 직접 연동은 추후 지원 예정입니다.',
        },
        {
          question: 'EMR 입력 필드에 맞게 출력할 수 있나요?',
          answer: '네, 템플릿 설정에서 출력 섹션을 자유롭게 구성할 수 있습니다. 주호소, 현병력, 과거력, 신체검진 등 EMR 입력 필드에 맞춰 섹션을 설정하면 해당 형식으로 차트가 생성됩니다.',
        },
        {
          question: '환자 동의는 어떻게 받나요?',
          answer: '녹음 시작 전 환자 동의를 받아야 합니다. 앱 내에서 전자 동의서를 받을 수 있으며, 동의 기록은 타임스탬프와 함께 저장됩니다. 동의서 양식은 병원에서 수정할 수 있습니다.',
        },
        {
          question: '전문과별 템플릿은 어떻게 다른가요?',
          answer: '전문과별로 자주 사용하는 섹션과 형식이 기본 설정되어 있습니다. 내과는 만성질환 관리, 이비인후과는 청력검사/내시경 소견, 정형외과는 영상 소견 등 진료과 특성에 맞는 구조로 제공됩니다. 물론 직접 수정도 가능합니다.',
        },
        {
          question: '개인정보보호 규정을 준수하나요?',
          answer: '차트쏙은 개인정보보호법, 의료법 등 국내 규정을 준수합니다. 모든 데이터는 AES-256 암호화로 저장되며, 전송 시에도 TLS 1.3으로 보호됩니다. 데이터는 국내 클라우드 인프라에서 처리됩니다.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: '지금 바로 시작하세요',
      subtitle: '차트쏙이 진료 차트 작성을 어떻게 간소화하는지 직접 확인해보세요.',
      button: '무료 체험',
      demo: '문의하기',
      note: '신용카드 없이 무료로 시작',
    },
    // Footer
    footer: {
      description: '진료 차트 작성을 간소화하는 의사 전용 시스템',
      product: '제품',
      company: '회사',
      support: '지원',
      legal: '법적 고지',
      features: '기능',
      pricing: '요금',
      demo: '데모',
      integrations: 'EMR 연동',
      about: '회사 소개',
      careers: '채용',
      blog: '블로그',
      contact: '문의',
      help: '도움말',
      docs: '기술 문서',
      status: '서비스 상태',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      security: '보안 정책',
      copyright: '© 2025 chartsok. All rights reserved.',
      ceo: '대표자 박준호',
      address: '인천광역시 중구',
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
      about: 'About',
      blog: 'Blog',
      integrations: 'EMR Integration',
      login: 'Log In',
      getStarted: 'Start Free',
      startTrial: 'Start Free',
      dashboard: 'Dashboard',
    },
    // Hero Section
    hero: {
      badge: 'Clinical Charting System for Doctors',
      title: 'Focus on Patient Care',
      titleHighlight: 'AI Completes',
      titleEnd: 'Your Charts',
      subtitle: 'Record your consultations and generate charts ready to paste into your EMR. Complete charts quickly with specialty-specific templates.',
      cta: 'Start Free',
      demo: 'View Sample Charts',
      badges: [
        { icon: 'security', text: 'Audio Deleted Immediately' },
        { icon: 'speed', text: 'Clipboard Copy to EMR' },
        { icon: 'template', text: 'Specialty Templates' },
      ],
    },
    // Stats Section - Doctor protection + efficiency
    stats: {
      title: 'Focus on Patient Care',
      items: [
        { value: '70', suffix: '%', label: 'Less Time on Charts' },
        { value: '100', suffix: '%', label: 'Consultation Records Preserved' },
        { value: '95', suffix: '%+', label: 'Medical Term Accuracy' },
        { value: '24', suffix: 'h', label: 'Audio Deleted from Server' },
      ],
    },
    // Features Section
    features: {
      title: 'Focus on Patient Care',
      subtitle: 'Reduce time spent on charting and simplify EMR entry',
      cta: 'Learn More',
      items: [
        {
          title: 'Audio Deleted Immediately',
          description: 'Recorded audio is completely deleted from our servers immediately after transcription. We do not store audio files.',
          icon: 'security',
          features: ['Deleted after transcription', 'No audio file storage', 'Only text encrypted & stored', 'Deletion logs available'],
        },
        {
          title: 'Configurable Text Retention',
          description: 'Set how long transcribed text is retained. Choose from immediate deletion to 30-day retention based on your needs.',
          icon: 'time',
          features: ['Immediate / 7 days / 30 days', 'Auto-deletion after period', 'Manual deletion anytime', 'Deletion reminders'],
        },
        {
          title: 'EMR-Optimized Output',
          description: 'Get structured output mapped to EMR fields, not just SOAP format. Copy to clipboard and paste directly.',
          icon: 'integration',
          features: ['EMR field mapping', 'SOAP / custom formats', 'One-click clipboard copy', 'Copy individual fields'],
        },
        {
          title: 'Your Personalized Templates',
          description: 'Create templates that match your consultation style and documentation preferences. Specialty defaults also available.',
          icon: 'template',
          features: ['Match your clinical style', 'Custom chart formats', 'Save common phrases', 'Specialty defaults included'],
        },
        {
          title: 'Real-time Recording',
          description: 'Record consultations and see text appear in real-time. Chart draft is generated when recording ends.',
          icon: 'mic',
          features: ['Live text preview', 'Auto speaker detection', 'Medical terminology', 'Add notes while recording'],
        },
        {
          title: 'Review & Edit',
          description: 'Review generated charts and edit as needed. Edit history is saved.',
          icon: 'edit',
          features: ['Quick section editing', 'Version comparison', 'Learn frequent edits', 'Edit history saved'],
        },
      ],
    },
    // Trust Section
    trust: {
      badge: 'Data Handling Policy',
      title: 'Use with Confidence',
      subtitle: 'ChartSok handles medical data with care',
      items: [
        {
          icon: 'delete',
          title: 'Audio Deleted Immediately',
          description: 'Recorded audio is deleted from our servers as soon as transcription is complete. We do not store or retain audio files.',
        },
        {
          icon: 'timer',
          title: 'Configurable Text Retention',
          description: 'Choose how long transcribed text is retained: immediate deletion, 7 days, or 30 days. Text is automatically deleted after your selected period.',
        },
        {
          icon: 'encrypt',
          title: 'Encrypted Storage',
          description: 'All text data is stored with AES-256 encryption. Data in transit is protected with TLS 1.3.',
        },
        {
          icon: 'compliance',
          title: 'Korean Regulatory Compliance',
          description: 'We comply with Korean privacy laws including PIPA and the Medical Service Act. Data is processed on Korean cloud infrastructure.',
        },
      ],
    },
    // Custom Templates Section
    customTemplates: {
      badge: 'Custom Templates',
      title: 'Charts Formatted for Your EMR',
      subtitle: 'Configure output to match your EMR input fields',
      description: 'Beyond SOAP format, set up structured output that matches your EMR fields. Once configured, charts are generated in the same format every time.',
      cta: 'Configure Templates',
      features: [
        {
          icon: 'layout',
          title: 'EMR Field Mapping',
          description: 'Configure output sections to match EMR input fields like chief complaint, history, physical exam.',
        },
        {
          icon: 'ai',
          title: 'Output Format Options',
          description: 'Specify narrative, summary, or list format for each section.',
        },
        {
          icon: 'star',
          title: 'Default Template',
          description: 'Set your frequently used template as default to apply automatically.',
        },
        {
          icon: 'copy',
          title: 'Copy by Field',
          description: 'Copy the entire chart or select individual fields to copy.',
        },
      ],
      example: {
        title: 'Output Example',
        before: 'SOAP Format',
        after: 'EMR Field Format',
      },
    },
    // How It Works Section - 5 steps matching record page workflow
    howItWorks: {
      title: 'Simple to Use',
      subtitle: '5-Step Smart Workflow',
      steps: [
        {
          step: '01',
          title: 'Select Patient',
          description: 'Choose a patient or register a new one.',
          detail: 'Quickly select from recent patients or search by name.',
          icon: 'patient',
        },
        {
          step: '02',
          title: 'Pre-Consult Info',
          description: 'Enter vitals, chief complaint, and your personalized template.',
          detail: 'Charts are generated to match your consultation style and preferred documentation format.',
          icon: 'vitals',
        },
        {
          step: '03',
          title: 'Record Consultation',
          description: 'Press record and consult as usual.',
          detail: 'Conversation is transcribed in real-time. Pause and resume anytime.',
          icon: 'mic',
        },
        {
          step: '04',
          title: 'AI Analysis',
          description: 'AI automatically separates doctor/patient speech.',
          detail: 'Speaker separation, transcription, and conversation analysis happen automatically.',
          icon: 'chart',
        },
        {
          step: '05',
          title: 'EMR Integration',
          description: 'Send completed chart to your EMR.',
          detail: 'Currently via clipboard copy-paste. API auto-integration coming soon!',
          icon: 'clipboard',
        },
      ],
    },
    // Specialties Section
    specialties: {
      title: 'Specialty Templates',
      subtitle: 'Chart formats optimized for each specialty',
      comingSoon: 'Coming Soon',
      items: [
        {
          id: 'internal',
          name: 'Internal Medicine',
          nameEn: 'Internal Medicine',
          description: 'Templates suited for chronic disease management, lab results, and medication adjustments',
          features: ['Chronic disease tracking', 'Lab result summaries', 'Medication adjustments'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: 'ENT',
          nameEn: 'ENT',
          description: 'Templates for hearing tests, endoscopy findings, and procedures',
          features: ['Audiometry records', 'Endoscopy findings', 'Procedure notes'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: 'Orthopedics',
          nameEn: 'Orthopedics',
          description: 'Templates for imaging findings, rehab plans, and surgical records',
          features: ['X-ray/MRI findings', 'Rehab planning', 'Surgical records'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: 'Dermatology',
          nameEn: 'Dermatology',
          description: 'Templates for lesion descriptions and procedure documentation',
          features: ['Lesion descriptions', 'Procedure records', 'Progress comparison'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: 'Pediatrics',
          nameEn: 'Pediatrics',
          description: 'Templates for growth assessments and vaccination records',
          features: ['Growth tracking', 'Vaccination records', 'Parent education notes'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: 'Psychiatry',
          nameEn: 'Psychiatry',
          description: 'Templates for mental status exams and session notes',
          features: ['MSE documentation', 'Session summaries', 'Medication tracking'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section
    demo: {
      title: 'Sample Chart Output',
      subtitle: 'See what the generated charts look like',
      tabs: {
        patient: 'Patient Info',
        vitals: 'Vitals',
        recording: 'Recording',
        soap: 'SOAP Format',
        emr: 'EMR Format',
      },
      patientSelect: {
        title: 'Patient Information',
        searchPlaceholder: 'Search patients...',
        recentPatients: 'Recent Patients',
        newPatient: 'New Patient',
      },
      vitalsInput: {
        title: 'Vital Signs',
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
        title: 'SOAP Format Output',
        s: 'Headache for 3 days. Worsens in afternoon. Pressing quality with neck stiffness.',
        o: 'V/S: BP 120/80, HR 72, BT 36.5°C\nCervical muscle tension (+), tenderness (+)',
        a: 'Tension-type headache (G44.2)',
        p: 'Lifestyle modification education\nNeck stretching recommended\nAnalgesic PRN\nReturn if symptoms persist',
      },
      emrSync: {
        title: 'EMR Field Format',
        status: 'Ready to Copy',
        button: 'Copy',
        success: 'Copied',
      },
    },
    // Testimonials Section
    testimonials: {
      title: 'User Feedback',
      subtitle: 'Experiences from doctors using ChartSok',
      items: [
        {
          quote: 'Time spent organizing charts after visits has decreased significantly. The internal medicine template works well for chronic disease patients. Clipboard copy makes EMR entry faster.',
          author: 'Dr. Kim',
          role: 'Internal Medicine',
          hospital: 'Seoul Clinic',
          specialty: 'Internal Medicine',
          stat: '',
        },
        {
          quote: 'ENT practice involves a lot of hearing test and endoscopy documentation. The templates help maintain consistent formatting. I appreciate that audio files are not stored.',
          author: 'Dr. Lee',
          role: 'ENT Specialist',
          hospital: 'Gyeonggi Clinic',
          specialty: 'ENT',
          stat: '',
        },
        {
          quote: 'Imaging findings are important in orthopedics. Having a separate section for radiology notes in the template is convenient. EMR field output makes copy-paste easy.',
          author: 'Dr. Park',
          role: 'Orthopedic Surgeon',
          hospital: 'Busan Clinic',
          specialty: 'Orthopedics',
          stat: '',
        },
      ],
    },
    // Integrations Section
    integrations: {
      title: 'EMR Integration',
      subtitle: 'Currently supports clipboard copy method',
      description: 'Copy generated charts to clipboard and paste into your EMR. You can copy the entire chart or individual fields. Direct API integration is planned for future release.',
      systems: ['BitComputer', 'Ubicare', 'EasyCare Tech', 'Other EMRs'],
      cta: 'Contact Us',
    },
    // Pricing Section
    pricing: {
      title: 'Pricing',
      subtitle: 'Choose the plan that fits your practice',
      monthly: 'Monthly',
      yearly: 'Yearly',
      yearlyDiscount: '2 months free',
      perDoctor: '/doctor',
      plans: [
        {
          name: 'Starter',
          description: 'Solo Practice',
          price: '1,000',
          yearlyPrice: '10,000',
          period: '/mo',
          yearlyPeriod: '/yr',
          features: ['1 Doctor', '100 visits/month', 'Basic templates', 'Clipboard copy', 'Email support'],
          cta: 'Get Started',
          popular: false,
        },
        {
          name: 'Professional',
          description: 'Group Practice',
          price: 'Contact',
          period: '',
          features: ['Up to 3 doctors', 'Unlimited visits', 'Specialty templates', 'Custom templates', 'Priority support'],
          cta: 'Contact Us',
          popular: true,
        },
        {
          name: 'Enterprise',
          description: 'Hospitals & Healthcare Systems',
          price: 'Contact',
          period: '',
          features: ['Unlimited doctors', 'All specialty templates', 'API integration (planned)', 'Dedicated support', 'SLA guarantee'],
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
          question: 'How are audio recordings handled?',
          answer: 'Audio recordings are deleted from our servers immediately after transcription is complete. We do not store or retain audio files. Deletion records are available in logs.',
        },
        {
          question: 'How long is text data retained?',
          answer: 'You can configure text retention period in settings: immediate deletion, 7 days, or 30 days. Text is automatically deleted after your selected period. Manual deletion is available anytime.',
        },
        {
          question: 'Can I use this with my EMR?',
          answer: 'Currently, ChartSok works with all EMRs via clipboard copy. Copy the generated chart and paste it into your EMR input fields. Direct API integration is planned for future release.',
        },
        {
          question: 'Can output be formatted for my EMR fields?',
          answer: 'Yes, you can configure output sections in template settings. Set up sections like chief complaint, history, physical exam to match your EMR input fields.',
        },
        {
          question: 'How is patient consent handled?',
          answer: 'Patient consent must be obtained before recording. Electronic consent can be collected in the app with timestamp records. Consent form can be customized by your practice.',
        },
        {
          question: 'How do specialty templates differ?',
          answer: 'Each specialty has pre-configured sections and formats. Internal medicine focuses on chronic disease management, ENT on hearing tests and endoscopy, orthopedics on imaging findings. You can also customize templates.',
        },
        {
          question: 'Is data handled according to regulations?',
          answer: 'ChartSok complies with Korean privacy regulations including PIPA and Medical Service Act. All data is encrypted with AES-256 for storage and TLS 1.3 for transmission. Data is processed on Korean cloud infrastructure.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'Start Your Free Trial',
      subtitle: 'See how ChartSok simplifies clinical charting.',
      button: 'Start Free',
      demo: 'Contact Us',
      note: 'No credit card required',
    },
    // Footer
    footer: {
      description: 'Clinical charting system for doctors',
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
      docs: 'Documentation',
      status: 'System Status',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      security: 'Security',
      copyright: '© 2025 chartsok. All rights reserved.',
      ceo: 'CEO Junho Park',
      address: 'Incheon, South Korea',
    },
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('ko');
  const [isLocaleDetected, setIsLocaleDetected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Track when component is mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detect user's country based on IP and set locale (only after mount)
  useEffect(() => {
    if (!isMounted) return;

    const detectCountry = async () => {
      // Skip if locale was already manually set by user
      if (isLocaleDetected) return;

      try {
        // Use ipapi.co for free IP geolocation
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(3000), // 3 second timeout
        });

        if (response.ok) {
          const data = await response.json();
          // Set Korean for users in South Korea, English for everywhere else
          const detectedLocale = data.country_code === 'KR' ? 'ko' : 'en';
          setLocale(detectedLocale);
        }
      } catch (error) {
        // On error (timeout, network issue, etc.), keep default locale (ko)
        console.log('Could not detect location, using default locale');
      } finally {
        setIsLocaleDetected(true);
      }
    };

    detectCountry();
  }, [isMounted, isLocaleDetected]);

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
    setIsLocaleDetected(true); // Mark as user-set to prevent IP override
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
