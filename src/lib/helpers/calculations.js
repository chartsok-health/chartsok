/**
 * Calculation Helper Functions
 * Utilities for data calculations and transformations
 */

/**
 * Calculate seconds until transcription deletion
 * @param {number} createdAt - Timestamp when transcription was created
 * @param {number} retentionHours - Retention period in hours
 * @returns {number} Seconds until deletion (0 if already expired)
 */
export function getSecondsUntilDeletion(createdAt, retentionHours = 24) {
  const deletionTime = createdAt + retentionHours * 60 * 60 * 1000;
  const now = Date.now();
  return Math.max(0, Math.floor((deletionTime - now) / 1000));
}

/**
 * Calculate age from birth date
 * @param {string|Date} birthDate - Birth date
 * @returns {number} Age in years
 */
export function calculateAge(birthDate) {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Calculate BMI from weight and height
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number|null} BMI value
 */
export function calculateBMI(weight, height) {
  if (!weight || !height || height === 0) return null;
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Get BMI category
 * @param {number} bmi - BMI value
 * @param {string} locale - Locale (ko/en)
 * @returns {object} BMI category with label and color
 */
export function getBMICategory(bmi, locale = 'ko') {
  if (!bmi) return null;

  const categories = {
    ko: {
      underweight: { label: '저체중', color: '#3B82F6' },
      normal: { label: '정상', color: '#10B981' },
      overweight: { label: '과체중', color: '#F59E0B' },
      obese1: { label: '비만 1단계', color: '#EF4444' },
      obese2: { label: '비만 2단계', color: '#DC2626' },
      obese3: { label: '비만 3단계', color: '#991B1B' },
    },
    en: {
      underweight: { label: 'Underweight', color: '#3B82F6' },
      normal: { label: 'Normal', color: '#10B981' },
      overweight: { label: 'Overweight', color: '#F59E0B' },
      obese1: { label: 'Obese Class I', color: '#EF4444' },
      obese2: { label: 'Obese Class II', color: '#DC2626' },
      obese3: { label: 'Obese Class III', color: '#991B1B' },
    },
  };

  const cat = categories[locale] || categories.ko;

  if (bmi < 18.5) return cat.underweight;
  if (bmi < 23) return cat.normal;
  if (bmi < 25) return cat.overweight;
  if (bmi < 30) return cat.obese1;
  if (bmi < 35) return cat.obese2;
  return cat.obese3;
}

/**
 * Calculate statistics from an array of numbers
 * @param {number[]} values - Array of numbers
 * @returns {object} Statistics object (min, max, avg, sum, count)
 */
export function calculateStats(values) {
  if (!values || values.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };
  }

  const validValues = values.filter(v => typeof v === 'number' && !isNaN(v));

  if (validValues.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };
  }

  const sum = validValues.reduce((a, b) => a + b, 0);

  return {
    min: Math.min(...validValues),
    max: Math.max(...validValues),
    avg: parseFloat((sum / validValues.length).toFixed(2)),
    sum,
    count: validValues.length,
  };
}

/**
 * Group array items by a key
 * @param {Array} array - Array to group
 * @param {string|Function} key - Key to group by
 * @returns {object} Grouped object
 */
export function groupBy(array, key) {
  if (!array || !Array.isArray(array)) return {};

  return array.reduce((grouped, item) => {
    const keyValue = typeof key === 'function' ? key(item) : item[key];
    if (!grouped[keyValue]) {
      grouped[keyValue] = [];
    }
    grouped[keyValue].push(item);
    return grouped;
  }, {});
}

/**
 * Sort array by date field
 * @param {Array} array - Array to sort
 * @param {string} dateField - Name of date field
 * @param {boolean} ascending - Sort direction
 * @returns {Array} Sorted array
 */
export function sortByDate(array, dateField = 'createdAt', ascending = false) {
  if (!array || !Array.isArray(array)) return [];

  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Paginate array
 * @param {Array} array - Array to paginate
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {object} Paginated result
 */
export function paginate(array, page = 1, pageSize = 10) {
  if (!array || !Array.isArray(array)) {
    return { items: [], page: 1, pageSize, totalPages: 0, totalItems: 0 };
  }

  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * pageSize;
  const items = array.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page: currentPage,
    pageSize,
    totalPages,
    totalItems,
  };
}
