import { useCurrencyStore } from './currencyStore';

/**
 * Formats a price value according to the detected currency
 * @param price - The numeric price value
 * @param currency - Optional currency code (defaults to detected currency)
 * @returns Formatted price string (e.g., "$100.00", "€100.00", "£100.00", "Rs 100.00")
 */
export function formatPrice(price: number | null | undefined, currency?: string): string {
  if (price === null || price === undefined) {
    price = 0;
  }

  const currencyInfo = useCurrencyStore.getState().currencyInfo;
  const currencyCode = currency || currencyInfo?.currency || 'USD';

  try {
    // Get locale based on currency for better formatting
    // For PKR, use en-PK locale; for others, use appropriate locales
    const localeMap: Record<string, string> = {
      'PKR': 'en-PK',
      'USD': 'en-US',
      'GBP': 'en-GB',
      'EUR': 'de-DE', // Use German locale for EUR as it's commonly used
      'INR': 'en-IN',
      'JPY': 'ja-JP',
      'CNY': 'zh-CN',
    };
    
    const locale = localeMap[currencyCode] || 'en-US';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } catch (error) {
    // Fallback to USD formatting if currency code is invalid
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
}

/**
 * Parses a price string and returns the numeric value
 * Handles different currency formats
 * @param priceString - The price string (e.g., "$100.00", "€100.00")
 * @returns Numeric price value
 */
export function parsePrice(priceString: string): number {
  if (!priceString) return 0;
  
  // Remove currency symbols and spaces, then parse
  const cleaned = priceString.replace(/[^\d.,-]/g, '').replace(',', '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Gets the current currency code
 * @returns Currency code (e.g., "USD", "EUR", "GBP")
 */
export function getCurrentCurrency(): string {
  const currencyInfo = useCurrencyStore.getState().currencyInfo;
  return currencyInfo?.currency || 'USD';
}

/**
 * Gets the current country name
 * @returns Country name (e.g., "United States", "United Kingdom")
 */
export function getCurrentCountry(): string {
  const currencyInfo = useCurrencyStore.getState().currencyInfo;
  return currencyInfo?.country || 'United States';
}

