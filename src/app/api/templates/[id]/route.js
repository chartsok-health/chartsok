import { NextResponse } from 'next/server';
import { getTemplateById, getTemplateSections } from '@/lib/services';

/**
 * GET /api/templates/[id]
 * Fetch a single template with its sections
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const template = getTemplateById(id);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    const sections = getTemplateSections(id);

    return NextResponse.json({
      template: {
        ...template,
        sections,
      },
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}
