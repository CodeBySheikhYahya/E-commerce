import { getAllProducts, getProductById } from '../productApi';
import { Product } from '../../components/DemoData';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

function mapApiProductToProduct(apiProduct: any): Product {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.fullName || apiProduct.name || '',
    price: '$0.00', // Placeholder
    image: '/sa.webp', // Placeholder
    category: apiProduct.categoryId ? `Category ${apiProduct.categoryId}` : undefined,
    colors: [], // Placeholder
    sizes: [], // Placeholder
    sku: apiProduct.code || undefined,
  };
}

// Wrapper function that fetches and maps products
async function fetchAllProducts(): Promise<Product[]> {
  const data = await getAllProducts();
  return Array.isArray(data) ? data.map(mapApiProductToProduct) : [];
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

