// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/categories');

export async function getAllCategories() {
  return apiClient.getAll();
}

export async function getCategoryById(id: string) {
  return apiClient.getById(id);
}

