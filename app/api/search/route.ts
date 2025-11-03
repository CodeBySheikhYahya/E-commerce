import { createProxyHandler } from '@/lib/proxy-helper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name')?.trim();

  if (!name) {
    return new Response(JSON.stringify({ error: 'Missing required query param: name' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const endpoint = `/Product/SearchAllProducts?name=${encodeURIComponent(name)}`;
  return createProxyHandler(endpoint, 'products', true);
}


