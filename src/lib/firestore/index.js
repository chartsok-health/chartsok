/**
 * Firestore Services Index
 * Re-export all Firestore services for convenient imports
 */

// Base service and utilities
export {
  FirestoreService,
  timestampToDate,
  dateToTimestamp,
  convertDoc,
} from './baseService';

// Collections and schemas
export { Collections, SubCollections, Schemas } from './collections';

// User services
export {
  userService,
  userSettingsService,
  userKeywordsService,
} from './userService';

// Patient services
export {
  patientService,
  patientConsentService,
  patientAttachmentService,
} from './patientService';

// Template services
export {
  templateService,
  templateSectionService,
} from './templateService';

// Session services
export {
  recordingSessionService,
  transcriptionService,
  transcriptionSegmentService,
} from './sessionService';

// Chart services
export {
  chartService,
  chartContentService,
  chartVitalsService,
} from './chartService';

// Hospital services
export {
  hospitalService,
  userHospitalService,
  retentionPolicyService,
} from './hospitalService';
