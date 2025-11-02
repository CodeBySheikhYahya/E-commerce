// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/colors');

export async function getAllColors() {
  return apiClient.getAll();
}

export async function getColorById(id: string) {
  return apiClient.getById(id);
}

