import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/apiConfig';
import { httpsFetch } from '@/lib/api-utils';

export interface NewsletterRequest {
  email: string;
  fullName?: string;
  isSubscribed: boolean;
  subscribedDate: string;
}

export interface NewsletterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
  };
}

export async function POST(request: Request) {
  try {
    const body: NewsletterRequest = await request.json();
    
    const url = `${API_BASE_URL}/Configuration/InsertNewsletter`;
    console.log(`🔵 Proxy: Creating newsletter subscription at backend:`, url);
    console.log(`🔵 Proxy: Newsletter data:`, JSON.stringify(body, null, 2));
    
    const { status, data } = await httpsFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    console.log(`🔵 Proxy: Newsletter response status:`, status);
    
    if (status >= 400) {
      console.error(`🔴 Proxy: Backend error:`, status, data);
      // Backend returns error in format: { success: false, statusCode, message, data }
      // Return it as-is so frontend can handle it
      return NextResponse.json(data, { status });
    }
    
    console.log(`🟢 Proxy: Successfully created newsletter subscription`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`🔴 Proxy: Error creating newsletter subscription:`, error);
    console.error(`🔴 Proxy: Error details:`, error.message, error.stack);
    return NextResponse.json(
      { 
        error: `Failed to create newsletter subscription`,
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

