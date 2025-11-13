"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrencyStore } from '../lib/currencyStore';

// Common currencies list
const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
];

export default function CurrencyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currencyInfo, setManualCurrency } = useCurrencyStore();

  const currentCurrency = currencyInfo?.currency || 'USD';
  const currentCurrencyName = CURRENCIES.find(c => c.code === currentCurrency)?.name || currencyInfo?.currencyName || 'US Dollar';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCurrencySelect = (currencyCode: string, currencyName: string) => {
    setManualCurrency(currencyCode, currencyName);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors cursor-pointer"
        style={{
          fontFamily: 'var(--top-bar-font-family)',
          fontSize: 'var(--top-bar-font-size)',
          fontWeight: 'var(--top-bar-font-weight)',
        }}
      >
        <span>{currentCurrency}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 lg:right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-[100] min-w-[200px] max-w-[90vw] max-h-[300px] overflow-y-auto">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencySelect(currency.code, currency.name)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                currentCurrency === currency.code ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{currency.code}</div>
                  <div className="text-xs text-gray-500">{currency.name}</div>
                </div>
                {currentCurrency === currency.code && (
                  <span className="text-xs text-blue-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

