/**
 * Currency formatting utilities
 */

export interface CurrencyInfo {
  code: string;
  symbol: string;
  country: string;
}

/**
 * Map country names to currency information
 */
const countryToCurrency: Record<string, CurrencyInfo> = {
  'Pakistan': { code: 'PKR', symbol: '₨', country: 'Pakistan' },
  'United Kingdom': { code: 'GBP', symbol: '£', country: 'United Kingdom' },
  'United States': { code: 'USD', symbol: '$', country: 'United States' },
  'Canada': { code: 'CAD', symbol: 'C$', country: 'Canada' },
  'Australia': { code: 'AUD', symbol: 'A$', country: 'Australia' },
  'India': { code: 'INR', symbol: '₹', country: 'India' },
  'Eurozone': { code: 'EUR', symbol: '€', country: 'Eurozone' },
  'Germany': { code: 'EUR', symbol: '€', country: 'Germany' },
  'France': { code: 'EUR', symbol: '€', country: 'France' },
  'Italy': { code: 'EUR', symbol: '€', country: 'Italy' },
  'Spain': { code: 'EUR', symbol: '€', country: 'Spain' },
  'Netherlands': { code: 'EUR', symbol: '€', country: 'Netherlands' },
  'Belgium': { code: 'EUR', symbol: '€', country: 'Belgium' },
  'Austria': { code: 'EUR', symbol: '€', country: 'Austria' },
  'Portugal': { code: 'EUR', symbol: '€', country: 'Portugal' },
  'Ireland': { code: 'EUR', symbol: '€', country: 'Ireland' },
  'Finland': { code: 'EUR', symbol: '€', country: 'Finland' },
  'Greece': { code: 'EUR', symbol: '€', country: 'Greece' },
  'Japan': { code: 'JPY', symbol: '¥', country: 'Japan' },
  'China': { code: 'CNY', symbol: '¥', country: 'China' },
  'South Korea': { code: 'KRW', symbol: '₩', country: 'South Korea' },
  'Singapore': { code: 'SGD', symbol: 'S$', country: 'Singapore' },
  'Malaysia': { code: 'MYR', symbol: 'RM', country: 'Malaysia' },
  'Thailand': { code: 'THB', symbol: '฿', country: 'Thailand' },
  'United Arab Emirates': { code: 'AED', symbol: 'د.إ', country: 'United Arab Emirates' },
  'Saudi Arabia': { code: 'SAR', symbol: '﷼', country: 'Saudi Arabia' },
  'South Africa': { code: 'ZAR', symbol: 'R', country: 'South Africa' },
  'Brazil': { code: 'BRL', symbol: 'R$', country: 'Brazil' },
  'Mexico': { code: 'MXN', symbol: '$', country: 'Mexico' },
  'Argentina': { code: 'ARS', symbol: '$', country: 'Argentina' },
  'Chile': { code: 'CLP', symbol: '$', country: 'Chile' },
  'New Zealand': { code: 'NZD', symbol: 'NZ$', country: 'New Zealand' },
  'Switzerland': { code: 'CHF', symbol: 'CHF', country: 'Switzerland' },
  'Norway': { code: 'NOK', symbol: 'kr', country: 'Norway' },
  'Sweden': { code: 'SEK', symbol: 'kr', country: 'Sweden' },
  'Denmark': { code: 'DKK', symbol: 'kr', country: 'Denmark' },
  'Poland': { code: 'PLN', symbol: 'zł', country: 'Poland' },
  'Turkey': { code: 'TRY', symbol: '₺', country: 'Turkey' },
  'Russia': { code: 'RUB', symbol: '₽', country: 'Russia' },
  'Egypt': { code: 'EGP', symbol: 'E£', country: 'Egypt' },
  'Nigeria': { code: 'NGN', symbol: '₦', country: 'Nigeria' },
  'Kenya': { code: 'KES', symbol: 'KSh', country: 'Kenya' },
  'Bangladesh': { code: 'BDT', symbol: '৳', country: 'Bangladesh' },
  'Sri Lanka': { code: 'LKR', symbol: 'Rs', country: 'Sri Lanka' },
  'Nepal': { code: 'NPR', symbol: 'Rs', country: 'Nepal' },
  'Philippines': { code: 'PHP', symbol: '₱', country: 'Philippines' },
  'Indonesia': { code: 'IDR', symbol: 'Rp', country: 'Indonesia' },
  'Vietnam': { code: 'VND', symbol: '₫', country: 'Vietnam' },
};

/**
 * Default currency (GBP for United Kingdom)
 */
export const DEFAULT_CURRENCY: CurrencyInfo = {
  code: 'GBP',
  symbol: '£',
  country: 'United Kingdom'
};

/**
 * Map region codes to currency codes (common ones)
 * This is a fallback when locale doesn't provide currency directly
 */
