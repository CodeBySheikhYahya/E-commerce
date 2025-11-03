import { createProxyHandler } from '@/lib/proxy-helper';

export async function GET() {
  return createProxyHandler('/Product/GetAllQuantities', 'quantities', true);
}


