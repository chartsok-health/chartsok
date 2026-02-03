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
      getStarted: '데모 요청하기',
      startTrial: '데모 요청하기',
      dashboard: '대시보드',
    },
    // Hero Section
    hero: {
      badge: '클리닉 운영을 위한 업무툴',
      title: '진료에 집중하세요.',
      titleHighlight: '차트는 AI가',
      titleEnd: '완성합니다.',
      subtitle: '진료 내용을 자동으로 정리하고, 요약부터 환자 안내까지 빠르게 완성합니다.\nEMR을 대체하지 않고, EMR 옆에서 더 빠른 후속관리까지 연결합니다.',
      cta: '데모 요청하기',
      demo: '차트 샘플 보기',
      badges: [
        { icon: 'mic', text: '진료 녹음 → 차트 자동 요약' },
        { icon: 'template', text: '환자 안내문 자동 생성' },
        { icon: 'speed', text: '재내원/리콜 후속관리 연결' },
      ],
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
    // Features Section - 3 core features + 3 technical features
    features: {
      title: '병원 운영에 바로 도움이 됩니다',
      subtitle: '진료 기록부터 후속관리까지, 클리닉 워크플로우를 자동화합니다',
      cta: '자세히 보기',
      items: [
        {
          title: '진료 녹음 + 요약 (Scribe)',
          description: '진료 대화를 자동으로 기록하고 구조화된 요약을 생성합니다. SOAP, 서술형, EMR 필드 형식 등 원하는 스타일로 출력됩니다.',
          icon: 'mic',
          features: ['진료 내용 자동 정리', '핵심만 깔끔하게 요약', '의사용/직원용 정리본 생성', 'SOAP 및 EMR 필드 형식 지원'],
        },
        {
          title: '환자 안내문 자동 생성',
          description: '진료 내용을 바탕으로 환자가 이해할 수 있는 안내문을 자동 생성합니다. 복약, 주의사항, 다음 단계까지 포함됩니다.',
          icon: 'template',
          features: ['환자가 이해하기 쉬운 요약', '복약/주의사항/다음 단계 안내', '전달 누락 최소화', '진료 후 바로 전달 가능'],
        },
        {
          title: '후속관리 액션 생성 (Actions)',
          description: '진료 후 필요한 후속 조치를 자동으로 정리합니다. 재내원 환자를 수작업으로 추적하지 않아도 됩니다. 리콜 성공률이 올라가고, 노쇼가 줄고, 매출이 안정됩니다.',
          icon: 'integration',
          features: ['재내원/리콜 대상 자동 정리 → 놓치는 환자 감소', 'Follow-up To-do 생성 → 수작업 추적 불필요', '리마인더 메시지 준비 → 노쇼율 감소', '리콜 성공률 향상 → 매출 안정화'],
        },
        {
          title: 'EMR 입력 최적화',
          description: 'EMR 필드에 맞춘 구조화된 출력을 제공합니다. 클립보드 복사로 바로 붙여넣기하세요. EMR을 대체하지 않고 옆에서 함께 작동합니다.',
          icon: 'edit',
          features: ['EMR 필드 매핑 지원', 'SOAP / 자유 형식 선택', '원클릭 클립보드 복사', '필드별 개별 복사 가능'],
        },
        {
          title: '나만의 맞춤 템플릿',
          description: '선생님의 진료 스타일과 차트 작성 방식에 맞춘 개인화된 템플릿을 만드세요. 전문과별 기본 템플릿도 제공됩니다.',
          icon: 'time',
          features: ['개인 진료 스타일 반영', '차트 형식 자유 설정', '자주 쓰는 문구 저장', '전문과별 기본 템플릿'],
        },
        {
          title: '음성 파일 즉시 삭제',
          description: '녹음된 음성은 텍스트 변환 직후 서버에서 완전히 삭제됩니다. 음성 파일은 저장하지 않습니다. 보안이 기본입니다.',
          icon: 'security',
          features: ['변환 완료 후 즉시 삭제', '서버에 음성 파일 미보관', '텍스트만 암호화 저장', '삭제 로그 확인 가능'],
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
    // FAQ Section - B2B clinic-focused
    faq: {
      title: '자주 묻는 질문',
      items: [
        {
          question: 'Chartsok은 EMR인가요?',
          answer: '아니요. Chartsok은 EMR을 대체하지 않습니다. 진료 요약과 후속관리 자동화에 집중한 업무툴입니다. EMR 옆에서 함께 작동합니다.',
        },
        {
          question: '녹음 파일은 어떻게 처리되나요?',
          answer: '녹음된 음성 파일은 텍스트 변환이 완료되는 즉시 서버에서 삭제됩니다. 음성 파일은 별도로 저장하거나 보관하지 않습니다.',
        },
        {
          question: '우리 병원에서도 바로 쓸 수 있나요?',
          answer: '네. 현재는 PoC / 파일럿 형태로 병원에 맞춰 적용하는 방식으로 진행합니다. 데모 요청 후 바로 상담 가능합니다.',
        },
        {
          question: '후속관리(Actions)는 어떤 기능인가요?',
          answer: '재내원/리콜/추적관리 같은 다음 업무를 자동으로 정리하고 실행 가능한 형태로 만들어줍니다. follow-up 누락을 줄이는 핵심 기능입니다.',
        },
        {
          question: '환자 안내문은 어떻게 활용하나요?',
          answer: '진료 후 환자에게 전달할 내용을 정리해 누락을 줄이고 이해도를 높입니다. 복약/주의사항/다음 단계까지 포함됩니다.',
        },
        {
          question: '데이터 보안은 어떻게 하나요?',
          answer: '최소 수집, 권한 기반 접근, AES-256 암호화, 활동 로그 기반 설계를 기본 원칙으로 합니다. 개인정보보호법, 의료법 등 국내 규정을 준수합니다.',
        },
        {
          question: '가격은 어떻게 되나요?',
          answer: '병원 규모와 사용 범위(PoC/정식 도입)에 따라 달라질 수 있어 데모 후 안내드립니다.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: '데모를 신청하세요',
      subtitle: '진료 요약부터 후속관리까지, Chartsok이 어떻게 도움이 되는지 직접 확인하세요.',
      button: '데모 요청하기',
      demo: 'PoC / 파일럿 신청하기',
      note: '클리닉 운영을 위한 업무툴입니다 (EMR 연동/협업 가능)',
    },
    // Footer
    footer: {
      description: '진료 요약 + 후속관리 자동화 솔루션',
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
      getStarted: 'Request Demo',
      startTrial: 'Request Demo',
      dashboard: 'Dashboard',
    },
    // Hero Section
    hero: {
      badge: 'A workflow tool for clinics',
      title: 'Focus on Patient Care.',
      titleHighlight: 'AI Completes',
      titleEnd: 'Your Charts.',
      subtitle: 'Automatically organize visit notes — from structured summaries to patient instructions.\nWorks alongside your EMR, not instead of it.',
      cta: 'Request Demo',
      demo: 'View Sample Charts',
      badges: [
        { icon: 'mic', text: 'Visit Recording → Auto Summary' },
        { icon: 'template', text: 'Patient Instructions Auto-generated' },
        { icon: 'speed', text: 'Recall/Follow-up Connected' },
      ],
    },
    // Stats Section - Clinic operational outcomes
    stats: {
      title: 'Your Clinic Operations, Transformed',
      items: [
        { value: '70', suffix: '%', label: 'Less Time on Charts' },
        { value: '0', suffix: '', label: 'Follow-up Gaps' },
        { value: '95', suffix: '%', label: 'Recall Success Rate' },
        { value: '100', suffix: '%', label: 'Visit Records Preserved' },
      ],
    },
    // Features Section
    features: {
      title: 'Built to Help Your Clinic',
      subtitle: 'From visit documentation to follow-up automation — streamline your clinic workflow',
      cta: 'Learn More',
      items: [
        {
          title: 'Visit Recording + Summary (Scribe)',
          description: 'Automatically transcribe consultations and generate structured summaries. Output in SOAP, narrative, or EMR field format.',
          icon: 'mic',
          features: ['Auto-organize visit notes', 'Clean, concise summaries', 'Doctor/staff summary views', 'SOAP & EMR field formats'],
        },
        {
          title: 'Patient Instructions Auto-generated',
          description: 'Automatically generate patient-friendly instructions from visit content. Includes medications, precautions, and next steps.',
          icon: 'template',
          features: ['Easy-to-understand summaries', 'Medication/precaution/next steps', 'Minimize missed communications', 'Ready to deliver post-visit'],
        },
        {
          title: 'Follow-up Actions',
          description: 'Automatically organize follow-up tasks after charting. No more manual patient tracking. Improve recall rates, reduce no-shows, and stabilize revenue.',
          icon: 'integration',
          features: ['Auto-organize recall targets → fewer missed patients', 'Generate follow-up to-dos → no manual tracking', 'Prepare reminder messages → reduce no-shows', 'Improve recall success → stabilize revenue'],
        },
        {
          title: 'EMR Input Optimization',
          description: 'Structured output mapped to your EMR fields. Copy to clipboard and paste directly. Works alongside your EMR, not instead of it.',
          icon: 'edit',
          features: ['EMR field mapping', 'SOAP / free-form options', 'One-click clipboard copy', 'Copy individual fields'],
        },
        {
          title: 'Custom Templates',
          description: 'Create templates matching your consultation style and documentation preferences. Specialty defaults also included.',
          icon: 'time',
          features: ['Match your clinical style', 'Flexible chart formats', 'Save frequent phrases', 'Specialty default templates'],
        },
        {
          title: 'Audio Deleted Immediately',
          description: 'Recorded audio is completely deleted from our servers after transcription. No audio files are stored. Security by default.',
          icon: 'security',
          features: ['Deleted after transcription', 'No audio file storage', 'Text encrypted only', 'Deletion logs available'],
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
      title: 'Record → Summarize → Act',
      subtitle: 'From visit documentation to follow-up in 5 steps',
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
          title: 'EMR + Follow-up',
          description: 'Send chart to EMR and organize follow-up tasks.',
          detail: 'Clipboard copy for EMR entry. Recall/follow-up actions auto-generated.',
          icon: 'clipboard',
        },
      ],
    },
    // Specialties Section - AI Models
    specialties: {
      title: 'Specialty AI Models',
      subtitle: 'AI trained on specialty-specific patterns generates optimized charts',
      comingSoon: 'Coming Soon',
      items: [
        {
          id: 'internal',
          name: 'Internal Medicine',
          nameEn: 'Internal Medicine',
          description: 'AI model specialized for chronic disease management, lab results, and medication prescriptions',
          features: ['Auto-organize chronic disease progress', 'Structured lab results', 'Medication adjustment history'],
          icon: 'internal',
          available: true,
        },
        {
          id: 'ent',
          name: 'ENT',
          nameEn: 'ENT',
          description: 'AI model specialized for hearing tests, endoscopy findings, and procedure records',
          features: ['Auto-organize audiometry', 'Structured endoscopy findings', 'Procedure note generation'],
          icon: 'ent',
          available: true,
        },
        {
          id: 'orthopedics',
          name: 'Orthopedics',
          nameEn: 'Orthopedics',
          description: 'AI model specialized for imaging findings, rehab plans, and surgical records',
          features: ['X-ray/MRI findings summary', 'Rehab plan generation', 'Structured surgical records'],
          icon: 'orthopedics',
          available: true,
        },
        {
          id: 'dermatology',
          name: 'Dermatology',
          nameEn: 'Dermatology',
          description: 'AI model specialized for lesion descriptions and procedure documentation',
          features: ['Automated lesion descriptions', 'Structured procedure records', 'Progress comparison generation'],
          icon: 'dermatology',
          available: true,
        },
        {
          id: 'pediatrics',
          name: 'Pediatrics',
          nameEn: 'Pediatrics',
          description: 'AI model specialized for growth assessments, vaccinations, and parent communication',
          features: ['Automated growth tracking', 'Vaccination schedule summaries', 'Parent instruction generation'],
          icon: 'pediatrics',
          available: true,
        },
        {
          id: 'psychiatry',
          name: 'Psychiatry',
          nameEn: 'Psychiatry',
          description: 'AI model specialized for mental status exams and session documentation',
          features: ['Auto-organize MSE', 'Structured session summaries', 'Medication response tracking'],
          icon: 'psychiatry',
          available: true,
        },
      ],
    },
    // Demo Section
    demo: {
      title: 'From Visit to Follow-up — Try It Live',
      subtitle: 'Recording → Summary → Instructions → Actions, all in one',
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
    // Testimonials Section - Use cases, not fake quotes
    testimonials: {
      title: 'Best Fit For These Clinics',
      subtitle: 'Where Chartsok makes the biggest difference',
      items: [
        {
          quote: 'High-volume outpatient clinics where there is not enough time for post-visit charting. Automated visit documentation reduces charting time so you can focus on the next patient.',
          author: 'High-Volume Outpatient Clinics',
          role: 'Internal Medicine · Family Medicine · Pediatrics',
          hospital: '',
          specialty: 'Internal Medicine',
          stat: '70% Less Charting Time',
        },
        {
          quote: 'Clinics where recall/follow-up management is important but patients are missed through manual tracking. Follow-up actions are auto-organized to reduce gaps.',
          author: 'Recall-Critical Clinics',
          role: 'Orthopedics · Dermatology · ENT',
          hospital: '',
          specialty: 'Orthopedics',
          stat: 'Fewer Follow-up Gaps',
        },
        {
          quote: 'Clinics where medication instructions, precautions, and next steps are often missed during patient handoff. Auto-generated patient instructions improve communication quality.',
          author: 'Patient Communication-Focused Clinics',
          role: 'All Specialties',
          hospital: '',
          specialty: 'ENT',
          stat: 'Better Patient Satisfaction',
        },
      ],
    },
    // Integrations Section - EMR compatibility (no false partnership claims)
    integrations: {
      title: 'Works With Your EMR',
      subtitle: 'Chartsok doesn\'t replace your EMR. It works alongside it.',
      description: 'Use clipboard copy to work with any EMR right away. Choose from SOAP, narrative, or EMR field output formats.',
      systems: ['BitComputer', 'Ubicare', 'EasyCare Tech', 'Other EMRs'],
      cta: 'Contact About EMR Integration',
      comingSoon: 'Direct API integration coming soon',
    },
    // FAQ Section - B2B clinic-focused
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is Chartsok an EMR?',
          answer: 'No. Chartsok does not replace your EMR. It is a workflow tool focused on visit summaries and follow-up automation. Works alongside your existing EMR.',
        },
        {
          question: 'How are audio recordings handled?',
          answer: 'Audio recordings are deleted from our servers immediately after transcription. We do not store or retain audio files.',
        },
        {
          question: 'Can my clinic start using it right away?',
          answer: 'Yes. We currently onboard clinics through PoC / pilot programs tailored to your workflow. Request a demo to get started.',
        },
        {
          question: 'What are Follow-up Actions?',
          answer: 'Actions automatically organize follow-up tasks like recalls, tracking, and reminders into actionable to-dos. They reduce follow-up gaps.',
        },
        {
          question: 'How are patient instructions used?',
          answer: 'Post-visit information is organized for patients, reducing missed communications and improving understanding. Includes medication, precautions, and next steps.',
        },
        {
          question: 'How is data security handled?',
          answer: 'We follow principles of minimal data collection, role-based access, AES-256 encryption, and audit logging. Compliant with Korean privacy regulations.',
        },
        {
          question: 'How much does it cost?',
          answer: 'Pricing depends on clinic size and scope (PoC vs. full deployment). We provide details after a demo.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'Request a Demo',
      subtitle: 'From visit summaries to follow-up actions — see how Chartsok can help your clinic.',
      button: 'Request Demo',
      demo: 'Apply for PoC / Pilot',
      note: 'A workflow tool for clinics (EMR integration available)',
    },
    // Footer
    footer: {
      description: 'Visit summary + follow-up automation solution',
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
