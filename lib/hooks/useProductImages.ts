"use client";

import { getImagesByProductId } from '../productImageApi';
import { createUseByIdHook } from './useApiQuery';

export interface ProductImage {
  id: number;
  productID: number;
  imagePath: string;
  isActive: boolean;
  createdOn: string;
  createdBy: number;
  updatedOn: string | null;
  updatedBy: number | null;
}

export const useProductImages = createUseByIdHook<ProductImage[]>(
  'product-images',
  getImagesByProductId,
  'Product Images',
  'images',
  5 * 60 * 1000 // Cache for 5 minutes
);

