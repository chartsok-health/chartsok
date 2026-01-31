/**
 * Generator Helper Functions
 * Utilities for generating IDs, codes, and random data
 */

/**
 * Generate UUID v4
 * @returns {string} UUID string
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generate prefixed ID
 * @param {string} prefix - ID prefix (e.g., 'usr', 'chrt', 'ses')
 * @returns {string} Prefixed ID
 */
export function generatePrefixedId(prefix = 'id') {
  return `${prefix}_${generateUUID()}`;
}

/**
 * Generate short ID
 * @param {number} length - Length of ID
 * @returns {string} Short alphanumeric ID
 */
export function generateShortId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate chart number
 * @param {string} prefix - Prefix for chart number
 * @param {number} sequence - Sequence number
 * @returns {string} Chart number (e.g., P-2024-001)
 */
export function generateChartNo(prefix = 'P', sequence = 1) {
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${sequence.toString().padStart(3, '0')}`;
}

/**
 * Generate session ID with timestamp
 * @returns {string} Session ID
 */
export function generateSessionId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `ses_${timestamp}_${random}`;
}

/**
 * Generate random Korean name
 * @returns {string} Random Korean name
 */
export function generateKoreanName() {
  const surnames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권'];
  const names = ['민수', '영희', '철수', '지영', '현우', '수진', '대현', '민정', '재혁', '소희', '서연', '민호', '수현', '지훈'];

  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const name = names[Math.floor(Math.random() * names.length)];

  return `${surname}${name}`;
}

/**
 * Generate random phone number
 * @returns {string} Random Korean phone number
 */
export function generatePhoneNumber() {
  const middle = Math.floor(1000 + Math.random() * 9000);
  const last = Math.floor(1000 + Math.random() * 9000);
  return `010-${middle}-${last}`;
}

/**
 * Generate random date within range
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {Date} Random date
 */
export function generateRandomDate(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

/**
 * Generate random birth date for age range
 * @param {number} minAge - Minimum age
 * @param {number} maxAge - Maximum age
 * @returns {string} Birth date in YYYY-MM-DD format
 */
export function generateBirthDate(minAge = 20, maxAge = 80) {
  const today = new Date();
  const age = minAge + Math.floor(Math.random() * (maxAge - minAge));
  const birthYear = today.getFullYear() - age;
  const birthMonth = Math.floor(Math.random() * 12);
  const birthDay = Math.floor(Math.random() * 28) + 1;

  const birthDate = new Date(birthYear, birthMonth, birthDay);
  return birthDate.toISOString().split('T')[0];
}

/**
 * Generate random blood type
 * @returns {string} Blood type
 */
export function generateBloodType() {
  const types = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const weights = [35, 5, 27, 3, 20, 5, 4, 1]; // Approximate distribution

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < types.length; i++) {
    if (random < weights[i]) return types[i];
    random -= weights[i];
  }

  return types[0];
}

/**
 * Generate color from string (for avatars, etc.)
 * @param {string} str - Input string
 * @returns {string} Hex color
 */
export function generateColorFromString(str) {
  if (!str) return '#4B9CD3';

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    '#4B9CD3', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  ];

  return colors[Math.abs(hash) % colors.length];
}
