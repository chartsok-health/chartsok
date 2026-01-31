/**
 * Data Service Layer
 * Business logic and data access functions
 * Uses mockDatabase for data and helpers for utilities
 */

import {
  users,
  userSettings,
  userKeywords,
  hospitals,
  userHospitals,
  patients,
  patientConsents,
  templates,
  templateSections,
  recordingSessions,
  transcriptions,
  transcriptionSegments,
  charts,
  chartContents,
  chartVitals,
  patientAttachments,
  retentionPolicies,
  dashboardStats,
} from '../mockDatabase';

import { formatDuration, groupBy, sortByDate } from '../helpers';
import { SpeakerType, SpeakerTypeLabels } from '../constants';

// ============================================
// USER SERVICES
// ============================================

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {object|undefined} User object
 */
export function getUserById(userId) {
  return users.find(u => u.id === userId);
}

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {object|undefined} User object
 */
export function getUserByEmail(email) {
  return users.find(u => u.email === email);
}

/**
 * Get user settings
 * @param {string} userId - User ID
 * @returns {object|undefined} User settings
 */
export function getUserSettings(userId) {
  return userSettings.find(s => s.userId === userId);
}

/**
 * Get user keywords by category
 * @param {string} userId - User ID
 * @param {string} category - Optional category filter
 * @returns {Array} User keywords
 */
export function getUserKeywords(userId, category = null) {
  const keywords = userKeywords.filter(k => k.userId === userId);
  if (category) {
    return keywords.filter(k => k.category === category);
  }
  return keywords;
}

/**
 * Get user's hospital
 * @param {string} userId - User ID
 * @returns {object|null} Hospital object
 */
export function getUserHospital(userId) {
  const relation = userHospitals.find(uh => uh.userId === userId && uh.isPrimary);
  if (!relation) return null;
  return hospitals.find(h => h.id === relation.hospitalId);
}

// ============================================
// PATIENT SERVICES
// ============================================

/**
 * Get patient by ID
 * @param {number} patientId - Patient ID
 * @returns {object|undefined} Patient object
 */
export function getPatientById(patientId) {
  return patients.find(p => p.id === patientId);
}

/**
 * Get patient by chart number
 * @param {string} chartNo - Chart number
 * @returns {object|undefined} Patient object
 */
export function getPatientByChartNo(chartNo) {
  return patients.find(p => p.chartNo === chartNo);
}

/**
 * Get all patients for a hospital
 * @param {string} hospitalId - Hospital ID
 * @returns {Array} Patients array
 */
export function getPatientsByHospital(hospitalId) {
  return patients.filter(p => p.hospitalId === hospitalId);
}

/**
 * Get patient with visit history
 * @param {number} patientId - Patient ID
 * @returns {object|null} Patient with visits
 */
export function getPatientWithHistory(patientId) {
  const patient = getPatientById(patientId);
  if (!patient) return null;

  const patientSessions = recordingSessions.filter(s => s.patientId === patientId);
  const patientCharts = charts.filter(c =>
    patientSessions.some(s => s.id === c.sessionId)
  );

  return {
    ...patient,
    sessions: patientSessions,
    charts: patientCharts,
    visitCount: patientSessions.length,
    lastVisit: patientSessions.length > 0
      ? sortByDate(patientSessions, 'createdAt')[0]?.date
      : null,
  };
}

/**
 * Get patient attachments
 * @param {number} patientId - Patient ID
 * @returns {Array} Attachments array
 */
export function getPatientAttachments(patientId) {
  return patientAttachments.filter(a => a.patientId === patientId);
}

/**
 * Get patient consent
 * @param {number} patientId - Patient ID
 * @param {string} consentType - Consent type
 * @returns {object|undefined} Consent object
 */
export function getPatientConsent(patientId, consentType = 'recording') {
  return patientConsents.find(
    c => c.patientId === patientId && c.consentType === consentType
  );
}

// ============================================
// TEMPLATE SERVICES
// ============================================

/**
 * Get template by ID
 * @param {string} templateId - Template ID
 * @returns {object|undefined} Template object
 */
export function getTemplateById(templateId) {
  return templates.find(t => t.id === templateId);
}

/**
 * Get all templates
 * @param {object} options - Filter options
 * @returns {Array} Templates array
 */
