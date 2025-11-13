import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CurrencyInfo {
  currency: string;
  currencyName: string;
  country: string;
  countryCode: string;
  countryName: string;
}

interface CurrencyStore {
  currencyInfo: CurrencyInfo | null;
  isLoading: boolean;
  error: string | null;
  isManualSelection: boolean; // Track if currency was manually selected
  setCurrencyInfo: (info: CurrencyInfo | null) => void;
  setManualCurrency: (currencyCode: string, currencyName: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currencyInfo: null,
      isLoading: false,
      error: null,
      isManualSelection: false,
      setCurrencyInfo: (info) => set({ currencyInfo: info, error: null, isManualSelection: false }),
      setManualCurrency: (currencyCode: string, currencyName: string) => {
        set({
          currencyInfo: {
            currency: currencyCode,
            currencyName: currencyName,
            country: '', // Not needed for manual selection
            countryCode: '',
            countryName: '',
          },
          isManualSelection: true,
          error: null,
        });
      },
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ currencyInfo: state.currencyInfo, isManualSelection: state.isManualSelection }),
    }
  )
);

