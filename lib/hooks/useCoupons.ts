"use client";

import { getAllCoupons, getCouponByCode } from '../couponApi';
import { createUseAllHook } from './useApiQuery';
import { useQuery } from '@tanstack/react-query';

export interface Coupon {
  id: number;
  code: string;
  name: string;
  expiry: string;
  isActive: boolean;
  isExpired: boolean;
  isDeleted: boolean;
  createdOn: string;
  createdBy: number;
  updatedOn: string | null;
  updatedBy: number | null;
}

export const useCoupons = createUseAllHook<Coupon>(
  'coupons',
  getAllCoupons,
  'Coupons',
  'coupons',
  5 * 60 * 1000 // Cache for 5 minutes
);

export function useCouponByCode(code: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coupon', code],
    queryFn: () => getCouponByCode(code),
    enabled: !!code,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  console.log(`🔵 Coupon Raw Data:`, data);
  console.log(`🟡 Loading Coupon:`, isLoading);
  console.log(`🔴 Coupon Error:`, error);

  return {
    coupon: data || null,
    isLoading,
    error: error as Error | null,
  };
}

