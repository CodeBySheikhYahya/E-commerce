"use client";

import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../searchApi';

export interface ProductSearchItem {
  id: number;
  code: string;
  name: string;
  fullName: string;
  categoryId: number;
  colorId: number;
  sizeId: number;
  quantityId: number;
  isActive: boolean;
}

export function useProductSearch(name: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['product-search', name],
    queryFn: () => searchProducts(name),
    enabled: !!name && name.trim().length > 0,
    staleTime: 60 * 1000,
  });

  const items: ProductSearchItem[] = Array.isArray(data) ? data : [];

  return { results: items, isLoading, error: error as Error | null, refetch };
}


