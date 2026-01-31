/**
 * Mock Database for chartsok
 * Comprehensive mock data simulating Firebase structure.
 * Replace with real database calls when backend is ready.
 */

// ============================================
// UUID HELPER
// ============================================
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// ============================================
// USERS & ORGANIZATIONS
// ============================================

export const users = [
  {
    id: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    email: 'doctor.kim@chartsok.com',
    displayName: '김민수',
    specialty: 'ent',
    licenseNo: '의사-12345',
    phone: '010-1234-5678',
    createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now() - 1 * 60 * 60 * 1000,
    profileImage: null,
    role: 'doctor',
  },
  {
    id: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    email: 'doctor.park@chartsok.com',
    displayName: '박선홍',
    specialty: 'internal',
    licenseNo: '의사-67890',
    phone: '010-9876-5432',
    createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now() - 2 * 60 * 60 * 1000,
    profileImage: null,
    role: 'doctor',
  },
];

export const hospitals = [
  {
    id: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    name: '서울이비인후과의원',
    address: '서울시 강남구 테헤란로 123',
    businessNo: '123-45-67890',
    type: 'clinic',
    phone: '02-555-1234',
    createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'hosp_d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
    name: '강남내과의원',
    address: '서울시 강남구 역삼로 456',
    businessNo: '234-56-78901',
    type: 'clinic',
    phone: '02-555-5678',
    createdAt: Date.now() - 180 * 24 * 60 * 60 * 1000,
  },
];

