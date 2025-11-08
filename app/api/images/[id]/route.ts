import { createProxyHandlerById } from '@/lib/proxy-helper';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return createProxyHandlerById('/Product/GetImageById?Id={id}', 'image', id);
}

