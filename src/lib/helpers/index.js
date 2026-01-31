/**
 * Helper Functions Index
 * Re-export all helpers for convenient imports
 */

// Formatters
export {
  formatDuration,
  formatDurationLong,
  formatCountdown,
  formatDate,
  formatTime,
  formatRelativeTime,
  formatPhone,
  formatPatientInfo,
  formatVitals,
  formatFileSize,
} from './formatters';

// Calculations
export {
  getSecondsUntilDeletion,
  calculateAge,
  calculateBMI,
  getBMICategory,
  calculateStats,
  groupBy,
  sortByDate,
  paginate,
} from './calculations';

// Generators
export {
  generateUUID,
  generatePrefixedId,
  generateShortId,
  generateChartNo,
  generateSessionId,
  generateKoreanName,
  generatePhoneNumber,
  generateRandomDate,
  generateBirthDate,
  generateBloodType,
  generateColorFromString,
} from './generators';
