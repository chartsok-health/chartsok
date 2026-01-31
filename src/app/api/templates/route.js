import { NextResponse } from 'next/server';
import { templateService, templateSectionService } from '@/lib/firestore';

/**
 * GET /api/templates
 * Fetch all templates with their sections from Firestore
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const includeSystem = searchParams.get('includeSystem') !== 'false';

    // Get templates from Firestore
    let templates;

    if (specialty) {
      templates = await templateService.getBySpecialty(specialty);
    } else {
      templates = await templateService.getAll();
    }

    if (!includeSystem) {
      templates = templates.filter(t => !t.isSystem);
    }

    // Add sections to each template
    const templatesWithSections = await Promise.all(
      templates.map(async (template) => {
        const sections = await templateSectionService.getByTemplateId(template.id);
        return {
          ...template,
          sections,
        };
      })
    );

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

/**
 * POST /api/templates
 * Create a new template with sections
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, category, specialty, sections, createdBy } = body;

    if (!name || !sections || sections.length === 0) {
      return NextResponse.json(
        { error: 'name and sections are required' },
        { status: 400 }
      );
    }

    const template = await templateService.createWithSections(
      {
        name,
        description: description || '',
        category: category || 'custom',
        specialty: specialty || null,
        isDefault: false,
        createdBy: createdBy || null,
      },
      sections
    );

    // Get the created sections
    const createdSections = await templateSectionService.getByTemplateId(template.id);

    return NextResponse.json({
      template: {
        ...template,
        sections: createdSections,
      },
      message: 'Template created successfully',
    });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
