import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductById } from '../productApi';
import { Product } from '../../components/DemoData';

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

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes (products change more frequently)
  });

  console.log('🔵 API Raw Data:', data);
  console.log('🟡 Loading:', isLoading);
  console.log('🔴 Error:', error);

  const products: Product[] = data ? data.map(mapApiProductToProduct) : [];

  console.log('🟢 Mapped Products:', products);

  return {
    products,
    isLoading,
    error,
  };
}

export function useProduct(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes (products change more frequently)
  });

  console.log('🔵 API Raw Product Data:', data);
  console.log('🟡 Loading Product:', isLoading);
  console.log('🔴 Product Error:', error);

  const product: Product | null = data ? mapApiProductToProduct(data) : null;

  console.log('🟢 Mapped Product:', product);

  return {
    product,
    isLoading,
    error,
  };
}

