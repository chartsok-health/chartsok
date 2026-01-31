/**
 * Firebase Server Configuration
 * For use in API routes and server components
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
function initAdmin() {
  if (getApps().length === 0) {
    // Use service account credentials if available, otherwise use default
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    if (!projectId) {
      throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
    }

    // Try to use service account if available
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      initializeApp({
        credential: cert(serviceAccount),
        projectId,
      });
    } else {
      // Use application default credentials (for local dev with gcloud auth)
      initializeApp({
        projectId,
      });
    }
  }

  return getFirestore();
}

export const adminDb = initAdmin();
