import { getAllProducts, getProductById } from '../productApi';
import { getAllCategories } from '../categoryApi';
import { getAllSubCategories } from '../subCategoryApi';
import { Product } from '../../components/DemoData';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';
import { formatPrice as formatPriceUtil } from '../currencyUtils';

function mapApiProductToProduct(
  apiProduct: any,
  categories: any[],
  subcategories: any[]
): Product {
  // Format price as currency string using detected currency
  const formatPrice = (price: number | null | undefined): string => {
    return formatPriceUtil(price);
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
  
  // Resolve category and subcategory names
  let categoryName: string | undefined = undefined;
  const categoryId = apiProduct.categoryId;
  const subCategoryId = apiProduct.subCategoryId || null;

  // If product has subcategory, use subcategory name, otherwise use category name
  if (subCategoryId) {
    const subcategory = subcategories.find(sub => sub.id === subCategoryId);
    if (subcategory && subcategory.isActive && !subcategory.isDeleted) {
      categoryName = subcategory.name || subcategory.fullName;
    } else {
      // Fallback to category if subcategory not found
      const category = categories.find(cat => cat.id === categoryId);
      if (category && category.isActive && !category.isDeleted) {
        categoryName = category.name || category.fullName;
      }
    }
  } else if (categoryId) {
    // Product belongs directly to category (no subcategory)
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.isActive && !category.isDeleted) {
      categoryName = category.name || category.fullName;
    }
  }
  
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.fullName || apiProduct.name || '',
    price: formatPrice(currentPrice),
    image: '/sa.webp', // Placeholder
    originalPrice: priceBefore ? formatPrice(priceBefore) : undefined,
    discount: calculateDiscount(priceBefore, currentPrice),
    category: categoryName,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
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
  const [productsResult, categoriesResult, subcategoriesResult] = await Promise.allSettled([
    getAllProducts(),
    getAllCategories(),
    getAllSubCategories()
  ]);

  // Products and Categories are required - throw error if they fail
  if (productsResult.status === 'rejected') {
    throw productsResult.reason;
  }
  if (categoriesResult.status === 'rejected') {
    throw categoriesResult.reason;
  }

  // Subcategories are optional - use empty array if they fail
  const productsData = productsResult.value;
  const categoriesData = categoriesResult.value;
  const subcategoriesData = subcategoriesResult.status === 'fulfilled' ? subcategoriesResult.value : [];

  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  const subcategories = Array.isArray(subcategoriesData) ? subcategoriesData : [];

  return Array.isArray(productsData) 
    ? productsData
        .filter(apiProduct => apiProduct.isDeleted !== true && apiProduct.isActive === true)
        .map(apiProduct => mapApiProductToProduct(apiProduct, categories, subcategories))
    : [];
}

// Wrapper function that fetches and maps a single product
async function fetchProductById(id: string): Promise<Product> {
  const [productResult, categoriesResult, subcategoriesResult] = await Promise.allSettled([
    getProductById(id),
    getAllCategories(),
    getAllSubCategories()
  ]);

  // Product and Categories are required - throw error if they fail
  if (productResult.status === 'rejected') {
    throw productResult.reason;
  }
  if (categoriesResult.status === 'rejected') {
    throw categoriesResult.reason;
  }

  // Subcategories are optional - use empty array if they fail
  const productData = productResult.value;
  const categoriesData = categoriesResult.value;
  const subcategoriesData = subcategoriesResult.status === 'fulfilled' ? subcategoriesResult.value : [];

  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  const subcategories = Array.isArray(subcategoriesData) ? subcategoriesData : [];

  return mapApiProductToProduct(productData, categories, subcategories);
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

