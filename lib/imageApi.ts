// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/images');

export async function getImageById(id: string) {
  return apiClient.getById(id);
}

