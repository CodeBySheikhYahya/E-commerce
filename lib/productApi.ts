// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/products');

export async function getAllProducts() {
  return apiClient.getAll();
}

export async function getProductById(id: string) {
  return apiClient.getById(id);
}