const regionToCurrency: Record<string, { code: string; country: string }> = {
  'US': { code: 'USD', country: 'United States' },
  'GB': { code: 'GBP', country: 'United Kingdom' },
  'CA': { code: 'CAD', country: 'Canada' },
  'AU': { code: 'AUD', country: 'Australia' },
  'IN': { code: 'INR', country: 'India' },
  'JP': { code: 'JPY', country: 'Japan' },
  'CN': { code: 'CNY', country: 'China' },
  'KR': { code: 'KRW', country: 'South Korea' },
  'SG': { code: 'SGD', country: 'Singapore' },
  'MY': { code: 'MYR', country: 'Malaysia' },
  'TH': { code: 'THB', country: 'Thailand' },
  'AE': { code: 'AED', country: 'United Arab Emirates' },
  'SA': { code: 'SAR', country: 'Saudi Arabia' },
  'QA': { code: 'QAR', country: 'Qatar' },
  'PK': { code: 'PKR', country: 'Pakistan' },
  'ZA': { code: 'ZAR', country: 'South Africa' },
  'BR': { code: 'BRL', country: 'Brazil' },
  'MX': { code: 'MXN', country: 'Mexico' },
  'AR': { code: 'ARS', country: 'Argentina' },
  'CL': { code: 'CLP', country: 'Chile' },
  'NZ': { code: 'NZD', country: 'New Zealand' },
  'CH': { code: 'CHF', country: 'Switzerland' },
  'NO': { code: 'NOK', country: 'Norway' },
  'SE': { code: 'SEK', country: 'Sweden' },
  'DK': { code: 'DKK', country: 'Denmark' },
  'PL': { code: 'PLN', country: 'Poland' },
  'TR': { code: 'TRY', country: 'Turkey' },
  'RU': { code: 'RUB', country: 'Russia' },
  'EG': { code: 'EGP', country: 'Egypt' },
  'NG': { code: 'NGN', country: 'Nigeria' },
  'KE': { code: 'KES', country: 'Kenya' },
  'BD': { code: 'BDT', country: 'Bangladesh' },
  'LK': { code: 'LKR', country: 'Sri Lanka' },
  'NP': { code: 'NPR', country: 'Nepal' },
  'PH': { code: 'PHP', country: 'Philippines' },
  'ID': { code: 'IDR', country: 'Indonesia' },
  'VN': { code: 'VND', country: 'Vietnam' },
  // Eurozone countries
  'DE': { code: 'EUR', country: 'Germany' },
  'FR': { code: 'EUR', country: 'France' },
  'IT': { code: 'EUR', country: 'Italy' },
  'ES': { code: 'EUR', country: 'Spain' },
  'NL': { code: 'EUR', country: 'Netherlands' },
  'BE': { code: 'EUR', country: 'Belgium' },
  'AT': { code: 'EUR', country: 'Austria' },
  'PT': { code: 'EUR', country: 'Portugal' },
  'IE': { code: 'EUR', country: 'Ireland' },
  'FI': { code: 'EUR', country: 'Finland' },
  'GR': { code: 'EUR', country: 'Greece' },
};

/**
 * Get currency info from browser's Intl API (locale-based)
 */
export function getCurrencyFromIntl(): CurrencyInfo | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    // Get user's locale (e.g., "en-QA", "ar-QA", "en-US")
    const locale = navigator.language || (navigator as any).userLanguage;
    
    if (!locale) {
      return null;
    }

    // Extract region code from locale (e.g., "en-QA" -> "QA")
    const parts = locale.split('-');
    const regionCode = parts.length > 1 ? parts[1].toUpperCase() : null;
    
    if (regionCode && regionToCurrency[regionCode]) {
      const currencyData = regionToCurrency[regionCode];
      
      // Get currency symbol using Intl API
      const symbolFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyData.code,
      });
      
      const symbol = symbolFormatter.formatToParts(0).find(part => part.type === 'currency')?.value || '$';
      
      return {
        code: currencyData.code,
        symbol: symbol,
        country: currencyData.country,
      };
    }

    // If region code not found, try to detect from locale's number format
    // This is a fallback for locales without region code
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD', // Default, will be overridden if locale has currency preference
      });
      
      // Try common currencies to see which one matches the locale's format
      const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
      for (const currencyCode of commonCurrencies) {
        const testFormatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
        });
        const symbol = testFormatter.formatToParts(0).find(part => part.type === 'currency')?.value;
        
        if (symbol) {
          return {
            code: currencyCode,
            symbol: symbol,
            country: locale,
          };
        }
      }
    } catch (e) {
      // Ignore errors in fallback
    }

    return null;
  } catch (error) {
    console.warn('Intl API currency detection failed:', error);
    return null;
  }
}

/**
 * Get currency info from country name
 */
export function getCurrencyFromCountry(countryName: string | null | undefined): CurrencyInfo {
  if (!countryName) {
    return DEFAULT_CURRENCY;
  }
  
  // Try exact match first
  if (countryToCurrency[countryName]) {
    return countryToCurrency[countryName];
  }
  
  // Try case-insensitive match
  const normalizedCountry = countryName.trim();
  const found = Object.keys(countryToCurrency).find(
    key => key.toLowerCase() === normalizedCountry.toLowerCase()
  );
  
  if (found) {
    return countryToCurrency[found];
  }
  
  // Default to GBP if not found
  return DEFAULT_CURRENCY;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  amount: number | null | undefined,
  currencyCode: string = 'GBP',
  symbol: string = '£'
): string {
  if (amount === null || amount === undefined) {
    return `${symbol}0.00`;
  }
  
  // Format number with 2 decimal places
  const formattedAmount = amount.toFixed(2);
  
  // Return formatted price with symbol
  return `${symbol}${formattedAmount}`;
}

/**
 * Parse price string to number (removes currency symbols)
 */
export function parsePrice(priceString: string): number {
  // Remove all currency symbols and non-numeric characters except decimal point
  const cleaned = priceString.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

