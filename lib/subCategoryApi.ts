// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/subcategories');

export async function getAllSubCategories() {
  return apiClient.getAll();
}

export async function getSubCategoryById(id: string) {
  return apiClient.getById(id);
}

