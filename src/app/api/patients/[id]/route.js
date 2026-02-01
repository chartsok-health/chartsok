import { NextResponse } from 'next/server';
import {
  patientService,
  patientConsentService,
  patientAttachmentService,
} from '@/lib/firestore';
import { db } from '@/lib/firebase-db';
import { collection, getDocs, query, where } from 'firebase/firestore';

/**
 * GET /api/patients/[id]
 * Fetch a single patient with related data
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');

    const patient = await patientService.getById(id);

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Get consents and attachments
    const [consents, attachments] = await Promise.all([
      patientConsentService.getByPatientId(id),
      patientAttachmentService.getByPatientId(id),
    ]);

    // Helper to format date in local timezone
    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Get records from hospital's records collection
    let records = [];
    let visitCount = 0;
    let lastVisit = null;

    if (hospitalId) {
      try {
        const recordsRef = collection(db, 'hospitals', hospitalId, 'records');
        const q = query(recordsRef, where('patientId', '==', id));
        const recordsSnapshot = await getDocs(q);

        records = recordsSnapshot.docs.map(doc => {
          const data = doc.data();
          let createdAt = null;
          if (data.createdAt) {
            createdAt = typeof data.createdAt === 'string'
              ? new Date(data.createdAt)
              : data.createdAt.toDate?.() || new Date(data.createdAt);
          }
          return {
            id: doc.id,
            ...data,
            createdAt: createdAt ? createdAt.toISOString() : null,
            date: createdAt ? formatLocalDate(createdAt) : null,
          };
        });

        // Sort by createdAt descending
        records.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });

        visitCount = records.length;
        lastVisit = records.length > 0 ? records[0].date : null;
      } catch (recordsError) {
        console.error('Error fetching patient records:', recordsError);
      }
    }

    return NextResponse.json({
      patient: {
        ...patient,
        consents,
        attachments,
        records,
        visitCount,
        lastVisit,
      },
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/patients/[id]
 * Update a patient
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, birthDate, gender, phone, address, notes } = body;

    const existing = await patientService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (birthDate !== undefined) updateData.birthDate = birthDate;
    if (gender !== undefined) updateData.gender = gender;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await patientService.update(id, updateData);

    return NextResponse.json({
      patient: updated,
      message: 'Patient updated successfully',
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    return NextResponse.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/patients/[id]
 * Partial update (e.g., status change for archive/restore)
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const existing = await patientService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    const updateData = {};
    if (status !== undefined) {
      updateData.status = status;
      // If restoring from archived, clear deletedAt
      if (status === 'active') {
        updateData.deletedAt = null;
      }
    }

    const updated = await patientService.update(id, updateData);

    return NextResponse.json({
      patient: updated,
      message: 'Patient status updated successfully',
    });
  } catch (error) {
    console.error('Error updating patient status:', error);
    return NextResponse.json(
      { error: 'Failed to update patient status' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/patients/[id]
 * Delete a patient (soft delete recommended for medical records)
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existing = await patientService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // For medical records, consider soft delete instead
    // For now, we'll mark as deleted rather than removing
    await patientService.update(id, {
      deletedAt: new Date().toISOString(),
      status: 'deleted'
    });

    return NextResponse.json({
      message: 'Patient deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}
