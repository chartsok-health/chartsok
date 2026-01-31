import { NextResponse } from 'next/server';
import { templateService, templateSectionService, hospitalService } from '@/lib/firestore';
import { ChartSectionKey, TemplateCategory, Specialty } from '@/lib/constants';

/**
 * Initial template data for seeding the database
 */
const systemTemplates = [
  {
    id: 'soap-default',
    name: 'SOAP 기본',
    description: '표준 SOAP 형식의 기본 진료 차트',
    category: TemplateCategory.SOAP,
    specialty: null,
    isSystem: true,
    isDefault: true,
    sections: [
      {
        key: ChartSectionKey.SUBJECTIVE,
        name: '주관적 소견 (S)',
        description: '환자의 주호소 및 증상',
        placeholder: '환자가 호소하는 증상을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.OBJECTIVE,
        name: '객관적 소견 (O)',
        description: '진찰 소견 및 검사 결과',
        placeholder: '진찰 소견과 검사 결과를 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.ASSESSMENT,
        name: '평가 (A)',
        description: '진단 및 평가',
        placeholder: '진단명과 평가를 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.PLAN,
        name: '계획 (P)',
        description: '치료 계획',
        placeholder: '치료 계획을 기록하세요...',
        required: true,
      },
    ],
  },
  {
    id: 'ent-general',
    name: '이비인후과 일반',
    description: '이비인후과 전용 진료 차트',
    category: TemplateCategory.SPECIALTY,
    specialty: Specialty.ENT,
    isSystem: true,
    isDefault: false,
    sections: [
      {
        key: ChartSectionKey.SUBJECTIVE,
        name: '주호소',
        description: '환자의 주호소',
        placeholder: '환자가 호소하는 증상을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.OBJECTIVE,
        name: '이학적 검사',
        description: '진찰 소견',
        placeholder: '이비인후과 진찰 소견을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.ENDOSCOPY,
        name: '내시경 소견',
        description: '내시경 검사 결과',
        placeholder: '내시경 소견을 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.AUDIOMETRY,
        name: '청력검사',
        description: '청력검사 결과',
        placeholder: '청력검사 결과를 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.ASSESSMENT,
        name: '진단',
        description: '진단명',
        placeholder: '진단명을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.PLAN,
        name: '치료계획',
        description: '치료 계획 및 처방',
        placeholder: '치료 계획을 기록하세요...',
        required: true,
      },
    ],
  },
  {
    id: 'internal-general',
    name: '내과 일반',
    description: '내과 전용 진료 차트',
    category: TemplateCategory.SPECIALTY,
    specialty: Specialty.INTERNAL,
    isSystem: true,
    isDefault: false,
    sections: [
      {
        key: ChartSectionKey.SUBJECTIVE,
        name: '주호소',
        description: '환자의 주호소',
        placeholder: '환자가 호소하는 증상을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.OBJECTIVE,
        name: '신체검진',
        description: '신체검진 소견',
        placeholder: '신체검진 소견을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.CHRONIC_DISEASE,
        name: '만성질환 관리',
        description: '만성질환 현황',
        placeholder: '만성질환 관리 현황을 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.LAB_RESULTS,
        name: '검사결과',
        description: '혈액검사 등 검사 결과',
        placeholder: '검사 결과를 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.ASSESSMENT,
        name: '진단',
        description: '진단명',
        placeholder: '진단명을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.PLAN,
        name: '치료계획',
        description: '치료 계획 및 처방',
        placeholder: '치료 계획을 기록하세요...',
        required: true,
      },
    ],
  },
  {
    id: 'pediatric-general',
    name: '소아과 일반',
    description: '소아과 전용 진료 차트',
    category: TemplateCategory.SPECIALTY,
    specialty: Specialty.PEDIATRIC,
    isSystem: true,
    isDefault: false,
    sections: [
      {
        key: ChartSectionKey.SUBJECTIVE,
        name: '주호소',
        description: '보호자/환아 주호소',
        placeholder: '증상을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.OBJECTIVE,
        name: '신체검진',
        description: '신체검진 소견',
        placeholder: '신체검진 소견을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.GROWTH,
        name: '성장발달',
        description: '성장발달 평가',
        placeholder: '성장발달 상태를 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.VACCINATION,
        name: '예방접종',
        description: '예방접종 현황',
        placeholder: '예방접종 현황을 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.ASSESSMENT,
        name: '진단',
        description: '진단명',
        placeholder: '진단명을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.PLAN,
        name: '치료계획',
        description: '치료 계획 및 처방',
        placeholder: '치료 계획을 기록하세요...',
        required: true,
      },
    ],
  },
  {
    id: 'dermatology-general',
    name: '피부과 일반',
    description: '피부과 전용 진료 차트',
    category: TemplateCategory.SPECIALTY,
    specialty: Specialty.DERMATOLOGY,
    isSystem: true,
    isDefault: false,
    sections: [
      {
        key: ChartSectionKey.SUBJECTIVE,
        name: '주호소',
        description: '환자의 주호소',
        placeholder: '환자가 호소하는 증상을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.OBJECTIVE,
        name: '피부소견',
        description: '피부 진찰 소견',
        placeholder: '피부 소견을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.LESION_DESCRIPTION,
        name: '병변 기술',
        description: '병변 상세 기술',
        placeholder: '병변의 위치, 크기, 양상 등을 기록하세요...',
        required: false,
      },
      {
        key: ChartSectionKey.ASSESSMENT,
        name: '진단',
        description: '진단명',
        placeholder: '진단명을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.PLAN,
        name: '치료계획',
        description: '치료 계획 및 처방',
        placeholder: '치료 계획을 기록하세요...',
        required: true,
      },
    ],
  },
  {
    id: 'brief-note',
    name: '간단 메모',
    description: '빠른 진료 기록용',
    category: TemplateCategory.BRIEF,
    specialty: null,
    isSystem: true,
    isDefault: false,
    sections: [
      {
        key: ChartSectionKey.SUBJECTIVE,
        name: '증상',
        description: '환자 증상',
        placeholder: '증상을 기록하세요...',
        required: true,
      },
      {
        key: ChartSectionKey.ASSESSMENT,
        name: '진단/처방',
        description: '진단 및 처방',
        placeholder: '진단과 처방을 기록하세요...',
        required: true,
      },
    ],
  },
];

