import { useEffect } from 'react';
import { useCurrencyStore } from '../currencyStore';

/**
 * Hook to access currency information and auto-detect on mount
 */
export function useCurrency() {
  const { currency, isLoading, detectCurrency, isDetected } = useCurrencyStore();

  useEffect(() => {
    // Auto-detect currency on first mount if not already detected
    if (!isDetected && typeof window !== 'undefined') {
      detectCurrency();
    }
  }, [isDetected, detectCurrency]);

  return {
    currency: currency.code,
    symbol: currency.symbol,
    country: currency.country,
    isLoading,
    currencyInfo: currency,
  };
}

