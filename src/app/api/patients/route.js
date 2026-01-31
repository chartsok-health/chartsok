import { NextResponse } from 'next/server';
import { patientService, patientConsentService, patientAttachmentService } from '@/lib/firestore';

/**
 * GET /api/patients
 * Fetch patients with optional filters
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const hospitalId = searchParams.get('hospitalId');
    const chartNo = searchParams.get('chartNo');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');

    let patients;

    if (chartNo) {
      const patient = await patientService.getByChartNo(chartNo);
      patients = patient ? [patient] : [];
    } else if (userId) {
      // Get patients by userId (no orderBy to avoid composite index requirement)
      patients = await patientService.query(
        [{ field: 'userId', operator: '==', value: userId }],
        { limitCount: limit }
      );
      // Sort in memory by createdAt descending
      patients.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
    } else if (hospitalId) {
      patients = await patientService.getByHospitalId(hospitalId, { limitCount: limit });

      // Filter by search term if provided
      if (search) {
        const searchLower = search.toLowerCase();
        patients = patients.filter(p =>
          p.name?.toLowerCase().includes(searchLower) ||
          p.chartNo?.toLowerCase().includes(searchLower)
        );
      }
    } else {
      patients = await patientService.getAll({
        orderByField: 'createdAt',
        orderDirection: 'desc',
        limitCount: limit
      });
    }

    // Filter out deleted patients
    patients = patients.filter(p => !p.deletedAt && p.status !== 'deleted');

    return NextResponse.json({
      patients,
      total: patients.length,
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/patients
 * Create a new patient
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, hospitalId, name, birthDate, gender, phone, allergies, chartNo, address, notes, status } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Use default hospitalId if not provided
    const effectiveHospitalId = hospitalId || 'default';

    const patient = await patientService.createPatient(effectiveHospitalId, {
      userId,
      name,
      birthDate: birthDate || null,
      gender: gender || null,
      phone: phone || null,
      allergies: allergies || null,
      chartNo: chartNo || null,
      address: address || null,
      notes: notes || null,
      status: status || 'active', // Default to active
    });

    return NextResponse.json({
      patient,
      message: 'Patient created successfully',
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}
