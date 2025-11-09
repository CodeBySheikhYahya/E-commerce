import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';
import { httpsFetch } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const url = `${API_BASE_URL}/Order/InsertOrder`;
    console.log(`🔵 Proxy: Creating order at backend:`, url);
    console.log(`🔵 Proxy: Order data:`, JSON.stringify(body, null, 2));
    
    const { status, data } = await httpsFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    console.log(`🔵 Proxy: Order response status:`, status);
    
    if (status >= 400) {
      console.error(`🔴 Proxy: Backend error:`, status, data);
      // Backend returns error in format: { success: false, statusCode, message, data }
      // Return it as-is so frontend can handle it
      return NextResponse.json(data, { status });
    }
    
    console.log(`🟢 Proxy: Successfully created order`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`🔴 Proxy: Error creating order:`, error);
    console.error(`🔴 Proxy: Error details:`, error.message, error.stack);
    return NextResponse.json(
      { 
        error: `Failed to create order`,
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

