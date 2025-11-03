// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/quantities');

export async function getAllQuantities() {
  return apiClient.getAll();
}

export async function getQuantityById(id: string) {
  return apiClient.getById(id);
}


