import { NextResponse } from 'next/server';
import { charts, patients } from '@/lib/mockDatabase';
import { getTemplateById } from '@/lib/services';

/**
 * GET /api/charts
 * Fetch all charts (with optional filters)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');
    const templateId = searchParams.get('templateId');
    const limit = parseInt(searchParams.get('limit') || '50');

    let filteredCharts = [...charts];

    if (patientId) {
      filteredCharts = filteredCharts.filter(c => c.patientId === parseInt(patientId));
    }

    if (templateId) {
      filteredCharts = filteredCharts.filter(c => c.templateId === templateId);
    }

    // Sort by creation date descending
    filteredCharts.sort((a, b) => b.createdAt - a.createdAt);

    // Apply limit
    filteredCharts = filteredCharts.slice(0, limit);

    // Enrich with patient name and template info
    const enrichedCharts = filteredCharts.map(chart => {
      const patient = patients.find(p => p.id === chart.patientId);
      const template = getTemplateById(chart.templateId);
      return {
        ...chart,
        patientName: patient?.name || 'Unknown',
        patientChartNo: patient?.chartNo || '',
        templateName: template?.name || 'SOAP',
      };
    });

    return NextResponse.json({
      charts: enrichedCharts,
      total: enrichedCharts.length,
    });
  } catch (error) {
    console.error('Error fetching charts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch charts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/charts
 * Save a new chart
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      sessionId,
      patientId,
      templateId,
      diagnosis,
      icdCode,
      chartData,
      vitals,
    } = body;

    if (!templateId || !chartData) {
      return NextResponse.json(
        { error: 'templateId and chartData are required' },
        { status: 400 }
      );
    }

    // Generate new chart ID
    const chartId = `chrt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create new chart
    const newChart = {
      id: chartId,
      sessionId: sessionId || null,
      patientId: patientId || null,
      templateId,
      diagnosis: diagnosis || '',
      icdCode: icdCode || '',
      status: 'completed',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Create chart contents for each section
    const newContents = Object.entries(chartData).map(([sectionKey, content]) => ({
      id: `cc_${Date.now()}_${sectionKey}`,
      chartId,
      sectionKey,
      content,
      createdAt: Date.now(),
    }));

    // In a real implementation, we would save to database here
    // For mock, we just return the created data

    return NextResponse.json({
      chart: newChart,
      contents: newContents,
      message: 'Chart saved successfully',
    });
  } catch (error) {
    console.error('Error saving chart:', error);
    return NextResponse.json(
      { error: 'Failed to save chart' },
      { status: 500 }
    );
  }
}
