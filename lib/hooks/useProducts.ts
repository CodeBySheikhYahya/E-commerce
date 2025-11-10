import { getAllProducts, getProductById } from '../productApi';
import { Product } from '../../components/DemoData';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

function mapApiProductToProduct(apiProduct: any): Product {
  // Format price as currency string
  const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined) return '$0.00';
    return `$${price.toFixed(2)}`;
  };

  // Calculate discount percentage if priceBefore exists
  const calculateDiscount = (priceBefore: number | null, currentPrice: number): string | undefined => {
    if (priceBefore && priceBefore > currentPrice) {
      const discountPercent = Math.round(((priceBefore - currentPrice) / priceBefore) * 100);
      return `${discountPercent}% OFF`;
    }
    return undefined;
  };

  const currentPrice = apiProduct.price || 0;
  const priceBefore = apiProduct.priceBefore;
  const priceAfter = apiProduct.priceAfter;
  
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.fullName || apiProduct.name || '',
    price: formatPrice(currentPrice),
    image: '/sa.webp', // Placeholder
    originalPrice: priceBefore ? formatPrice(priceBefore) : undefined,
    discount: calculateDiscount(priceBefore, currentPrice),
    category: apiProduct.categoryId ? `Category ${apiProduct.categoryId}` : undefined,
    isNew: apiProduct.isNewArrival === 1,
    isBestSeller: apiProduct.isBestSeller === 1,
    isOnSale: apiProduct.isOnSale === 1,
    isFeatures: apiProduct.isFeatures === 1,
    isActive: apiProduct.isActive === true,
    priceAfter: priceAfter ? formatPrice(priceAfter) : undefined,
    stock: apiProduct.isOutOfStock === 1 ? 'Out of stock' : 'In stock',
    colors: [], // Placeholder
    sizes: [], // Placeholder
    sku: apiProduct.code || undefined,
  };
}

// Wrapper function that fetches and maps products
async function fetchAllProducts(): Promise<Product[]> {
  const data = await getAllProducts();
  return Array.isArray(data) 
    ? data
        .filter(apiProduct => apiProduct.isDeleted !== true && apiProduct.isActive === true)
        .map(mapApiProductToProduct)
    : [];
}

// Wrapper function that fetches and maps a single product
async function fetchProductById(id: string): Promise<Product> {
  const data = await getProductById(id);
  return mapApiProductToProduct(data);
}

// Use the reusable hook factory
export const useProducts = createUseAllHook<Product>(
  'products',
  fetchAllProducts,
  'Products',
  'products',
  2 * 60 * 1000 // Cache for 2 minutes (products change more frequently)
);

// Use the reusable hook factory for single product
export const useProduct = createUseByIdHook<Product>(
  'product',
  fetchProductById,
  'Product',
  'product',
  2 * 60 * 1000 // Cache for 2 minutes (products change more frequently)
);

