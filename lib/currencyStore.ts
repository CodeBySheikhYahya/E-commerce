import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrencyInfo, DEFAULT_CURRENCY, getCurrencyFromCountry, getCurrencyFromIntl } from './currencyUtils';

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
          // Primary method: Use browser's Intl API (fastest, no API calls, works offline)
          const intlCurrency = getCurrencyFromIntl();
          
          if (intlCurrency && intlCurrency.code) {
            set({
              currency: intlCurrency,
              isLoading: false,
              isDetected: true,
            });
            return;
          }

          // Fallback: Try IP-based geolocation API
          throw new Error('Intl API detection failed, trying IP geolocation');
        } catch (error) {
          console.warn('Intl API failed, trying IP geolocation fallback:', error);
          
          try {
            const response = await fetch('https://ipapi.co/json/', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
            });

            if (response.ok) {
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
            }
          } catch (ipError) {
            console.warn('IP geolocation also failed:', ipError);
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