export function getTemplates(options = {}) {
  const { specialty, category, includeSystem = true } = options;

  let result = [...templates];

  if (specialty) {
    result = result.filter(t => t.specialty === specialty || t.specialty === null);
  }

  if (category) {
    result = result.filter(t => t.category === category);
  }

  if (!includeSystem) {
    result = result.filter(t => !t.isSystem);
  }

  return result;
}

/**
 * Get template sections
 * @param {string} templateId - Template ID
 * @returns {Array} Sections array sorted by order
 */
export function getTemplateSections(templateId) {
  return templateSections
    .filter(s => s.templateId === templateId)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get template with sections
 * @param {string} templateId - Template ID
 * @returns {object|null} Template with sections
 */
export function getTemplateWithSections(templateId) {
  const template = getTemplateById(templateId);
  if (!template) return null;

  return {
    ...template,
    sections: getTemplateSections(templateId),
  };
}

// ============================================
// SESSION SERVICES
// ============================================

/**
 * Get session by ID
 * @param {string} sessionId - Session ID
 * @returns {object|undefined} Session object
 */
export function getSessionById(sessionId) {
  return recordingSessions.find(s => s.id === sessionId);
}

/**
 * Get sessions for a user
 * @param {string} userId - User ID
 * @param {object} options - Filter options
 * @returns {Array} Sessions array
 */
export function getUserSessions(userId, options = {}) {
  const { limit = 50, status, date } = options;

  let result = recordingSessions.filter(s => s.userId === userId);

  if (status) {
    result = result.filter(s => s.status === status);
  }

  if (date) {
    result = result.filter(s => s.date === date);
  }

  result = sortByDate(result, 'createdAt');

  return result.slice(0, limit);
}

/**
 * Get session with all related data
 * @param {string} sessionId - Session ID
 * @returns {object|null} Full session data
 */
export function getSessionWithRelations(sessionId) {
  const session = getSessionById(sessionId);
  if (!session) return null;

  const patient = getPatientById(session.patientId);
  const chart = charts.find(c => c.sessionId === sessionId);
  const transcription = transcriptions.find(t => t.sessionId === sessionId);
  const vitals = chart ? chartVitals.find(v => v.chartId === chart.id) : null;
  const contents = chart ? chartContents.filter(c => c.chartId === chart.id) : [];
  const segments = transcription
    ? transcriptionSegments.filter(s => s.transcriptionId === transcription.id)
    : [];
  const template = chart ? getTemplateById(chart.templateId) : null;
  const sections = template ? getTemplateSections(template.id) : [];

  return {
    ...session,
    patient,
    chart,
    transcription,
    vitals,
    chartContents: contents,
    transcriptionSegments: segments,
    template,
    templateSections: sections,
  };
}

/**
 * Get session detail formatted for display
 * @param {string} sessionId - Session ID
 * @returns {object|null} Formatted session data
 */
export function getSessionDetailData(sessionId) {
  const data = getSessionWithRelations(sessionId);
  if (!data) return null;

  // Build chart data object based on template sections
  const chartData = {};
  data.chartContents.forEach(c => {
    chartData[c.sectionKey] = c.content;
  });

  // Format transcription for display
  const formattedTranscription = data.transcriptionSegments.map(seg => ({
    speaker: SpeakerTypeLabels.ko[seg.speaker] || seg.speaker,
    text: seg.text,
    timestamp: seg.timestamp,
  }));

  // Extract chief complaint from subjective
  const chiefComplaint = chartData.subjective?.split('.')[0] || '';

  return {
    id: data.id,
    date: data.date,
    time: data.time,
    createdAt: data.createdAt,
    duration: data.duration,
    durationFormatted: formatDuration(data.duration),
    diagnosis: data.chart?.diagnosis || '',
    icdCode: data.chart?.icdCode || '',
    templateId: data.chart?.templateId || '',
    template: data.template,
    templateSections: data.templateSections,
    patientId: data.patient?.id,
    patientName: data.patient?.name || '환자',
    patientAge: data.patient?.age || '',
    patientGender: data.patient?.gender || '',
    chartNo: data.patient?.chartNo || '',
    chiefComplaint,
    vitals: data.vitals ? {
      systolic: data.vitals.systolic,
      diastolic: data.vitals.diastolic,
      heartRate: data.vitals.pulse,
      temperature: data.vitals.temperature,
      respiration: data.vitals.respiration,
      spO2: data.vitals.spO2,
      weight: data.vitals.weight,
      height: data.vitals.height,
    } : null,
    transcription: formattedTranscription,
    chartData,
    soap: chartData, // Alias for backward compatibility
    isTranscriptionDeleted: data.transcription?.deletedAt !== null,
  };
}

// ============================================
// CHART SERVICES
// ============================================

/**
 * Get chart by ID
 * @param {string} chartId - Chart ID
 * @returns {object|undefined} Chart object
 */
export function getChartById(chartId) {
  return charts.find(c => c.id === chartId);
}

/**
 * Get chart contents
 * @param {string} chartId - Chart ID
 * @returns {object} Chart data by section key
 */
export function getChartData(chartId) {
  const contents = chartContents.filter(c => c.chartId === chartId);
  const chartData = {};
  contents.forEach(c => {
    chartData[c.sectionKey] = c.content;
  });
  return chartData;
}

/**
 * Get chart vitals
 * @param {string} chartId - Chart ID
 * @returns {object|undefined} Vitals object
 */
export function getChartVitals(chartId) {
  return chartVitals.find(v => v.chartId === chartId);
}

// ============================================
// HISTORY SERVICES
// ============================================

/**
 * Get history list for display
 * @param {object} options - Filter options
 * @returns {Array} History list
 */
export function getHistoryList(options = {}) {
  const { userId, limit = 50 } = options;

  let sessions = [...recordingSessions];

  if (userId) {
    sessions = sessions.filter(s => s.userId === userId);
  }

  sessions = sortByDate(sessions, 'createdAt');
  sessions = sessions.slice(0, limit);

  return sessions.map(session => {
    const patient = getPatientById(session.patientId);
    const chart = charts.find(c => c.sessionId === session.id);
    const transcription = transcriptions.find(t => t.sessionId === session.id);

    return {
      id: session.id,
      patientId: session.patientId,
      patientName: patient?.name || 'Unknown',
      patientAge: patient?.age || '',
      patientGender: patient?.gender || '',
      chartNo: patient?.chartNo || '',
      date: session.date,
      time: session.time,
      createdAt: session.createdAt,
      duration: session.duration,
      durationFormatted: formatDuration(session.duration),
      diagnosis: chart?.diagnosis || '',
      icdCode: chart?.icdCode || '',
      templateId: chart?.templateId || '',
      status: session.status,
      isTranscriptionDeleted: transcription?.deletedAt !== null,
    };
  });
}

/**
 * Get today's records for dashboard
 * @returns {Array} Today's records
 */
export function getTodayRecords() {
  const today = new Date().toISOString().split('T')[0];
  // Using mock date for demo
  const demoDate = '2024-01-29';

  return recordingSessions
    .filter(s => s.date === demoDate)
    .map(session => {
      const patient = getPatientById(session.patientId);
      const chart = charts.find(c => c.sessionId === session.id);
      return {
        id: session.id,
        time: session.time,
        diagnosis: chart?.diagnosis || '',
        patient: patient?.name || '',
        patientInfo: `${patient?.gender || ''}/${patient?.age || ''}`,
        status: session.status,
        duration: formatDuration(session.duration),
      };
    })
    .sort((a, b) => b.time.localeCompare(a.time));
}

// ============================================
// DASHBOARD SERVICES
// ============================================

/**
 * Get dashboard statistics
 * @returns {object} Dashboard stats
 */
export function getDashboardStats() {
  return dashboardStats;
}

/**
 * Get weekly statistics
 * @returns {Array} Weekly data
 */
export function getWeeklyStats() {
  return dashboardStats.weeklyData;
}

/**
 * Get top diagnoses
 * @param {number} limit - Number of diagnoses to return
 * @returns {Array} Top diagnoses
 */
export function getTopDiagnoses(limit = 5) {
  return dashboardStats.topDiagnoses.slice(0, limit);
}

// ============================================
// RETENTION SERVICES
// ============================================

/**
 * Get retention policy for entity
 * @param {string} entityType - Entity type (hospital, user)
 * @param {string} entityId - Entity ID
 * @returns {object|undefined} Retention policy
 */
export function getRetentionPolicy(entityType, entityId) {
  return retentionPolicies.find(
    rp => rp.entityType === entityType && rp.entityId === entityId
  );
}

/**
 * Check if transcription is deleted
 * @param {string} sessionId - Session ID
 * @returns {boolean} Is deleted
 */
export function isTranscriptionDeleted(sessionId) {
  const transcription = transcriptions.find(t => t.sessionId === sessionId);
  return transcription?.deletedAt !== null;
}
