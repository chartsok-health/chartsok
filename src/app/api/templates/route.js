import { NextResponse } from 'next/server';
import { templates } from '@/lib/mockDatabase';
import { getTemplateSections } from '@/lib/services';

/**
 * GET /api/templates
 * Fetch all templates with their sections
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const includeSystem = searchParams.get('includeSystem') !== 'false';

    // Filter templates
    let filteredTemplates = templates;

    if (specialty) {
      filteredTemplates = templates.filter(
        t => t.specialty === specialty || t.specialty === null
      );
    }

    if (!includeSystem) {
      filteredTemplates = filteredTemplates.filter(t => !t.isSystem);
    }

    // Add sections to each template
    const templatesWithSections = filteredTemplates.map(template => ({
      ...template,
      sections: getTemplateSections(template.id),
    }));

    return NextResponse.json({
      templates: templatesWithSections,
      total: templatesWithSections.length,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
