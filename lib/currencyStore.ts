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
  setCurrencyInfo: (info: CurrencyInfo | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currencyInfo: null,
      isLoading: false,
      error: null,
      setCurrencyInfo: (info) => set({ currencyInfo: info, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ currencyInfo: state.currencyInfo }),
    }
  )
);

