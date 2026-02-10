'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const translations = {
  ko: {
    // Navigation
    nav: {
      home: '홈',
      features: '제품',
      howItWorks: '병원용',
      specialties: 'EMR 파트너',
      pricing: '보안',
      contact: 'FAQ',
      about: '문의',
      blog: '블로그',
      integrations: 'EMR 연동',
      login: '로그인',
      getStarted: 'EMR 제휴 문의',
      startTrial: 'EMR 제휴 문의',
      dashboard: '대시보드',
    },
    // Hero Section
    hero: {
      badge: 'EMR 파트너 전용 AI 차트 모듈',
      title: 'EMR에 AI 차트를',
      titleHighlight: '번들링하세요.',
      titleEnd: '매출이 따라옵니다.',
      subtitle: '진료 녹음만으로 SOAP 차트가 자동 생성됩니다.\n의사당 월 ₩49K~₩149K 업셀, EMR 파트너 70% RevShare.',
      cta: '파트너 미팅 신청',
      demo: '보안 패킷 요청',
      badges: [
        { icon: 'template', text: '기존 차트 양식 매핑' },
        { icon: 'security', text: '온프레미스 배포' },
        { icon: 'speed', text: 'PoC 무료' },
      ],
      sellingPoints: [
        { text: 'SOAP · 자유형식 매핑', color: '#4B9CD3' },
        { text: 'PoC 무료', color: '#10B981' },
        { text: '온프레미스 배포', color: '#8B5CF6' },
      ],
      mockup: {
        chartDone: '차트 생성 완료',
        patient: '김영희 (F/45) · 내과',
        patientShort: '김영희 · 내과',
        emrApply: 'EMR 반영',
        instructions: '안내문 생성',
        auditSaved: 'Audit Log 저장됨',
        chartTime: '차트 작성 시간',
        chartSaving: '73% 절감',
        onPremise: 'On-premise 지원',
        soap: [
          { key: 'S', label: 'Subjective', text: '3일 전부터 두통 호소, 오후에 악화' },
          { key: 'O', label: 'Objective', text: 'BP 120/80, HR 72, 경부 근육 긴장(+)' },
          { key: 'A', label: 'Assessment', text: '긴장성 두통 (G44.2)' },
          { key: 'P', label: 'Plan', text: '생활습관 교정, 경부 스트레칭 권고' },
        ],
      },
    },
    // Stats Section - Clinic operational outcomes
    stats: {
      title: '클리닉 운영이 달라집니다',
      items: [
        { value: '70', suffix: '%', label: '진료 후 기록 시간 절감' },
        { value: '0', suffix: '건', label: 'Follow-up 누락' },
        { value: '95', suffix: '%', label: '리콜/재내원 성공률' },
        { value: '100', suffix: '%', label: '진료 내용 기록 보존' },
      ],
    },
    // Features Section - EMR Partner Value
    features: {
      title: 'EMR 파트너가 얻는 가치',
      subtitle: 'chartsok 모듈로 EMR 제품의 경쟁력을 강화하세요',
      cta: '자세히 보기',
      items: [
        {
          title: '업셀 패키지',
          description: 'AI 차트 자동화 Add-on으로 객단가 향상',
          icon: 'mic',
          features: ['EMR 기존 라이선스에 AI 기능을 번들링하여 ARPU를 높입니다.'],
        },
        {
          title: '락인 강화',
          description: '의료진 워크플로 고착',
          icon: 'template',
          features: ['차트 자동화가 일상 워크플로에 녹아들면, EMR 교체 장벽이 올라갑니다.'],
        },
        {
          title: '도입 리스크 최소',
          description: '병원 변경/교육 비용 최소화',
          icon: 'integration',
          features: ['기존 EMR 화면 안에서 작동하므로 별도 교육이 거의 필요없습니다.'],
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
          title: '음성·대화 기록 자동 삭제',
          description: '녹음된 음성은 텍스트 변환 즉시 삭제되고, 대화 기록(텍스트)은 24시간 후 자동 삭제됩니다. 차트와 안내문은 안전하게 보관됩니다.',
        },
        {
          icon: 'timer',
          title: '대화 기록 24시간 후 삭제',
          description: '변환된 대화 기록(텍스트)은 24시간 후 자동으로 삭제됩니다. 생성된 차트, 안내문, 후속 조치는 안전하게 보관됩니다.',
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
      title: 'Record → Summarize → Act',
      subtitle: '5단계로 진료 기록부터 후속관리까지',
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
          title: 'EMR 연동 + 후속관리',
          description: '완성된 차트를 EMR로 전송하고 후속조치를 정리합니다.',
          detail: '클립보드 복사로 EMR 입력. 재내원/리콜 등 follow-up 액션도 자동 생성.',
          icon: 'clipboard',
        },
      ],
    },
    // Specialties Section
    specialties: {
      title: '전문과별 AI 모델',
      subtitle: '진료과 특성을 학습한 AI가 최적화된 차트를 생성합니다',
      comingSoon: '준비 중',
      items: [
        {
          id: 'internal',
          name: '내과',
          nameEn: 'Internal Medicine',
          description: '만성질환 관리, 검사 결과 해석, 약물 처방에 특화된 AI 모델',
          features: ['만성질환 경과 자동 정리', '검사 결과 구조화', '약물 조정 히스토리'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: '이비인후과',
          nameEn: 'ENT',
          description: '청력검사, 내시경 소견, 시술 기록에 특화된 AI 모델',
          features: ['청력검사 자동 정리', '내시경 소견 구조화', '시술/수술 기록 생성'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: '정형외과',
          nameEn: 'Orthopedics',
          description: '영상 소견, 재활 계획, 수술 기록에 특화된 AI 모델',
          features: ['X-ray/MRI 소견 정리', '재활 치료 계획 생성', '수술 기록 구조화'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: '피부과',
          nameEn: 'Dermatology',
          description: '피부 병변 기술, 시술 기록에 특화된 AI 모델',
          features: ['병변 기술 자동화', '시술 기록 구조화', '경과 관찰 비교 생성'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: '소아청소년과',
          nameEn: 'Pediatrics',
          description: '성장 발달, 예방접종, 보호자 소통에 특화된 AI 모델',
          features: ['성장 발달 기록 자동화', '예방접종 확인 정리', '보호자 안내문 생성'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: '정신건강의학과',
          nameEn: 'Psychiatry',
          description: '정신상태 검사, 상담 기록에 특화된 AI 모델',
          features: ['MSE 자동 정리', '상담 내용 구조화', '약물 반응 추적'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section - Show realistic output samples
    demo: {
      title: '진료부터 후속관리까지, 직접 체험해보세요',
      subtitle: '녹음 → 요약 → 안내문 → 후속관리까지 한번에',
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
    // Testimonials Section - Use cases, not fake quotes
    testimonials: {
      title: '이런 병원에 잘 맞습니다',
      subtitle: 'Chartsok이 가장 큰 차이를 만드는 환경',
      items: [
        {
          quote: '외래 환자가 많아 진료 후 차트 정리에 시간이 부족한 의원. 진료 기록 자동화로 기록 시간을 줄이고, 다음 환자에 집중할 수 있습니다.',
          author: '외래 중심 의원',
          role: '내과 · 가정의학과 · 소아청소년과',
          hospital: '',
          specialty: '내과',
          stat: '기록 시간 70% 절감',
        },
        {
          quote: '재내원/리콜 관리가 중요하지만 수작업으로 놓치는 환자가 많은 의원. 후속관리 액션이 자동으로 정리되어 환자 이탈을 줄이고, 노쇼를 방지하고, 리콜 성공률을 높여 매출 안정화에 기여합니다.',
          author: '리콜 관리가 중요한 의원',
          role: '정형외과 · 피부과 · 이비인후과',
          hospital: '',
          specialty: '정형외과',
          stat: '리콜 성공률 향상 + 노쇼 감소',
        },
        {
          quote: '환자에게 복약 안내, 주의사항, 다음 단계를 전달할 때 누락이 잦은 의원. 환자 안내문이 자동 생성되어 전달 품질이 향상됩니다.',
          author: '환자 소통이 중요한 의원',
          role: '전 진료과 해당',
          hospital: '',
          specialty: '이비인후과',
          stat: '환자 만족도 향상',
        },
      ],
    },
    // Integrations Section - EMR compatibility (no false partnership claims)
    integrations: {
      title: 'EMR과 함께 작동합니다',
      subtitle: 'Chartsok은 EMR을 대체하지 않습니다. EMR 옆에서 함께 작동합니다.',
      description: '클립보드 복사로 어떤 EMR과도 바로 사용할 수 있습니다. SOAP, 서술형, EMR 필드 형식 등 원하는 출력 형태를 선택하세요.',
      systems: ['비트컴퓨터', '유비케어', '이지케어텍', '기타 EMR'],
      cta: 'EMR 연동 문의하기',
      comingSoon: 'API 직접 연동 준비 중',
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
    // FAQ Section - EMR Partner focused
    faq: {
      title: '자주 묻는 질문',
      items: [
        {
          question: '데이터는 어디에 저장되나요?',
          answer: '클라우드(GCP/AWS) 또는 온프레미스 중 선택 가능합니다. 병원 정책에 따라 데이터 경계를 분리합니다.',
        },
        {
          question: '온프레미스 배포가 가능한가요?',
          answer: '네, 프라이빗 클라우드 및 온프레미스 배포를 지원합니다. 병원망 내 배포도 가능합니다.',
        },
        {
          question: 'SSO/권한 연동은 어떻게 하나요?',
          answer: 'SAML 2.0, OAuth 2.0 기반 SSO를 지원합니다. RBAC 기반 접근제어도 제공합니다.',
        },
        {
          question: '법적 책임/의료행위 판단 범위는?',
          answer: 'chartsok은 의사의 판단을 보조하는 도구입니다. AI 출력물은 반드시 의사 확인 후 사용됩니다.',
        },
        {
          question: '가격/수익쉐어 구조는?',
          answer: '리셀, 화이트라벨, 번들링 등 파트너 유형에 따라 맞춤 수익 모델을 제안합니다.',
        },
      ],
    },
    // CTA Section
    cta: {
      badge: 'EMR 파트너 프로그램',
      title: 'EMR에 AI 모듈을',
      titleHighlight: '4~8주 안에',
      titleEnd: '런칭하세요.',
      subtitle: 'NDA 체결부터 파일럿, PoC, 런칭까지 체계적인 파트너 온보딩 프로세스를 제공합니다.',
      button: 'EMR 제휴 문의',
      cta: 'EMR 제휴 문의',
      demo: '보안 패킷 요청',
      secondary: '보안 패킷 요청',
      note: 'EMR 파트너 프로그램',
    },
    // Footer
    footer: {
      description: 'EMR 안에서 작동하는 AI 차트 자동화 모듈. 병원은 기존 워크플로를 유지하고, EMR은 AI 기능을 빠르게 번들링합니다.',
      product: '제품',
      company: '회사',
      support: '지원',
      legal: '법적 고지',
      features: '제품',
      pricing: '보안',
      demo: 'EMR 파트너',
      integrations: 'EMR 연동',
      about: '문의',
      careers: '약관',
      blog: '개인정보처리방침',
      contact: '문의',
      help: '도움말',
      docs: '기술 문서',
      status: '서비스 상태',
      privacy: '개인정보처리방침',
      terms: '약관',
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
      features: 'Product',
      howItWorks: 'For Hospitals',
      specialties: 'EMR Partners',
      pricing: 'Security',
      contact: 'FAQ',
      about: 'Contact',
      blog: 'Blog',
      integrations: 'EMR Integration',
      login: 'Log In',
      getStarted: 'Partner Inquiry',
      startTrial: 'Partner Inquiry',
      dashboard: 'Dashboard',
    },
    // Hero Section
    hero: {
      badge: 'AI Chart Module for EMR Partners',
      title: 'AI Charting,',
      titleHighlight: 'Built Into',
      titleEnd: 'Your EMR.',
      subtitle: 'Voice to SOAP in seconds. Zero workflow change.\n₩49K–149K upsell per doc. You keep 70%.',
      cta: 'Book a Meeting',
      demo: 'Get Security Packet',
      badges: [
        { icon: 'security', text: 'On-premise Ready' },
        { icon: 'template', text: 'Full Audit Trail' },
        { icon: 'speed', text: 'Free PoC' },
      ],
      sellingPoints: [
        { text: 'SOAP & Free-form', color: '#4B9CD3' },
        { text: 'Free PoC', color: '#10B981' },
        { text: 'On-premise', color: '#8B5CF6' },
      ],
      mockup: {
        chartDone: 'Chart Ready',
        patient: 'Jane D. (F/45) · Internal Med',
        patientShort: 'Jane D. · Internal Med',
        emrApply: 'Send to EMR',
        instructions: 'Instructions',
        auditSaved: 'Audit Logged',
        chartTime: 'Charting Time',
        chartSaving: '73% Saved',
        onPremise: 'On-premise Ready',
        soap: [
          { key: 'S', label: 'Subjective', text: 'Headache 3 days, worse afternoons' },
          { key: 'O', label: 'Objective', text: 'BP 120/80, HR 72, neck tension(+)' },
          { key: 'A', label: 'Assessment', text: 'Tension headache (G44.2)' },
          { key: 'P', label: 'Plan', text: 'Lifestyle mod, neck stretches' },
        ],
      },
    },
    // Stats Section - Clinic operational outcomes
    stats: {
      title: 'Transform Your Clinic',
      items: [
        { value: '70', suffix: '%', label: 'Less Charting' },
        { value: '0', suffix: '', label: 'Missed Follow-ups' },
        { value: '95', suffix: '%', label: 'Recall Success' },
        { value: '100', suffix: '%', label: 'Records Preserved' },
      ],
    },
    // Features Section
    features: {
      title: 'Why EMR Partners Win',
      subtitle: 'Make your EMR stickier and more profitable',
      cta: 'Learn More',
      items: [
        {
          title: 'New Revenue Stream',
          description: 'Upsell AI charting, boost ARPU',
          icon: 'mic',
          features: ['Bundle AI with existing licenses. Instant revenue lift.'],
        },
        {
          title: 'Stronger Lock-in',
          description: 'They won\'t want to leave',
          icon: 'template',
          features: ['Daily use builds habit. Switching costs go up.'],
        },
        {
          title: 'Zero Friction',
          description: 'Works inside the EMR',
          icon: 'integration',
          features: ['No separate app. No training needed.'],
        },
      ],
    },
    // Trust Section
    trust: {
      badge: 'Data Policy',
      title: 'Built for Trust',
      subtitle: 'Your data, handled with care',
      items: [
        {
          icon: 'delete',
          title: 'Audio? Gone.',
          description: 'Deleted the moment transcription completes. Nothing stored.',
        },
        {
          icon: 'timer',
          title: 'You Control Retention',
          description: 'Keep text for 0, 7, or 30 days. Your call.',
        },
        {
          icon: 'encrypt',
          title: 'Encrypted End-to-End',
          description: 'AES-256 at rest. TLS 1.3 in transit.',
        },
        {
          icon: 'compliance',
          title: 'Fully Compliant',
          description: 'PIPA, Medical Service Act. Korean infrastructure.',
        },
      ],
    },
    // Custom Templates Section
    customTemplates: {
      badge: 'Templates',
      title: 'Your Format, Every Time',
      subtitle: 'Output tailored to your EMR',
      description: 'Not just SOAP. Configure output to match your exact EMR fields. Consistent every time.',
      cta: 'Configure',
      features: [
        {
          icon: 'layout',
          title: 'Field Mapping',
          description: 'Map to CC, history, PE — any EMR field.',
        },
        {
          icon: 'ai',
          title: 'Your Style',
          description: 'Narrative, bullet points, or structured — you pick.',
        },
        {
          icon: 'star',
          title: 'Set & Forget',
          description: 'Save your favorite as default.',
        },
        {
          icon: 'copy',
          title: 'Copy Smart',
          description: 'Whole chart or just the fields you need.',
        },
      ],
      example: {
        title: 'Example',
        before: 'SOAP',
        after: 'EMR Fields',
      },
    },
    // How It Works Section - 5 steps matching record page workflow
    howItWorks: {
      title: 'Record → Summarize → Act',
      subtitle: 'From visit to follow-up in 5 steps',
      steps: [
        {
          step: '01',
          title: 'Pick Patient',
          description: 'Select or register.',
          detail: 'Recent list or quick search.',
          icon: 'patient',
        },
        {
          step: '02',
          title: 'Add Context',
          description: 'Vitals, CC, template.',
          detail: 'Charts styled your way.',
          icon: 'vitals',
        },
        {
          step: '03',
          title: 'Just Talk',
          description: 'Hit record. Consult normally.',
          detail: 'Live transcription. Pause anytime.',
          icon: 'mic',
        },
        {
          step: '04',
          title: 'AI Does the Rest',
          description: 'Speaker separation, structure.',
          detail: 'Analysis happens automatically.',
          icon: 'chart',
        },
        {
          step: '05',
          title: 'Done',
          description: 'EMR ready. Follow-ups set.',
          detail: 'One click to EMR. Tasks auto-created.',
          icon: 'clipboard',
        },
      ],
    },
    // Specialties Section - AI Models
    specialties: {
      title: 'AI for Every Specialty',
      subtitle: 'Trained on specialty-specific patterns',
      comingSoon: 'Soon',
      items: [
        {
          id: 'internal',
          name: 'Internal Medicine',
          nameEn: 'Internal Medicine',
          description: 'Chronic care, labs, meds',
          features: ['Disease tracking', 'Lab summaries', 'Med history'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: 'ENT',
          nameEn: 'ENT',
          description: 'Hearing, scopes, procedures',
          features: ['Audiometry', 'Scope findings', 'Procedure notes'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: 'Orthopedics',
          nameEn: 'Orthopedics',
          description: 'Imaging, rehab, surgery',
          features: ['Imaging summaries', 'Rehab plans', 'Op notes'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: 'Dermatology',
          nameEn: 'Dermatology',
          description: 'Lesions, procedures, follow-up',
          features: ['Lesion notes', 'Procedure records', 'Progress tracking'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: 'Pediatrics',
          nameEn: 'Pediatrics',
          description: 'Growth, vaccines, parent info',
          features: ['Growth charts', 'Vaccine tracking', 'Parent handouts'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: 'Psychiatry',
          nameEn: 'Psychiatry',
          description: 'MSE, sessions, medications',
          features: ['Mental status', 'Session notes', 'Med response'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section
    demo: {
      title: 'See It in Action',
      subtitle: 'Record → Summary → Instructions → Follow-ups',
      tabs: {
        patient: 'Patient',
        vitals: 'Vitals',
        recording: 'Recording',
        soap: 'SOAP',
        emr: 'EMR',
      },
      patientSelect: {
        title: 'Patient Info',
        searchPlaceholder: 'Search...',
        recentPatients: 'Recent',
        newPatient: 'New',
      },
      vitalsInput: {
        title: 'Vitals',
        bp: 'BP',
        hr: 'HR',
        bt: 'Temp',
        spo2: 'SpO2',
        chiefComplaint: 'Chief Complaint',
      },
      recording: {
        status: 'Recording',
        time: '02:34',
        transcript: 'Doctor: What brings you in?\nPatient: Headache for 3 days, worse afternoons.\nDoctor: What kind?\nPatient: Pressing. Neck is stiff too.',
      },
      soapPreview: {
        title: 'SOAP Output',
        s: 'Headache 3 days. Worse afternoons. Pressing, neck stiffness.',
        o: 'BP 120/80, HR 72, BT 36.5°C\nNeck tension (+), tenderness (+)',
        a: 'Tension headache (G44.2)',
        p: 'Lifestyle mod, neck stretches, analgesic PRN, f/u if persists',
      },
      emrSync: {
        title: 'EMR Format',
        status: 'Ready',
        button: 'Copy',
        success: 'Copied',
      },
    },
    // Testimonials Section - Use cases, not fake quotes
    testimonials: {
      title: 'Perfect For',
      subtitle: 'Where chartsok shines brightest',
      items: [
        {
          quote: 'Busy clinics with no time to chart. Let AI handle documentation so you can see the next patient.',
          author: 'High-Volume Clinics',
          role: 'IM · FM · Peds',
          hospital: '',
          specialty: 'Internal Medicine',
          stat: '70% Less Charting',
        },
        {
          quote: 'When recalls matter but patients slip through the cracks. Auto follow-ups close the gap.',
          author: 'Recall-Heavy Clinics',
          role: 'Ortho · Derm · ENT',
          hospital: '',
          specialty: 'Orthopedics',
          stat: 'Zero Missed F/U',
        },
        {
          quote: 'When patient instructions get lost in handoff. Auto-generated handouts keep everyone clear.',
          author: 'Patient-Focused Clinics',
          role: 'All Specialties',
          hospital: '',
          specialty: 'ENT',
          stat: 'Higher Satisfaction',
        },
      ],
    },
    // Integrations Section - EMR compatibility (no false partnership claims)
    integrations: {
      title: 'Works With Any EMR',
      subtitle: 'Alongside your EMR, not replacing it.',
      description: 'Clipboard copy works instantly. Choose SOAP, narrative, or custom field format.',
      systems: ['BitComputer', 'Ubicare', 'EasyCare Tech', 'Others'],
      cta: 'Ask About Integration',
      comingSoon: 'API coming soon',
    },
    // FAQ Section - EMR Partner focused
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Where does data live?',
          answer: 'Cloud (GCP/AWS) or on-premise. Your choice. Boundaries per hospital policy.',
        },
        {
          question: 'Can we deploy on-premise?',
          answer: 'Yes. Private cloud, on-prem, or inside hospital network.',
        },
        {
          question: 'SSO and permissions?',
          answer: 'SAML 2.0 and OAuth 2.0. RBAC included.',
        },
        {
          question: 'What about liability?',
          answer: 'AI assists — never replaces. Physicians always review before use.',
        },
        {
          question: 'How does pricing work?',
          answer: 'Flexible models: resell, white-label, or bundled. Let\'s talk.',
        },
      ],
    },
    // CTA Section
    cta: {
      badge: 'Partner Program',
      title: 'Go Live',
      titleHighlight: 'in 4–8 Weeks',
      titleEnd: '',
      subtitle: 'NDA → Mapping → Pilot → Launch. We guide you every step.',
      button: 'Talk to Us',
      cta: 'Talk to Us',
      demo: 'Get Security Packet',
      secondary: 'Get Security Packet',
      note: 'Partner Program',
    },
    // Footer
    footer: {
      description: 'AI charting that lives inside your EMR.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      legal: 'Legal',
      features: 'Product',
      pricing: 'Security',
      demo: 'Partners',
      integrations: 'Integration',
      about: 'Contact',
      careers: 'Terms',
      blog: 'Privacy',
      contact: 'Contact',
      help: 'Help',
      docs: 'Docs',
      status: 'Status',
      privacy: 'Privacy',
      terms: 'Terms',
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
