"use client";

import { useQuery } from '@tanstack/react-query';

export function createUseAllHook<T>(
  queryKey: string,
  fetchFn: () => Promise<T[]>,
  resourceName: string,
  returnPropertyName: string,
  staleTime: number = 5 * 60 * 1000 // Default 5 minutes
) {
  return function useAll() {
    const { data, isLoading, error } = useQuery({
      queryKey: [queryKey],
      queryFn: fetchFn,
      staleTime: staleTime,
    });

    console.log(`🔵 ${resourceName} Raw Data:`, data);
    console.log(`🟡 ${resourceName} Loading:`, isLoading);
    console.log(`🔴 ${resourceName} Error:`, error);

    const items: T[] = Array.isArray(data) ? data : [];

    console.log(`🟢 ${resourceName}:`, items);

    return {
      [returnPropertyName]: items,
      isLoading,
      error,
    };
  };
}

export function createUseByIdHook<T>(
  queryKey: string,
  fetchFn: (id: string) => Promise<T>,
  resourceName: string,
  returnPropertyName: string,
  staleTime: number = 5 * 60 * 1000 // Default 5 minutes
) {
  return function useById(id: string) {
    const { data, isLoading, error } = useQuery({
      queryKey: [queryKey, id],
      queryFn: () => fetchFn(id),
      enabled: !!id,
      staleTime: staleTime,
    });

    console.log(`🔵 ${resourceName} Raw Data:`, data);
    console.log(`🟡 ${resourceName} Loading:`, isLoading);
    console.log(`🔴 ${resourceName} Error:`, error);

    const item: T | null = data ? data : null;

    console.log(`🟢 ${resourceName}:`, item);

    return {
      [returnPropertyName]: item,
      isLoading,
      error,
    };
  };
}

