import { NextResponse } from 'next/server';
import { getCurrencyByCountryCode } from '@/lib/countryCurrencyMap';

export async function GET(request: Request) {
  try {
    // Use ipwho.is as primary API (more permissive, allows server-side requests)
    const response = await fetch('https://ipwho.is/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`ipwho.is returned ${response.status}`);
    }

    const data = await response.json();
    
    // Check if ipwho.is returned success and has country info
    if (data.success !== false && data.country) {
      const countryCode = data.country_code || data.countryCode || 'US';
      
      // Get currency from mapping based on country code
      const currencyInfo = getCurrencyByCountryCode(countryCode);
      
      // For UK regions (Wales, Scotland, England, Northern Ireland), use region name if available
      // but keep GB country code and GBP currency
      let countryName = data.country || 'United States';
      if (countryCode === 'GB' && data.region) {
        // If region is Wales, Scotland, England, or Northern Ireland, include it
        const region = data.region;
        if (['Wales', 'Scotland', 'England', 'Northern Ireland'].includes(region)) {
          countryName = `${region}, United Kingdom`;
        }
      }
      
      return NextResponse.json({
        currency: currencyInfo.code,
        currency_name: currencyInfo.name,
        country_name: countryName,
        country_code: countryCode,
        country: countryCode,
      });
    }

    // If response indicates failure, log it but still return defaults
    console.warn('ipwho.is returned unsuccessful response:', data);
    throw new Error(data.message || 'Invalid response from ipwho.is');
  } catch (error: any) {
    console.error('Error fetching IP geolocation:', error);
    
    // Return a default response instead of error to prevent breaking the app
    // This ensures the app continues to work even if geolocation fails
    return NextResponse.json({
      currency: 'USD',
      currency_name: 'US Dollar',
      country_name: 'United States',
      country_code: 'US',
      country: 'US',
      error: error.message || 'Failed to fetch geolocation',
    });
  }
}

