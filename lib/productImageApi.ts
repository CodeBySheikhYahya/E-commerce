// Using Next.js API proxy to avoid CORS issues
export async function getImagesByProductId(productId: string) {
  const response = await fetch(`/api/products/${productId}/images`, {
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

