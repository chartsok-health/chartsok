import { NextResponse } from 'next/server';
import {
  chartService,
  chartContentService,
  chartVitalsService,
  patientService,
  templateService,
} from '@/lib/firestore';

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

    let charts;

    if (patientId) {
      charts = await chartService.getByPatientId(patientId, { limitCount: limit });
    } else if (templateId) {
      charts = await chartService.getByTemplateId(templateId, { limitCount: limit });
    } else {
      charts = await chartService.getAll({
        orderByField: 'createdAt',
        orderDirection: 'desc',
        limitCount: limit
      });
    }

    // Enrich with patient name and template info
    const enrichedCharts = await Promise.all(
      charts.map(async (chart) => {
        const [patient, template] = await Promise.all([
          chart.patientId ? patientService.getById(chart.patientId) : null,
          chart.templateId ? templateService.getById(chart.templateId) : null,
        ]);

        return {
          ...chart,
          patientName: patient?.name || 'Unknown',
          patientChartNo: patient?.chartNo || '',
          templateName: template?.name || 'SOAP',
        };
      })
    );

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

    // Create chart with contents using Firestore service
    const chart = await chartService.createWithContents(
      {
        sessionId: sessionId || null,
        patientId: patientId || null,
        templateId,
        diagnosis: diagnosis || '',
        icdCode: icdCode || '',
        status: 'completed',
      },
      chartData,
      vitals || null
    );

    // Get created contents
    const contents = await chartContentService.getByChartId(chart.id);

    return NextResponse.json({
      chart,
      contents,
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

/**
 * PUT /api/charts
 * Update an existing chart
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { chartId, diagnosis, icdCode, chartData, vitals } = body;

    if (!chartId) {
      return NextResponse.json(
        { error: 'chartId is required' },
        { status: 400 }
      );
    }

    const existing = await chartService.getById(chartId);
    if (!existing) {
      return NextResponse.json(
        { error: 'Chart not found' },
        { status: 404 }
      );
    }

    // Update chart data
    const updateData = {};
    if (diagnosis !== undefined) updateData.diagnosis = diagnosis;
    if (icdCode !== undefined) updateData.icdCode = icdCode;

    if (chartData) {
      await chartService.updateWithContents(chartId, updateData, chartData);
    } else if (Object.keys(updateData).length > 0) {
      await chartService.update(chartId, updateData);
    }

    // Update vitals if provided
    if (vitals) {
      await chartVitalsService.upsertVitals(chartId, vitals);
    }

    const updatedChart = await chartService.getFullChart(chartId);

    return NextResponse.json({
      chart: updatedChart,
      message: 'Chart updated successfully',
    });
  } catch (error) {
    console.error('Error updating chart:', error);
    return NextResponse.json(
      { error: 'Failed to update chart' },
      { status: 500 }
    );
  }
}
