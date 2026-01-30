// Help articles data for all categories

export const helpCategories = {
  'getting-started': {
    ko: {
      title: '시작하기',
      desc: '처음 사용자를 위한 가이드',
      color: '#4B9CD3',
      icon: 'RocketLaunchIcon',
    },
    en: {
      title: 'Getting Started',
      desc: 'Guide for new users',
      color: '#4B9CD3',
      icon: 'RocketLaunchIcon',
    },
  },
  'recording-charts': {
    ko: {
      title: '녹음 & 차트',
      desc: '진료 녹음 및 차트 생성',
      color: '#10B981',
      icon: 'PlayCircleOutlineIcon',
    },
    en: {
      title: 'Recording & Charts',
      desc: 'Recording and chart generation',
      color: '#10B981',
      icon: 'PlayCircleOutlineIcon',
    },
  },
  'emr-integration': {
    ko: {
      title: 'EMR 연동',
      desc: 'EMR 시스템 연동 (개발 중)',
      color: '#F59E0B',
      icon: 'IntegrationInstructionsIcon',
    },
    en: {
      title: 'EMR Integration',
      desc: 'EMR system integration (Coming Soon)',
      color: '#F59E0B',
      icon: 'IntegrationInstructionsIcon',
    },
  },
  settings: {
    ko: {
      title: '설정',
      desc: '계정 및 환경 설정',
      color: '#8B5CF6',
      icon: 'SettingsIcon',
    },
    en: {
      title: 'Settings',
      desc: 'Account and preferences',
      color: '#8B5CF6',
      icon: 'SettingsIcon',
    },
  },
  'security-privacy': {
    ko: {
      title: '보안 & 개인정보',
      desc: '데이터 보호 정책',
      color: '#EF4444',
      icon: 'SecurityIcon',
    },
    en: {
      title: 'Security & Privacy',
      desc: 'Data protection policies',
      color: '#EF4444',
      icon: 'SecurityIcon',
    },
  },
  troubleshooting: {
    ko: {
      title: '문제 해결',
      desc: '일반적인 문제 해결 방법',
      color: '#64748B',
      icon: 'SupportAgentIcon',
    },
    en: {
      title: 'Troubleshooting',
      desc: 'Common problem solutions',
      color: '#64748B',
      icon: 'SupportAgentIcon',
    },
  },
};

