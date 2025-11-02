import { createProxyHandlerById } from '@/lib/proxy-helper';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return createProxyHandlerById('/Product/GetProductById?Id={id}', 'product', id);
}

