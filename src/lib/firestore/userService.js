/**
 * User Firestore Service
 * CRUD operations for users, settings, and keywords
 */

import { FirestoreService, convertDoc } from './baseService';
import { Collections } from './collections';
import { db } from '../firebase-db';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

class UserService extends FirestoreService {
  constructor() {
    super(Collections.USERS);
  }

  /**
   * Get user by email
   */
  async getByEmail(email) {
    const users = await this.query([{ field: 'email', operator: '==', value: email }]);
    return users[0] || null;
  }

  /**
   * Create or update user from Firebase Auth
   */
  async upsertFromAuth(authUser, additionalData = {}) {
    const existingUser = await this.getById(authUser.uid);

    if (existingUser) {
      return this.update(authUser.uid, {
        lastLoginAt: Timestamp.now(),
        ...additionalData,
      });
    }

    return this.createWithId(authUser.uid, {
      email: authUser.email,
      displayName: authUser.displayName || '',
      specialty: null,
      licenseNo: null,
      phone: authUser.phoneNumber || null,
      profileImage: authUser.photoURL || null,
      role: 'doctor',
      ...additionalData,
    });
  }

  /**
   * Update last login time
   */
  async updateLastLogin(userId) {
    return this.update(userId, {
      lastLoginAt: Timestamp.now(),
    });
  }
}

class UserSettingsService extends FirestoreService {
  constructor() {
    super(Collections.USER_SETTINGS);
  }

  /**
   * Get settings by user ID
   */
  async getByUserId(userId) {
    const settings = await this.query([{ field: 'userId', operator: '==', value: userId }]);
    return settings[0] || null;
  }

  /**
   * Create default settings for new user
   */
  async createDefault(userId) {
    return this.create({
      userId,
      defaultTemplateId: null,
      chartTemplate: 'soap',
      autoSave: true,
      includeICD: true,
      defaultLanguage: 'ko',
      emailNotifications: true,
      soundEnabled: true,
      speakerDetection: true,
      autoCorrect: true,
      medicalTerms: true,
      retentionHours: 24,
    });
  }

  /**
   * Update settings by user ID
   */
  async updateByUserId(userId, data) {
    const settings = await this.getByUserId(userId);
    if (settings) {
      return this.update(settings.id, data);
    }
    return this.create({ userId, ...data });
  }
}

class UserKeywordsService extends FirestoreService {
  constructor() {
    super(Collections.USER_KEYWORDS);
  }

  /**
   * Get all keywords for a user
   */
  async getByUserId(userId) {
    const keywords = await this.query(
      [{ field: 'userId', operator: '==', value: userId }]
    );
    // Sort in memory to avoid composite index requirement
    keywords.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
    return keywords;
  }

  /**
   * Get keywords by user and category
   */
  async getByUserAndCategory(userId, category) {
    return this.query([
      { field: 'userId', operator: '==', value: userId },
      { field: 'category', operator: '==', value: category },
    ]);
  }

  /**
   * Add keyword for user
   */
  async addKeyword(userId, term, category) {
    return this.create({
      userId,
      term,
      category,
    });
  }

  /**
   * Delete all keywords for a user
   */
  async deleteByUserId(userId) {
    const keywords = await this.getByUserId(userId);
    const ids = keywords.map((k) => k.id);
    if (ids.length > 0) {
      return this.batchDelete(ids);
    }
    return { deleted: 0 };
  }
}

// Export singleton instances
export const userService = new UserService();
export const userSettingsService = new UserSettingsService();
export const userKeywordsService = new UserKeywordsService();
