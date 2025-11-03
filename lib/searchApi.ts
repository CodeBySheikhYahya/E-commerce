// Search API using Next.js proxy route

export async function searchProducts(name: string) {
  const params = new URLSearchParams({ name });
  const response = await fetch(`/api/search?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorData.error || errorData.details || errorData.message || ''}`);
  }

  return await response.json();
}


