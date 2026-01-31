import { NextResponse } from 'next/server';
import { userService } from '@/lib/firestore';

/**
 * GET /api/settings
 * Fetch user settings from users collection
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const user = await userService.getById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data as settings
    const settings = {
      displayName: user.displayName || '',
      specialty: user.specialty || '내과',
      hospitalName: user.hospitalName || '',
      email: user.email || '',
      phone: user.phone || '',
      licenseNo: user.licenseNo || '',
      address: user.address || '',
      emailNotifications: user.emailNotifications ?? true,
      soundEnabled: user.soundEnabled ?? true,
      aiTone: user.aiTone || '',
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Update user settings in users collection
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { userId, ...settingsData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Update user directly
    await userService.update(userId, settingsData);

    const updated = await userService.getById(userId);

    return NextResponse.json({
      settings: {
        displayName: updated.displayName || '',
        specialty: updated.specialty || '내과',
        hospitalName: updated.hospitalName || '',
        email: updated.email || '',
        phone: updated.phone || '',
        licenseNo: updated.licenseNo || '',
        address: updated.address || '',
        emailNotifications: updated.emailNotifications ?? true,
        soundEnabled: updated.soundEnabled ?? true,
        aiTone: updated.aiTone || '',
      },
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
