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
    const patients = await this.query(
      [{ field: 'hospitalId', operator: '==', value: hospitalId }],
      { ...options }
    );
    // Sort in memory to avoid composite index requirement
    patients.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
    return patients;
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
    const consents = await this.query(
      [{ field: 'patientId', operator: '==', value: patientId }]
    );
    // Sort in memory to avoid composite index requirement
    consents.sort((a, b) => {
      const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : (a.timestamp ? new Date(a.timestamp) : new Date(0));
      const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : (b.timestamp ? new Date(b.timestamp) : new Date(0));
      return dateB - dateA;
    });
    return consents;
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
    const attachments = await this.query(
      [{ field: 'patientId', operator: '==', value: patientId }]
    );
    // Sort in memory to avoid composite index requirement
    attachments.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
    return attachments;
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