/**
 * Sample hospital for testing
 */
const sampleHospital = {
  id: 'hospital-demo',
  name: '차트쏙 데모 병원',
  type: 'clinic',
  address: '서울특별시 강남구 테헤란로 123',
  phone: '02-1234-5678',
};

/**
 * POST /api/seed
 * Seed the database with initial data
 * Only works in development mode
 */
export async function POST(request) {
  try {
    // Check if we should force reseed
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    // Check if templates already exist
    const existingTemplates = await templateService.getAll();

    if (existingTemplates.length > 0 && !force) {
      return NextResponse.json({
        message: 'Database already seeded',
        templates: existingTemplates.length,
        skipped: true,
      });
    }

    // Clear existing templates if force reseed
    if (force && existingTemplates.length > 0) {
      for (const template of existingTemplates) {
        await templateService.deleteWithSections(template.id);
      }
    }

    // Seed templates
    const createdTemplates = [];
    for (const templateData of systemTemplates) {
      const { sections, ...template } = templateData;

      // Create template
      const created = await templateService.create(template);

      // Create sections
      await templateSectionService.createForTemplate(created.id, sections);

      createdTemplates.push(created);
    }

    // Seed sample hospital
    let hospital = await hospitalService.getById(sampleHospital.id);
    if (!hospital) {
      hospital = await hospitalService.create(sampleHospital);
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      templates: createdTemplates.length,
      hospital: hospital.id,
      data: {
        templates: createdTemplates.map(t => ({ id: t.id, name: t.name })),
      },
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/seed
 * Check seed status
 */
export async function GET() {
  try {
    const templates = await templateService.getAll();
    const hospitals = await hospitalService.getAll();

    return NextResponse.json({
      seeded: templates.length > 0,
      counts: {
        templates: templates.length,
        hospitals: hospitals.length,
      },
    });
  } catch (error) {
    console.error('Error checking seed status:', error);
    return NextResponse.json(
      { error: 'Failed to check seed status' },
      { status: 500 }
    );
  }
}
