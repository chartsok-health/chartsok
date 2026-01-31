import { NextResponse } from 'next/server';
import { userKeywordsService } from '@/lib/firestore';

/**
 * GET /api/keywords
 * Fetch user keywords/shortcuts
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    let keywords;
    if (category) {
      keywords = await userKeywordsService.getByUserAndCategory(userId, category);
    } else {
      keywords = await userKeywordsService.getByUserId(userId);
    }

    return NextResponse.json({
      keywords: keywords || [],
      total: keywords?.length || 0,
    });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keywords' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/keywords
 * Add a new keyword/shortcut
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, term, expansion, category } = body;

    if (!userId || !term) {
      return NextResponse.json(
        { error: 'userId and term are required' },
        { status: 400 }
      );
    }

    const keyword = await userKeywordsService.addKeyword(
      userId,
      term,
      category || 'general'
    );

    return NextResponse.json({
      keyword,
      message: 'Keyword added successfully',
    });
  } catch (error) {
    console.error('Error adding keyword:', error);
    return NextResponse.json(
      { error: 'Failed to add keyword' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/keywords
 * Delete a keyword by ID
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywordId = searchParams.get('id');

    if (!keywordId) {
      return NextResponse.json(
        { error: 'keyword id is required' },
        { status: 400 }
      );
    }

    await userKeywordsService.delete(keywordId);

    return NextResponse.json({
      message: 'Keyword deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting keyword:', error);
    return NextResponse.json(
      { error: 'Failed to delete keyword' },
      { status: 500 }
    );
  }
}
