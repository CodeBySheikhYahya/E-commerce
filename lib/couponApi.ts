// Using Next.js API proxy to avoid CORS issues
import { createApiClient } from './api-client';

const apiClient = createApiClient('/api/coupons');

export async function getAllCoupons() {
  return apiClient.getAll();
}

export async function getCouponByCode(code: string) {
  const response = await fetch(`/api/coupons/code/${encodeURIComponent(code)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorData.error || errorData.details || errorData.message || ''}`);
  }
  
  return await response.json();
}

