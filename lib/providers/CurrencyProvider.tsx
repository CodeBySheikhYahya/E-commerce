"use client";

import { useCurrency } from '../hooks/useCurrency';

/**
 * Provider component that initializes currency detection on mount
 * This should be included in the root layout to ensure currency is detected early
 */
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  useCurrency(); // This will trigger currency detection on mount

  return <>{children}</>;
}

