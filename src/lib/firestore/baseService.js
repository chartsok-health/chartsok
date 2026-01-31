/**
 * Base Firestore Service
 * Common CRUD operations for all collections
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase-db';

/**
 * Convert Firestore Timestamp to Date
 */
export function timestampToDate(timestamp) {
  if (!timestamp) return null;
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
}

/**
 * Convert Date to Firestore Timestamp
 */
export function dateToTimestamp(date) {
  if (!date) return null;
  if (date instanceof Timestamp) return date;
  return Timestamp.fromDate(new Date(date));
}

/**
 * Convert document data with timestamps
 */
export function convertDoc(doc) {
  if (!doc.exists()) return null;

  const data = doc.data();
  const converted = { id: doc.id };

  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Timestamp) {
      converted[key] = data[key].toMillis();
    } else {
      converted[key] = data[key];
    }
  });

  return converted;
}

/**
 * Base service class for Firestore operations
 */
export class FirestoreService {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  /**
   * Get collection reference
   */
  getCollection() {
    return collection(db, this.collectionName);
  }

  /**
   * Get document reference
   */
  getDocRef(id) {
    return doc(db, this.collectionName, id);
  }

  /**
   * Get a single document by ID
   */
  async getById(id) {
    try {
      const docRef = this.getDocRef(id);
      const docSnap = await getDoc(docRef);
      return convertDoc(docSnap);
    } catch (error) {
      console.error(`Error getting ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  /**
   * Get all documents in collection
   */
  async getAll(options = {}) {
    try {
      const { orderByField, orderDirection = 'desc', limitCount } = options;
      let q = this.getCollection();

      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }

      if (limitCount) {
        q = query(q, limit(limitCount));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(convertDoc);
    } catch (error) {
      console.error(`Error getting all ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Query documents with filters
   */
  async query(filters = [], options = {}) {
    try {
      const { orderByField, orderDirection = 'desc', limitCount, startAfterDoc } = options;
      let q = this.getCollection();

      // Apply filters
      filters.forEach(({ field, operator, value }) => {
        q = query(q, where(field, operator, value));
      });

      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }

      // Apply pagination
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      if (limitCount) {
        q = query(q, limit(limitCount));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(convertDoc);
    } catch (error) {
      console.error(`Error querying ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Create a new document with auto-generated ID
   */
  async create(data) {
    try {
      const now = Timestamp.now();
      const docData = {
        ...data,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(this.getCollection(), docData);
      return { id: docRef.id, ...docData, createdAt: now.toMillis(), updatedAt: now.toMillis() };
    } catch (error) {
      console.error(`Error creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Create a document with specific ID
   */
  async createWithId(id, data) {
    try {
      const now = Timestamp.now();
      const docData = {
        ...data,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(this.getDocRef(id), docData);
      return { id, ...docData, createdAt: now.toMillis(), updatedAt: now.toMillis() };
    } catch (error) {
      console.error(`Error creating ${this.collectionName} with ID:`, error);
      throw error;
    }
  }

  /**
   * Update a document
   */
  async update(id, data) {
    try {
      const now = Timestamp.now();
      const updateData = {
        ...data,
        updatedAt: now,
      };

      // Remove undefined values
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      await updateDoc(this.getDocRef(id), updateData);
      return { id, ...updateData, updatedAt: now.toMillis() };
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  async delete(id) {
    try {
      await deleteDoc(this.getDocRef(id));
      return { id, deleted: true };
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Batch create multiple documents
   */
  async batchCreate(items) {
    try {
      const batch = writeBatch(db);
      const now = Timestamp.now();
      const results = [];

      items.forEach((item) => {
        const docRef = doc(this.getCollection());
        const docData = {
          ...item,
          createdAt: now,
          updatedAt: now,
        };
        batch.set(docRef, docData);
        results.push({ id: docRef.id, ...docData });
      });

      await batch.commit();
      return results;
    } catch (error) {
      console.error(`Error batch creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Batch delete multiple documents
   */
  async batchDelete(ids) {
    try {
      const batch = writeBatch(db);

      ids.forEach((id) => {
        batch.delete(this.getDocRef(id));
      });

      await batch.commit();
      return { deleted: ids.length };
    } catch (error) {
      console.error(`Error batch deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Check if document exists
   */
  async exists(id) {
    try {
      const docSnap = await getDoc(this.getDocRef(id));
      return docSnap.exists();
    } catch (error) {
      console.error(`Error checking existence in ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Count documents matching query
   */
  async count(filters = []) {
    try {
      const docs = await this.query(filters);
      return docs.length;
    } catch (error) {
      console.error(`Error counting ${this.collectionName}:`, error);
      throw error;
    }
  }
}
