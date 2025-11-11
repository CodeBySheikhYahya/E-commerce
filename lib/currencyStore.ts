import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrencyInfo, DEFAULT_CURRENCY, getCurrencyFromCountry } from './currencyUtils';

interface CurrencyStore {
  currency: CurrencyInfo;
  isLoading: boolean;
  isDetected: boolean;
  setCurrency: (currency: CurrencyInfo) => void;
  detectCurrency: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: DEFAULT_CURRENCY,
      isLoading: false,
      isDetected: false,

      setCurrency: (currency) => {
        set({ currency, isDetected: true });
      },

      detectCurrency: async () => {
        // If already detected, don't detect again
        if (get().isDetected) {
          return;
        }

        set({ isLoading: true });

        try {
          // Try IP-based geolocation API
          const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch location');
          }

          const data = await response.json();
          const countryName = data.country_name || data.country;

          if (countryName) {
            const currencyInfo = getCurrencyFromCountry(countryName);
            set({
              currency: currencyInfo,
              isLoading: false,
              isDetected: true,
            });
            return;
          }

          // Fallback to timezone-based detection
          throw new Error('No country name in response');
        } catch (error) {
          console.warn('IP geolocation failed, trying timezone fallback:', error);
          
          try {
            // Fallback: Use timezone to infer country
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const timezoneToCountry: Record<string, string> = {
              'Asia/Karachi': 'Pakistan',
              'America/New_York': 'United States',
              'America/Los_Angeles': 'United States',
              'America/Chicago': 'United States',
              'America/Denver': 'United States',
              'Europe/London': 'United Kingdom',
              'Europe/Dublin': 'Ireland',
              'Europe/Paris': 'France',
              'Europe/Berlin': 'Germany',
              'Europe/Rome': 'Italy',
              'Europe/Madrid': 'Spain',
              'Europe/Amsterdam': 'Netherlands',
              'Europe/Brussels': 'Belgium',
              'Europe/Vienna': 'Austria',
              'Europe/Lisbon': 'Portugal',
              'Europe/Helsinki': 'Finland',
              'Europe/Athens': 'Greece',
              'Asia/Tokyo': 'Japan',
              'Asia/Shanghai': 'China',
              'Asia/Seoul': 'South Korea',
              'Asia/Singapore': 'Singapore',
              'Asia/Kuala_Lumpur': 'Malaysia',
              'Asia/Bangkok': 'Thailand',
              'Asia/Dubai': 'United Arab Emirates',
              'Asia/Riyadh': 'Saudi Arabia',
              'Africa/Johannesburg': 'South Africa',
              'America/Sao_Paulo': 'Brazil',
              'America/Mexico_City': 'Mexico',
              'America/Buenos_Aires': 'Argentina',
              'America/Santiago': 'Chile',
              'Pacific/Auckland': 'New Zealand',
              'Europe/Zurich': 'Switzerland',
              'Europe/Oslo': 'Norway',
              'Europe/Stockholm': 'Sweden',
              'Europe/Copenhagen': 'Denmark',
              'Europe/Warsaw': 'Poland',
              'Europe/Istanbul': 'Turkey',
              'Europe/Moscow': 'Russia',
              'Africa/Cairo': 'Egypt',
              'Africa/Lagos': 'Nigeria',
              'Africa/Nairobi': 'Kenya',
              'Asia/Dhaka': 'Bangladesh',
              'Asia/Colombo': 'Sri Lanka',
              'Asia/Kathmandu': 'Nepal',
              'Asia/Manila': 'Philippines',
              'Asia/Jakarta': 'Indonesia',
              'Asia/Ho_Chi_Minh': 'Vietnam',
              'Australia/Sydney': 'Australia',
              'Australia/Melbourne': 'Australia',
              'America/Toronto': 'Canada',
              'America/Vancouver': 'Canada',
              'Asia/Kolkata': 'India',
              'Asia/Delhi': 'India',
            };

            const countryName = timezoneToCountry[timezone];
            if (countryName) {
              const currencyInfo = getCurrencyFromCountry(countryName);
              set({
                currency: currencyInfo,
                isLoading: false,
                isDetected: true,
              });
              return;
            }
          } catch (fallbackError) {
            console.warn('Timezone fallback also failed:', fallbackError);
          }

          // Final fallback: Use default currency (GBP)
          set({
            currency: DEFAULT_CURRENCY,
            isLoading: false,
            isDetected: true,
          });
        }
      },
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({
        currency: state.currency,
        isDetected: state.isDetected,
      }),
    }
  )
);

