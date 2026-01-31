/**
 * Services Index
 * Re-export all services for convenient imports
 */

export {
  // User services
  getUserById,
  getUserByEmail,
  getUserSettings,
  getUserKeywords,
  getUserHospital,

  // Patient services
  getPatientById,
  getPatientByChartNo,
  getPatientsByHospital,
  getPatientWithHistory,
  getPatientAttachments,
  getPatientConsent,

  // Template services
  getTemplateById,
  getTemplates,
  getTemplateSections,
  getTemplateWithSections,

  // Session services
  getSessionById,
  getUserSessions,
  getSessionWithRelations,
  getSessionDetailData,

  // Chart services
  getChartById,
  getChartData,
  getChartVitals,

  // History services
  getHistoryList,
  getTodayRecords,

  // Dashboard services
  getDashboardStats,
  getWeeklyStats,
  getTopDiagnoses,

  // Retention services
  getRetentionPolicy,
  isTranscriptionDeleted,
} from './dataService';
