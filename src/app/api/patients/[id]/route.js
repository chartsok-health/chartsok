import { NextResponse } from 'next/server';
import {
  patientService,
  patientConsentService,
  patientAttachmentService,
  recordingSessionService,
  chartService,
} from '@/lib/firestore';

/**
 * GET /api/patients/[id]
 * Fetch a single patient with related data
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const patient = await patientService.getById(id);

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Get related data
    const [consents, attachments, sessions] = await Promise.all([
      patientConsentService.getByPatientId(id),
      patientAttachmentService.getByPatientId(id),
      recordingSessionService.getByPatientId(id),
    ]);

    // Get charts for sessions
    const charts = await Promise.all(
      sessions.map(s => chartService.getBySessionId(s.id))
    );

    return NextResponse.json({
      patient: {
        ...patient,
        consents,
        attachments,
        sessions,
        charts: charts.filter(Boolean),
        visitCount: sessions.length,
        lastVisit: sessions.length > 0 ? sessions[0].date : null,
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
    const { name, birthDate, gender, phone, allergies, address, notes } = body;

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
    if (allergies !== undefined) updateData.allergies = allergies;
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
