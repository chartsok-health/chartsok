/**
 * Recording Session Firestore Service
 * CRUD operations for sessions, transcriptions, and segments
 */

import { FirestoreService } from './baseService';
import { Collections } from './collections';
import { db } from '../firebase-db';
import { writeBatch, doc, Timestamp } from 'firebase/firestore';

class RecordingSessionService extends FirestoreService {
  constructor() {
    super(Collections.RECORDING_SESSIONS);
  }

  /**
   * Get sessions by user ID
   */
  async getByUserId(userId, options = {}) {
    const sessions = await this.query(
      [{ field: 'userId', operator: '==', value: userId }],
      { ...options }
    );
    // Sort in memory to avoid composite index requirement
    sessions.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
    return sessions;
  }

  /**
   * Get sessions by patient ID
   */
  async getByPatientId(patientId, options = {}) {
    const sessions = await this.query(
      [{ field: 'patientId', operator: '==', value: patientId }],
      { ...options }
    );
    // Sort in memory to avoid composite index requirement
    sessions.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
    return sessions;
  }

  /**
   * Get sessions by date
   */
  async getByDate(userId, date) {
    return this.query([
      { field: 'userId', operator: '==', value: userId },
      { field: 'date', operator: '==', value: date },
    ]);
  }

  /**
   * Get today's sessions for user
   */
  async getTodaySessions(userId) {
    const today = new Date().toISOString().split('T')[0];
    return this.getByDate(userId, today);
  }

  /**
   * Start new recording session
   */
  async startSession(userId, patientId, hospitalId) {
    const now = new Date();
    return this.create({
      userId,
      patientId,
      hospitalId,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      duration: 0,
      status: 'recording',
    });
  }

  /**
   * Complete recording session
   */
  async completeSession(sessionId, duration) {
    return this.update(sessionId, {
      duration,
      status: 'completed',
    });
  }

  /**
   * Update session status
   */
  async updateStatus(sessionId, status) {
    return this.update(sessionId, { status });
  }
}

class TranscriptionService extends FirestoreService {
  constructor() {
    super(Collections.TRANSCRIPTIONS);
  }

  /**
   * Get transcription by session ID
   */
  async getBySessionId(sessionId) {
    const transcriptions = await this.query([
      { field: 'sessionId', operator: '==', value: sessionId },
    ]);
    return transcriptions[0] || null;
  }

  /**
   * Create transcription for session
   */
  async createForSession(sessionId, retentionHours = 24) {
    const now = Timestamp.now();
    const retentionUntil = Timestamp.fromMillis(now.toMillis() + retentionHours * 60 * 60 * 1000);

    return this.create({
      sessionId,
      retentionUntil,
      deletedAt: null,
    });
  }

  /**
   * Mark transcription as deleted
   */
  async markDeleted(transcriptionId) {
    return this.update(transcriptionId, {
      deletedAt: Timestamp.now(),
    });
  }

  /**
   * Get transcriptions due for deletion
   */
  async getDueForDeletion() {
    const now = Timestamp.now();
    return this.query([
      { field: 'retentionUntil', operator: '<=', value: now },
      { field: 'deletedAt', operator: '==', value: null },
    ]);
  }

  /**
   * Check if transcription is deleted
   */
  async isDeleted(sessionId) {
    const transcription = await this.getBySessionId(sessionId);
    return transcription?.deletedAt !== null;
  }
}

class TranscriptionSegmentService extends FirestoreService {
  constructor() {
    super(Collections.TRANSCRIPTION_SEGMENTS);
  }

  /**
   * Get segments by transcription ID
   */
  async getByTranscriptionId(transcriptionId) {
    const segments = await this.query(
      [{ field: 'transcriptionId', operator: '==', value: transcriptionId }]
    );
    // Sort in memory to avoid composite index requirement
    segments.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
    return segments;
  }

  /**
   * Add segments for transcription
   */
  async addSegments(transcriptionId, segments) {
    return this.batchCreate(
      segments.map((segment, index) => ({
        transcriptionId,
        sequence: index + 1,
        ...segment,
      }))
    );
  }

  /**
   * Delete all segments for transcription
   */
  async deleteByTranscriptionId(transcriptionId) {
    const segments = await this.getByTranscriptionId(transcriptionId);
    const ids = segments.map((s) => s.id);
    if (ids.length > 0) {
      return this.batchDelete(ids);
    }
    return { deleted: 0 };
  }
}

// Export singleton instances
export const recordingSessionService = new RecordingSessionService();
export const transcriptionService = new TranscriptionService();
export const transcriptionSegmentService = new TranscriptionSegmentService();
