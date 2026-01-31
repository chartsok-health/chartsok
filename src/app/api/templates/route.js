import { NextResponse } from 'next/server';
import { templateService, templateSectionService } from '@/lib/firestore';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Default SOAP template as fallback
const defaultSoapTemplate = {
  id: 'default-soap',
  name: 'SOAP 기본',
  description: '표준 SOAP 형식 차트 템플릿',
  category: 'soap',
  isDefault: true,
  isSystem: true,
  status: 'active',
  content: `[Subjective]
환자의 주호소 및 현병력을 기록합니다.
- 주호소:
- 발병 시기:
- 증상 양상:
- 동반 증상:

[Objective]
신체 검사 및 검사 결과를 기록합니다.
- 활력징후:
- 신체검사 소견:
- 검사 결과:

[Assessment]
진단 및 감별진단을 기록합니다.
- 주진단:
- 감별진단:
- ICD 코드:

[Plan]
치료 계획 및 처방을 기록합니다.
- 처방:
- 교육:
- 추적 관찰:`,
};

/**
 * GET /api/templates
 * Fetch templates - supports both user-specific (userId param) and global templates
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const specialty = searchParams.get('specialty');
    const includeSystem = searchParams.get('includeSystem') !== 'false';

    let templates = [];

    // If userId is provided, fetch from user's templates subcollection
    if (userId) {
      try {
        const templatesRef = collection(db, 'users', userId, 'templates');
        // Fetch without orderBy to avoid index requirements and missing field issues
        const snapshot = await getDocs(templatesRef);

        templates = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'active', // Default to active if not set
          createdAt: doc.data().createdAt || new Date(0).toISOString(), // Default for sorting
        }));

        // Filter by status (only active templates)
        templates = templates.filter(t => t.status === 'active');

        // Sort by createdAt descending (newest first)
        templates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } catch (userError) {
        console.error('Error fetching user templates:', userError);
        // Continue with empty array - will add default template
      }

      // Find the effective default (user's default or SOAP fallback)
      const userDefault = templates.find(t => t.isDefault);

      // Add system SOAP template as fallback
      const soapTemplate = {
        ...defaultSoapTemplate,
        isDefault: !userDefault, // Only mark as default if no user template is default
      };

      templates = [soapTemplate, ...templates];

      return NextResponse.json({
        templates,
        total: templates.length,
      });
    }

    // Fallback to global templates (legacy behavior)
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
