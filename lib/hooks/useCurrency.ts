import { useEffect } from 'react';
import { useCurrencyStore } from '../currencyStore';

interface IpApiResponse {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export function useCurrency() {
  const { currencyInfo, isLoading, error, setCurrencyInfo, setLoading, setError } = useCurrencyStore();

  useEffect(() => {
    // Only fetch if we don't have currency info yet
    if (!currencyInfo && !isLoading && !error) {
      fetchCurrencyInfo();
    }
  }, [currencyInfo, isLoading, error]);

  const fetchCurrencyInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use Next.js API route to avoid CORS issues
      // The API route handles the server-side request properly
      const response = await fetch('/api/geolocation', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data: IpApiResponse = await response.json();

      // Check if API returned an error (our API route returns default values on error)
      if (data.currency && data.country_name) {
        setCurrencyInfo({
          currency: data.currency,
          currencyName: data.currency_name || data.currency,
          country: data.country_name,
          countryCode: data.country_code || data.country,
          countryName: data.country_name,
        });
      } else {
        // Fallback to USD if currency info is not available
        setCurrencyInfo({
          currency: 'USD',
          currencyName: 'US Dollar',
          country: 'United States',
          countryCode: 'US',
          countryName: 'United States',
        });
      }
    } catch (err) {
      console.error('Error fetching currency info:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback to USD on error
      setCurrencyInfo({
        currency: 'USD',
        currencyName: 'US Dollar',
        country: 'United States',
        countryCode: 'US',
        countryName: 'United States',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    currencyInfo,
    isLoading,
    error,
    refetch: fetchCurrencyInfo,
  };
}

