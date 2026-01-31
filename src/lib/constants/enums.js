/**
 * Enums and Constants for chartsok
 * Centralized type definitions for consistency across the app
 */

// ============================================
// USER & AUTH ENUMS
// ============================================

export const UserRole = {
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  ADMIN: 'admin',
  STAFF: 'staff',
};

export const AuthProvider = {
  EMAIL: 'email',
  GOOGLE: 'google',
  KAKAO: 'kakao',
  NAVER: 'naver',
};

// ============================================
// SPECIALTY ENUMS
// ============================================

export const Specialty = {
  GENERAL: 'general',
  ENT: 'ent',
  INTERNAL: 'internal',
  ORTHO: 'ortho',
  DERM: 'derm',
  PEDS: 'peds',
  NEURO: 'neuro',
  OPHTH: 'ophth',
  PSYCH: 'psych',
  OB_GYN: 'obgyn',
  CARDIO: 'cardio',
  SURGERY: 'surgery',
};

export const SpecialtyLabels = {
  ko: {
    [Specialty.GENERAL]: '일반의',
    [Specialty.ENT]: '이비인후과',
    [Specialty.INTERNAL]: '내과',
    [Specialty.ORTHO]: '정형외과',
    [Specialty.DERM]: '피부과',
    [Specialty.PEDS]: '소아청소년과',
    [Specialty.NEURO]: '신경과',
    [Specialty.OPHTH]: '안과',
    [Specialty.PSYCH]: '정신건강의학과',
    [Specialty.OB_GYN]: '산부인과',
    [Specialty.CARDIO]: '심장내과',
    [Specialty.SURGERY]: '외과',
  },
  en: {
    [Specialty.GENERAL]: 'General Practice',
    [Specialty.ENT]: 'ENT',
    [Specialty.INTERNAL]: 'Internal Medicine',
    [Specialty.ORTHO]: 'Orthopedics',
    [Specialty.DERM]: 'Dermatology',
    [Specialty.PEDS]: 'Pediatrics',
    [Specialty.NEURO]: 'Neurology',
    [Specialty.OPHTH]: 'Ophthalmology',
    [Specialty.PSYCH]: 'Psychiatry',
    [Specialty.OB_GYN]: 'Obstetrics & Gynecology',
    [Specialty.CARDIO]: 'Cardiology',
    [Specialty.SURGERY]: 'Surgery',
  },
};

// ============================================
// TEMPLATE ENUMS
// ============================================

export const TemplateCategory = {
  SOAP: 'soap',
  NARRATIVE: 'narrative',
  CUSTOM: 'custom',
};

export const TemplateCategoryLabels = {
  ko: {
    [TemplateCategory.SOAP]: 'SOAP 형식',
    [TemplateCategory.NARRATIVE]: '서술형',
    [TemplateCategory.CUSTOM]: '사용자 정의',
  },
  en: {
    [TemplateCategory.SOAP]: 'SOAP Format',
    [TemplateCategory.NARRATIVE]: 'Narrative',
    [TemplateCategory.CUSTOM]: 'Custom',
  },
};

// ============================================
// CHART SECTION KEYS
// ============================================

export const ChartSectionKey = {
  // Standard SOAP
  SUBJECTIVE: 'subjective',
  OBJECTIVE: 'objective',
  ASSESSMENT: 'assessment',
  PLAN: 'plan',
  // ENT specific
  ENDOSCOPY: 'endoscopy',
  AUDIOMETRY: 'audiometry',
  // Internal medicine specific
  CHRONIC_DISEASE: 'chronicDisease',
  LAB_RESULTS: 'labResults',
  // Orthopedics specific
  IMAGING: 'imaging',
  PHYSICAL_EXAM: 'physicalExam',
  // Dermatology specific
  LESION: 'lesion',
  // Pediatrics specific
  GROWTH: 'growth',
  VACCINATION: 'vaccination',
  // Narrative
  NARRATIVE: 'narrative',
};

// ============================================
// SESSION STATUS
// ============================================

export const SessionStatus = {
  RECORDING: 'recording',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  DELETED: 'deleted',
};

