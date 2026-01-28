'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  ko: {
    // Navigation
    nav: {
      home: '홈',
      features: '기능',
      howItWorks: '이용 방법',
      pricing: '요금제',
      about: '소개',
      contact: '문의하기',
      login: '로그인',
      getStarted: '무료로 시작',
      startTrial: '14일 무료 체험',
    },
    // Hero Section
    hero: {
      badge: 'AI 기반 의료 기록 혁신',
      title: '진료에 집중하세요',
      titleHighlight: '기록은 AI가',
      titleEnd: '합니다',
      subtitle: '차트쏙은 진료 중 대화를 실시간으로 분석하여 SOAP 형식의 전문 의료 기록을 자동 생성합니다. 의사는 환자에게 집중하고, 환자는 진료 내용을 명확히 이해할 수 있습니다.',
      cta: '무료로 시작하기',
      demo: '데모 영상 보기',
      trustedBy: '신뢰받는 파트너',
    },
    // Stats Section
    stats: {
      title: '숫자로 보는 차트쏙',
      items: [
        { value: '73', suffix: '%', label: '문서 작성 시간 절감' },
        { value: '5', suffix: '분', label: '평균 차트 완성 시간' },
        { value: '98', suffix: '%', label: '의료진 만족도' },
        { value: '24', suffix: '/7', label: '실시간 지원' },
      ],
    },
    // Features Section
    features: {
      title: '강력한 기능',
      subtitle: '의료진과 환자 모두를 위한 스마트 솔루션',
      cta: '모든 기능 보기',
      items: [
        {
          title: '실시간 음성 인식',
          description: '최첨단 AI가 진료 중 대화를 실시간으로 텍스트로 변환합니다. 의학 용어도 정확하게 인식합니다.',
          icon: 'mic',
          features: ['의학 용어 특화 인식', '다중 화자 구분', '실시간 텍스트 변환', '노이즈 필터링'],
        },
        {
          title: 'AI SOAP 자동 생성',
          description: '인공지능이 대화 내용을 분석하여 SOAP 형식의 표준 의료 기록을 자동으로 생성합니다.',
          icon: 'ai',
          features: ['SOAP 형식 자동 구조화', '핵심 정보 추출', '진단 코드 추천', '이전 기록 참조'],
        },
        {
          title: '환자 맞춤 요약',
          description: '복잡한 의학 용어를 환자가 이해하기 쉬운 설명으로 자동 변환합니다.',
          icon: 'patient',
          features: ['쉬운 용어 변환', '시각적 설명 자료', '다국어 지원', '맞춤형 교육 자료'],
        },
        {
          title: '보안 공유 시스템',
          description: '환자가 원하는 정보만 선택하여 보호자와 안전하게 공유할 수 있습니다.',
          icon: 'security',
          features: ['선택적 정보 공유', '접근 권한 관리', '공유 이력 추적', '즉시 접근 해제'],
        },
        {
          title: 'EMR 연동',
          description: '기존 EMR 시스템과 원활하게 연동됩니다. 원클릭으로 차트를 복사하세요.',
          icon: 'integration',
          features: ['주요 EMR 호환', '원클릭 복사', 'API 연동', '데이터 동기화'],
        },
        {
          title: '분석 대시보드',
          description: '진료 패턴과 효율성을 한눈에 파악할 수 있는 인사이트를 제공합니다.',
          icon: 'analytics',
          features: ['진료 통계', '시간 절감 리포트', '트렌드 분석', '맞춤 리포트'],
        },
      ],
    },
    // How It Works Section
    howItWorks: {
      title: '간단한 3단계로 시작하세요',
      subtitle: '복잡한 설정 없이 바로 사용할 수 있습니다',
      steps: [
        {
          step: '01',
          title: '녹음 시작',
          description: '진료 시작 시 녹음 버튼 하나만 누르세요. 그 순간부터 AI가 모든 대화를 기록합니다.',
          detail: '의사와 환자의 목소리를 자동으로 구분하고, 의학 용어를 정확하게 인식합니다.',
        },
        {
          step: '02',
          title: 'AI 분석',
          description: '진료가 끝나면 AI가 대화 내용을 분석하여 SOAP 형식의 체계적인 기록을 생성합니다.',
          detail: '주관적 증상(S), 객관적 소견(O), 평가(A), 계획(P)을 자동으로 구조화합니다.',
        },
        {
          step: '03',
          title: '검토 및 저장',
          description: '생성된 기록을 확인하고 필요시 수정한 뒤 저장하세요. EMR로 바로 복사할 수 있습니다.',
          detail: '환자용 쉬운 설명 버전도 함께 생성되어 환자와 공유할 수 있습니다.',
        },
      ],
    },
    // Demo Section
    demo: {
      title: '직접 확인해보세요',
      subtitle: '실제 차트쏙이 어떻게 작동하는지 경험해보세요',
      recording: '녹음 중...',
      processing: 'AI 분석 중...',
      complete: '차트 완성!',
      tryDemo: '데모 체험하기',
      sampleTranscript: '환자: 3일 전부터 두통이 있어요. 특히 오후에 더 심해지고요.\n의사: 어떤 종류의 두통인가요? 찌르는 듯한 통증인가요, 아니면 조이는 느낌인가요?\n환자: 조이는 느낌이에요. 목도 좀 뻣뻣하고요.',
      sampleSOAP: {
        s: '3일 전부터 시작된 두통 호소. 오후에 악화되는 양상. 조이는 듯한 통증과 경부 뻣뻣함 동반.',
        o: 'V/S: BP 120/80, HR 72. 경부 근육 긴장 촉진됨.',
        a: '긴장성 두통(Tension-type headache) 의심',
        p: '생활습관 교정 교육, 경부 스트레칭 권고. 증상 지속시 재내원.',
      },
    },
    // User Roles Section
    roles: {
      title: '모든 사용자를 위한 설계',
      subtitle: '각 사용자에게 최적화된 경험을 제공합니다',
      doctor: {
        title: '의사',
        tagline: '진료에만 집중하세요',
        description: '환자와의 대화에 집중하면서도 정확하고 상세한 진료 기록을 남길 수 있습니다.',
        features: ['원클릭 녹음 시작/종료', 'SOAP 자동 생성', '수정 및 편집', 'EMR 복사', '진료 기록 검색', '통계 대시보드'],
      },
      patient: {
        title: '환자',
        tagline: '내 건강, 명확하게 이해하기',
        description: '진료 내용을 언제든지 확인하고, 이해하기 쉬운 설명으로 건강을 관리하세요.',
        features: ['진료 기록 열람', '쉬운 설명 제공', '보호자 공유 설정', '기록 다운로드', '복약 알림', '건강 일지'],
      },
      companion: {
        title: '보호자',
        tagline: '함께하는 건강 관리',
        description: '환자가 공유한 진료 정보를 확인하고 함께 건강을 관리할 수 있습니다.',
        features: ['공유된 기록 열람', '읽기 전용 접근', '안전한 정보 보호', '실시간 업데이트', '다중 환자 관리', '알림 설정'],
      },
    },
    // Testimonials Section
    testimonials: {
      title: '의료진의 목소리',
      subtitle: '실제 사용자들의 경험을 들어보세요',
      items: [
        {
          quote: '진료 시간이 끝나면 항상 차트 작성에 1-2시간을 더 써야 했는데, 차트쏙 도입 후 그 시간이 거의 사라졌어요. 이제 퇴근 후 가족과 더 많은 시간을 보낼 수 있게 됐습니다.',
          author: '김○○ 원장',
          role: '내과 전문의',
          hospital: '서울 소재 의원',
          stat: '일일 2시간 절감',
        },
        {
          quote: '환자분들이 진료 내용을 잘 기억하지 못해 불안해하시는 경우가 많았는데, 이제 쉬운 설명 버전을 공유하니까 만족도가 훨씬 높아졌어요.',
          author: '이○○ 과장',
          role: '가정의학과',
          hospital: '경기도 소재 병원',
          stat: '환자 만족도 40% 향상',
        },
        {
          quote: 'AI가 생성한 SOAP 기록의 정확도에 놀랐습니다. 의학 용어도 정확하게 인식하고, 구조화도 잘 되어 있어서 검토 시간도 크게 줄었어요.',
          author: '박○○ 전공의',
          role: '외과',
          hospital: '대학병원',
          stat: '기록 정확도 98%',
        },
      ],
    },
    // Integrations Section
    integrations: {
      title: 'EMR 시스템과 완벽 연동',
      subtitle: '기존 워크플로우를 그대로 유지하면서 차트쏙의 편리함을 더하세요',
      description: '국내 주요 EMR 시스템과 호환되며, API를 통한 직접 연동도 지원합니다.',
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
      plans: [
        {
          name: 'Starter',
          description: '개인 의원에 적합',
          price: '99,000',
          period: '/월',
          features: ['의사 1명', '월 100건 진료 기록', '기본 SOAP 생성', '환자 앱 제공', '이메일 지원'],
          cta: '시작하기',
          popular: false,
        },
        {
          name: 'Professional',
          description: '성장하는 의원에 추천',
          price: '249,000',
          period: '/월',
          features: ['의사 3명까지', '무제한 진료 기록', '고급 AI 분석', 'EMR 연동', '우선 지원', '분석 대시보드'],
          cta: '14일 무료 체험',
          popular: true,
        },
        {
          name: 'Enterprise',
          description: '병원 및 의료기관',
          price: '문의',
          period: '',
          features: ['무제한 사용자', '맞춤형 연동', '전용 서버 옵션', '온프레미스 설치', 'SLA 보장', '전담 매니저'],
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
          question: '환자 개인정보는 안전한가요?',
          answer: '차트쏙은 의료정보 보호법을 준수하며, 모든 데이터는 AES-256 암호화로 보호됩니다. 국내 데이터센터에서 운영되며, 정기적인 보안 감사를 실시합니다.',
        },
        {
          question: '기존 EMR과 연동할 수 있나요?',
          answer: '네, 국내 주요 EMR 시스템과 호환됩니다. 직접 API 연동 또는 복사/붙여넣기 방식 모두 지원합니다.',
        },
        {
          question: '녹음 파일은 어떻게 처리되나요?',
          answer: '녹음 파일은 텍스트 변환 후 서버에서 즉시 삭제됩니다. 텍스트 기록만 암호화되어 저장됩니다.',
        },
        {
          question: '환자 동의는 어떻게 받나요?',
          answer: '앱 내에서 녹음 동의서를 전자 서명으로 받을 수 있습니다. 동의 기록은 타임스탬프와 함께 안전하게 저장됩니다.',
        },
        {
          question: '오프라인에서도 사용할 수 있나요?',
          answer: '녹음은 오프라인에서도 가능하며, 인터넷 연결 시 자동으로 동기화됩니다.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: '지금 바로 시작하세요',
      subtitle: '14일 무료 체험으로 차트쏙의 편리함을 직접 경험해보세요.',
      button: '무료로 체험하기',
      demo: '데모 예약하기',
      note: '신용카드 없이 시작할 수 있습니다',
    },
    // Footer
    footer: {
      description: '의료진과 환자를 연결하는 스마트한 진료 기록 솔루션',
      product: '제품',
      company: '회사',
      support: '지원',
      legal: '법적 고지',
      features: '기능',
      pricing: '요금제',
      demo: '데모',
      integrations: '연동',
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
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      login: 'Log In',
      getStarted: 'Get Started Free',
      startTrial: '14-Day Free Trial',
    },
    // Hero Section
    hero: {
      badge: 'AI-Powered Medical Documentation',
      title: 'Focus on Care,',
      titleHighlight: 'AI Handles',
      titleEnd: 'the Charts',
      subtitle: 'ChartSok analyzes conversations in real-time to automatically generate professional SOAP notes. Doctors focus on patients, patients understand their care clearly.',
      cta: 'Start for Free',
      demo: 'Watch Demo',
      trustedBy: 'Trusted By',
    },
    // Stats Section
    stats: {
      title: 'ChartSok by Numbers',
      items: [
        { value: '73', suffix: '%', label: 'Documentation Time Saved' },
        { value: '5', suffix: 'min', label: 'Average Chart Completion' },
        { value: '98', suffix: '%', label: 'Provider Satisfaction' },
        { value: '24', suffix: '/7', label: 'Real-time Support' },
      ],
    },
    // Features Section
    features: {
      title: 'Powerful Features',
      subtitle: 'Smart solutions for both providers and patients',
      cta: 'View All Features',
      items: [
        {
          title: 'Real-time Voice Recognition',
          description: 'Advanced AI converts conversations to text in real-time, accurately recognizing medical terminology.',
          icon: 'mic',
          features: ['Medical terminology specialized', 'Multi-speaker detection', 'Real-time transcription', 'Noise filtering'],
        },
        {
          title: 'AI SOAP Generation',
          description: 'AI analyzes conversation content to automatically generate standardized SOAP format medical records.',
          icon: 'ai',
          features: ['Auto SOAP structuring', 'Key info extraction', 'Diagnosis code suggestions', 'Previous record reference'],
        },
        {
          title: 'Patient-Friendly Summaries',
          description: 'Complex medical terms are automatically converted to easy-to-understand explanations.',
          icon: 'patient',
          features: ['Simple term conversion', 'Visual explanations', 'Multilingual support', 'Custom education materials'],
        },
        {
          title: 'Secure Sharing System',
          description: 'Patients can selectively share information with caregivers securely.',
          icon: 'security',
          features: ['Selective sharing', 'Access control', 'Share history tracking', 'Instant access revocation'],
        },
        {
          title: 'EMR Integration',
          description: 'Seamlessly integrates with existing EMR systems. One-click copy to your charts.',
          icon: 'integration',
          features: ['Major EMR compatible', 'One-click copy', 'API integration', 'Data sync'],
        },
        {
          title: 'Analytics Dashboard',
          description: 'Get insights into consultation patterns and efficiency at a glance.',
          icon: 'analytics',
          features: ['Consultation stats', 'Time savings reports', 'Trend analysis', 'Custom reports'],
        },
      ],
    },
    // How It Works Section
    howItWorks: {
      title: 'Get Started in 3 Simple Steps',
      subtitle: 'No complicated setup required',
      steps: [
        {
          step: '01',
          title: 'Start Recording',
          description: 'Just press the record button when starting consultation. AI captures everything from that moment.',
          detail: 'Automatically distinguishes between doctor and patient voices, accurately recognizing medical terms.',
        },
        {
          step: '02',
          title: 'AI Analysis',
          description: 'When the visit ends, AI analyzes the conversation and generates structured SOAP notes.',
          detail: 'Automatically structures Subjective(S), Objective(O), Assessment(A), and Plan(P).',
        },
        {
          step: '03',
          title: 'Review & Save',
          description: 'Review the generated notes, edit if needed, and save. Copy directly to your EMR.',
          detail: 'A patient-friendly version is also generated for sharing with patients.',
        },
      ],
    },
    // Demo Section
    demo: {
      title: 'See It in Action',
      subtitle: 'Experience how ChartSok works in real-time',
      recording: 'Recording...',
      processing: 'AI Processing...',
      complete: 'Chart Complete!',
      tryDemo: 'Try Demo',
      sampleTranscript: 'Patient: I\'ve had a headache for 3 days. It gets worse in the afternoon.\nDoctor: What kind of headache is it? Is it a sharp pain or more of a pressing sensation?\nPatient: It\'s a pressing feeling. My neck is a bit stiff too.',
      sampleSOAP: {
        s: 'Headache for 3 days. Worsens in afternoon. Pressing quality with associated neck stiffness.',
        o: 'V/S: BP 120/80, HR 72. Cervical muscle tension on palpation.',
        a: 'Tension-type headache suspected',
        p: 'Lifestyle modification education, neck stretching recommended. Return if symptoms persist.',
      },
    },
    // User Roles Section
    roles: {
      title: 'Designed for Everyone',
      subtitle: 'Optimized experience for each user type',
      doctor: {
        title: 'Doctor',
        tagline: 'Focus on what matters',
        description: 'Focus on patient conversations while maintaining accurate and detailed medical records.',
        features: ['One-click recording', 'Auto SOAP generation', 'Edit & modify', 'EMR copy', 'Record search', 'Stats dashboard'],
      },
      patient: {
        title: 'Patient',
        tagline: 'Understand your health clearly',
        description: 'Access your visit records anytime with easy-to-understand explanations.',
        features: ['View visit records', 'Clear explanations', 'Caregiver sharing', 'Download records', 'Med reminders', 'Health journal'],
      },
      companion: {
        title: 'Caregiver',
        tagline: 'Care together',
        description: 'View visit information shared by the patient and manage health together.',
        features: ['View shared records', 'Read-only access', 'Secure protection', 'Real-time updates', 'Multi-patient mgmt', 'Notifications'],
      },
    },
    // Testimonials Section
    testimonials: {
      title: 'What Providers Say',
      subtitle: 'Hear from real users',
      items: [
        {
          quote: 'I used to spend 1-2 hours after clinic writing charts. After ChartSok, that time virtually disappeared. Now I can spend more time with my family after work.',
          author: 'Dr. Kim',
          role: 'Internal Medicine',
          hospital: 'Seoul Clinic',
          stat: '2 hours saved daily',
        },
        {
          quote: 'Patients often felt anxious because they couldn\'t remember consultation details. Now that I share the easy explanation version, satisfaction has increased significantly.',
          author: 'Dr. Lee',
          role: 'Family Medicine',
          hospital: 'Gyeonggi Hospital',
          stat: '40% satisfaction increase',
        },
        {
          quote: 'I was amazed by the accuracy of AI-generated SOAP notes. Medical terminology is recognized accurately, and the structure is well organized.',
          author: 'Dr. Park',
          role: 'Surgery Resident',
          hospital: 'University Hospital',
          stat: '98% accuracy rate',
        },
      ],
    },
    // Integrations Section
    integrations: {
      title: 'Perfect EMR Integration',
      subtitle: 'Keep your existing workflow while adding ChartSok convenience',
      description: 'Compatible with major Korean EMR systems, with direct API integration support.',
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
      plans: [
        {
          name: 'Starter',
          description: 'Perfect for solo practices',
          price: '99',
          period: '/mo',
          features: ['1 Provider', '100 visits/month', 'Basic SOAP generation', 'Patient app included', 'Email support'],
          cta: 'Get Started',
          popular: false,
        },
        {
          name: 'Professional',
          description: 'Recommended for growing practices',
          price: '249',
          period: '/mo',
          features: ['Up to 3 providers', 'Unlimited visits', 'Advanced AI analysis', 'EMR integration', 'Priority support', 'Analytics dashboard'],
          cta: '14-Day Free Trial',
          popular: true,
        },
        {
          name: 'Enterprise',
          description: 'For hospitals & healthcare systems',
          price: 'Contact',
          period: '',
          features: ['Unlimited users', 'Custom integration', 'Dedicated server option', 'On-premise install', 'SLA guarantee', 'Dedicated manager'],
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
          answer: 'ChartSok complies with healthcare privacy regulations. All data is protected with AES-256 encryption. We operate from domestic data centers with regular security audits.',
        },
        {
          question: 'Can it integrate with existing EMR?',
          answer: 'Yes, we\'re compatible with major Korean EMR systems. We support both direct API integration and copy/paste methods.',
        },
        {
          question: 'How are recordings handled?',
          answer: 'Audio files are deleted immediately after text conversion. Only encrypted text records are stored.',
        },
        {
          question: 'How is patient consent obtained?',
          answer: 'Recording consent can be obtained via electronic signature in the app. Consent records are securely stored with timestamps.',
        },
        {
          question: 'Does it work offline?',
          answer: 'Recording works offline and automatically syncs when internet connection is restored.',
        },
      ],
    },
    // CTA Section
    cta: {
      title: 'Get Started Today',
      subtitle: 'Experience ChartSok with a 14-day free trial. No credit card required.',
      button: 'Start Free Trial',
      demo: 'Schedule Demo',
      note: 'No credit card required',
    },
    // Footer
    footer: {
      description: 'Smart medical documentation connecting providers and patients',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      legal: 'Legal',
      features: 'Features',
      pricing: 'Pricing',
      demo: 'Demo',
      integrations: 'Integrations',
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
