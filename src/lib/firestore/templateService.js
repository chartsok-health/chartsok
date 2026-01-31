/**
 * Template Firestore Service
 * CRUD operations for templates and sections
 */

import { FirestoreService } from './baseService';
import { Collections } from './collections';
import { db } from '../firebase-db';
import { writeBatch, doc } from 'firebase/firestore';

class TemplateService extends FirestoreService {
  constructor() {
    super(Collections.TEMPLATES);
  }

  /**
   * Get all system templates
   */
  async getSystemTemplates() {
    return this.query(
      [{ field: 'isSystem', operator: '==', value: true }],
      { orderByField: 'name' }
    );
  }

  /**
   * Get templates by specialty
   */
  async getBySpecialty(specialty) {
    // Get specialty-specific templates AND generic templates (specialty = null)
    const [specialtyTemplates, genericTemplates] = await Promise.all([
      this.query([{ field: 'specialty', operator: '==', value: specialty }]),
      this.query([{ field: 'specialty', operator: '==', value: null }]),
    ]);
    return [...specialtyTemplates, ...genericTemplates];
  }

  /**
   * Get user's custom templates
   */
  async getByCreator(userId) {
    return this.query(
      [{ field: 'createdBy', operator: '==', value: userId }],
      { orderByField: 'createdAt', orderDirection: 'desc' }
    );
  }

  /**
   * Get default template
   */
  async getDefault() {
    const templates = await this.query([{ field: 'isDefault', operator: '==', value: true }]);
    return templates[0] || null;
  }

  /**
   * Create template with sections
   */
  async createWithSections(templateData, sections) {
    const template = await this.create({
      ...templateData,
      isSystem: false,
    });

    // Create sections
    const sectionService = new TemplateSectionService();
    const sectionPromises = sections.map((section, index) =>
      sectionService.create({
        templateId: template.id,
        order: index + 1,
        ...section,
      })
    );

    await Promise.all(sectionPromises);
    return template;
  }

  /**
   * Delete template and its sections
   */
  async deleteWithSections(templateId) {
    const sectionService = new TemplateSectionService();
    const sections = await sectionService.getByTemplateId(templateId);

    const batch = writeBatch(db);

    // Delete sections
    sections.forEach((section) => {
      batch.delete(doc(db, Collections.TEMPLATE_SECTIONS, section.id));
    });

    // Delete template
    batch.delete(this.getDocRef(templateId));

    await batch.commit();
    return { deleted: true };
  }
}

class TemplateSectionService extends FirestoreService {
  constructor() {
    super(Collections.TEMPLATE_SECTIONS);
  }

  /**
   * Get sections by template ID
   */
  async getByTemplateId(templateId) {
    return this.query(
      [{ field: 'templateId', operator: '==', value: templateId }],
      { orderByField: 'order', orderDirection: 'asc' }
    );
  }

  /**
   * Update section order
   */
  async updateOrder(templateId, sectionIds) {
    const batch = writeBatch(db);

    sectionIds.forEach((id, index) => {
      batch.update(this.getDocRef(id), { order: index + 1 });
    });

    await batch.commit();
    return { updated: sectionIds.length };
  }

  /**
   * Create multiple sections for a template
   */
  async createForTemplate(templateId, sections) {
    return this.batchCreate(
      sections.map((section, index) => ({
        templateId,
        order: index + 1,
        ...section,
      }))
    );
  }
}

// Export singleton instances
export const templateService = new TemplateService();
export const templateSectionService = new TemplateSectionService();