export const helpArticles = {
  'getting-started': [
    {
      id: 'create-account',
      ko: {
        title: '계정 생성하기',
        summary: 'chartsok 계정을 만들고 시작하는 방법',
        content: `
## 계정 생성 방법

chartsok을 사용하기 위해서는 먼저 계정을 생성해야 합니다.

### 1단계: 회원가입 페이지 접속
웹사이트 오른쪽 상단의 "시작하기" 버튼을 클릭하여 회원가입 페이지로 이동합니다.

### 2단계: 이메일 인증
- 이메일 주소를 입력합니다
- 비밀번호를 설정합니다 (최소 8자, 숫자와 특수문자 포함)
- 이메일로 발송된 인증 코드를 입력합니다

### 3단계: 프로필 설정
- 이름과 소속 의료기관을 입력합니다
- 전문 분야를 선택합니다
- 약관에 동의합니다

### 완료!
계정 생성이 완료되면 14일 무료 체험이 자동으로 시작됩니다.
        `,
      },
      en: {
        title: 'Creating an Account',
        summary: 'How to create a chartsok account and get started',
        content: `
## How to Create an Account

To use chartsok, you first need to create an account.

### Step 1: Access Sign-up Page
Click the "Get Started" button at the top right of the website to go to the sign-up page.

### Step 2: Email Verification
- Enter your email address
- Set a password (minimum 8 characters, including numbers and special characters)
- Enter the verification code sent to your email

### Step 3: Profile Setup
- Enter your name and medical institution
- Select your specialty
- Agree to the terms

### Done!
Once account creation is complete, a 14-day free trial will automatically begin.
        `,
      },
    },
    {
      id: 'first-recording',
      ko: {
        title: '첫 번째 녹음하기',
        summary: '진료 녹음을 시작하는 방법 안내',
        content: `
## 첫 번째 녹음 시작하기

chartsok으로 첫 번째 진료를 녹음하는 방법을 안내합니다.

### 녹음 전 준비
1. 마이크 권한을 허용해주세요
2. 조용한 환경에서 녹음하면 더 정확한 결과를 얻을 수 있습니다
3. 환자에게 녹음 동의를 받아주세요

### 녹음 시작
1. 대시보드에서 "새 녹음" 버튼을 클릭합니다
2. 환자 정보를 입력하거나 선택합니다
3. 전문과 AI를 선택합니다
4. 녹음 버튼을 눌러 시작합니다

### 녹음 중
- 자연스럽게 진료를 진행하세요
- 화면에 녹음 시간이 표시됩니다
- 일시정지/재개가 가능합니다

### 녹음 완료
녹음 종료 버튼을 누르면 AI가 자동으로 차트를 생성합니다.
        `,
      },
      en: {
        title: 'Making Your First Recording',
        summary: 'Guide to starting your first consultation recording',
        content: `
## Starting Your First Recording

Here's how to record your first consultation with chartsok.

### Before Recording
1. Please allow microphone permissions
2. Recording in a quiet environment yields more accurate results
3. Obtain recording consent from the patient

### Start Recording
1. Click the "New Recording" button on the dashboard
2. Enter or select patient information
3. Select the specialty AI
4. Press the record button to start

### During Recording
- Conduct the consultation naturally
- Recording time is displayed on screen
- You can pause/resume

### Recording Complete
Press the stop button and AI will automatically generate the chart.
        `,
      },
    },
    {
      id: 'dashboard-overview',
      ko: {
        title: '대시보드 둘러보기',
        summary: 'chartsok 대시보드의 주요 기능 소개',
        content: `
## 대시보드 소개

chartsok 대시보드에서 모든 기능에 접근할 수 있습니다.

### 주요 영역

#### 1. 상단 네비게이션
- 홈: 대시보드로 이동
- 환자: 환자 목록 관리
- 기록: 진료 기록 확인
- 설정: 계정 설정

#### 2. 빠른 시작
- 새 녹음 버튼으로 바로 녹음 시작
- 최근 진료 목록 확인

#### 3. 통계 카드
- 오늘의 진료 수
- 이번 주 절약 시간
- 차트 생성 현황

#### 4. 최근 활동
- 최근 생성된 차트
- 대기 중인 작업
- 알림 내역
        `,
      },
      en: {
        title: 'Dashboard Overview',
        summary: 'Introduction to main features of the chartsok dashboard',
        content: `
## Dashboard Introduction

Access all features from the chartsok dashboard.

### Main Areas

#### 1. Top Navigation
- Home: Go to dashboard
- Patients: Manage patient list
- Records: View consultation records
- Settings: Account settings

#### 2. Quick Start
- Start recording immediately with New Recording button
- View recent consultations

#### 3. Statistics Cards
- Today's consultations
- Time saved this week
- Chart generation status

#### 4. Recent Activity
- Recently created charts
- Pending tasks
- Notification history
        `,
      },
    },
    {
      id: 'patient-consent',
      ko: {
        title: '환자 동의 받기',
        summary: '녹음 동의서 전자 서명 방법',
        content: `
## 환자 녹음 동의 받기

chartsok에서 제공하는 전자 동의서로 환자 동의를 받는 방법입니다.

### 왜 동의가 필요한가요?
- 의료법에 따라 진료 녹음 시 환자 동의가 필요합니다
- 전자 동의서는 법적 효력을 갖습니다

### 동의서 발송 방법
1. 환자 정보 화면에서 "동의서 발송" 클릭
2. 환자 연락처(이메일 또는 휴대폰) 확인
3. 발송 버튼 클릭

### 환자 서명 과정
1. 환자가 링크를 통해 동의서 확인
2. 내용 확인 후 전자 서명
3. 서명 완료 시 자동으로 시스템에 기록

### 동의 기록 관리
- 모든 동의 기록은 타임스탬프와 함께 저장
- 환자별 동의 이력 확인 가능
- 필요시 PDF로 다운로드 가능
        `,
      },
      en: {
        title: 'Getting Patient Consent',
        summary: 'How to obtain electronic signature for recording consent',
        content: `
## Getting Patient Recording Consent

Here's how to obtain patient consent using chartsok's electronic consent form.

### Why is consent needed?
- Patient consent is required for consultation recording under medical law
- Electronic consent has legal validity

### How to Send Consent Form
1. Click "Send Consent Form" on patient information screen
2. Confirm patient contact (email or phone)
3. Click send button

### Patient Signing Process
1. Patient views consent form through link
2. Reviews content and signs electronically
3. Upon completion, automatically recorded in system

### Managing Consent Records
- All consent records stored with timestamps
- View consent history by patient
- Download as PDF when needed
        `,
      },
    },
    {
      id: 'specialty-selection',
      ko: {
        title: '전문과 AI 선택하기',
        summary: '진료 분야에 맞는 AI 선택 방법',
        content: `
## 전문과 AI 선택

chartsok은 다양한 전문과에 맞춤화된 AI를 제공합니다.

### 지원 전문과
- **내과**: 내과 진료에 특화된 용어와 차트 형식
- **이비인후과**: ENT 전문 용어 및 진단 체계
- **정형외과**: 근골격계 진료 특화
- **피부과**: 피부 질환 진료 특화
- **소아청소년과**: 소아 진료 맞춤 형식
- **정신건강의학과**: 정신과 면담 기록 특화

### AI 선택 방법
1. 녹음 시작 전 전문과 선택 화면 표시
2. 해당 진료에 맞는 전문과 클릭
3. 선택한 AI가 진료 내용을 분석

### 기본 설정
설정에서 자주 사용하는 전문과를 기본값으로 설정할 수 있습니다.
        `,
      },
      en: {
        title: 'Selecting Specialty AI',
        summary: 'How to choose the right AI for your specialty',
        content: `
## Specialty AI Selection

chartsok provides AI customized for various specialties.

### Supported Specialties
- **Internal Medicine**: Specialized terminology and chart format
- **ENT**: ENT-specific terminology and diagnosis system
- **Orthopedics**: Musculoskeletal care specialization
- **Dermatology**: Skin disease care specialization
- **Pediatrics**: Pediatric care customized format
- **Psychiatry**: Psychiatric interview recording specialization

### How to Select AI
1. Specialty selection screen appears before recording
2. Click the specialty for the consultation
3. Selected AI analyzes the consultation

### Default Settings
You can set your frequently used specialty as default in settings.
        `,
      },
    },
    {
      id: 'mobile-app',
      ko: {
        title: '모바일 앱 설치하기',
        summary: 'iOS 및 Android 앱 설치 방법',
        content: `
## 모바일 앱 설치

chartsok은 웹과 모바일 앱 모두 지원합니다.

### iOS 앱 설치
1. App Store에서 "chartsok" 검색
2. 다운로드 및 설치
3. 기존 계정으로 로그인

### Android 앱 설치
1. Google Play에서 "chartsok" 검색
2. 다운로드 및 설치
3. 기존 계정으로 로그인

### PWA 설치 (웹 앱)
브라우저에서 바로 앱처럼 사용할 수 있습니다:
1. chartsok 웹사이트 접속
2. 브라우저 메뉴에서 "홈 화면에 추가" 선택
3. 앱 아이콘이 홈 화면에 추가됨

### 동기화
모든 데이터는 실시간으로 동기화되어 어디서든 접근 가능합니다.
        `,
      },
      en: {
        title: 'Installing Mobile App',
        summary: 'How to install iOS and Android apps',
        content: `
## Mobile App Installation

chartsok supports both web and mobile apps.

### iOS App Installation
1. Search "chartsok" in App Store
2. Download and install
3. Log in with existing account

### Android App Installation
1. Search "chartsok" in Google Play
2. Download and install
3. Log in with existing account

### PWA Installation (Web App)
Use it like an app directly from your browser:
1. Access chartsok website
2. Select "Add to Home Screen" from browser menu
3. App icon is added to home screen

### Sync
All data is synced in real-time and accessible anywhere.
        `,
      },
    },
    {
      id: 'trial-overview',
      ko: {
        title: '무료 체험 안내',
        summary: '14일 무료 체험 기간 동안 이용 가능한 기능',
        content: `
## 14일 무료 체험

chartsok의 모든 기능을 14일간 무료로 체험해보세요.

### 체험 기간 제공 기능
- 무제한 녹음 및 차트 생성
- 모든 전문과 AI 이용
- EMR 연동 기능
- 환자 관리 기능
- 기술 지원

### 체험 시작 방법
1. 계정 생성 시 자동으로 시작
2. 신용카드 등록 불필요
3. 체험 종료 후 자동 결제 없음

### 체험 기간 종료 후
- 기존 데이터는 30일간 보관
- 유료 플랜 가입 시 데이터 유지
- 가입하지 않으면 데이터 삭제

### 플랜 업그레이드
체험 기간 중 언제든 유료 플랜으로 업그레이드할 수 있습니다.
        `,
      },
      en: {
        title: 'Free Trial Guide',
        summary: 'Features available during 14-day free trial',
        content: `
## 14-Day Free Trial

Try all features of chartsok free for 14 days.

### Trial Features
- Unlimited recording and chart generation
- Access to all specialty AIs
- EMR integration
- Patient management
- Technical support

### How to Start Trial
1. Starts automatically when creating account
2. No credit card required
3. No automatic payment after trial ends

### After Trial Ends
- Existing data kept for 30 days
- Data maintained when subscribing to paid plan
- Data deleted if not subscribed

### Plan Upgrade
You can upgrade to a paid plan anytime during the trial.
        `,
      },
    },
    {
      id: 'quick-start-guide',
      ko: {
        title: '빠른 시작 가이드',
        summary: '5분 만에 chartsok 시작하기',
        content: `
## 5분 빠른 시작 가이드

chartsok을 빠르게 시작하는 방법입니다.

### 1분: 계정 생성
- 이메일로 빠르게 가입
- 소셜 로그인 지원 (Google)

### 2분: 프로필 설정
- 이름, 소속, 전문과 입력
- 기본 AI 설정

### 3분: 첫 녹음 테스트
- 테스트 녹음으로 기능 확인
- 마이크 설정 확인

### 4분: 차트 확인
- AI가 생성한 차트 검토
- 수정 및 저장 방법 확인

### 5분: 실제 사용 시작!
- 다음 진료부터 바로 사용
- 도움이 필요하면 언제든 문의

### 팁
처음에는 간단한 진료부터 시작하여 시스템에 익숙해지세요.
        `,
      },
      en: {
        title: 'Quick Start Guide',
        summary: 'Get started with chartsok in 5 minutes',
        content: `
## 5-Minute Quick Start Guide

Here's how to quickly get started with chartsok.

### 1 Minute: Create Account
- Quick sign-up with email
- Social login supported (Google)

### 2 Minutes: Profile Setup
- Enter name, institution, specialty
- Set default AI

### 3 Minutes: First Recording Test
- Test recording to verify features
- Check microphone settings

### 4 Minutes: Check Chart
- Review AI-generated chart
- Learn how to edit and save

### 5 Minutes: Start Using!
- Use from your next consultation
- Contact us anytime for help

### Tip
Start with simple consultations to get familiar with the system.
        `,
      },
    },
  ],
  'recording-charts': [
    {
      id: 'recording-tips',
      ko: {
        title: '녹음 품질 높이기',
        summary: '더 정확한 차트를 위한 녹음 팁',
        content: `
## 녹음 품질 향상 팁

더 정확한 차트 생성을 위한 녹음 팁입니다.

### 환경 설정
- 조용한 공간에서 녹음
- 에어컨, 선풍기 등 소음 최소화
- 문을 닫아 외부 소음 차단

### 마이크 위치
- 의사와 환자 사이에 기기 배치
- 마이크에서 30-50cm 거리 유지
- 옷에 스치는 소리 주의

### 대화 팁
- 명확하게 발음
- 환자와 번갈아 말하기 (동시 발화 피하기)
- 중요한 내용은 천천히 말하기

### 녹음 중 체크
- 녹음 표시가 활성화되어 있는지 확인
- 중간에 일시정지 활용
- 긴 진료는 나눠서 녹음 가능
        `,
      },
      en: {
        title: 'Improving Recording Quality',
        summary: 'Recording tips for more accurate charts',
        content: `
## Recording Quality Improvement Tips

Tips for more accurate chart generation.

### Environment Setup
- Record in a quiet space
- Minimize noise from AC, fans, etc.
- Close doors to block external noise

### Microphone Position
- Place device between doctor and patient
- Maintain 30-50cm distance from microphone
- Be careful of clothing rustling sounds

### Conversation Tips
- Speak clearly
- Take turns speaking (avoid simultaneous speech)
- Speak slowly for important content

### During Recording
- Confirm recording indicator is active
- Use pause function as needed
- Long consultations can be recorded in parts
        `,
      },
    },
    {
      id: 'chart-editing',
      ko: {
        title: '차트 수정하기',
        summary: 'AI가 생성한 차트를 수정하는 방법',
        content: `
## 차트 수정 방법

AI가 생성한 차트를 검토하고 수정하는 방법입니다.

### 차트 검토
1. 녹음 완료 후 차트 생성 대기 (보통 1-2분)
2. 생성된 차트 내용 확인
3. 하이라이트된 부분 주의 깊게 확인

### 수정 방법
- 텍스트 클릭하여 직접 편집
- 섹션별 수정 가능 (S, O, A, P)
- 드래그하여 내용 이동

### 자주 사용하는 수정
- 오타 수정
- 의학 용어 정정
- 추가 소견 입력
- 처방 내용 수정

### 저장 및 내보내기
- 자동 저장 활성화됨
- 수동 저장 버튼으로 즉시 저장
- EMR로 내보내기 또는 복사
        `,
      },
      en: {
        title: 'Editing Charts',
        summary: 'How to edit AI-generated charts',
        content: `
## How to Edit Charts

Here's how to review and edit AI-generated charts.

### Chart Review
1. Wait for chart generation after recording (usually 1-2 minutes)
2. Review generated chart content
3. Pay attention to highlighted sections

### Editing Methods
- Click text to edit directly
- Edit by section (S, O, A, P)
- Drag to move content

### Common Edits
- Fix typos
- Correct medical terminology
- Add additional findings
- Modify prescriptions

### Save and Export
- Auto-save is enabled
- Manual save button for immediate save
- Export to EMR or copy
        `,
      },
    },
    {
      id: 'soap-format',
      ko: {
        title: 'SOAP 노트 형식',
        summary: 'chartsok의 SOAP 차트 구조 이해하기',
        content: `
## SOAP 노트 형식

chartsok은 표준 SOAP 형식으로 차트를 생성합니다.

### S - Subjective (주관적 정보)
환자가 호소하는 증상, 주소, 병력
- 주호소 (Chief Complaint)
- 현병력 (History of Present Illness)
- 과거력 (Past Medical History)

### O - Objective (객관적 정보)
검사 결과, 신체 검진 소견
- 활력 징후 (Vital Signs)
- 신체 검진 (Physical Examination)
- 검사 결과 (Lab Results)

### A - Assessment (평가)
진단, 감별 진단, 의사 소견
- 주진단
- 감별 진단
- 임상적 판단

### P - Plan (계획)
치료 계획, 처방, 추적 관찰
- 처방 (Medications)
- 검사 지시 (Orders)
- 추적 관찰 계획 (Follow-up)
        `,
      },
      en: {
        title: 'SOAP Note Format',
        summary: 'Understanding chartsok SOAP chart structure',
        content: `
## SOAP Note Format

chartsok generates charts in standard SOAP format.

### S - Subjective
Symptoms, complaints, and history reported by patient
- Chief Complaint
- History of Present Illness
- Past Medical History

### O - Objective
Test results, physical examination findings
- Vital Signs
- Physical Examination
- Lab Results

### A - Assessment
Diagnosis, differential diagnosis, physician assessment
- Primary Diagnosis
- Differential Diagnosis
- Clinical Judgment

### P - Plan
Treatment plan, prescriptions, follow-up
- Medications
- Orders
- Follow-up Plan
        `,
      },
    },
    {
      id: 'speaker-identification',
      ko: {
        title: '화자 구분 기능',
        summary: 'AI 화자 구분 및 수동 수정 방법',
        content: `
## 화자 구분 기능

AI가 의사와 환자의 목소리를 자동으로 구분합니다.

### 자동 화자 구분
- AI가 음성 특성 분석
- 의사/환자 자동 라벨링
- 정확도 약 95% 이상

### 화자 구분 확인
1. 트랜스크립트 화면에서 확인
2. 각 발화 옆에 화자 표시
3. 색상으로 구분 (의사: 파란색, 환자: 초록색)

### 수동 수정
잘못 구분된 경우 수정 방법:
1. 해당 발화 클릭
2. 화자 변경 버튼 클릭
3. 올바른 화자 선택

### 팁
- 첫 녹음 시 "저는 OO 의사입니다" 등으로 시작하면 정확도 향상
- 동시에 말하지 않도록 주의
        `,
      },
      en: {
        title: 'Speaker Identification',
        summary: 'AI speaker identification and manual correction',
        content: `
## Speaker Identification

AI automatically distinguishes between doctor and patient voices.

### Automatic Speaker Identification
- AI analyzes voice characteristics
- Auto-labels doctor/patient
- Accuracy over 95%

### Checking Speaker Labels
1. View in transcript screen
2. Speaker shown next to each utterance
3. Color-coded (Doctor: blue, Patient: green)

### Manual Correction
How to correct misidentified speakers:
1. Click the utterance
2. Click change speaker button
3. Select correct speaker

### Tips
- Starting with "I am Dr. XX" improves accuracy
- Avoid speaking simultaneously
        `,
      },
    },
    {
      id: 'chart-templates',
      ko: {
        title: '차트 템플릿 사용',
        summary: '자주 사용하는 차트 형식 저장 및 사용',
        content: `
## 차트 템플릿

자주 사용하는 차트 형식을 템플릿으로 저장하고 재사용할 수 있습니다.

### 템플릿 만들기
1. 원하는 형식의 차트 작성
2. "템플릿으로 저장" 클릭
3. 템플릿 이름 지정

### 템플릿 사용
1. 새 차트 생성 시 템플릿 선택
2. AI가 템플릿 형식에 맞게 생성
3. 필요에 따라 수정

### 기본 제공 템플릿
- 초진 차트
- 재진 차트
- 건강검진
- 상담 기록

### 템플릿 관리
- 설정 > 템플릿에서 관리
- 수정, 삭제, 순서 변경 가능
- 템플릿 공유 기능 (팀 플랜)
        `,
      },
      en: {
        title: 'Using Chart Templates',
        summary: 'Save and use frequently used chart formats',
        content: `
## Chart Templates

Save frequently used chart formats as templates for reuse.

### Creating Templates
1. Create chart with desired format
2. Click "Save as Template"
3. Name the template

### Using Templates
1. Select template when creating new chart
2. AI generates following template format
3. Modify as needed

### Default Templates
- Initial Visit Chart
- Follow-up Chart
- Health Checkup
- Consultation Record

### Template Management
- Manage in Settings > Templates
- Edit, delete, reorder available
- Template sharing (Team plan)
        `,
      },
    },
    {
      id: 'batch-recording',
      ko: {
        title: '연속 녹음 기능',
        summary: '여러 환자를 연속으로 녹음하는 방법',
        content: `
## 연속 녹음 기능

바쁜 진료 시간에 여러 환자를 효율적으로 녹음합니다.

### 연속 녹음 모드
1. 설정에서 "연속 녹음 모드" 활성화
2. 녹음 완료 후 자동으로 다음 환자 대기
3. 환자 정보만 변경하고 바로 녹음 시작

### 사용 방법
1. 첫 환자 녹음 시작
2. 녹음 완료 버튼 클릭
3. 다음 환자 정보 입력 (또는 선택)
4. 바로 다음 녹음 시작

### 차트 생성
- 각 녹음별로 개별 차트 생성
- 백그라운드에서 순차 처리
- 대기열에서 진행 상황 확인 가능

### 팁
- 환자 대기 목록을 미리 등록해두면 더 빠름
- 각 녹음 시작/종료 시 환자 이름 말하면 구분 용이
        `,
      },
      en: {
        title: 'Continuous Recording',
        summary: 'How to record multiple patients continuously',
        content: `
## Continuous Recording

Efficiently record multiple patients during busy clinic hours.

### Continuous Recording Mode
1. Enable "Continuous Recording Mode" in settings
2. Automatically ready for next patient after recording
3. Just change patient info and start recording

### How to Use
1. Start first patient recording
2. Click stop recording button
3. Enter next patient info (or select)
4. Start next recording immediately

### Chart Generation
- Individual chart created for each recording
- Processed sequentially in background
- Check progress in queue

### Tips
- Pre-register patient waiting list for faster workflow
- Saying patient name at start/end helps distinguish recordings
        `,
      },
    },
    {
      id: 'audio-playback',
      ko: {
        title: '녹음 재생 기능',
        summary: '녹음 파일 재생 및 구간 확인',
        content: `
## 녹음 재생 기능

생성된 차트와 함께 원본 녹음을 확인할 수 있습니다.

### 재생 방법
1. 차트 상세 화면에서 재생 버튼 클릭
2. 전체 재생 또는 구간 재생 선택
3. 재생 속도 조절 가능 (0.5x ~ 2x)

### 텍스트-오디오 동기화
- 텍스트 클릭 시 해당 부분 재생
- 재생 중 해당 텍스트 하이라이트
- 특정 구간 반복 재생 가능

### 녹음 보관
- 기본 30일간 보관
- 설정에서 보관 기간 변경 가능
- 중요 녹음 영구 보관 설정

### 주의사항
- 녹음 파일은 암호화되어 저장
- 다운로드 시 보안 인증 필요
- 외부 공유 불가
        `,
      },
      en: {
        title: 'Audio Playback',
        summary: 'Play recordings and check specific sections',
        content: `
## Audio Playback

Review original recordings alongside generated charts.

### How to Play
1. Click play button on chart detail screen
2. Choose full or section playback
3. Adjust playback speed (0.5x ~ 2x)

### Text-Audio Sync
- Click text to play that section
- Text highlighted during playback
- Repeat specific sections

### Recording Storage
- Default 30-day retention
- Change retention period in settings
- Set permanent storage for important recordings

### Notes
- Recording files are encrypted
- Security verification required for download
- External sharing not allowed
        `,
      },
    },
    {
      id: 'chart-export',
      ko: {
        title: '차트 내보내기',
        summary: '생성된 차트를 다양한 형식으로 내보내기',
        content: `
## 차트 내보내기

생성된 차트를 다양한 방식으로 내보낼 수 있습니다.

### 내보내기 방식

#### 클립보드 복사
- 원클릭으로 전체 차트 복사
- EMR에 바로 붙여넣기 가능
- 형식 유지 옵션 선택 가능

#### EMR 직접 연동
- 연동된 EMR로 바로 전송
- 환자 차트에 자동 저장
- 전송 기록 확인 가능

#### 파일 다운로드
- PDF 형식 다운로드
- Word 문서 형식 지원
- 텍스트 파일 지원

### 형식 설정
- 내보내기 전 형식 미리보기
- 포함할 섹션 선택
- 기관 로고/헤더 추가 가능
        `,
      },
      en: {
        title: 'Exporting Charts',
        summary: 'Export generated charts in various formats',
        content: `
## Chart Export

Export generated charts in various ways.

### Export Methods

#### Clipboard Copy
- One-click full chart copy
- Paste directly into EMR
- Format preservation options

#### Direct EMR Integration
- Send directly to integrated EMR
- Auto-save to patient chart
- View transfer history

#### File Download
- PDF format download
- Word document format
- Text file support

### Format Settings
- Preview format before export
- Select sections to include
- Add institution logo/header
        `,
      },
    },
    {
      id: 'voice-commands',
      ko: {
        title: '음성 명령 사용',
        summary: '녹음 중 음성 명령으로 제어하기',
        content: `
## 음성 명령

녹음 중 음성으로 시스템을 제어할 수 있습니다.

### 지원 명령어
- "차트쏙 일시정지" - 녹음 일시정지
- "차트쏙 계속" - 녹음 재개
- "차트쏙 종료" - 녹음 종료
- "차트쏙 마크" - 중요 부분 표시

### 음성 명령 설정
1. 설정 > 음성 명령 활성화
2. 활성화 키워드 설정 (기본: "차트쏙")
3. 명령어 커스터마이징 가능

### 사용 팁
- 명확하게 발음
- 짧은 대기 후 명령 실행
- 환자 대화와 구분되게 말하기

### 주의사항
- 진료 내용과 혼동 방지를 위해 특정 키워드 사용
- 오인식 시 수동으로 제어 가능
        `,
      },
      en: {
        title: 'Using Voice Commands',
        summary: 'Control recording with voice commands',
        content: `
## Voice Commands

Control the system with voice during recording.

### Supported Commands
- "chartsok pause" - Pause recording
- "chartsok continue" - Resume recording
- "chartsok stop" - End recording
- "chartsok mark" - Mark important section

### Voice Command Settings
1. Settings > Enable Voice Commands
2. Set activation keyword (default: "chartsok")
3. Customize commands

### Usage Tips
- Speak clearly
- Short delay before command executes
- Speak differently from patient conversation

### Notes
- Use specific keywords to avoid confusion with consultation
- Manual control available if misrecognized
        `,
      },
    },
    {
      id: 'chart-history',
      ko: {
        title: '차트 이력 관리',
        summary: '과거 차트 버전 확인 및 복원',
        content: `
## 차트 이력 관리

차트 수정 이력을 확인하고 이전 버전을 복원할 수 있습니다.

### 이력 확인
1. 차트 상세 화면에서 "이력" 탭 클릭
2. 수정 일시와 변경 내용 확인
3. 버전 간 비교 가능

### 버전 복원
1. 원하는 버전 선택
2. "이 버전으로 복원" 클릭
3. 현재 버전은 자동 백업

### 이력 보관
- 모든 수정 이력 영구 보관
- 수정자 정보 기록 (팀 플랜)
- 시간대별 변경 사항 추적

### 감사 로그
- 누가 언제 수정했는지 기록
- 규정 준수를 위한 감사 추적
- 내보내기 가능
        `,
      },
      en: {
        title: 'Chart History Management',
        summary: 'View past chart versions and restore',
        content: `
## Chart History Management

View chart edit history and restore previous versions.

### Viewing History
1. Click "History" tab on chart detail screen
2. View edit timestamps and changes
3. Compare between versions

### Version Restore
1. Select desired version
2. Click "Restore this version"
3. Current version auto-backed up

### History Retention
- All edit history permanently retained
- Editor info recorded (Team plan)
- Track changes by timestamp

### Audit Log
- Records who edited when
- Audit trail for compliance
- Exportable
        `,
      },
    },
    {
      id: 'medical-terminology',
      ko: {
        title: '의학 용어 사전',
        summary: 'AI 의학 용어 인식 및 사전 기능',
        content: `
## 의학 용어 사전

chartsok AI는 의학 용어를 정확하게 인식합니다.

### 자동 용어 인식
- 표준 의학 용어 자동 변환
- 약어 전체 표기 지원
- ICD 코드 매칭

### 사용자 정의 용어
1. 설정 > 용어 사전
2. "용어 추가" 클릭
3. 음성 형태와 텍스트 형태 입력

### 자주 사용하는 기능
- "타이레놀" → "Acetaminophen (Tylenol)"
- "비피" → "혈압 (Blood Pressure)"
- 기관별 약어 설정 가능

### 용어 교정
- AI 제안 용어 확인
- 원클릭 수정
- 학습을 통한 정확도 향상
        `,
      },
      en: {
        title: 'Medical Terminology Dictionary',
        summary: 'AI medical terminology recognition and dictionary',
        content: `
## Medical Terminology Dictionary

chartsok AI accurately recognizes medical terminology.

### Automatic Term Recognition
- Auto-convert standard medical terms
- Support abbreviation expansion
- ICD code matching

### Custom Terminology
1. Settings > Terminology Dictionary
2. Click "Add Term"
3. Enter spoken form and text form

### Common Features
- Convert spoken terms to proper format
- Abbreviation handling
- Institution-specific abbreviations

### Term Correction
- Review AI suggested terms
- One-click correction
- Improve accuracy through learning
        `,
      },
    },
    {
      id: 'real-time-transcription',
      ko: {
        title: '실시간 텍스트 변환',
        summary: '녹음 중 실시간으로 텍스트 확인',
        content: `
## 실시간 텍스트 변환

녹음과 동시에 텍스트 변환 결과를 확인할 수 있습니다.

### 기능 활성화
1. 설정 > 녹음 > 실시간 변환 활성화
2. 녹음 화면에서 텍스트 패널 표시

### 사용 방법
- 녹음 시작과 동시에 텍스트 표시
- 약간의 지연 (2-3초) 있음
- 화자 구분 표시

### 장점
- 인식 오류 즉시 확인
- 중요 내용 놓치지 않음
- 필요시 추가 질문 가능

### 설정 옵션
- 텍스트 크기 조절
- 자동 스크롤 on/off
- 표시 위치 변경
        `,
      },
      en: {
        title: 'Real-time Transcription',
        summary: 'View text in real-time during recording',
        content: `
## Real-time Transcription

View transcription results simultaneously with recording.

### Enable Feature
1. Settings > Recording > Enable Real-time Transcription
2. Display text panel on recording screen

### How to Use
- Text appears as recording starts
- Slight delay (2-3 seconds)
- Speaker identification shown

### Benefits
- Immediately spot recognition errors
- Don't miss important content
- Ask follow-up questions as needed

### Settings Options
- Adjust text size
- Auto-scroll on/off
- Change display position
        `,
      },
    },
  ],
  'emr-integration': [
    {
      id: 'supported-emr',
      ko: {
        title: 'EMR 연동 로드맵',
        summary: 'EMR 연동 개발 현황 및 계획',
        content: `
## EMR 연동 로드맵

chartsok의 EMR 연동 기능은 현재 개발 중입니다.

### 개발 현황

🚧 **현재 상태**: 개발 진행 중

저희는 국내 주요 EMR 시스템과의 원활한 연동을 위해 열심히 개발하고 있습니다.

### 현재 사용 가능한 방식

#### 클립보드 복사
현재는 생성된 차트를 클립보드에 복사하여 EMR에 붙여넣기 하는 방식을 지원합니다.
- 원클릭 복사 기능
- 모든 EMR과 호환
- 추가 설정 불필요

### 계획 중인 연동
- 국내 주요 EMR 시스템 API 연동
- 자동 환자 정보 동기화
- 차트 직접 전송

### 연동 요청
사용하시는 EMR과의 연동을 원하시면 문의해주세요. 우선순위에 반영하여 개발을 진행합니다.
        `,
      },
      en: {
        title: 'EMR Integration Roadmap',
        summary: 'EMR integration development status and plans',
        content: `
## EMR Integration Roadmap

EMR integration features are currently under development.

### Development Status

🚧 **Current Status**: In Development

We are actively working on seamless integration with major Korean EMR systems.

### Currently Available

#### Clipboard Copy
Currently, you can copy generated charts to clipboard and paste into your EMR.
- One-click copy feature
- Compatible with all EMRs
- No additional setup required

### Planned Integrations
- API integration with major Korean EMR systems
- Automatic patient information sync
- Direct chart transfer

### Request Integration
If you'd like integration with your EMR, please contact us. We prioritize development based on user requests.
        `,
      },
    },
    {
      id: 'emr-setup',
      ko: {
        title: 'EMR 연동 준비하기',
        summary: 'EMR 연동 출시 시 알림 받기',
        content: `
## EMR 연동 준비하기

EMR 직접 연동 기능은 현재 개발 중입니다.

### 🚧 개발 중

API 기반 EMR 직접 연동 기능은 아직 준비 중입니다.

### 현재 사용 가능한 방식

지금은 **클립보드 복사** 방식으로 모든 EMR과 함께 사용할 수 있습니다:
1. 차트 생성 완료 후 "복사" 버튼 클릭
2. EMR에서 환자 차트 열기
3. 붙여넣기 (Ctrl+V)

### 출시 알림 받기

EMR 직접 연동 기능이 출시되면 알림을 받으시려면:
- 계정 설정에서 이메일 알림을 활성화해주세요
- 또는 문의하기를 통해 관심 EMR을 알려주세요

### 문의하기
사용하시는 EMR에 대한 연동 요청은 언제든 환영합니다.
        `,
      },
      en: {
        title: 'Preparing for EMR Integration',
        summary: 'Get notified when EMR integration launches',
        content: `
## Preparing for EMR Integration

Direct EMR integration is currently under development.

### 🚧 In Development

API-based direct EMR integration is not yet available.

### Currently Available

For now, you can use **clipboard copy** method with any EMR:
1. Click "Copy" button after chart generation
2. Open patient chart in your EMR
3. Paste (Ctrl+V)

### Get Notified

To be notified when direct EMR integration launches:
- Enable email notifications in account settings
- Or let us know your EMR through contact form

### Contact Us
Integration requests for your EMR are always welcome.
        `,
      },
    },
    {
      id: 'clipboard-integration',
      ko: {
        title: '클립보드 연동 사용',
        summary: 'EMR과 클립보드로 연동하는 방법',
        content: `
## 클립보드 연동

API 연동 없이 클립보드로 차트를 EMR에 복사하는 방법입니다.

### 장점
- 모든 EMR과 호환
- 추가 설정 불필요
- 즉시 사용 가능

### 사용 방법

#### 차트 복사
1. 완성된 차트에서 "복사" 버튼 클릭
2. 형식 선택 (일반 텍스트 / 서식 유지)
3. 클립보드에 복사됨

#### EMR에 붙여넣기
1. EMR에서 환자 차트 열기
2. 해당 위치에 붙여넣기 (Ctrl+V)
3. 필요시 형식 조정

### 형식 옵션
- **일반 텍스트**: 모든 EMR 호환
- **서식 유지**: 줄바꿈, 들여쓰기 유지
- **HTML**: 서식 지원 EMR용

### 단축키
Ctrl+Shift+C: 빠른 복사
        `,
      },
      en: {
        title: 'Using Clipboard Integration',
        summary: 'How to integrate with EMR via clipboard',
        content: `
## Clipboard Integration

How to copy charts to EMR via clipboard without API integration.

### Benefits
- Compatible with all EMRs
- No additional setup needed
- Ready to use immediately

### How to Use

#### Copy Chart
1. Click "Copy" button on completed chart
2. Select format (plain text / formatted)
3. Copied to clipboard

#### Paste to EMR
1. Open patient chart in EMR
2. Paste at desired location (Ctrl+V)
3. Adjust format if needed

### Format Options
- **Plain Text**: Compatible with all EMRs
- **Formatted**: Preserves line breaks, indentation
- **HTML**: For EMRs supporting formatting

### Shortcut
Ctrl+Shift+C: Quick copy
        `,
      },
    },
    {
      id: 'patient-sync',
      ko: {
        title: '환자 정보 동기화 (예정)',
        summary: 'EMR 환자 목록 동기화 기능 안내',
        content: `
## 환자 정보 동기화

🚧 **개발 예정 기능**

EMR과 환자 정보를 자동으로 동기화하는 기능을 준비하고 있습니다.

### 계획 중인 기능

#### 동기화 데이터
- 환자 기본 정보 (이름, 생년월일, 성별)
- 연락처 정보
- 과거 진료 기록 (선택)

#### 동기화 방식
- 자동 동기화
- 수동 동기화
- 충돌 처리

### 현재 사용 방법

지금은 환자 정보를 직접 입력하거나, 녹음 시 환자 정보를 새로 등록할 수 있습니다.

### 알림 받기
해당 기능이 출시되면 이메일로 알려드립니다.
        `,
      },
      en: {
        title: 'Patient Information Sync (Planned)',
        summary: 'Patient list sync feature information',
        content: `
## Patient Information Sync

🚧 **Planned Feature**

We are preparing automatic patient information synchronization with EMR.

### Planned Features

#### Sync Data
- Basic patient info (name, DOB, gender)
- Contact information
- Past medical records (optional)

#### Sync Methods
- Automatic sync
- Manual sync
- Conflict handling

### Current Method

For now, you can manually enter patient information or register new patients during recording.

### Get Notified
We'll notify you via email when this feature launches.
        `,
      },
    },
    {
      id: 'chart-transfer',
      ko: {
        title: '차트 자동 전송 (예정)',
        summary: 'EMR로 차트 자동 전송 기능 안내',
        content: `
## 차트 자동 전송

🚧 **개발 예정 기능**

생성된 차트를 EMR로 자동 전송하는 기능을 준비하고 있습니다.

### 계획 중인 기능

- 차트 완료 시 자동 전송
- 검토 후 전송 옵션
- 전송 기록 관리

### 현재 사용 방법

지금은 **클립보드 복사** 기능을 이용해주세요:
1. 차트 생성 완료 후 "복사" 버튼 클릭
2. EMR에서 해당 환자 차트 열기
3. 붙여넣기 (Ctrl+V)

모든 EMR과 호환되며, 추가 설정 없이 바로 사용할 수 있습니다.

### 출시 알림
해당 기능 출시 시 이메일로 알려드립니다.
        `,
      },
      en: {
        title: 'Automatic Chart Transfer (Planned)',
        summary: 'Auto chart transfer to EMR feature info',
        content: `
## Automatic Chart Transfer

🚧 **Planned Feature**

We are preparing automatic chart transfer to EMR functionality.

### Planned Features

- Auto-transfer when chart complete
- Review before transfer option
- Transfer history management

### Current Method

Please use **clipboard copy** for now:
1. Click "Copy" button after chart generation
2. Open patient chart in your EMR
3. Paste (Ctrl+V)

Works with all EMRs and requires no additional setup.

### Get Notified
We'll notify you via email when this feature launches.
        `,
      },
    },
    {
      id: 'api-documentation',
      ko: {
        title: 'API 연동 가이드 (예정)',
        summary: '개발자를 위한 API 문서 (준비 중)',
        content: `
## API 연동 가이드

🚧 **개발 예정**

chartsok API는 현재 개발 중입니다.

### 계획 중인 기능

- RESTful API 제공
- 환자 정보 조회/등록
- 차트 조회/생성
- OAuth 2.0 인증

### API 베타 테스트 참여

API 베타 테스트에 참여하고 싶으시다면 문의해주세요.
의료기관이나 EMR 개발사의 연동 요청을 우선적으로 검토합니다.

### 문의하기
API 연동에 관심이 있으시면 언제든 연락주세요.
        `,
      },
      en: {
        title: 'API Integration Guide (Planned)',
        summary: 'API documentation for developers (Coming Soon)',
        content: `
## API Integration Guide

🚧 **In Development**

chartsok API is currently under development.

### Planned Features

- RESTful API
- Patient info query/registration
- Chart query/creation
- OAuth 2.0 authentication

### API Beta Testing

If you'd like to participate in API beta testing, please contact us.
We prioritize requests from medical institutions and EMR developers.

### Contact Us
Feel free to reach out if you're interested in API integration.
        `,
      },
    },
  ],
  settings: [
    {
      id: 'account-settings',
      ko: {
        title: '계정 설정',
        summary: '프로필 및 계정 정보 관리',
        content: `
## 계정 설정

계정 정보와 프로필을 관리합니다.

### 프로필 수정
1. 설정 > 계정 > 프로필
2. 수정할 정보 변경
3. 저장 버튼 클릭

### 변경 가능 정보
- 이름
- 프로필 사진
- 소속 기관
- 전문 분야
- 연락처

### 비밀번호 변경
1. 설정 > 계정 > 보안
2. 현재 비밀번호 입력
3. 새 비밀번호 설정

### 계정 삭제
1. 설정 > 계정 > 계정 삭제
2. 비밀번호 확인
3. 삭제 사유 입력 (선택)
4. 확인 후 삭제

⚠️ 계정 삭제 시 모든 데이터가 삭제됩니다.
        `,
      },
      en: {
        title: 'Account Settings',
        summary: 'Manage profile and account information',
        content: `
## Account Settings

Manage your account information and profile.

### Edit Profile
1. Settings > Account > Profile
2. Change information to edit
3. Click save button

### Editable Information
- Name
- Profile photo
- Institution
- Specialty
- Contact

### Change Password
1. Settings > Account > Security
2. Enter current password
3. Set new password

### Delete Account
1. Settings > Account > Delete Account
2. Verify password
3. Enter reason (optional)
4. Confirm deletion

⚠️ All data is deleted when account is deleted.
        `,
      },
    },
    {
      id: 'notification-settings',
      ko: {
        title: '알림 설정',
        summary: '이메일, 푸시 알림 설정',
        content: `
## 알림 설정

알림 수신 방법과 종류를 설정합니다.

### 알림 채널
- **이메일**: 중요 알림 이메일 수신
- **푸시**: 모바일/데스크톱 푸시 알림
- **앱 내**: 앱 내 알림 센터

### 알림 종류

#### 차트 관련
- 차트 생성 완료
- 차트 수정 필요
- EMR 전송 완료

#### 시스템 관련
- 업데이트 안내
- 유지보수 공지
- 보안 알림

#### 계정 관련
- 로그인 알림
- 결제 알림
- 플랜 만료 알림

### 방해 금지 모드
특정 시간대 알림 차단 설정 가능
        `,
      },
      en: {
        title: 'Notification Settings',
        summary: 'Email and push notification settings',
        content: `
## Notification Settings

Configure notification methods and types.

### Notification Channels
- **Email**: Receive important notifications via email
- **Push**: Mobile/desktop push notifications
- **In-app**: App notification center

### Notification Types

#### Chart Related
- Chart generation complete
- Chart needs review
- EMR transfer complete

#### System Related
- Update announcements
- Maintenance notices
- Security alerts

#### Account Related
- Login notifications
- Payment notifications
- Plan expiry notifications

### Do Not Disturb
Block notifications during specific hours
        `,
      },
    },
    {
      id: 'language-settings',
      ko: {
        title: '언어 설정',
        summary: '앱 언어 및 차트 언어 설정',
        content: `
## 언어 설정

앱 인터페이스와 차트 생성 언어를 설정합니다.

### 인터페이스 언어
1. 설정 > 일반 > 언어
2. 원하는 언어 선택
3. 앱 재시작 (자동)

### 지원 언어
- 한국어
- English

### 차트 언어
차트 생성 시 사용되는 언어:
- 한국어 (기본)
- 영어
- 혼합 (한국어 + 영어 의학 용어)

### 의학 용어 설정
- 한국어 용어 사용
- 영어 용어 사용
- 병기 (한국어 + 영어)
        `,
      },
      en: {
        title: 'Language Settings',
        summary: 'App and chart language settings',
        content: `
## Language Settings

Configure app interface and chart generation language.

### Interface Language
1. Settings > General > Language
2. Select desired language
3. App restarts (automatic)

### Supported Languages
- 한국어
- English

### Chart Language
Language used for chart generation:
- Korean (default)
- English
- Mixed (Korean + English medical terms)

### Medical Terminology Settings
- Use Korean terms
- Use English terms
- Both (Korean + English)
        `,
      },
    },
    {
      id: 'default-ai-settings',
      ko: {
        title: '기본 AI 설정',
        summary: '기본 전문과 AI 및 차트 형식 설정',
        content: `
## 기본 AI 설정

자주 사용하는 AI 설정을 기본값으로 저장합니다.

### 기본 전문과 설정
1. 설정 > AI > 기본 전문과
2. 주로 사용하는 전문과 선택
3. 녹음 시작 시 자동 선택됨

### 차트 형식 설정
- SOAP 형식 (기본)
- 자유 형식
- 커스텀 템플릿

### AI 상세 설정
- 상세도 (간략 / 표준 / 상세)
- 의학 용어 수준
- 약어 사용 여부

### AI 학습 설정
- 수정 내용 학습 허용
- 개인화 추천 활성화
- 학습 데이터 관리
        `,
      },
      en: {
        title: 'Default AI Settings',
        summary: 'Default specialty AI and chart format settings',
        content: `
## Default AI Settings

Save frequently used AI settings as defaults.

### Default Specialty Setting
1. Settings > AI > Default Specialty
2. Select commonly used specialty
3. Auto-selected when starting recording

### Chart Format Settings
- SOAP format (default)
- Free format
- Custom template

### AI Detail Settings
- Detail level (Brief / Standard / Detailed)
- Medical terminology level
- Abbreviation usage

### AI Learning Settings
- Allow learning from corrections
- Enable personalized recommendations
- Manage learning data
        `,
      },
    },
    {
      id: 'team-management',
      ko: {
        title: '팀 관리',
        summary: '팀원 초대 및 권한 관리',
        content: `
## 팀 관리

팀 플랜에서 팀원을 관리합니다.

### 팀원 초대
1. 설정 > 팀 > 팀원 초대
2. 이메일 주소 입력
3. 권한 설정
4. 초대 발송

### 권한 종류
- **관리자**: 모든 설정 변경 가능
- **의사**: 녹음 및 차트 생성
- **보조**: 차트 조회 및 편집만
- **뷰어**: 조회만 가능

### 팀원 관리
- 권한 변경
- 팀원 제거
- 활동 로그 확인

### 부서 설정
- 부서별 팀원 그룹화
- 부서별 설정 적용
- 부서 간 데이터 공유 설정
        `,
      },
      en: {
        title: 'Team Management',
        summary: 'Invite team members and manage permissions',
        content: `
## Team Management

Manage team members in Team plan.

### Invite Team Members
1. Settings > Team > Invite Members
2. Enter email address
3. Set permissions
4. Send invitation

### Permission Types
- **Admin**: Can change all settings
- **Doctor**: Recording and chart generation
- **Assistant**: Chart view and edit only
- **Viewer**: View only

### Manage Members
- Change permissions
- Remove members
- View activity logs

### Department Setup
- Group members by department
- Apply department settings
- Configure data sharing between departments
        `,
      },
    },
    {
      id: 'billing-settings',
      ko: {
        title: '결제 관리',
        summary: '플랜 및 결제 정보 관리',
        content: `
## 결제 관리

구독 플랜과 결제 정보를 관리합니다.

### 현재 플랜 확인
- 설정 > 결제 > 현재 플랜
- 사용량 확인
- 갱신일 확인

### 플랜 변경
1. 설정 > 결제 > 플랜 변경
2. 원하는 플랜 선택
3. 결제 정보 확인
4. 변경 확정

### 결제 수단 관리
- 신용카드 등록/변경
- 자동 결제 설정
- 결제 기록 확인

### 청구서
- 월별 청구서 확인
- PDF 다운로드
- 세금계산서 발행 요청
        `,
      },
      en: {
        title: 'Billing Management',
        summary: 'Manage plans and payment information',
        content: `
## Billing Management

Manage subscription plans and payment info.

### Check Current Plan
- Settings > Billing > Current Plan
- Check usage
- Check renewal date

### Change Plan
1. Settings > Billing > Change Plan
2. Select desired plan
3. Confirm payment info
4. Confirm change

### Payment Method Management
- Add/change credit card
- Set up auto-payment
- View payment history

### Invoices
- View monthly invoices
- Download PDF
- Request tax invoice
        `,
      },
    },
    {
      id: 'data-export',
      ko: {
        title: '데이터 내보내기',
        summary: '내 데이터 전체 내보내기',
        content: `
## 데이터 내보내기

chartsok에 저장된 모든 데이터를 내보낼 수 있습니다.

### 내보내기 가능 데이터
- 환자 정보
- 차트 기록
- 녹음 파일 (옵션)
- 설정 정보

### 내보내기 방법
1. 설정 > 데이터 > 데이터 내보내기
2. 내보낼 데이터 선택
3. 형식 선택 (JSON / CSV)
4. 내보내기 시작

### 파일 수령
- 이메일로 다운로드 링크 발송
- 대용량 파일은 분할 압축
- 링크 유효 기간: 7일

### 보안
- 내보내기 시 비밀번호 확인
- 암호화된 파일 제공
- 접근 로그 기록
        `,
      },
      en: {
        title: 'Data Export',
        summary: 'Export all your data',
        content: `
## Data Export

Export all data stored in chartsok.

### Exportable Data
- Patient information
- Chart records
- Recording files (optional)
- Settings

### How to Export
1. Settings > Data > Export Data
2. Select data to export
3. Select format (JSON / CSV)
4. Start export

### File Delivery
- Download link sent via email
- Large files split and compressed
- Link valid for 7 days

### Security
- Password verification on export
- Encrypted files provided
- Access logged
        `,
      },
    },
    {
      id: 'keyboard-shortcuts',
      ko: {
        title: '키보드 단축키',
        summary: '생산성 향상을 위한 단축키 설정',
        content: `
## 키보드 단축키

자주 사용하는 기능의 단축키입니다.

### 녹음 관련
- **Ctrl + R**: 새 녹음 시작
- **Space**: 일시정지/재개
- **Ctrl + S**: 녹음 종료

### 차트 관련
- **Ctrl + E**: 편집 모드
- **Ctrl + Enter**: 저장
- **Ctrl + Shift + C**: 클립보드 복사

### 네비게이션
- **Ctrl + 1**: 대시보드
- **Ctrl + 2**: 환자 목록
- **Ctrl + 3**: 차트 기록

### 커스텀 단축키
설정 > 단축키에서 변경 가능

### 단축키 안내
앱 내에서 **?** 키로 단축키 목록 확인
        `,
      },
      en: {
        title: 'Keyboard Shortcuts',
        summary: 'Shortcuts for improved productivity',
        content: `
## Keyboard Shortcuts

Shortcuts for frequently used functions.

### Recording
- **Ctrl + R**: Start new recording
- **Space**: Pause/resume
- **Ctrl + S**: End recording

### Charts
- **Ctrl + E**: Edit mode
- **Ctrl + Enter**: Save
- **Ctrl + Shift + C**: Copy to clipboard

### Navigation
- **Ctrl + 1**: Dashboard
- **Ctrl + 2**: Patient list
- **Ctrl + 3**: Chart records

### Custom Shortcuts
Customizable in Settings > Shortcuts

### Shortcut Help
Press **?** in app to view shortcut list
        `,
      },
    },
    {
      id: 'microphone-settings',
      ko: {
        title: '마이크 설정',
        summary: '녹음 마이크 및 오디오 설정',
        content: `
## 마이크 설정

녹음 품질을 위한 마이크 설정입니다.

### 마이크 선택
1. 설정 > 오디오 > 마이크
2. 사용 가능한 마이크 목록
3. 원하는 마이크 선택

### 마이크 테스트
- 테스트 녹음 기능
- 볼륨 레벨 확인
- 노이즈 확인

### 오디오 설정
- 볼륨 자동 조절
- 노이즈 제거 활성화
- 에코 제거 활성화

### 고급 설정
- 샘플링 레이트
- 비트 깊이
- 채널 (모노/스테레오)

### 문제 해결
마이크가 인식되지 않으면:
1. 브라우저 권한 확인
2. 시스템 설정 확인
3. 마이크 연결 상태 확인
        `,
      },
      en: {
        title: 'Microphone Settings',
        summary: 'Recording microphone and audio settings',
        content: `
## Microphone Settings

Microphone settings for recording quality.

### Select Microphone
1. Settings > Audio > Microphone
2. List of available microphones
3. Select desired microphone

### Microphone Test
- Test recording feature
- Check volume level
- Check for noise

### Audio Settings
- Auto volume adjustment
- Noise cancellation
- Echo cancellation

### Advanced Settings
- Sampling rate
- Bit depth
- Channel (mono/stereo)

### Troubleshooting
If microphone not detected:
1. Check browser permissions
2. Check system settings
3. Check microphone connection
        `,
      },
    },
    {
      id: 'accessibility-settings',
      ko: {
        title: '접근성 설정',
        summary: '접근성 향상을 위한 설정',
        content: `
## 접근성 설정

모든 사용자를 위한 접근성 옵션입니다.

### 시각 접근성
- 고대비 모드
- 글꼴 크기 조절
- 색상 테마 변경
- 애니메이션 감소

### 청각 접근성
- 자막 표시
- 시각적 알림
- 진동 알림

### 키보드 접근성
- 키보드만으로 조작
- 탭 순서 최적화
- 포커스 표시 강화

### 스크린 리더 지원
- ARIA 레이블 지원
- 음성 안내
- 대체 텍스트

### 설정 방법
설정 > 접근성에서 원하는 옵션 활성화
        `,
      },
      en: {
        title: 'Accessibility Settings',
        summary: 'Settings for improved accessibility',
        content: `
## Accessibility Settings

Accessibility options for all users.

### Visual Accessibility
- High contrast mode
- Font size adjustment
- Color theme change
- Reduce animations

### Hearing Accessibility
- Captions display
- Visual notifications
- Vibration alerts

### Keyboard Accessibility
- Keyboard-only navigation
- Optimized tab order
- Enhanced focus indicators

### Screen Reader Support
- ARIA labels supported
- Voice guidance
- Alt text

### How to Configure
Enable desired options in Settings > Accessibility
        `,
      },
    },
  ],
  'security-privacy': [
    {
      id: 'data-encryption',
      ko: {
        title: '데이터 암호화',
        summary: '데이터 보호를 위한 암호화 방식',
        content: `
## 데이터 암호화

chartsok의 데이터 암호화 방식을 설명합니다.

### 전송 중 암호화
- TLS 1.3 프로토콜 사용
- 모든 통신 암호화
- 인증서 기반 보안

### 저장 시 암호화
- AES-256 암호화
- 키 관리 시스템
- 정기적 키 갱신

### 녹음 파일 보호
- 개별 파일 암호화
- 접근 권한 관리
- 처리 후 자동 삭제

### 환자 정보 보호
- 데이터 익명화 옵션
- 접근 로그 기록
- 감사 추적

### 인증서 및 규정 준수
- ISO 27001
- 개인정보보호법 준수
- 의료법 준수
        `,
      },
      en: {
        title: 'Data Encryption',
        summary: 'Encryption methods for data protection',
        content: `
## Data Encryption

Explaining chartsok's data encryption methods.

### In-Transit Encryption
- TLS 1.3 protocol
- All communications encrypted
- Certificate-based security

### At-Rest Encryption
- AES-256 encryption
- Key management system
- Regular key rotation

### Recording File Protection
- Individual file encryption
- Access permission management
- Auto-delete after processing

### Patient Data Protection
- Data anonymization option
- Access logging
- Audit trail

### Certifications & Compliance
- ISO 27001
- PIPA compliance
- Medical law compliance
        `,
      },
    },
    {
      id: 'access-control',
      ko: {
        title: '접근 제어',
        summary: '데이터 접근 권한 관리',
        content: `
## 접근 제어

데이터에 대한 접근을 관리합니다.

### 역할 기반 접근 제어
- 관리자 권한
- 의사 권한
- 보조 인력 권한
- 뷰어 권한

### 2단계 인증 (2FA)
1. 설정 > 보안 > 2FA 활성화
2. 인증 앱 연결
3. 로그인 시 코드 입력

### 세션 관리
- 자동 로그아웃 설정
- 동시 세션 제한
- 세션 기록 확인

### 기기 관리
- 등록된 기기 확인
- 신뢰할 수 있는 기기 설정
- 기기 원격 로그아웃

### IP 제한
- 허용 IP 설정
- 의심스러운 접근 차단
- 접근 시도 알림
        `,
      },
      en: {
        title: 'Access Control',
        summary: 'Managing data access permissions',
        content: `
## Access Control

Manage access to data.

### Role-Based Access Control
- Admin privileges
- Doctor privileges
- Assistant privileges
- Viewer privileges

### Two-Factor Authentication (2FA)
1. Settings > Security > Enable 2FA
2. Connect authenticator app
3. Enter code on login

### Session Management
- Auto-logout settings
- Concurrent session limits
- View session history

### Device Management
- View registered devices
- Set trusted devices
- Remote device logout

### IP Restrictions
- Set allowed IPs
- Block suspicious access
- Access attempt notifications
        `,
      },
    },
    {
      id: 'privacy-policy',
      ko: {
        title: '개인정보 처리방침',
        summary: '개인정보 수집 및 처리 안내',
        content: `
## 개인정보 처리방침

chartsok의 개인정보 처리 방침입니다.

### 수집 정보
- 계정 정보 (이름, 이메일, 연락처)
- 의료기관 정보
- 사용 기록
- 환자 진료 정보

### 수집 목적
- 서비스 제공
- 품질 개선
- 고객 지원
- 법적 의무 이행

### 보관 기간
- 계정 정보: 회원 탈퇴 후 30일
- 진료 기록: 법적 요구 기간
- 녹음 파일: 처리 후 즉시 삭제

### 제3자 제공
- 동의 없이 제공하지 않음
- 법적 요구 시 예외

### 권리 행사
- 열람권, 정정권, 삭제권
- 설정 > 개인정보에서 요청
        `,
      },
      en: {
        title: 'Privacy Policy',
        summary: 'Personal data collection and processing',
        content: `
## Privacy Policy

chartsok's privacy policy.

### Information Collected
- Account info (name, email, contact)
- Medical institution info
- Usage records
- Patient consultation info

### Collection Purpose
- Service provision
- Quality improvement
- Customer support
- Legal compliance

### Retention Period
- Account info: 30 days after withdrawal
- Medical records: Legal requirement period
- Recording files: Deleted immediately after processing

### Third-Party Disclosure
- Not provided without consent
- Exceptions for legal requirements

### Rights Exercise
- Right to access, correct, delete
- Request in Settings > Privacy
        `,
      },
    },
    {
      id: 'hipaa-compliance',
      ko: {
        title: '의료 정보 보호',
        summary: '의료법 및 개인정보보호법 준수',
        content: `
## 의료 정보 보호

chartsok의 의료 정보 보호 정책입니다.

### 법적 준수
- 개인정보보호법
- 의료법
- 전자서명법

### 기술적 보호 조치
- 암호화
- 접근 제어
- 감사 로그
- 백업 시스템

### 관리적 보호 조치
- 정보보호 정책
- 직원 교육
- 정기 감사
- 사고 대응 계획

### 물리적 보호 조치
- 데이터센터 보안
- 접근 통제
- 환경 통제

### 인증
- ISMS-P 인증 준비 중
- 정기 보안 감사
        `,
      },
      en: {
        title: 'Medical Data Protection',
        summary: 'Medical law and privacy law compliance',
        content: `
## Medical Data Protection

chartsok's medical data protection policy.

### Legal Compliance
- Personal Information Protection Act
- Medical Service Act
- Electronic Signature Act

### Technical Safeguards
- Encryption
- Access control
- Audit logs
- Backup systems

### Administrative Safeguards
- Information security policy
- Employee training
- Regular audits
- Incident response plan

### Physical Safeguards
- Data center security
- Access control
- Environmental control

### Certifications
- ISMS-P certification in progress
- Regular security audits
        `,
      },
    },
    {
      id: 'data-deletion',
      ko: {
        title: '데이터 삭제',
        summary: '데이터 삭제 요청 및 절차',
        content: `
## 데이터 삭제

데이터 삭제 요청 방법입니다.

### 녹음 파일 삭제
- 자동 삭제: 처리 완료 후 즉시
- 수동 삭제: 차트 상세 > 녹음 삭제

### 차트 삭제
1. 차트 기록에서 삭제할 차트 선택
2. 삭제 버튼 클릭
3. 확인 후 삭제 (복구 불가)

### 환자 정보 삭제
- 개별 환자 삭제
- 연관된 차트도 함께 삭제
- 30일 복구 기간

### 계정 삭제
1. 설정 > 계정 > 계정 삭제
2. 모든 데이터 영구 삭제
3. 30일 후 복구 불가

### 삭제 증명
삭제 완료 후 확인서 발급 가능
        `,
      },
      en: {
        title: 'Data Deletion',
        summary: 'Data deletion request and procedure',
        content: `
## Data Deletion

How to request data deletion.

### Recording File Deletion
- Auto-delete: Immediately after processing
- Manual delete: Chart detail > Delete recording

### Chart Deletion
1. Select chart to delete in records
2. Click delete button
3. Confirm deletion (cannot be recovered)

### Patient Data Deletion
- Delete individual patient
- Related charts also deleted
- 30-day recovery period

### Account Deletion
1. Settings > Account > Delete Account
2. All data permanently deleted
3. Cannot recover after 30 days

### Deletion Confirmation
Certificate issued after deletion complete
        `,
      },
    },
  ],
  troubleshooting: [
    {
      id: 'recording-issues',
      ko: {
        title: '녹음 문제 해결',
        summary: '녹음이 되지 않을 때 해결 방법',
        content: `
## 녹음 문제 해결

녹음이 정상적으로 되지 않을 때의 해결 방법입니다.

### 마이크가 인식되지 않을 때
1. 브라우저 마이크 권한 확인
2. 시스템 마이크 설정 확인
3. 마이크 물리적 연결 확인
4. 다른 앱에서 마이크 사용 중인지 확인

### 녹음 품질이 나쁠 때
- 조용한 환경에서 녹음
- 마이크와 적절한 거리 유지
- 외부 마이크 사용 고려

### 녹음이 중간에 끊길 때
- 인터넷 연결 확인
- 브라우저 업데이트
- 다른 브라우저 시도

### 저장이 안 될 때
- 저장 공간 확인
- 브라우저 캐시 정리
- 다시 시도

### 지속적인 문제
기술 지원팀에 문의하세요.
        `,
      },
      en: {
        title: 'Recording Issues',
        summary: 'Solutions when recording doesn\'t work',
        content: `
## Recording Issue Solutions

Solutions when recording doesn't work properly.

### Microphone Not Detected
1. Check browser microphone permission
2. Check system microphone settings
3. Check physical microphone connection
4. Check if another app is using microphone

### Poor Recording Quality
- Record in quiet environment
- Keep appropriate distance from microphone
- Consider external microphone

### Recording Cuts Off
- Check internet connection
- Update browser
- Try different browser

### Won't Save
- Check storage space
- Clear browser cache
- Try again

### Persistent Issues
Contact technical support.
        `,
      },
    },
    {
      id: 'chart-generation-issues',
      ko: {
        title: '차트 생성 문제',
        summary: '차트가 생성되지 않을 때',
        content: `
## 차트 생성 문제 해결

차트 생성 관련 문제 해결 방법입니다.

### 차트가 생성되지 않을 때
1. 녹음이 정상 저장되었는지 확인
2. 인터넷 연결 상태 확인
3. 잠시 대기 후 새로고침
4. 재생성 버튼 클릭

### 생성 시간이 오래 걸릴 때
- 긴 녹음은 처리 시간 증가
- 서버 상태 확인
- 대기열에서 진행 상황 확인

### 차트 내용이 부정확할 때
- 녹음 품질 확인
- 전문과 AI 설정 확인
- 수동으로 수정 후 저장

### 특정 섹션 누락 시
- 해당 내용이 녹음에 포함되었는지 확인
- 수동으로 섹션 추가

### 반복되는 문제
녹음 샘플과 함께 지원팀에 문의
        `,
      },
      en: {
        title: 'Chart Generation Issues',
        summary: 'When charts won\'t generate',
        content: `
## Chart Generation Troubleshooting

Solutions for chart generation issues.

### Chart Won't Generate
1. Verify recording was saved properly
2. Check internet connection
3. Wait and refresh
4. Click regenerate button

### Taking Too Long
- Longer recordings take more time
- Check server status
- View progress in queue

### Chart Content Inaccurate
- Check recording quality
- Check specialty AI settings
- Manually edit and save

### Missing Sections
- Verify content was included in recording
- Manually add sections

### Recurring Issues
Contact support with recording sample
        `,
      },
    },
    {
      id: 'login-issues',
      ko: {
        title: '로그인 문제',
        summary: '로그인 관련 문제 해결',
        content: `
## 로그인 문제 해결

로그인이 되지 않을 때의 해결 방법입니다.

### 비밀번호를 잊어버렸을 때
1. 로그인 화면에서 "비밀번호 찾기" 클릭
2. 가입한 이메일 입력
3. 이메일로 발송된 링크 클릭
4. 새 비밀번호 설정

### 이메일 인증 코드가 안 올 때
- 스팸 폴더 확인
- 이메일 주소 확인
- 재발송 요청
- 몇 분 대기 후 재시도

### 계정이 잠겼을 때
- 5회 이상 실패 시 자동 잠금
- 30분 후 자동 해제
- 또는 비밀번호 재설정으로 해제

### 2FA 코드 문제
- 시간 동기화 확인
- 백업 코드 사용
- 지원팀에 복구 요청

### 소셜 로그인 실패
- 해당 서비스 상태 확인
- 연결 해제 후 재연결
        `,
      },
      en: {
        title: 'Login Issues',
        summary: 'Login problem solutions',
        content: `
## Login Issue Solutions

Solutions when you can't log in.

### Forgot Password
1. Click "Forgot Password" on login screen
2. Enter registered email
3. Click link sent to email
4. Set new password

### Verification Code Not Arriving
- Check spam folder
- Verify email address
- Request resend
- Wait a few minutes and retry

### Account Locked
- Auto-lock after 5+ failures
- Auto-unlock after 30 minutes
- Or unlock via password reset

### 2FA Code Issues
- Check time sync
- Use backup codes
- Request recovery from support

### Social Login Failure
- Check service status
- Disconnect and reconnect
        `,
      },
    },
    {
      id: 'emr-sync-issues',
      ko: {
        title: 'EMR 연동 문제',
        summary: 'EMR 연동 오류 해결',
        content: `
## EMR 연동 문제 해결

EMR 연동 관련 문제 해결 방법입니다.

### 연결 실패
1. API 키 유효성 확인
2. EMR 서버 상태 확인
3. 네트워크 연결 확인
4. 방화벽 설정 확인

### 동기화 오류
- 데이터 형식 호환성 확인
- 필수 필드 누락 확인
- 로그에서 오류 상세 확인

### 환자 정보 불일치
- 동기화 충돌 해결
- 수동으로 매칭 확인
- 중복 데이터 정리

### 전송 실패
- 재전송 시도
- 데이터 크기 확인
- 연결 상태 확인

### EMR 측 문제
EMR 관리자에게 문의 필요할 수 있음
        `,
      },
      en: {
        title: 'EMR Integration Issues',
        summary: 'EMR integration error solutions',
        content: `
## EMR Integration Troubleshooting

Solutions for EMR integration issues.

### Connection Failed
1. Verify API key validity
2. Check EMR server status
3. Check network connection
4. Check firewall settings

### Sync Errors
- Check data format compatibility
- Check for missing required fields
- Review error details in logs

### Patient Info Mismatch
- Resolve sync conflicts
- Manually verify matching
- Clean up duplicate data

### Transfer Failed
- Try resending
- Check data size
- Verify connection status

### EMR-Side Issues
May need to contact EMR administrator
        `,
      },
    },
    {
      id: 'performance-issues',
      ko: {
        title: '성능 문제',
        summary: '앱 속도 저하 해결 방법',
        content: `
## 성능 문제 해결

앱이 느리거나 응답하지 않을 때의 해결 방법입니다.

### 앱이 느릴 때
1. 브라우저 탭 정리
2. 캐시 및 쿠키 삭제
3. 브라우저 재시작
4. 기기 재시작

### 페이지 로딩이 오래 걸릴 때
- 인터넷 속도 확인
- 다른 네트워크 시도
- VPN 사용 시 해제 시도

### 버튼이 응답하지 않을 때
- 페이지 새로고침
- 다른 브라우저 시도
- JavaScript 활성화 확인

### 메모리 사용량 높을 때
- 불필요한 탭 닫기
- 브라우저 확장 프로그램 비활성화
- 최신 브라우저 버전 사용

### 지속적인 성능 문제
시스템 환경과 함께 지원팀에 문의
        `,
      },
      en: {
        title: 'Performance Issues',
        summary: 'Solutions for slow app performance',
        content: `
## Performance Issue Solutions

Solutions when app is slow or unresponsive.

### App Is Slow
1. Close browser tabs
2. Clear cache and cookies
3. Restart browser
4. Restart device

### Page Loading Takes Long
- Check internet speed
- Try different network
- Disable VPN if using

### Buttons Not Responding
- Refresh page
- Try different browser
- Verify JavaScript is enabled

### High Memory Usage
- Close unnecessary tabs
- Disable browser extensions
- Use latest browser version

### Persistent Performance Issues
Contact support with system environment details
        `,
      },
    },
    {
      id: 'mobile-app-issues',
      ko: {
        title: '모바일 앱 문제',
        summary: '모바일 앱 관련 문제 해결',
        content: `
## 모바일 앱 문제 해결

모바일 앱 사용 중 문제 해결 방법입니다.

### 앱이 실행되지 않을 때
1. 앱 강제 종료 후 재실행
2. 기기 재시작
3. 앱 업데이트 확인
4. 앱 삭제 후 재설치

### 로그인 상태 유지 안 될 때
- 앱 저장소 권한 확인
- 배터리 최적화에서 앱 제외
- 앱 데이터 유지 설정

### 알림이 오지 않을 때
- 시스템 알림 설정 확인
- 앱 알림 권한 확인
- 방해 금지 모드 확인

### 동기화 문제
- 인터넷 연결 확인
- 수동 동기화 시도
- 로그아웃 후 재로그인

### 크래시 발생 시
크래시 리포트와 함께 지원팀에 문의
        `,
      },
      en: {
        title: 'Mobile App Issues',
        summary: 'Mobile app problem solutions',
        content: `
## Mobile App Troubleshooting

Solutions for mobile app issues.

### App Won't Launch
1. Force close and relaunch app
2. Restart device
3. Check for app updates
4. Uninstall and reinstall

### Login State Not Persisting
- Check app storage permissions
- Exclude app from battery optimization
- Configure data retention settings

### Notifications Not Arriving
- Check system notification settings
- Check app notification permissions
- Check do not disturb mode

### Sync Issues
- Check internet connection
- Try manual sync
- Logout and login again

### App Crashes
Contact support with crash report
        `,
      },
    },
    {
      id: 'browser-compatibility',
      ko: {
        title: '브라우저 호환성',
        summary: '지원 브라우저 및 호환성 문제',
        content: `
## 브라우저 호환성

chartsok 지원 브라우저 안내입니다.

### 지원 브라우저
- Chrome (권장) - 버전 90+
- Firefox - 버전 88+
- Safari - 버전 14+
- Edge - 버전 90+

### 권장 사항
- 최신 버전 브라우저 사용
- Chrome 사용 권장
- JavaScript 활성화 필수

### 미지원 브라우저
- Internet Explorer
- 구버전 브라우저

### 호환성 문제 시
1. 브라우저 업데이트
2. 캐시 삭제
3. 확장 프로그램 비활성화
4. 다른 브라우저 시도

### 모바일 브라우저
- Chrome for Android
- Safari for iOS
- Samsung Internet
        `,
      },
      en: {
        title: 'Browser Compatibility',
        summary: 'Supported browsers and compatibility issues',
        content: `
## Browser Compatibility

Guide to chartsok supported browsers.

### Supported Browsers
- Chrome (recommended) - version 90+
- Firefox - version 88+
- Safari - version 14+
- Edge - version 90+

### Recommendations
- Use latest browser version
- Chrome recommended
- JavaScript must be enabled

### Unsupported Browsers
- Internet Explorer
- Old browser versions

### Compatibility Issues
1. Update browser
2. Clear cache
3. Disable extensions
4. Try different browser

### Mobile Browsers
- Chrome for Android
- Safari for iOS
- Samsung Internet
        `,
      },
    },
    {
      id: 'audio-quality-issues',
      ko: {
        title: '오디오 품질 문제',
        summary: '녹음 품질 향상 방법',
        content: `
## 오디오 품질 문제 해결

녹음 품질이 좋지 않을 때의 해결 방법입니다.

### 음성이 작게 녹음될 때
- 마이크와 가까이 위치
- 입력 볼륨 설정 확인
- 외부 마이크 사용 고려

### 잡음이 심할 때
- 조용한 환경에서 녹음
- 노이즈 제거 설정 활성화
- 에어컨/선풍기 끄기

### 울림/에코가 있을 때
- 좁은 공간 피하기
- 에코 제거 설정 활성화
- 부드러운 표면 환경 선호

### 음성이 끊길 때
- 인터넷 연결 안정성 확인
- 마이크 연결 확인
- 다른 앱의 마이크 사용 확인

### 마이크 추천
- 지향성 마이크 사용
- USB 마이크 추천
- 헤드셋 마이크도 가능
        `,
      },
      en: {
        title: 'Audio Quality Issues',
        summary: 'How to improve recording quality',
        content: `
## Audio Quality Troubleshooting

Solutions for poor recording quality.

### Voice Recorded Too Quiet
- Position closer to microphone
- Check input volume settings
- Consider external microphone

### Too Much Noise
- Record in quiet environment
- Enable noise cancellation
- Turn off AC/fans

### Echo/Reverb
- Avoid small enclosed spaces
- Enable echo cancellation
- Prefer soft surface environments

### Voice Cutting Out
- Check internet stability
- Check microphone connection
- Check if other apps using microphone

### Microphone Recommendations
- Use directional microphone
- USB microphone recommended
- Headset microphone also works
        `,
      },
    },
    {
      id: 'billing-issues',
      ko: {
        title: '결제 문제',
        summary: '결제 관련 문제 해결',
        content: `
## 결제 문제 해결

결제 관련 문제 해결 방법입니다.

### 결제 실패
1. 카드 정보 정확성 확인
2. 카드 한도 확인
3. 해외 결제 차단 확인
4. 다른 카드로 시도

### 이중 결제
- 결제 기록에서 확인
- 이중 결제 시 자동 환불
- 미환불 시 지원팀 문의

### 청구서 문제
- 결제 > 청구서에서 확인
- PDF 다운로드 가능
- 수정 필요 시 지원팀 문의

### 환불 요청
1. 설정 > 결제 > 환불 요청
2. 사유 입력
3. 처리 기간: 5-7 영업일

### 플랜 변경 문제
- 현재 결제 주기 확인
- 변경은 다음 주기부터 적용
- 즉시 변경 시 차액 정산
        `,
      },
      en: {
        title: 'Billing Issues',
        summary: 'Billing problem solutions',
        content: `
## Billing Issue Solutions

Solutions for billing problems.

### Payment Failed
1. Verify card information
2. Check card limit
3. Check international payment block
4. Try different card

### Double Charge
- Check in payment history
- Auto-refund for double charges
- Contact support if not refunded

### Invoice Issues
- Check in Billing > Invoices
- PDF download available
- Contact support for corrections

### Refund Request
1. Settings > Billing > Request Refund
2. Enter reason
3. Processing time: 5-7 business days

### Plan Change Issues
- Check current billing cycle
- Changes apply from next cycle
- Immediate change prorated
        `,
      },
    },
    {
      id: 'contact-support',
      ko: {
        title: '기술 지원 문의',
        summary: '지원팀에 문의하는 방법',
        content: `
## 기술 지원 문의

문제 해결이 어려울 때 지원팀에 문의하세요.

### 문의 방법

#### 이메일 문의
- chartsok.health@gmail.com
- 평일 09:00-18:00 응답
- 긴급 건은 24시간 내 응답

#### 앱 내 문의
1. 설정 > 도움말 > 문의하기
2. 문의 유형 선택
3. 상세 내용 작성
4. 스크린샷 첨부 (선택)

### 효과적인 문의 방법
필수 정보 포함:
- 사용 환경 (브라우저, 기기)
- 문제 발생 시점
- 오류 메시지 (있는 경우)
- 재현 단계

### 응답 시간
- 일반 문의: 24시간 내
- 긴급 문의: 4시간 내
- 결제 문의: 24시간 내

### 긴급 지원
서비스 장애 시 긴급 지원 제공
        `,
      },
      en: {
        title: 'Contact Support',
        summary: 'How to contact support team',
        content: `
## Contact Support

Contact support when you need help.

### Contact Methods

#### Email
- chartsok.health@gmail.com
- Response: Weekdays 09:00-18:00
- Urgent: Within 24 hours

#### In-App Contact
1. Settings > Help > Contact Us
2. Select inquiry type
3. Write details
4. Attach screenshot (optional)

### Effective Inquiries
Include:
- Environment (browser, device)
- When problem occurred
- Error message (if any)
- Steps to reproduce

### Response Time
- General: Within 24 hours
- Urgent: Within 4 hours
- Billing: Within 24 hours

### Emergency Support
Emergency support available for service outages
        `,
      },
    },
  ],
};

// Helper function to get all articles for a category
export function getArticlesByCategory(category) {
  return helpArticles[category] || [];
}

// Helper function to get a single article
export function getArticle(category, articleId) {
  const articles = helpArticles[category] || [];
  return articles.find((article) => article.id === articleId);
}

// Helper function to get all categories
export function getAllCategories() {
  return Object.keys(helpCategories);
}

// Helper function to get category info
export function getCategoryInfo(category) {
  return helpCategories[category];
}
