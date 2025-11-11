"use client";

import { useMemo } from 'react';
import { useCurrencyStore } from '../currencyStore';
import { formatPrice as formatPriceUtil, parsePrice } from '../currencyUtils';

/**
 * Hook to format a price string according to the current currency
 * This is useful when you have a price string that needs to be re-formatted
 * based on the detected currency
 */
export function useFormattedPrice(priceString: string): string {
  const currencyInfo = useCurrencyStore((state) => state.currencyInfo);

  return useMemo(() => {
    if (!priceString) return formatPriceUtil(0);
    
    // Parse the price string to get numeric value
    const numericPrice = parsePrice(priceString);
    
    // Format with current currency
    return formatPriceUtil(numericPrice);
  }, [priceString, currencyInfo?.currency]);
}

/**
 * Hook to format a numeric price according to the current currency
 */
export function useFormattedNumericPrice(price: number | null | undefined): string {
  const currencyInfo = useCurrencyStore((state) => state.currencyInfo);

  return useMemo(() => {
    return formatPriceUtil(price);
  }, [price, currencyInfo?.currency]);
}

