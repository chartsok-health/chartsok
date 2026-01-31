/**
 * Hospital Firestore Service
 * CRUD operations for hospitals and user-hospital relationships
 */

import { FirestoreService } from './baseService';
import { Collections } from './collections';
import { db } from '../firebase-db';
import { writeBatch, doc } from 'firebase/firestore';

class HospitalService extends FirestoreService {
  constructor() {
    super(Collections.HOSPITALS);
  }

  /**
   * Get hospital by business number
   */
  async getByBusinessNo(businessNo) {
    const hospitals = await this.query([{ field: 'businessNo', operator: '==', value: businessNo }]);
    return hospitals[0] || null;
  }

  /**
   * Search hospitals by name
   */
  async searchByName(searchTerm) {
    const hospitals = await this.getAll();
    return hospitals.filter((h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Get hospitals by type
   */
  async getByType(type) {
    return this.query([{ field: 'type', operator: '==', value: type }]);
  }
}

class UserHospitalService extends FirestoreService {
  constructor() {
    super(Collections.USER_HOSPITALS);
  }

  /**
   * Get user's hospitals
   */
  async getByUserId(userId) {
    return this.query([{ field: 'userId', operator: '==', value: userId }]);
  }

  /**
   * Get user's primary hospital
   */
  async getPrimaryByUserId(userId) {
    const relations = await this.query([
      { field: 'userId', operator: '==', value: userId },
      { field: 'isPrimary', operator: '==', value: true },
    ]);
    return relations[0] || null;
  }

  /**
   * Get hospital's users
   */
  async getByHospitalId(hospitalId) {
    return this.query([{ field: 'hospitalId', operator: '==', value: hospitalId }]);
  }

  /**
   * Associate user with hospital
   */
  async associateUser(userId, hospitalId, role = 'doctor', isPrimary = false) {
    // If setting as primary, unset other primaries first
    if (isPrimary) {
      const existing = await this.getByUserId(userId);
      const batch = writeBatch(db);

      existing.forEach((rel) => {
        if (rel.isPrimary) {
          batch.update(this.getDocRef(rel.id), { isPrimary: false });
        }
      });

      await batch.commit();
    }

    return this.create({
      userId,
      hospitalId,
      role,
      isPrimary,
    });
  }

  /**
   * Remove user from hospital
   */
  async removeUser(userId, hospitalId) {
    const relations = await this.query([
      { field: 'userId', operator: '==', value: userId },
      { field: 'hospitalId', operator: '==', value: hospitalId },
    ]);

    if (relations.length > 0) {
      return this.delete(relations[0].id);
    }

    return { deleted: false };
  }

  /**
   * Update user's role in hospital
   */
  async updateRole(userId, hospitalId, role) {
    const relations = await this.query([
      { field: 'userId', operator: '==', value: userId },
      { field: 'hospitalId', operator: '==', value: hospitalId },
    ]);

    if (relations.length > 0) {
      return this.update(relations[0].id, { role });
    }

    return null;
  }
}

class RetentionPolicyService extends FirestoreService {
  constructor() {
    super(Collections.RETENTION_POLICIES);
  }

  /**
   * Get policy by entity
   */
  async getByEntity(entityType, entityId) {
    const policies = await this.query([
      { field: 'entityType', operator: '==', value: entityType },
      { field: 'entityId', operator: '==', value: entityId },
    ]);
    return policies[0] || null;
  }

  /**
   * Get hospital retention policy
   */
  async getHospitalPolicy(hospitalId) {
    return this.getByEntity('hospital', hospitalId);
  }

  /**
   * Get user retention policy
   */
  async getUserPolicy(userId) {
    return this.getByEntity('user', userId);
  }

  /**
   * Set retention policy
   */
  async setPolicy(entityType, entityId, retentionHours) {
    const existing = await this.getByEntity(entityType, entityId);
    if (existing) {
      return this.update(existing.id, { retentionHours });
    }
    return this.create({ entityType, entityId, retentionHours });
  }

  /**
   * Get effective retention hours for user
   */
  async getEffectiveRetention(userId, hospitalId) {
    // Priority: User policy > Hospital policy > Default (24 hours)
    const userPolicy = await this.getUserPolicy(userId);
    if (userPolicy) return userPolicy.retentionHours;

    const hospitalPolicy = await this.getHospitalPolicy(hospitalId);
    if (hospitalPolicy) return hospitalPolicy.retentionHours;

    return 24; // Default
  }
}

// Export singleton instances
export const hospitalService = new HospitalService();
export const userHospitalService = new UserHospitalService();
export const retentionPolicyService = new RetentionPolicyService();
