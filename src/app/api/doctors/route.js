import { NextResponse } from 'next/server';
import { userService, userHospitalService, patientService } from '@/lib/firestore';

// Helper to convert Firestore Timestamp or string to date string
const formatDateString = (dateValue) => {
  if (!dateValue) return new Date().toISOString().split('T')[0];
  // Handle Firestore Timestamp
  if (dateValue?.toDate) {
    return dateValue.toDate().toISOString().split('T')[0];
  }
  // Handle string
  if (typeof dateValue === 'string') {
    return dateValue.split('T')[0];
  }
  // Handle Date object
  if (dateValue instanceof Date) {
    return dateValue.toISOString().split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
};

/**
 * GET /api/doctors
 * Fetch doctors for a hospital
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId') || 'default';
    const userId = searchParams.get('userId');

    // Get all user-hospital relationships for this hospital
    const userHospitals = await userHospitalService.getByHospitalId(hospitalId);

    // If no doctors found, return the current user as a doctor
    if (userHospitals.length === 0 && userId) {
      const currentUser = await userService.getById(userId);
      if (currentUser) {
        // Get patient count for this user
        const patients = await patientService.getByHospitalId(hospitalId, { limitCount: 1000 });

        return NextResponse.json({
          doctors: [{
            id: currentUser.id,
            name: currentUser.displayName || '이름 없음',
            specialty: currentUser.specialty || '내과',
            role: 'owner',
            email: currentUser.email || '',
            phone: currentUser.phone || '',
            licenseNo: currentUser.licenseNo || '',
            joinDate: formatDateString(currentUser.createdAt),
            status: 'active',
            patients: patients.length,
            avatar: currentUser.profileImage || null,
          }],
          total: 1,
        });
      }
    }

    // Fetch user details for each user in the hospital
    const doctorsPromises = userHospitals.map(async (uh) => {
      const user = await userService.getById(uh.userId);
      if (!user) return null;

      // Get patient count - simplified query
      const patients = await patientService.getAll({ limitCount: 1000 });
      const patientCount = patients.filter(p => p.hospitalId === hospitalId).length;

      return {
        id: user.id,
        name: user.displayName || '이름 없음',
        specialty: user.specialty || '내과',
        role: uh.role || 'doctor',
        email: user.email || '',
        phone: user.phone || '',
        licenseNo: user.licenseNo || '',
        joinDate: formatDateString(user.createdAt),
        status: 'active',
        patients: patientCount,
        avatar: user.profileImage || null,
      };
    });

    const doctors = (await Promise.all(doctorsPromises)).filter(Boolean);

    return NextResponse.json({
      doctors,
      total: doctors.length,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/doctors
 * Add a new doctor to the hospital
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { hospitalId, name, specialty, email, phone, licenseNo, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'name and email are required' },
        { status: 400 }
      );
    }

    const effectiveHospitalId = hospitalId || 'default';

    // Check if user already exists by email
    let user = await userService.getByEmail(email);

    if (!user) {
      // Create new user
      user = await userService.create({
        email,
        displayName: name,
        specialty: specialty || '내과',
        licenseNo: licenseNo || null,
        phone: phone || null,
        role: 'doctor',
        profileImage: null,
      });
    }

    // Associate user with hospital
    await userHospitalService.associateUser(
      user.id,
      effectiveHospitalId,
      role || 'doctor',
      false
    );

    return NextResponse.json({
      doctor: {
        id: user.id,
        name: user.displayName,
        specialty: user.specialty,
        role: role || 'doctor',
        email: user.email,
        phone: user.phone,
        licenseNo: user.licenseNo,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        patients: 0,
        avatar: null,
      },
      message: 'Doctor added successfully',
    });
  } catch (error) {
    console.error('Error adding doctor:', error);
    return NextResponse.json(
      { error: 'Failed to add doctor' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/doctors
 * Update a doctor's information
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, specialty, phone, licenseNo, role, hospitalId } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'doctor id is required' },
        { status: 400 }
      );
    }

    // Update user profile
    const updateData = {};
    if (name !== undefined) updateData.displayName = name;
    if (specialty !== undefined) updateData.specialty = specialty;
    if (phone !== undefined) updateData.phone = phone;
    if (licenseNo !== undefined) updateData.licenseNo = licenseNo;

    if (Object.keys(updateData).length > 0) {
      await userService.update(id, updateData);
    }

    // Update role in hospital if provided
    if (role && hospitalId) {
      await userHospitalService.updateRole(id, hospitalId, role);
    }

    const updated = await userService.getById(id);

    return NextResponse.json({
      doctor: {
        id: updated.id,
        name: updated.displayName,
        specialty: updated.specialty,
        phone: updated.phone,
        licenseNo: updated.licenseNo,
      },
      message: 'Doctor updated successfully',
    });
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json(
      { error: 'Failed to update doctor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/doctors
 * Remove a doctor from the hospital
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('id');
    const hospitalId = searchParams.get('hospitalId') || 'default';

    if (!doctorId) {
      return NextResponse.json(
        { error: 'doctor id is required' },
        { status: 400 }
      );
    }

    // Remove user-hospital association (don't delete the user account)
    await userHospitalService.removeUser(doctorId, hospitalId);

    return NextResponse.json({
      message: 'Doctor removed from hospital successfully',
    });
  } catch (error) {
    console.error('Error removing doctor:', error);
    return NextResponse.json(
      { error: 'Failed to remove doctor' },
      { status: 500 }
    );
  }
}
