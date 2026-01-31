import { NextResponse } from 'next/server';
import { userSettingsService } from '@/lib/firestore';

/**
 * GET /api/settings
 * Fetch user settings
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

    let settings = await userSettingsService.getByUserId(userId);

    // Create default settings if none exist
    if (!settings) {
      settings = await userSettingsService.createDefault(userId);
    }

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
 * Update user settings
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

    // Check if settings exist, create if not
    let existing = await userSettingsService.getByUserId(userId);
    if (!existing) {
      await userSettingsService.createDefault(userId);
    }

    const updated = await userSettingsService.updateByUserId(userId, settingsData);

    return NextResponse.json({
      settings: updated,
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