export const userHospitals = [
  { userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', role: 'owner', isPrimary: true },
  { userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', hospitalId: 'hosp_d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', role: 'owner', isPrimary: true },
];

// ============================================
// USER SETTINGS
// ============================================

export const userSettings = [
  {
    id: 'set_e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
    userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    defaultTemplateId: 'tpl_ent_default',
    chartTemplate: 'soap',
    autoSave: true,
    includeICD: true,
    defaultLanguage: 'ko',
    emailNotifications: true,
    soundEnabled: true,
    speakerDetection: true,
    autoCorrect: true,
    medicalTerms: true,
    retentionHours: 24,
  },
  {
    id: 'set_f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
    userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    defaultTemplateId: 'tpl_internal_default',
    chartTemplate: 'soap',
    autoSave: true,
    includeICD: true,
    defaultLanguage: 'ko',
    emailNotifications: true,
    soundEnabled: false,
    speakerDetection: true,
    autoCorrect: true,
    medicalTerms: true,
    retentionHours: 168, // 7 days
  },
];

// ============================================
// USER KEYWORDS (Custom Medical Terms)
// ============================================

export const userKeywords = [
  // User 1 - ENT specialty keywords
  { id: 'kw_001', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '급성 편도염', category: 'diagnosis', createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000 },
  { id: 'kw_002', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '만성 부비동염', category: 'diagnosis', createdAt: Date.now() - 28 * 24 * 60 * 60 * 1000 },
  { id: 'kw_003', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '삼출성 중이염', category: 'diagnosis', createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000 },
  { id: 'kw_004', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '알레르기성 비염', category: 'diagnosis', createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000 },
  { id: 'kw_005', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '아목시실린', category: 'medication', createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000 },
  { id: 'kw_006', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '클라리스로마이신', category: 'medication', createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000 },
  { id: 'kw_007', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '후두내시경', category: 'procedure', createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000 },
  { id: 'kw_008', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', term: '순음청력검사', category: 'procedure', createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000 },

  // User 2 - Internal medicine keywords
  { id: 'kw_101', userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', term: '본태성 고혈압', category: 'diagnosis', createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000 },
  { id: 'kw_102', userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', term: '제2형 당뇨병', category: 'diagnosis', createdAt: Date.now() - 55 * 24 * 60 * 60 * 1000 },
  { id: 'kw_103', userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', term: '이상지질혈증', category: 'diagnosis', createdAt: Date.now() - 50 * 24 * 60 * 60 * 1000 },
  { id: 'kw_104', userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', term: '메트포르민', category: 'medication', createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000 },
  { id: 'kw_105', userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', term: '암로디핀', category: 'medication', createdAt: Date.now() - 40 * 24 * 60 * 60 * 1000 },
  { id: 'kw_106', userId: 'usr_b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', term: '아토르바스타틴', category: 'medication', createdAt: Date.now() - 35 * 24 * 60 * 60 * 1000 },
];

// ============================================
// PATIENTS
// ============================================

export const patients = [
  { id: 1, chartNo: 'P-2024-001', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '김영희', birthDate: '1979-03-15', age: '45세', gender: '여', phone: '010-1234-5678', address: '서울시 강남구', bloodType: 'A+', allergies: '페니실린', createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000 },
  { id: 2, chartNo: 'P-2024-002', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '박철수', birthDate: '1962-07-22', age: '62세', gender: '남', phone: '010-2345-6789', address: '서울시 서초구', bloodType: 'B+', allergies: null, createdAt: Date.now() - 300 * 24 * 60 * 60 * 1000 },
  { id: 3, chartNo: 'P-2024-003', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '이민정', birthDate: '1991-11-08', age: '33세', gender: '여', phone: '010-3456-7890', address: '서울시 송파구', bloodType: 'O+', allergies: null, createdAt: Date.now() - 200 * 24 * 60 * 60 * 1000 },
  { id: 4, chartNo: 'P-2024-004', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '정대현', birthDate: '1966-01-30', age: '58세', gender: '남', phone: '010-4567-8901', address: '서울시 강동구', bloodType: 'AB+', allergies: '아스피린', createdAt: Date.now() - 180 * 24 * 60 * 60 * 1000 },
  { id: 5, chartNo: 'P-2024-005', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '최수진', birthDate: '1988-09-12', age: '36세', gender: '여', phone: '010-5678-9012', address: '서울시 마포구', bloodType: 'A-', allergies: null, createdAt: Date.now() - 150 * 24 * 60 * 60 * 1000 },
  { id: 6, chartNo: 'P-2024-006', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '강민호', birthDate: '1973-05-25', age: '51세', gender: '남', phone: '010-6789-0123', address: '서울시 용산구', bloodType: 'B-', allergies: null, createdAt: Date.now() - 120 * 24 * 60 * 60 * 1000 },
  { id: 7, chartNo: 'P-2024-007', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '윤서연', birthDate: '1985-12-03', age: '39세', gender: '여', phone: '010-7890-1234', address: '서울시 종로구', bloodType: 'O-', allergies: '설파제', createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000 },
  { id: 8, chartNo: 'P-2024-008', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '임재혁', birthDate: '1954-08-17', age: '70세', gender: '남', phone: '010-8901-2345', address: '서울시 중구', bloodType: 'AB-', allergies: null, createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000 },
  { id: 9, chartNo: 'P-2024-009', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '한소희', birthDate: '1995-04-20', age: '29세', gender: '여', phone: '010-9012-3456', address: '서울시 영등포구', bloodType: 'A+', allergies: null, createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000 },
  { id: 10, chartNo: 'P-2024-010', hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: '조현우', birthDate: '1980-06-08', age: '44세', gender: '남', phone: '010-0123-4567', address: '서울시 성동구', bloodType: 'B+', allergies: null, createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000 },
];

export const patientConsents = [
  { id: 'con_001', patientId: 1, consentType: 'recording', timestamp: Date.now() - 2 * 60 * 60 * 1000, signatureData: 'data:image/png;base64,...' },
  { id: 'con_002', patientId: 2, consentType: 'recording', timestamp: Date.now() - 5 * 60 * 60 * 1000, signatureData: 'data:image/png;base64,...' },
  { id: 'con_003', patientId: 3, consentType: 'recording', timestamp: Date.now() - 8 * 60 * 60 * 1000, signatureData: 'data:image/png;base64,...' },
  { id: 'con_004', patientId: 4, consentType: 'recording', timestamp: Date.now() - 12 * 60 * 60 * 1000, signatureData: 'data:image/png;base64,...' },
  { id: 'con_005', patientId: 5, consentType: 'recording', timestamp: Date.now() - 18 * 60 * 60 * 1000, signatureData: 'data:image/png;base64,...' },
];

// ============================================
// TEMPLATES
// ============================================

export const templates = [
  // System templates
  { id: 'tpl_soap_default', name: 'SOAP 기본', nameEn: 'SOAP Basic', specialty: null, category: 'soap', isSystem: true, isDefault: true, createdBy: null, description: '표준 SOAP 형식 차트 템플릿' },
  { id: 'tpl_ent_default', name: '이비인후과', nameEn: 'ENT', specialty: 'ent', category: 'soap', isSystem: true, isDefault: false, createdBy: null, description: '이비인후과 전용 차트 템플릿 (내시경, 청력검사 포함)' },
  { id: 'tpl_internal_default', name: '내과', nameEn: 'Internal Medicine', specialty: 'internal', category: 'soap', isSystem: true, isDefault: false, createdBy: null, description: '내과 전용 차트 템플릿 (만성질환 관리 포함)' },
  { id: 'tpl_ortho_default', name: '정형외과', nameEn: 'Orthopedics', specialty: 'ortho', category: 'soap', isSystem: true, isDefault: false, createdBy: null, description: '정형외과 전용 차트 템플릿 (영상 소견 포함)' },
  { id: 'tpl_derm_default', name: '피부과', nameEn: 'Dermatology', specialty: 'derm', category: 'soap', isSystem: true, isDefault: false, createdBy: null, description: '피부과 전용 차트 템플릿 (병변 기술 포함)' },
  { id: 'tpl_peds_default', name: '소아과', nameEn: 'Pediatrics', specialty: 'peds', category: 'soap', isSystem: true, isDefault: false, createdBy: null, description: '소아과 전용 차트 템플릿 (성장발달 포함)' },
  { id: 'tpl_narrative_default', name: '서술형 기본', nameEn: 'Narrative', specialty: null, category: 'narrative', isSystem: true, isDefault: false, createdBy: null, description: '자연스러운 문장 형식의 진료 기록' },
];

export const templateSections = [
  // SOAP 기본
  { id: 'sec_soap_1', templateId: 'tpl_soap_default', sectionKey: 'subjective', labelKo: 'Subjective (주관적)', labelEn: 'Subjective', color: '#4B9CD3', bgColor: '#EBF5FF', order: 1, isRequired: true },
  { id: 'sec_soap_2', templateId: 'tpl_soap_default', sectionKey: 'objective', labelKo: 'Objective (객관적)', labelEn: 'Objective', color: '#10B981', bgColor: '#ECFDF5', order: 2, isRequired: true },
  { id: 'sec_soap_3', templateId: 'tpl_soap_default', sectionKey: 'assessment', labelKo: 'Assessment (평가)', labelEn: 'Assessment', color: '#F59E0B', bgColor: '#FFFBEB', order: 3, isRequired: true },
  { id: 'sec_soap_4', templateId: 'tpl_soap_default', sectionKey: 'plan', labelKo: 'Plan (계획)', labelEn: 'Plan', color: '#EF4444', bgColor: '#FEF2F2', order: 4, isRequired: true },

  // 이비인후과
  { id: 'sec_ent_1', templateId: 'tpl_ent_default', sectionKey: 'subjective', labelKo: 'Subjective (주관적)', labelEn: 'Subjective', color: '#4B9CD3', bgColor: '#EBF5FF', order: 1, isRequired: true },
  { id: 'sec_ent_2', templateId: 'tpl_ent_default', sectionKey: 'objective', labelKo: 'Objective (객관적)', labelEn: 'Objective', color: '#10B981', bgColor: '#ECFDF5', order: 2, isRequired: true },
  { id: 'sec_ent_3', templateId: 'tpl_ent_default', sectionKey: 'endoscopy', labelKo: '내시경 소견', labelEn: 'Endoscopy Findings', color: '#8B5CF6', bgColor: '#F3E8FF', order: 3, isRequired: false },
  { id: 'sec_ent_4', templateId: 'tpl_ent_default', sectionKey: 'audiometry', labelKo: '청력검사', labelEn: 'Audiometry', color: '#EC4899', bgColor: '#FDF2F8', order: 4, isRequired: false },
  { id: 'sec_ent_5', templateId: 'tpl_ent_default', sectionKey: 'assessment', labelKo: 'Assessment (평가)', labelEn: 'Assessment', color: '#F59E0B', bgColor: '#FFFBEB', order: 5, isRequired: true },
  { id: 'sec_ent_6', templateId: 'tpl_ent_default', sectionKey: 'plan', labelKo: 'Plan (계획)', labelEn: 'Plan', color: '#EF4444', bgColor: '#FEF2F2', order: 6, isRequired: true },

  // 내과
  { id: 'sec_int_1', templateId: 'tpl_internal_default', sectionKey: 'subjective', labelKo: 'Subjective (주관적)', labelEn: 'Subjective', color: '#4B9CD3', bgColor: '#EBF5FF', order: 1, isRequired: true },
  { id: 'sec_int_2', templateId: 'tpl_internal_default', sectionKey: 'objective', labelKo: 'Objective (객관적)', labelEn: 'Objective', color: '#10B981', bgColor: '#ECFDF5', order: 2, isRequired: true },
  { id: 'sec_int_3', templateId: 'tpl_internal_default', sectionKey: 'chronicDisease', labelKo: '만성질환 관리', labelEn: 'Chronic Disease Management', color: '#8B5CF6', bgColor: '#F3E8FF', order: 3, isRequired: false },
  { id: 'sec_int_4', templateId: 'tpl_internal_default', sectionKey: 'labResults', labelKo: '검사결과', labelEn: 'Lab Results', color: '#EC4899', bgColor: '#FDF2F8', order: 4, isRequired: false },
  { id: 'sec_int_5', templateId: 'tpl_internal_default', sectionKey: 'assessment', labelKo: 'Assessment (평가)', labelEn: 'Assessment', color: '#F59E0B', bgColor: '#FFFBEB', order: 5, isRequired: true },
  { id: 'sec_int_6', templateId: 'tpl_internal_default', sectionKey: 'plan', labelKo: 'Plan (계획)', labelEn: 'Plan', color: '#EF4444', bgColor: '#FEF2F2', order: 6, isRequired: true },

  // 정형외과
  { id: 'sec_ort_1', templateId: 'tpl_ortho_default', sectionKey: 'subjective', labelKo: 'Subjective (주관적)', labelEn: 'Subjective', color: '#4B9CD3', bgColor: '#EBF5FF', order: 1, isRequired: true },
  { id: 'sec_ort_2', templateId: 'tpl_ortho_default', sectionKey: 'objective', labelKo: 'Objective (객관적)', labelEn: 'Objective', color: '#10B981', bgColor: '#ECFDF5', order: 2, isRequired: true },
  { id: 'sec_ort_3', templateId: 'tpl_ortho_default', sectionKey: 'imaging', labelKo: '영상 소견', labelEn: 'Imaging Findings', color: '#8B5CF6', bgColor: '#F3E8FF', order: 3, isRequired: false },
  { id: 'sec_ort_4', templateId: 'tpl_ortho_default', sectionKey: 'rom', labelKo: '관절가동범위', labelEn: 'Range of Motion', color: '#EC4899', bgColor: '#FDF2F8', order: 4, isRequired: false },
  { id: 'sec_ort_5', templateId: 'tpl_ortho_default', sectionKey: 'assessment', labelKo: 'Assessment (평가)', labelEn: 'Assessment', color: '#F59E0B', bgColor: '#FFFBEB', order: 5, isRequired: true },
  { id: 'sec_ort_6', templateId: 'tpl_ortho_default', sectionKey: 'plan', labelKo: 'Plan (계획)', labelEn: 'Plan', color: '#EF4444', bgColor: '#FEF2F2', order: 6, isRequired: true },

  // 피부과
  { id: 'sec_drm_1', templateId: 'tpl_derm_default', sectionKey: 'subjective', labelKo: 'Subjective (주관적)', labelEn: 'Subjective', color: '#4B9CD3', bgColor: '#EBF5FF', order: 1, isRequired: true },
  { id: 'sec_drm_2', templateId: 'tpl_derm_default', sectionKey: 'lesionDescription', labelKo: '병변 기술', labelEn: 'Lesion Description', color: '#10B981', bgColor: '#ECFDF5', order: 2, isRequired: true },
  { id: 'sec_drm_3', templateId: 'tpl_derm_default', sectionKey: 'dermoscopy', labelKo: '피부경 소견', labelEn: 'Dermoscopy Findings', color: '#8B5CF6', bgColor: '#F3E8FF', order: 3, isRequired: false },
  { id: 'sec_drm_4', templateId: 'tpl_derm_default', sectionKey: 'assessment', labelKo: 'Assessment (평가)', labelEn: 'Assessment', color: '#F59E0B', bgColor: '#FFFBEB', order: 4, isRequired: true },
  { id: 'sec_drm_5', templateId: 'tpl_derm_default', sectionKey: 'plan', labelKo: 'Plan (계획)', labelEn: 'Plan', color: '#EF4444', bgColor: '#FEF2F2', order: 5, isRequired: true },

  // 소아과
  { id: 'sec_ped_1', templateId: 'tpl_peds_default', sectionKey: 'subjective', labelKo: 'Subjective (주관적)', labelEn: 'Subjective', color: '#4B9CD3', bgColor: '#EBF5FF', order: 1, isRequired: true },
  { id: 'sec_ped_2', templateId: 'tpl_peds_default', sectionKey: 'objective', labelKo: 'Objective (객관적)', labelEn: 'Objective', color: '#10B981', bgColor: '#ECFDF5', order: 2, isRequired: true },
  { id: 'sec_ped_3', templateId: 'tpl_peds_default', sectionKey: 'growth', labelKo: '성장발달', labelEn: 'Growth & Development', color: '#8B5CF6', bgColor: '#F3E8FF', order: 3, isRequired: false },
  { id: 'sec_ped_4', templateId: 'tpl_peds_default', sectionKey: 'vaccination', labelKo: '예방접종', labelEn: 'Vaccination', color: '#EC4899', bgColor: '#FDF2F8', order: 4, isRequired: false },
  { id: 'sec_ped_5', templateId: 'tpl_peds_default', sectionKey: 'assessment', labelKo: 'Assessment (평가)', labelEn: 'Assessment', color: '#F59E0B', bgColor: '#FFFBEB', order: 5, isRequired: true },
  { id: 'sec_ped_6', templateId: 'tpl_peds_default', sectionKey: 'plan', labelKo: 'Plan (계획)', labelEn: 'Plan', color: '#EF4444', bgColor: '#FEF2F2', order: 6, isRequired: true },
];

// ============================================
// RECORDING SESSIONS & TRANSCRIPTIONS
// ============================================

const now = Date.now();

export const recordingSessions = [
  { id: 'session_001', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 1, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-29', time: '14:30', createdAt: now - 2 * 60 * 60 * 1000, duration: 323, status: 'completed' },
  { id: 'session_002', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 2, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-29', time: '11:15', createdAt: now - 5 * 60 * 60 * 1000, duration: 412, status: 'completed' },
  { id: 'session_003', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 4, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-29', time: '09:30', createdAt: now - 8 * 60 * 60 * 1000, duration: 287, status: 'completed' },
  { id: 'session_004', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 3, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-28', time: '16:00', createdAt: now - 12 * 60 * 60 * 1000, duration: 356, status: 'completed' },
  { id: 'session_005', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 6, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-28', time: '10:30', createdAt: now - 18 * 60 * 60 * 1000, duration: 298, status: 'completed' },
  { id: 'session_006', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 7, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-27', time: '15:45', createdAt: now - 22 * 60 * 60 * 1000, duration: 445, status: 'completed' },
  { id: 'session_007', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 2, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-27', time: '09:00', createdAt: now - 23 * 60 * 60 * 1000, duration: 378, status: 'completed' },
  { id: 'session_008', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 5, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-26', time: '14:00', createdAt: now - 25 * 60 * 60 * 1000, duration: 267, status: 'completed' },
  { id: 'session_009', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 8, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-26', time: '11:30', createdAt: now - 30 * 60 * 60 * 1000, duration: 512, status: 'completed' },
  { id: 'session_010', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 9, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-25', time: '10:00', createdAt: now - 48 * 60 * 60 * 1000, duration: 312, status: 'completed' },
  { id: 'session_011', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 10, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-24', time: '15:30', createdAt: now - 72 * 60 * 60 * 1000, duration: 389, status: 'completed' },
  { id: 'session_012', userId: 'usr_a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', patientId: 1, hospitalId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', date: '2024-01-23', time: '11:00', createdAt: now - 96 * 60 * 60 * 1000, duration: 234, status: 'completed' },
];

export const transcriptions = [
  { id: 'trans_001', sessionId: 'session_001', retentionUntil: now - 2 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: null },
  { id: 'trans_002', sessionId: 'session_002', retentionUntil: now - 5 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: null },
  { id: 'trans_003', sessionId: 'session_003', retentionUntil: now - 8 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: null },
  { id: 'trans_004', sessionId: 'session_004', retentionUntil: now - 12 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: null },
  { id: 'trans_005', sessionId: 'session_005', retentionUntil: now - 18 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: null },
  { id: 'trans_006', sessionId: 'session_006', retentionUntil: now - 22 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: null },
  { id: 'trans_007', sessionId: 'session_007', retentionUntil: now - 23 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: now - 1 * 60 * 60 * 1000 },
  { id: 'trans_008', sessionId: 'session_008', retentionUntil: now - 25 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: now - 1 * 60 * 60 * 1000 },
  { id: 'trans_009', sessionId: 'session_009', retentionUntil: now - 30 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: now - 6 * 60 * 60 * 1000 },
  { id: 'trans_010', sessionId: 'session_010', retentionUntil: now - 48 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: now - 24 * 60 * 60 * 1000 },
  { id: 'trans_011', sessionId: 'session_011', retentionUntil: now - 72 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: now - 48 * 60 * 60 * 1000 },
  { id: 'trans_012', sessionId: 'session_012', retentionUntil: now - 96 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000, deletedAt: now - 72 * 60 * 60 * 1000 },
];

export const transcriptionSegments = [
  // Session 1 - 김영희 (급성 편도염) - ENT template
  { id: 'seg_001_01', transcriptionId: 'trans_001', sequence: 1, speaker: 'doctor', text: '안녕하세요, 김영희님. 오늘 어떻게 오셨어요?', timestamp: '00:00' },
  { id: 'seg_001_02', transcriptionId: 'trans_001', sequence: 2, speaker: 'patient', text: '며칠 전부터 목이 많이 아프고 열이 나요. 침 삼키기도 힘들어요.', timestamp: '00:05' },
  { id: 'seg_001_03', transcriptionId: 'trans_001', sequence: 3, speaker: 'doctor', text: '언제부터 증상이 시작됐나요?', timestamp: '00:12' },
  { id: 'seg_001_04', transcriptionId: 'trans_001', sequence: 4, speaker: 'patient', text: '3일 전부터요. 처음엔 그냥 목이 좀 칼칼하다 싶었는데, 어제부터 열도 나고 많이 아파졌어요.', timestamp: '00:18' },
  { id: 'seg_001_05', transcriptionId: 'trans_001', sequence: 5, speaker: 'doctor', text: '열은 몇 도까지 올라갔나요?', timestamp: '00:28' },
  { id: 'seg_001_06', transcriptionId: 'trans_001', sequence: 6, speaker: 'patient', text: '어제 밤에 38.5도까지 올라갔어요.', timestamp: '00:32' },
  { id: 'seg_001_07', transcriptionId: 'trans_001', sequence: 7, speaker: 'doctor', text: '목 한번 볼게요. 아~ 해보세요.', timestamp: '00:38' },
  { id: 'seg_001_08', transcriptionId: 'trans_001', sequence: 8, speaker: 'doctor', text: '편도가 많이 부어있고 하얀 삼출물이 보이네요. 급성 편도염입니다.', timestamp: '00:45' },
  { id: 'seg_001_09', transcriptionId: 'trans_001', sequence: 9, speaker: 'patient', text: '항생제 먹어야 하나요?', timestamp: '00:52' },
  { id: 'seg_001_10', transcriptionId: 'trans_001', sequence: 10, speaker: 'doctor', text: '네, 세균성 감염이 의심되니까 항생제 처방해 드릴게요. 아목시실린으로 7일치 드릴게요.', timestamp: '00:58' },

  // Session 2 - 박철수 (급성 기관지염) - SOAP template
  { id: 'seg_002_01', transcriptionId: 'trans_002', sequence: 1, speaker: 'doctor', text: '어서오세요, 박철수님. 어떤 증상으로 오셨어요?', timestamp: '00:00' },
  { id: 'seg_002_02', transcriptionId: 'trans_002', sequence: 2, speaker: 'patient', text: '일주일 전부터 기침이 심해요. 가래도 나오고요.', timestamp: '00:06' },
  { id: 'seg_002_03', transcriptionId: 'trans_002', sequence: 3, speaker: 'doctor', text: '가래 색깔은 어떤가요?', timestamp: '00:12' },
  { id: 'seg_002_04', transcriptionId: 'trans_002', sequence: 4, speaker: 'patient', text: '처음엔 맑았는데 요 며칠은 노란색으로 변했어요.', timestamp: '00:18' },
  { id: 'seg_002_05', transcriptionId: 'trans_002', sequence: 5, speaker: 'doctor', text: '열은 있으셨어요?', timestamp: '00:24' },
  { id: 'seg_002_06', transcriptionId: 'trans_002', sequence: 6, speaker: 'patient', text: '미열이 있었어요. 37.5도 정도요.', timestamp: '00:28' },
  { id: 'seg_002_07', transcriptionId: 'trans_002', sequence: 7, speaker: 'doctor', text: '숨쉴 때 불편하거나 숨이 차신 적 있으세요?', timestamp: '00:34' },
  { id: 'seg_002_08', transcriptionId: 'trans_002', sequence: 8, speaker: 'patient', text: '기침할 때 좀 힘들긴 한데 숨이 차진 않아요.', timestamp: '00:40' },
  { id: 'seg_002_09', transcriptionId: 'trans_002', sequence: 9, speaker: 'doctor', text: '청진해볼게요. 깊게 숨 쉬어보세요. 수포음이 들리네요. 급성 기관지염으로 보입니다.', timestamp: '00:48' },

  // Session 3 - 정대현 (본태성 고혈압) - Internal medicine template
  { id: 'seg_003_01', transcriptionId: 'trans_003', sequence: 1, speaker: 'doctor', text: '정대현님, 오늘 혈압 체크해보셨어요?', timestamp: '00:00' },
  { id: 'seg_003_02', transcriptionId: 'trans_003', sequence: 2, speaker: 'patient', text: '네, 아침에 집에서 재봤는데 150에 95였어요.', timestamp: '00:06' },
  { id: 'seg_003_03', transcriptionId: 'trans_003', sequence: 3, speaker: 'doctor', text: '약은 꾸준히 드시고 계시죠?', timestamp: '00:12' },
  { id: 'seg_003_04', transcriptionId: 'trans_003', sequence: 4, speaker: 'patient', text: '네, 암로디핀 5mg 아침마다 먹고 있어요.', timestamp: '00:18' },
  { id: 'seg_003_05', transcriptionId: 'trans_003', sequence: 5, speaker: 'doctor', text: '최근에 두통이나 어지러움 같은 증상은 없으셨어요?', timestamp: '00:24' },
  { id: 'seg_003_06', transcriptionId: 'trans_003', sequence: 6, speaker: 'patient', text: '가끔 아침에 머리가 좀 무거운 느낌이 있어요.', timestamp: '00:30' },
  { id: 'seg_003_07', transcriptionId: 'trans_003', sequence: 7, speaker: 'doctor', text: '혈압이 아직 목표치보다 높네요. 약 용량을 조금 올려볼게요.', timestamp: '00:38' },

  // Session 4 - 이민정 (알레르기성 비염) - ENT template
  { id: 'seg_004_01', transcriptionId: 'trans_004', sequence: 1, speaker: 'doctor', text: '이민정님, 오늘은 어떤 증상으로 오셨어요?', timestamp: '00:00' },
  { id: 'seg_004_02', transcriptionId: 'trans_004', sequence: 2, speaker: 'patient', text: '요즘 환절기라 그런지 코가 너무 막히고 재채기가 자주 나요.', timestamp: '00:06' },
  { id: 'seg_004_03', transcriptionId: 'trans_004', sequence: 3, speaker: 'doctor', text: '맑은 콧물도 나오나요?', timestamp: '00:14' },
  { id: 'seg_004_04', transcriptionId: 'trans_004', sequence: 4, speaker: 'patient', text: '네, 물처럼 줄줄 나와요. 눈도 가렵고요.', timestamp: '00:18' },
  { id: 'seg_004_05', transcriptionId: 'trans_004', sequence: 5, speaker: 'doctor', text: '알레르기 비염 증상이네요. 내시경으로 코 안쪽 한번 볼게요.', timestamp: '00:24' },
  { id: 'seg_004_06', transcriptionId: 'trans_004', sequence: 6, speaker: 'doctor', text: '비점막이 창백하고 부어있어요. 전형적인 알레르기 비염 소견입니다.', timestamp: '00:32' },

  // Session 5 - 강민호 (급성 위장염) - Internal medicine template
  { id: 'seg_005_01', transcriptionId: 'trans_005', sequence: 1, speaker: 'doctor', text: '강민호님, 어디가 불편하세요?', timestamp: '00:00' },
  { id: 'seg_005_02', transcriptionId: 'trans_005', sequence: 2, speaker: 'patient', text: '어제부터 배가 아프고 설사를 계속 해요. 토도 몇 번 했어요.', timestamp: '00:06' },
  { id: 'seg_005_03', transcriptionId: 'trans_005', sequence: 3, speaker: 'doctor', text: '어제 뭘 드셨어요?', timestamp: '00:14' },
  { id: 'seg_005_04', transcriptionId: 'trans_005', sequence: 4, speaker: 'patient', text: '점심에 회식하면서 회를 먹었어요.', timestamp: '00:18' },
  { id: 'seg_005_05', transcriptionId: 'trans_005', sequence: 5, speaker: 'doctor', text: '설사는 하루에 몇 번 정도 하세요?', timestamp: '00:24' },
  { id: 'seg_005_06', transcriptionId: 'trans_005', sequence: 6, speaker: 'patient', text: '오늘만 벌써 6번은 한 것 같아요.', timestamp: '00:28' },
  { id: 'seg_005_07', transcriptionId: 'trans_005', sequence: 7, speaker: 'doctor', text: '복부 촉진해볼게요. 여기 누르면 아프세요?', timestamp: '00:34' },
  { id: 'seg_005_08', transcriptionId: 'trans_005', sequence: 8, speaker: 'patient', text: '아, 네 거기 아파요.', timestamp: '00:38' },
  { id: 'seg_005_09', transcriptionId: 'trans_005', sequence: 9, speaker: 'doctor', text: '급성 위장염으로 보입니다. 수액 맞고 가시는 게 좋겠어요.', timestamp: '00:44' },
];

// ============================================
// CHARTS
// ============================================

export const charts = [
  { id: 'chart_001', sessionId: 'session_001', templateId: 'tpl_ent_default', diagnosis: '급성 편도염', icdCode: 'J03.9', status: 'final', createdAt: now - 2 * 60 * 60 * 1000 },
  { id: 'chart_002', sessionId: 'session_002', templateId: 'tpl_soap_default', diagnosis: '급성 기관지염', icdCode: 'J20.9', status: 'final', createdAt: now - 5 * 60 * 60 * 1000 },
  { id: 'chart_003', sessionId: 'session_003', templateId: 'tpl_internal_default', diagnosis: '본태성 고혈압', icdCode: 'I10', status: 'final', createdAt: now - 8 * 60 * 60 * 1000 },
  { id: 'chart_004', sessionId: 'session_004', templateId: 'tpl_ent_default', diagnosis: '알레르기성 비염', icdCode: 'J30.4', status: 'final', createdAt: now - 12 * 60 * 60 * 1000 },
  { id: 'chart_005', sessionId: 'session_005', templateId: 'tpl_internal_default', diagnosis: '급성 위장염', icdCode: 'K52.9', status: 'final', createdAt: now - 18 * 60 * 60 * 1000 },
  { id: 'chart_006', sessionId: 'session_006', templateId: 'tpl_soap_default', diagnosis: '편두통', icdCode: 'G43.9', status: 'final', createdAt: now - 22 * 60 * 60 * 1000 },
  { id: 'chart_007', sessionId: 'session_007', templateId: 'tpl_internal_default', diagnosis: '제2형 당뇨병', icdCode: 'E11', status: 'final', createdAt: now - 23 * 60 * 60 * 1000 },
  { id: 'chart_008', sessionId: 'session_008', templateId: 'tpl_soap_default', diagnosis: '급성 결막염', icdCode: 'H10.3', status: 'final', createdAt: now - 25 * 60 * 60 * 1000 },
  { id: 'chart_009', sessionId: 'session_009', templateId: 'tpl_internal_default', diagnosis: '이상지질혈증', icdCode: 'E78.5', status: 'final', createdAt: now - 30 * 60 * 60 * 1000 },
  { id: 'chart_010', sessionId: 'session_010', templateId: 'tpl_soap_default', diagnosis: '요통', icdCode: 'M54.5', status: 'final', createdAt: now - 48 * 60 * 60 * 1000 },
  { id: 'chart_011', sessionId: 'session_011', templateId: 'tpl_ortho_default', diagnosis: '골관절염', icdCode: 'M19.9', status: 'final', createdAt: now - 72 * 60 * 60 * 1000 },
  { id: 'chart_012', sessionId: 'session_012', templateId: 'tpl_ent_default', diagnosis: '삼출성 중이염', icdCode: 'H65.9', status: 'final', createdAt: now - 96 * 60 * 60 * 1000 },
];

export const chartContents = [
  // Chart 1 - 김영희 (급성 편도염) - ENT Template
  { id: 'cc_001_1', chartId: 'chart_001', sectionKey: 'subjective', content: '3일 전부터 인후통 발생. 어제부터 발열(38.5°C) 동반. 연하통 호소. 식욕 저하.\n과거력: 특이 병력 없음' },
  { id: 'cc_001_2', chartId: 'chart_001', sectionKey: 'objective', content: '체온 37.8°C, 혈압 125/82 mmHg, 맥박 76회/분, SpO2 98%\n신체검진: 양측 편도 발적 및 비대(Grade 2+), 삼출물 동반, 경부 림프절 촉지됨' },
  { id: 'cc_001_3', chartId: 'chart_001', sectionKey: 'endoscopy', content: '후두 내시경: 인두 발적 심함, 편도 삼출물(+), 후두 이상 소견 없음\n비강 내시경: 양측 비강 경도 충혈, 분비물 없음' },
  { id: 'cc_001_4', chartId: 'chart_001', sectionKey: 'assessment', content: '급성 편도염 (J03.9)\n- 세균성 감염 의심 (삼출물 동반)\n- 중등도' },
  { id: 'cc_001_5', chartId: 'chart_001', sectionKey: 'plan', content: '1. 아목시실린 500mg tid x 7일\n2. 이부프로펜 400mg prn (발열/통증시)\n3. 충분한 수분 섭취 및 휴식 권고\n4. 3일 후 재진 예정' },

  // Chart 2 - 박철수 (급성 기관지염) - SOAP Template
  { id: 'cc_002_1', chartId: 'chart_002', sectionKey: 'subjective', content: '1주 전부터 기침 시작. 처음엔 마른 기침이었으나 3일 전부터 가래 동반.\n가래 양상: 맑음 → 황색으로 변화. 미열(37.5°C) 동반.\n호흡곤란: 없음. 흉통: 기침시 경미한 흉통' },
  { id: 'cc_002_2', chartId: 'chart_002', sectionKey: 'objective', content: '체온 37.2°C, 혈압 138/88 mmHg, 맥박 82회/분, 호흡 20회/분, SpO2 96%\n청진: 양측 폐야 수포음 청진. 천명음 없음.\n인두: 경도 발적' },
  { id: 'cc_002_3', chartId: 'chart_002', sectionKey: 'assessment', content: '급성 기관지염 (J20.9)\n- 세균 중복 감염 의심 (화농성 객담)\n- 중등도' },
  { id: 'cc_002_4', chartId: 'chart_002', sectionKey: 'plan', content: '1. 아지스로마이신 500mg qd x 3일\n2. 암브록솔 30mg tid x 7일 (거담제)\n3. 덱스트로메토르판 15mg tid prn (기침시)\n4. 충분한 수분 섭취\n5. 증상 악화시 내원 권고' },

  // Chart 3 - 정대현 (본태성 고혈압) - Internal Template
  { id: 'cc_003_1', chartId: 'chart_003', sectionKey: 'subjective', content: '고혈압 추적 관찰.\n가정 혈압: 아침 150/95 mmHg 측정.\n증상: 가끔 아침 두중감 호소. 어지러움, 흉통 없음.\n약물: 암로디핀 5mg qd 복용 중 (순응도 양호)' },
  { id: 'cc_003_2', chartId: 'chart_003', sectionKey: 'objective', content: '혈압 152/95 mmHg, 맥박 78회/분\n체중 78kg, 키 172cm, BMI 26.4\n심음: 규칙적, 심잡음 없음\n경동맥 잡음: 없음' },
  { id: 'cc_003_3', chartId: 'chart_003', sectionKey: 'chronicDisease', content: '고혈압 진단: 2020년\n현재 약물: 암로디핀 5mg qd\n동반 질환: 이상지질혈증 (아토르바스타틴 10mg 복용 중)\n합병증 스크리닝: 최근 검사 2024.01 정상' },
  { id: 'cc_003_4', chartId: 'chart_003', sectionKey: 'labResults', content: '최근 검사 (2024.01.15):\n- Cr 0.9 mg/dL, eGFR 89\n- K 4.2 mEq/L\n- Total cholesterol 185 mg/dL\n- LDL 102 mg/dL' },
  { id: 'cc_003_5', chartId: 'chart_003', sectionKey: 'assessment', content: '본태성 고혈압 (I10)\n- 혈압 조절 불량 (목표: <140/90)\n- 약물 조절 필요' },
  { id: 'cc_003_6', chartId: 'chart_003', sectionKey: 'plan', content: '1. 암로디핀 5mg → 10mg으로 증량\n2. 저염식이, 규칙적 운동 권고\n3. 가정 혈압 모니터링 지속\n4. 4주 후 재진\n5. 증상 악화시 조기 내원' },

  // Chart 4 - 이민정 (알레르기성 비염) - ENT Template
  { id: 'cc_004_1', chartId: 'chart_004', sectionKey: 'subjective', content: '환절기 증상 악화. 2주 전부터 비폐색, 수양성 비루, 재채기 빈발.\n안소양감 동반. 후각 저하 호소.\n알레르기 과거력: 봄철 화분 알레르기(+)\n천식: 없음' },
  { id: 'cc_004_2', chartId: 'chart_004', sectionKey: 'objective', content: '활력징후 정상\n비경 검사: 양측 하비갑개 부종(++), 창백한 비점막\n비분비물: 맑음, 다량' },
  { id: 'cc_004_3', chartId: 'chart_004', sectionKey: 'endoscopy', content: '비내시경 소견:\n- 양측 하비갑개 창백 부종\n- 중비도 분비물 없음\n- 비중격 경도 좌측 만곡\n- 부비동 자연공 개방' },
  { id: 'cc_004_4', chartId: 'chart_004', sectionKey: 'assessment', content: '알레르기성 비염 (J30.4)\n- 계절성, 중등도\n- 봄철 악화 패턴' },
  { id: 'cc_004_5', chartId: 'chart_004', sectionKey: 'plan', content: '1. 플루티카손 비강 스프레이 2 puff bid\n2. 세티리진 10mg qd\n3. 식염수 비강 세척 권고\n4. 알레르겐 회피 교육\n5. 2주 후 재진' },

  // Chart 5 - 강민호 (급성 위장염) - Internal Template
  { id: 'cc_005_1', chartId: 'chart_005', sectionKey: 'subjective', content: '어제 점심 회 섭취 후 저녁부터 복통, 오심, 구토 시작.\n설사: 수양성, 하루 6회 이상. 혈변 없음.\n구토: 3회. 발열: 미열(37.5°C)\n최근 해외여행력: 없음' },
  { id: 'cc_005_2', chartId: 'chart_005', sectionKey: 'objective', content: '체온 37.6°C, 혈압 110/70 mmHg, 맥박 92회/분\n피부 긴장도: 감소(탈수 소견)\n복부 검진: 장음 항진, 상복부 압통(+), 반발통(-)\n경직: 없음' },
  { id: 'cc_005_3', chartId: 'chart_005', sectionKey: 'labResults', content: '즉시 검사:\n- WBC 11,200/μL (↑)\n- CRP 2.4 mg/dL (↑)\n대변 검사: 의뢰 중' },
  { id: 'cc_005_4', chartId: 'chart_005', sectionKey: 'assessment', content: '급성 위장염 (K52.9)\n- 세균성 가능성 높음 (생선 섭취력)\n- 경도 탈수 동반' },
  { id: 'cc_005_5', chartId: 'chart_005', sectionKey: 'plan', content: '1. 수액 요법: N/S 1L + 포도당 1L\n2. 로페라마이드 2mg prn (최대 8mg/day)\n3. 돔페리돈 10mg tid\n4. 금식 후 점진적 식이 진행\n5. 증상 지속시 내일 재진' },

  // More charts with various templates...
  { id: 'cc_006_1', chartId: 'chart_006', sectionKey: 'subjective', content: '두통 - 좌측 측두부 박동성 통증. 오심 동반. 광과민성(+)\n지속 시간: 6시간\n유발 인자: 수면 부족, 스트레스\n과거력: 편두통 5년, 가족력(+)' },
  { id: 'cc_006_2', chartId: 'chart_006', sectionKey: 'objective', content: '체온 36.8°C, 혈압 118/78 mmHg\n신경학적 검진: 정상\n목 강직: 없음\n국소 신경학적 결손: 없음' },
  { id: 'cc_006_3', chartId: 'chart_006', sectionKey: 'assessment', content: '편두통, 조짐 없음 (G43.0)\n- 중등도 발작\n- 전조 증상 없음' },
  { id: 'cc_006_4', chartId: 'chart_006', sectionKey: 'plan', content: '1. 수마트립탄 50mg prn (두통 발생시)\n2. 나프록센 500mg prn\n3. 유발 인자 회피 교육\n4. 두통 일지 작성 권고\n5. 월 4회 이상 발작시 예방 치료 고려' },
];

export const chartVitals = [
  { id: 'vital_001', chartId: 'chart_001', systolic: '125', diastolic: '82', pulse: '76', temperature: '37.8', respiration: '18', spO2: '98', weight: '58', height: '162' },
  { id: 'vital_002', chartId: 'chart_002', systolic: '138', diastolic: '88', pulse: '82', temperature: '37.2', respiration: '20', spO2: '96', weight: '75', height: '170' },
  { id: 'vital_003', chartId: 'chart_003', systolic: '152', diastolic: '95', pulse: '78', temperature: '36.5', respiration: '16', spO2: '98', weight: '78', height: '172' },
  { id: 'vital_004', chartId: 'chart_004', systolic: '115', diastolic: '75', pulse: '72', temperature: '36.6', respiration: '16', spO2: '99', weight: '52', height: '165' },
  { id: 'vital_005', chartId: 'chart_005', systolic: '110', diastolic: '70', pulse: '92', temperature: '37.6', respiration: '18', spO2: '98', weight: '72', height: '175' },
  { id: 'vital_006', chartId: 'chart_006', systolic: '118', diastolic: '78', pulse: '68', temperature: '36.8', respiration: '16', spO2: '99', weight: '55', height: '160' },
  { id: 'vital_007', chartId: 'chart_007', systolic: '130', diastolic: '85', pulse: '80', temperature: '36.4', respiration: '16', spO2: '98', weight: '80', height: '168' },
  { id: 'vital_008', chartId: 'chart_008', systolic: '120', diastolic: '80', pulse: '74', temperature: '36.7', respiration: '16', spO2: '99', weight: '55', height: '163' },
];

// ============================================
// PATIENT ATTACHMENTS
// ============================================

export const patientAttachments = [
  // 김영희 (patientId: 1)
  { id: 'attach_001', patientId: 1, type: 'xray', name: '흉부 X-ray', date: '2024-01-29', size: '2.4 MB', thumbnail: '/attachments/xray-placeholder.jpg' },
  { id: 'attach_002', patientId: 1, type: 'lab', name: '혈액검사 결과', date: '2024-01-28', size: '156 KB', thumbnail: null },
  { id: 'attach_003', patientId: 1, type: 'ct', name: '부비동 CT', date: '2024-01-25', size: '45.2 MB', thumbnail: '/attachments/ct-placeholder.jpg' },
  // 박철수 (patientId: 2)
  { id: 'attach_004', patientId: 2, type: 'lab', name: '혈액검사', date: '2024-01-29', size: '189 KB', thumbnail: null },
  { id: 'attach_005', patientId: 2, type: 'ecg', name: '심전도', date: '2024-01-27', size: '342 KB', thumbnail: null },
  { id: 'attach_006', patientId: 2, type: 'xray', name: '흉부 X-ray', date: '2024-01-20', size: '1.9 MB', thumbnail: '/attachments/xray-placeholder.jpg' },
  // 정대현 (patientId: 4)
  { id: 'attach_007', patientId: 4, type: 'lab', name: '종합검진 결과', date: '2024-01-15', size: '2.1 MB', thumbnail: null },
  { id: 'attach_008', patientId: 4, type: 'ecg', name: '심전도', date: '2024-01-15', size: '298 KB', thumbnail: null },
  // 강민호 (patientId: 6)
  { id: 'attach_009', patientId: 6, type: 'lab', name: '혈액검사', date: '2024-01-28', size: '176 KB', thumbnail: null },
  // 임재혁 (patientId: 8)
  { id: 'attach_010', patientId: 8, type: 'xray', name: '흉부 X-ray', date: '2024-01-26', size: '2.2 MB', thumbnail: '/attachments/xray-placeholder.jpg' },
  { id: 'attach_011', patientId: 8, type: 'lab', name: '당화혈색소 검사', date: '2024-01-26', size: '89 KB', thumbnail: null },
  { id: 'attach_012', patientId: 8, type: 'ct', name: '복부 CT', date: '2024-01-10', size: '52.3 MB', thumbnail: '/attachments/ct-placeholder.jpg' },
];

// ============================================
// RETENTION POLICIES
// ============================================

export const retentionPolicies = [
  { id: 'rp_001', entityType: 'hospital', entityId: 'hosp_c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', retentionHours: 24 },
  { id: 'rp_002', entityType: 'hospital', entityId: 'hosp_d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', retentionHours: 168 }, // 7 days
];

// ============================================
// DASHBOARD STATS (Computed mock data)
// ============================================

export const dashboardStats = {
  todayRecords: 4,
  weeklyRecords: 73,
  avgRecordingTime: '5:42',
  timeSaved: '73%',
  weeklyData: [
    { day: '월', count: 12 },
    { day: '화', count: 15 },
    { day: '수', count: 8 },
    { day: '목', count: 18 },
    { day: '금', count: 14 },
    { day: '토', count: 6 },
    { day: '일', count: 0 },
  ],
  topDiagnoses: [
    { diagnosis: '급성 상기도 감염', count: 23 },
    { diagnosis: '급성 편도염', count: 12 },
    { diagnosis: '알레르기성 비염', count: 9 },
    { diagnosis: '고혈압', count: 8 },
    { diagnosis: '급성 위장염', count: 6 },
  ],
};

// ============================================
// NOTE: Helper functions have been moved to:
// - @/lib/services/dataService.js (data access functions)
// - @/lib/helpers/ (utility functions)
// - @/lib/constants/ (enums and constants)
// ============================================
