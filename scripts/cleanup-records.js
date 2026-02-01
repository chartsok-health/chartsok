/**
 * Cleanup script to delete all records and patients from Firebase
 * Run with: node scripts/cleanup-records.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');

// Load env vars first
require('dotenv').config({ path: '.env.local' });

// Firebase config - same as in your app
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllData() {
  console.log('Starting full cleanup...\n');

  try {
    // Get all hospitals
    const hospitalsRef = collection(db, 'hospitals');
    const hospitalsSnapshot = await getDocs(hospitalsRef);

    console.log(`Found ${hospitalsSnapshot.size} hospitals\n`);

    for (const hospitalDoc of hospitalsSnapshot.docs) {
      const hospitalId = hospitalDoc.id;
      const hospitalName = hospitalDoc.data().name || 'Unknown';
      console.log(`Processing hospital: ${hospitalName} (${hospitalId})`);

      // Delete all records for this hospital
      const recordsRef = collection(db, 'hospitals', hospitalId, 'records');
      const recordsSnapshot = await getDocs(recordsRef);
      console.log(`  Found ${recordsSnapshot.size} records`);
      for (const recordDoc of recordsSnapshot.docs) {
        await deleteDoc(doc(db, 'hospitals', hospitalId, 'records', recordDoc.id));
        console.log(`    Deleted record: ${recordDoc.id}`);
      }

      // Delete all patients for this hospital
      const patientsRef = collection(db, 'hospitals', hospitalId, 'patients');
      const patientsSnapshot = await getDocs(patientsRef);
      console.log(`  Found ${patientsSnapshot.size} patients`);
      for (const patientDoc of patientsSnapshot.docs) {
        await deleteDoc(doc(db, 'hospitals', hospitalId, 'patients', patientDoc.id));
        console.log(`    Deleted patient: ${patientDoc.id}`);
      }

      // Delete all doctors for this hospital
      const doctorsRef = collection(db, 'hospitals', hospitalId, 'doctors');
      const doctorsSnapshot = await getDocs(doctorsRef);
      console.log(`  Found ${doctorsSnapshot.size} doctors`);
      for (const doctorDoc of doctorsSnapshot.docs) {
        await deleteDoc(doc(db, 'hospitals', hospitalId, 'doctors', doctorDoc.id));
        console.log(`    Deleted doctor: ${doctorDoc.id}`);
      }

      console.log(`  Completed hospital: ${hospitalName}\n`);
    }

    // Delete legacy collections
    const legacyCollections = ['charts', 'patients', 'doctors'];
    for (const collectionName of legacyCollections) {
      console.log(`Checking legacy ${collectionName} collection...`);
      const legacyRef = collection(db, collectionName);
      const legacySnapshot = await getDocs(legacyRef);
      if (legacySnapshot.size > 0) {
        console.log(`  Found ${legacySnapshot.size} legacy ${collectionName}`);
        for (const legacyDoc of legacySnapshot.docs) {
          await deleteDoc(doc(db, collectionName, legacyDoc.id));
          console.log(`    Deleted: ${legacyDoc.id}`);
        }
      } else {
        console.log(`  No legacy ${collectionName} found`);
      }
    }

    console.log('\nFull cleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }

  process.exit(0);
}

deleteAllData();