export const SessionStatusLabels = {
  ko: {
    [SessionStatus.RECORDING]: '녹음 중',
    [SessionStatus.PROCESSING]: '처리 중',
    [SessionStatus.COMPLETED]: '완료',
    [SessionStatus.FAILED]: '실패',
    [SessionStatus.DELETED]: '삭제됨',
  },
  en: {
    [SessionStatus.RECORDING]: 'Recording',
    [SessionStatus.PROCESSING]: 'Processing',
    [SessionStatus.COMPLETED]: 'Completed',
    [SessionStatus.FAILED]: 'Failed',
    [SessionStatus.DELETED]: 'Deleted',
  },
};

// ============================================
// CHART STATUS
// ============================================

export const ChartStatus = {
  DRAFT: 'draft',
  COMPLETED: 'completed',
  REVIEWED: 'reviewed',
  SIGNED: 'signed',
};

export const ChartStatusLabels = {
  ko: {
    [ChartStatus.DRAFT]: '작성 중',
    [ChartStatus.COMPLETED]: '완료',
    [ChartStatus.REVIEWED]: '검토됨',
    [ChartStatus.SIGNED]: '서명됨',
  },
  en: {
    [ChartStatus.DRAFT]: 'Draft',
    [ChartStatus.COMPLETED]: 'Completed',
    [ChartStatus.REVIEWED]: 'Reviewed',
    [ChartStatus.SIGNED]: 'Signed',
  },
};

// ============================================
// CONSENT TYPE
// ============================================

export const ConsentType = {
  RECORDING: 'recording',
  DATA_PROCESSING: 'data_processing',
  TERMS_OF_SERVICE: 'terms_of_service',
  PRIVACY_POLICY: 'privacy_policy',
};

export const ConsentTypeLabels = {
  ko: {
    [ConsentType.RECORDING]: '녹음 동의',
    [ConsentType.DATA_PROCESSING]: '데이터 처리 동의',
    [ConsentType.TERMS_OF_SERVICE]: '이용약관 동의',
    [ConsentType.PRIVACY_POLICY]: '개인정보처리방침 동의',
  },
  en: {
    [ConsentType.RECORDING]: 'Recording Consent',
    [ConsentType.DATA_PROCESSING]: 'Data Processing Consent',
    [ConsentType.TERMS_OF_SERVICE]: 'Terms of Service',
    [ConsentType.PRIVACY_POLICY]: 'Privacy Policy',
  },
};

// ============================================
// RETENTION PERIOD
// ============================================

export const RetentionPeriod = {
  IMMEDIATE: 0,
  ONE_HOUR: 1,
  TWENTY_FOUR_HOURS: 24,
  SEVEN_DAYS: 168,
  THIRTY_DAYS: 720,
};

export const RetentionPeriodLabels = {
  ko: {
    [RetentionPeriod.IMMEDIATE]: '즉시 삭제',
    [RetentionPeriod.ONE_HOUR]: '1시간',
    [RetentionPeriod.TWENTY_FOUR_HOURS]: '24시간',
    [RetentionPeriod.SEVEN_DAYS]: '7일',
    [RetentionPeriod.THIRTY_DAYS]: '30일',
  },
  en: {
    [RetentionPeriod.IMMEDIATE]: 'Immediate deletion',
    [RetentionPeriod.ONE_HOUR]: '1 hour',
    [RetentionPeriod.TWENTY_FOUR_HOURS]: '24 hours',
    [RetentionPeriod.SEVEN_DAYS]: '7 days',
    [RetentionPeriod.THIRTY_DAYS]: '30 days',
  },
};

// ============================================
// SPEAKER TYPE
// ============================================

export const SpeakerType = {
  DOCTOR: 'doctor',
  PATIENT: 'patient',
  NURSE: 'nurse',
  GUARDIAN: 'guardian',
  UNKNOWN: 'unknown',
};

export const SpeakerTypeLabels = {
  ko: {
    [SpeakerType.DOCTOR]: '의사',
    [SpeakerType.PATIENT]: '환자',
    [SpeakerType.NURSE]: '간호사',
    [SpeakerType.GUARDIAN]: '보호자',
    [SpeakerType.UNKNOWN]: '알 수 없음',
  },
  en: {
    [SpeakerType.DOCTOR]: 'Doctor',
    [SpeakerType.PATIENT]: 'Patient',
    [SpeakerType.NURSE]: 'Nurse',
    [SpeakerType.GUARDIAN]: 'Guardian',
    [SpeakerType.UNKNOWN]: 'Unknown',
  },
};

