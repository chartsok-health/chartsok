/**
 * Chart Firestore Service
 * CRUD operations for charts, contents, and vitals
 */

import { FirestoreService } from './baseService';
import { Collections } from './collections';
import { db } from '../firebase-db';
import { writeBatch, doc, Timestamp } from 'firebase/firestore';

class ChartService extends FirestoreService {
  constructor() {
    super(Collections.CHARTS);
  }

  /**
   * Get chart by session ID
   */
  async getBySessionId(sessionId) {
    const charts = await this.query([{ field: 'sessionId', operator: '==', value: sessionId }]);
    return charts[0] || null;
  }

  /**
   * Get charts by patient ID
   */
  async getByPatientId(patientId, options = {}) {
    return this.query(
      [{ field: 'patientId', operator: '==', value: patientId }],
      { orderByField: 'createdAt', orderDirection: 'desc', ...options }
    );
  }

  /**
   * Get charts by template
   */
  async getByTemplateId(templateId, options = {}) {
    return this.query(
      [{ field: 'templateId', operator: '==', value: templateId }],
      { orderByField: 'createdAt', orderDirection: 'desc', ...options }
    );
  }

  /**
   * Create chart with contents
   */
  async createWithContents(chartData, contents, vitals = null) {
    const chart = await this.create(chartData);

    // Create chart contents
    const contentService = new ChartContentService();
    const contentPromises = Object.entries(contents).map(([sectionKey, content]) =>
      contentService.create({
        chartId: chart.id,
        sectionKey,
        content,
      })
    );

    await Promise.all(contentPromises);

    // Create vitals if provided
    if (vitals) {
      const vitalsService = new ChartVitalsService();
      await vitalsService.create({
        chartId: chart.id,
        ...vitals,
      });
    }

    return chart;
  }

  /**
   * Update chart with contents
   */
  async updateWithContents(chartId, chartData, contents) {
    // Update chart
    await this.update(chartId, chartData);

    // Update contents
    const contentService = new ChartContentService();
    const existingContents = await contentService.getByChartId(chartId);

    for (const [sectionKey, content] of Object.entries(contents)) {
      const existing = existingContents.find((c) => c.sectionKey === sectionKey);
      if (existing) {
        await contentService.update(existing.id, { content });
      } else {
        await contentService.create({
          chartId,
          sectionKey,
          content,
        });
      }
    }

    return this.getById(chartId);
  }

  /**
   * Delete chart and all related data
   */
  async deleteWithRelated(chartId) {
    const contentService = new ChartContentService();
    const vitalsService = new ChartVitalsService();

    const [contents, vitals] = await Promise.all([
      contentService.getByChartId(chartId),
      vitalsService.getByChartId(chartId),
    ]);

    const batch = writeBatch(db);

    // Delete contents
    contents.forEach((c) => {
      batch.delete(doc(db, Collections.CHART_CONTENTS, c.id));
    });

    // Delete vitals
    if (vitals) {
      batch.delete(doc(db, Collections.CHART_VITALS, vitals.id));
    }

    // Delete chart
    batch.delete(this.getDocRef(chartId));

    await batch.commit();
    return { deleted: true };
  }

  /**
   * Get chart with all related data
   */
  async getFullChart(chartId) {
    const chart = await this.getById(chartId);
    if (!chart) return null;

    const contentService = new ChartContentService();
    const vitalsService = new ChartVitalsService();

    const [contents, vitals] = await Promise.all([
      contentService.getByChartId(chartId),
      vitalsService.getByChartId(chartId),
    ]);

    // Convert contents array to object
    const chartData = {};
    contents.forEach((c) => {
      chartData[c.sectionKey] = c.content;
    });

    return {
      ...chart,
      chartData,
      vitals,
    };
  }
}

class ChartContentService extends FirestoreService {
  constructor() {
    super(Collections.CHART_CONTENTS);
  }

  /**
   * Get contents by chart ID
   */
  async getByChartId(chartId) {
    return this.query([{ field: 'chartId', operator: '==', value: chartId }]);
  }

  /**
   * Get content by chart and section
   */
  async getByChartAndSection(chartId, sectionKey) {
    const contents = await this.query([
      { field: 'chartId', operator: '==', value: chartId },
      { field: 'sectionKey', operator: '==', value: sectionKey },
    ]);
    return contents[0] || null;
  }

  /**
   * Update or create section content
   */
  async upsertSection(chartId, sectionKey, content) {
    const existing = await this.getByChartAndSection(chartId, sectionKey);
    if (existing) {
      return this.update(existing.id, { content });
    }
    return this.create({ chartId, sectionKey, content });
  }
}

class ChartVitalsService extends FirestoreService {
  constructor() {
    super(Collections.CHART_VITALS);
  }

  /**
   * Get vitals by chart ID
   */
  async getByChartId(chartId) {
    const vitals = await this.query([{ field: 'chartId', operator: '==', value: chartId }]);
    return vitals[0] || null;
  }

  /**
   * Update or create vitals
   */
  async upsertVitals(chartId, vitals) {
    const existing = await this.getByChartId(chartId);
    if (existing) {
      return this.update(existing.id, vitals);
    }
    return this.create({ chartId, ...vitals });
  }
}

// Export singleton instances
export const chartService = new ChartService();
export const chartContentService = new ChartContentService();
export const chartVitalsService = new ChartVitalsService();
