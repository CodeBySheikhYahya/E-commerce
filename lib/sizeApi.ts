// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/sizes');

export async function getAllSizes() {
  return apiClient.getAll();
}

export async function getSizeById(id: string) {
  return apiClient.getById(id);
}

