/**
 * Firestore Collection Names and Schema Definitions
 * Central place to manage all collection references
 */

// Collection names
export const Collections = {
  USERS: 'users',
  USER_SETTINGS: 'userSettings',
  USER_KEYWORDS: 'userKeywords',
  HOSPITALS: 'hospitals',
  USER_HOSPITALS: 'userHospitals',
  PATIENTS: 'patients',
  PATIENT_CONSENTS: 'patientConsents',
  TEMPLATES: 'templates',
  TEMPLATE_SECTIONS: 'templateSections',
  RECORDING_SESSIONS: 'recordingSessions',
  TRANSCRIPTIONS: 'transcriptions',
  TRANSCRIPTION_SEGMENTS: 'transcriptionSegments',
  CHARTS: 'charts',
  CHART_CONTENTS: 'chartContents',
  CHART_VITALS: 'chartVitals',
  PATIENT_ATTACHMENTS: 'patientAttachments',
  RETENTION_POLICIES: 'retentionPolicies',
};

// Sub-collections (nested under parent documents)
export const SubCollections = {
  // Under users/{userId}
  USER_KEYWORDS: 'keywords',
  USER_SETTINGS: 'settings',

  // Under patients/{patientId}
  CONSENTS: 'consents',
  ATTACHMENTS: 'attachments',

  // Under recordingSessions/{sessionId}
  TRANSCRIPTION_SEGMENTS: 'segments',

  // Under charts/{chartId}
  CHART_CONTENTS: 'contents',
};

/**
 * Schema definitions for validation
 * These mirror the mock database structure
 */
export const Schemas = {
  user: {
    id: 'string', // auto-generated
    email: 'string',
    displayName: 'string',
    specialty: 'string|null',
    licenseNo: 'string|null',
    phone: 'string|null',
    profileImage: 'string|null',
    role: 'string', // doctor, nurse, admin, staff
    createdAt: 'timestamp',
    lastLoginAt: 'timestamp',
  },

  userSettings: {
    id: 'string',
    userId: 'string',
    defaultTemplateId: 'string|null',
    chartTemplate: 'string',
    autoSave: 'boolean',
    includeICD: 'boolean',
    defaultLanguage: 'string',
    emailNotifications: 'boolean',
    soundEnabled: 'boolean',
    speakerDetection: 'boolean',
    autoCorrect: 'boolean',
    medicalTerms: 'boolean',
    retentionHours: 'number',
  },

  userKeyword: {
    id: 'string',
    userId: 'string',
    term: 'string',
    category: 'string', // diagnosis, medication, procedure, symptom, anatomy, custom
    createdAt: 'timestamp',
  },

  hospital: {
    id: 'string',
    name: 'string',
    address: 'string',
    businessNo: 'string',
    type: 'string', // clinic, hospital, general_hospital, tertiary_hospital
    phone: 'string',
    createdAt: 'timestamp',
  },

  userHospital: {
    userId: 'string',
    hospitalId: 'string',
    role: 'string', // owner, admin, doctor, nurse, staff
    isPrimary: 'boolean',
  },

  patient: {
    id: 'string',
    chartNo: 'string',
    hospitalId: 'string',
    name: 'string',
    birthDate: 'string',
    age: 'string',
    gender: 'string',
    phone: 'string|null',
    address: 'string|null',
    bloodType: 'string|null',
    allergies: 'string|null',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
  },

  patientConsent: {
    id: 'string',
    patientId: 'string',
    consentType: 'string', // recording, data_processing, terms, privacy
    timestamp: 'timestamp',
    signatureData: 'string|null',
  },

  template: {
    id: 'string',
    name: 'string',
    nameEn: 'string',
    specialty: 'string|null',
    category: 'string', // soap, narrative, custom
    isSystem: 'boolean',
    isDefault: 'boolean',
    createdBy: 'string|null', // userId for custom templates
    description: 'string|null',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
  },

  templateSection: {
    id: 'string',
    templateId: 'string',
    sectionKey: 'string',
    labelKo: 'string',
    labelEn: 'string',
    color: 'string',
    bgColor: 'string',
    order: 'number',
    isRequired: 'boolean',
  },

  recordingSession: {
    id: 'string',
    userId: 'string',
    patientId: 'string',
    hospitalId: 'string',
    date: 'string', // YYYY-MM-DD
    time: 'string', // HH:MM
    duration: 'number', // seconds
    status: 'string', // recording, processing, completed, failed, deleted
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
  },

  transcription: {
    id: 'string',
    sessionId: 'string',
    retentionUntil: 'timestamp',
    deletedAt: 'timestamp|null',
    createdAt: 'timestamp',
  },

  transcriptionSegment: {
    id: 'string',
    transcriptionId: 'string',
    sequence: 'number',
    speaker: 'string', // doctor, patient, nurse, guardian, unknown
    text: 'string',
    timestamp: 'string', // MM:SS format
    confidence: 'number|null',
  },

  chart: {
    id: 'string',
    sessionId: 'string',
    patientId: 'string',
    templateId: 'string',
    diagnosis: 'string',
    icdCode: 'string|null',
    status: 'string', // draft, completed, reviewed, signed
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
  },

  chartContent: {
    id: 'string',
    chartId: 'string',
    sectionKey: 'string',
    content: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
  },

  chartVitals: {
    id: 'string',
    chartId: 'string',
    systolic: 'string|null',
    diastolic: 'string|null',
    pulse: 'string|null',
    temperature: 'string|null',
    respiration: 'string|null',
    spO2: 'string|null',
    weight: 'string|null',
    height: 'string|null',
    createdAt: 'timestamp',
  },

  patientAttachment: {
    id: 'string',
    patientId: 'string',
    type: 'string', // xray, ct, mri, lab, ecg, document, other
    name: 'string',
    date: 'string',
    size: 'string',
    storagePath: 'string|null',
    thumbnail: 'string|null',
    createdAt: 'timestamp',
  },

  retentionPolicy: {
    id: 'string',
    entityType: 'string', // hospital, user
    entityId: 'string',
    retentionHours: 'number',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
  },
};
