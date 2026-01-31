/**
 * Formatting Helper Functions
 * Utilities for formatting data display
 */

/**
 * Format duration in seconds to MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export function formatDuration(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format duration in seconds to HH:MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export function formatDurationLong(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) return '00:00:00';
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format countdown display (HH:MM:SS)
 * @param {number} totalSeconds - Total seconds remaining
 * @param {string} locale - Locale for labels (ko/en)
 * @returns {string} Formatted countdown string
 */
export function formatCountdown(totalSeconds, locale = 'ko') {
  if (totalSeconds <= 0) return locale === 'ko' ? '삭제됨' : 'Deleted';
  return formatDurationLong(totalSeconds);
}

/**
 * Format date to Korean or English format
 * @param {Date|number|string} date - Date to format
 * @param {string} locale - Locale (ko/en)
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} Formatted date string
 */
export function formatDate(date, locale = 'ko', includeTime = false) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const options = {
    year: 'numeric',
    month: locale === 'ko' ? 'long' : 'short',
    day: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return d.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', options);
}

/**
 * Format time from Date object or string
 * @param {Date|number|string} date - Date to extract time from
 * @param {boolean} includeSeconds - Whether to include seconds
 * @returns {string} Formatted time string (HH:MM or HH:MM:SS)
 */
export function formatTime(date, includeSeconds = false) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  if (includeSeconds) {
    const seconds = d.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}`;
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|number|string} date - Date to format
 * @param {string} locale - Locale (ko/en)
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date, locale = 'ko') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (locale === 'ko') {
    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return formatDate(date, locale);
  } else {
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(date, locale);
  }
}

/**
 * Format phone number to Korean format
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export function formatPhone(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * Format patient info string
 * @param {object} patient - Patient object
 * @returns {string} Formatted patient info (gender/age)
 */
export function formatPatientInfo(patient) {
  if (!patient) return '';
  const parts = [];
  if (patient.gender) parts.push(patient.gender);
  if (patient.age) parts.push(patient.age);
  return parts.join('/');
}

/**
 * Format vitals for display
 * @param {object} vitals - Vitals object
 * @returns {object} Formatted vitals with units
 */
export function formatVitals(vitals) {
  if (!vitals) return null;

  return {
    bloodPressure: vitals.systolic && vitals.diastolic
      ? `${vitals.systolic}/${vitals.diastolic} mmHg`
      : null,
    heartRate: vitals.heartRate ? `${vitals.heartRate} bpm` : null,
    temperature: vitals.temperature ? `${vitals.temperature}°C` : null,
    respiration: vitals.respiration ? `${vitals.respiration}/min` : null,
    spO2: vitals.spO2 ? `${vitals.spO2}%` : null,
    weight: vitals.weight ? `${vitals.weight} kg` : null,
    height: vitals.height ? `${vitals.height} cm` : null,
  };
}

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
