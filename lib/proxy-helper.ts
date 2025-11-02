import { NextResponse } from 'next/server';
import { API_BASE_URL } from './apiConfig';
import { httpsFetch } from './api-utils';

export async function createProxyHandler(
  backendEndpoint: string,
  resourceName: string,
  ensureArray: boolean = false
) {
  try {
    const url = `${API_BASE_URL}${backendEndpoint}`;
    console.log(`🔵 Proxy: Fetching ${resourceName} from backend:`, url);
    
    const { status, data } = await httpsFetch(url);
    
    console.log(`🔵 Proxy: ${resourceName} response status:`, status);
    
    if (ensureArray) {
      console.log(`🔵 Proxy: ${resourceName} data type:`, Array.isArray(data) ? 'Array' : typeof data);
      console.log(`🔵 Proxy: ${resourceName} count:`, Array.isArray(data) ? data.length : 'N/A');
    }
    
    if (status >= 400) {
      console.error(`🔴 Proxy: Backend error:`, status);
      return NextResponse.json(
        { error: `Backend API Error: ${status}` },
        { status }
      );
    }
    
    // Ensure we return an array if needed
    const responseData = ensureArray && !Array.isArray(data) ? [data] : data;
    
    console.log(`🟢 Proxy: Successfully fetched ${resourceName} from backend`);
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error(`🔴 Proxy: Error fetching ${resourceName} from backend:`, error);
    console.error(`🔴 Proxy: Error details:`, error.message, error.stack);
    return NextResponse.json(
      { 
        error: `Failed to fetch ${resourceName} from backend server`,
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function createProxyHandlerById(
  backendEndpointPattern: string,
  resourceName: string,
  id: string
) {
  try {
    const url = `${API_BASE_URL}${backendEndpointPattern.replace('{id}', id)}`;
    console.log(`🔵 Proxy: Fetching ${resourceName} by ID from backend:`, url);
    
    const { status, data } = await httpsFetch(url);
    
    console.log(`🔵 Proxy: ${resourceName} response status:`, status);
    
    if (status >= 400) {
      console.error(`🔴 Proxy: Backend error:`, status);
      return NextResponse.json(
        { error: `Backend API Error: ${status}` },
        { status }
      );
    }
    
    console.log(`🟢 Proxy: Successfully fetched ${resourceName} from backend`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`🔴 Proxy: Error fetching ${resourceName} from backend:`, error);
    console.error(`🔴 Proxy: Error details:`, error.message, error.stack);
    return NextResponse.json(
      { 
        error: `Failed to fetch ${resourceName} from backend server`,
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

