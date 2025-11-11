"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "../lib/currencyStore";

/**
 * CurrencyProvider - Initializes currency detection on app load
 * This component should be placed high in the component tree (e.g., in layout.tsx)
 */
export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { detectCurrency, isDetected } = useCurrencyStore();

  useEffect(() => {
    // Only detect if not already detected
    if (!isDetected && typeof window !== 'undefined') {
      detectCurrency();
    }
  }, [isDetected, detectCurrency]);

  return <>{children}</>;
}

