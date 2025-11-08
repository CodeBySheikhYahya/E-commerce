import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';
import { httpsFetch } from '@/lib/api-utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  
  try {
    const url = `${API_BASE_URL}/Product/GetCouponByCode?Code=${encodeURIComponent(code)}`;
    console.log(`🔵 Proxy: Fetching coupon by code from backend:`, url);
    
    const { status, data } = await httpsFetch(url);
    
    console.log(`🔵 Proxy: Coupon response status:`, status);
    
    if (status >= 400) {
      console.error(`🔴 Proxy: Backend error:`, status);
      return NextResponse.json(
        { error: `Backend API Error: ${status}` },
        { status }
      );
    }
    
    console.log(`🟢 Proxy: Successfully fetched coupon from backend`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`🔴 Proxy: Error fetching coupon from backend:`, error);
    console.error(`🔴 Proxy: Error details:`, error.message, error.stack);
    return NextResponse.json(
      { 
        error: `Failed to fetch coupon from backend server`,
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

