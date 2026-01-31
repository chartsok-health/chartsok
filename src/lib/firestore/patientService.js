/**
 * Patient Firestore Service
 * CRUD operations for patients, consents, and attachments
 */

import { FirestoreService } from './baseService';
import { Collections } from './collections';
import { Timestamp } from 'firebase/firestore';

class PatientService extends FirestoreService {
  constructor() {
    super(Collections.PATIENTS);
  }

  /**
   * Get patients by hospital ID
   */
  async getByHospitalId(hospitalId, options = {}) {
    return this.query(
      [{ field: 'hospitalId', operator: '==', value: hospitalId }],
      { orderByField: 'createdAt', orderDirection: 'desc', ...options }
    );
  }

  /**
   * Get patient by chart number
   */
  async getByChartNo(chartNo) {
    const patients = await this.query([{ field: 'chartNo', operator: '==', value: chartNo }]);
    return patients[0] || null;
  }

  /**
   * Search patients by name
   */
  async searchByName(hospitalId, searchTerm) {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or Elasticsearch
    const patients = await this.getByHospitalId(hospitalId);
    return patients.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Generate next chart number for hospital
   */
  async generateChartNo(hospitalId, prefix = 'P') {
    const year = new Date().getFullYear();
    const patients = await this.getByHospitalId(hospitalId);

    // Filter patients from current year
    const yearPrefix = `${prefix}-${year}-`;
    const currentYearPatients = patients.filter((p) => p.chartNo?.startsWith(yearPrefix));

    // Find the highest sequence number
    let maxSeq = 0;
    currentYearPatients.forEach((p) => {
      const seq = parseInt(p.chartNo.split('-')[2], 10);
      if (seq > maxSeq) maxSeq = seq;
    });

    return `${yearPrefix}${(maxSeq + 1).toString().padStart(3, '0')}`;
  }

  /**
   * Create new patient with auto-generated chart number
   */
  async createPatient(hospitalId, data) {
    const chartNo = await this.generateChartNo(hospitalId);
    return this.create({
      ...data,
      hospitalId,
      chartNo,
    });
  }
}

class PatientConsentService extends FirestoreService {
  constructor() {
    super(Collections.PATIENT_CONSENTS);
  }

  /**
   * Get consents by patient ID
   */
  async getByPatientId(patientId) {
    return this.query(
      [{ field: 'patientId', operator: '==', value: patientId }],
      { orderByField: 'timestamp', orderDirection: 'desc' }
    );
  }

  /**
   * Get consent by patient and type
   */
  async getByPatientAndType(patientId, consentType) {
    const consents = await this.query([
      { field: 'patientId', operator: '==', value: patientId },
      { field: 'consentType', operator: '==', value: consentType },
    ]);
    return consents[0] || null;
  }

  /**
   * Record patient consent
   */
  async recordConsent(patientId, consentType, signatureData = null) {
    return this.create({
      patientId,
      consentType,
      timestamp: Timestamp.now(),
      signatureData,
    });
  }

  /**
   * Check if patient has valid consent
   */
  async hasValidConsent(patientId, consentType) {
    const consent = await this.getByPatientAndType(patientId, consentType);
    return consent !== null;
  }
}

class PatientAttachmentService extends FirestoreService {
  constructor() {
    super(Collections.PATIENT_ATTACHMENTS);
  }

  /**
   * Get attachments by patient ID
   */
  async getByPatientId(patientId) {
    return this.query(
      [{ field: 'patientId', operator: '==', value: patientId }],
      { orderByField: 'createdAt', orderDirection: 'desc' }
    );
  }

  /**
   * Get attachments by type
   */
  async getByPatientAndType(patientId, type) {
    return this.query([
      { field: 'patientId', operator: '==', value: patientId },
      { field: 'type', operator: '==', value: type },
    ]);
  }

  /**
   * Add attachment for patient
   */
  async addAttachment(patientId, data) {
    return this.create({
      patientId,
      ...data,
    });
  }
}

// Export singleton instances
export const patientService = new PatientService();
export const patientConsentService = new PatientConsentService();
export const patientAttachmentService = new PatientAttachmentService();
