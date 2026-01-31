import { NextResponse } from 'next/server';
import { templateService, templateSectionService } from '@/lib/firestore';

/**
 * GET /api/templates/[id]
 * Fetch a single template with its sections from Firestore
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const template = await templateService.getById(id);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    const sections = await templateSectionService.getByTemplateId(id);

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

/**
 * PUT /api/templates/[id]
 * Update a template
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, category, specialty, sections } = body;

    // Check template exists
    const existing = await templateService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Cannot modify system templates
    if (existing.isSystem) {
      return NextResponse.json(
        { error: 'Cannot modify system templates' },
        { status: 403 }
      );
    }

    // Update template
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (specialty !== undefined) updateData.specialty = specialty;

    const updated = await templateService.update(id, updateData);

    // Update sections if provided
    if (sections && sections.length > 0) {
      // Delete existing sections and recreate
      const existingSections = await templateSectionService.getByTemplateId(id);
      const sectionIds = existingSections.map(s => s.id);
      if (sectionIds.length > 0) {
        await templateSectionService.batchDelete(sectionIds);
      }
      await templateSectionService.createForTemplate(id, sections);
    }

    const updatedSections = await templateSectionService.getByTemplateId(id);

    return NextResponse.json({
      template: {
        ...updated,
        sections: updatedSections,
      },
      message: 'Template updated successfully',
    });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/templates/[id]
 * Delete a template and its sections
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check template exists
    const existing = await templateService.getById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Cannot delete system templates
    if (existing.isSystem) {
      return NextResponse.json(
        { error: 'Cannot delete system templates' },
        { status: 403 }
      );
    }

    await templateService.deleteWithSections(id);

    return NextResponse.json({
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