// ============================================
// KEYWORD CATEGORY
// ============================================

export const KeywordCategory = {
  DIAGNOSIS: 'diagnosis',
  MEDICATION: 'medication',
  PROCEDURE: 'procedure',
  SYMPTOM: 'symptom',
  ANATOMY: 'anatomy',
  CUSTOM: 'custom',
};

export const KeywordCategoryLabels = {
  ko: {
    [KeywordCategory.DIAGNOSIS]: '진단명',
    [KeywordCategory.MEDICATION]: '약물',
    [KeywordCategory.PROCEDURE]: '시술/검사',
    [KeywordCategory.SYMPTOM]: '증상',
    [KeywordCategory.ANATOMY]: '해부학',
    [KeywordCategory.CUSTOM]: '사용자 정의',
  },
  en: {
    [KeywordCategory.DIAGNOSIS]: 'Diagnosis',
    [KeywordCategory.MEDICATION]: 'Medication',
    [KeywordCategory.PROCEDURE]: 'Procedure',
    [KeywordCategory.SYMPTOM]: 'Symptom',
    [KeywordCategory.ANATOMY]: 'Anatomy',
    [KeywordCategory.CUSTOM]: 'Custom',
  },
};

// ============================================
// HOSPITAL TYPE
// ============================================

export const HospitalType = {
  CLINIC: 'clinic',
  HOSPITAL: 'hospital',
  GENERAL_HOSPITAL: 'general_hospital',
  TERTIARY_HOSPITAL: 'tertiary_hospital',
};

export const HospitalTypeLabels = {
  ko: {
    [HospitalType.CLINIC]: '의원',
    [HospitalType.HOSPITAL]: '병원',
    [HospitalType.GENERAL_HOSPITAL]: '종합병원',
    [HospitalType.TERTIARY_HOSPITAL]: '상급종합병원',
  },
  en: {
    [HospitalType.CLINIC]: 'Clinic',
    [HospitalType.HOSPITAL]: 'Hospital',
    [HospitalType.GENERAL_HOSPITAL]: 'General Hospital',
    [HospitalType.TERTIARY_HOSPITAL]: 'Tertiary Hospital',
  },
};

// ============================================
// BLOOD TYPE
// ============================================

export const BloodType = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  UNKNOWN: 'unknown',
};

// ============================================
// GENDER
// ============================================

export const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

export const GenderLabels = {
  ko: {
    [Gender.MALE]: '남',
    [Gender.FEMALE]: '여',
    [Gender.OTHER]: '기타',
  },
  en: {
    [Gender.MALE]: 'Male',
    [Gender.FEMALE]: 'Female',
    [Gender.OTHER]: 'Other',
  },
};

// ============================================
// SECTION COLORS (for chart display)
// ============================================

export const SectionColors = {
  subjective: { color: '#4B9CD3', bgColor: '#EBF5FF' },
  objective: { color: '#10B981', bgColor: '#ECFDF5' },
  assessment: { color: '#F59E0B', bgColor: '#FFFBEB' },
  plan: { color: '#EF4444', bgColor: '#FEF2F2' },
  endoscopy: { color: '#8B5CF6', bgColor: '#F3E8FF' },
  audiometry: { color: '#EC4899', bgColor: '#FDF2F8' },
  chronicDisease: { color: '#8B5CF6', bgColor: '#F3E8FF' },
  labResults: { color: '#EC4899', bgColor: '#FDF2F8' },
  imaging: { color: '#06B6D4', bgColor: '#ECFEFF' },
  physicalExam: { color: '#84CC16', bgColor: '#F7FEE7' },
  lesion: { color: '#F97316', bgColor: '#FFF7ED' },
  growth: { color: '#14B8A6', bgColor: '#F0FDFA' },
  vaccination: { color: '#6366F1', bgColor: '#EEF2FF' },
  narrative: { color: '#64748B', bgColor: '#F8FAFC' },
};
