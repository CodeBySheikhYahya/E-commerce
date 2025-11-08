"use client";

import { getImageById } from '../imageApi';
import { createUseByIdHook } from './useApiQuery';

export interface Image {
  id: number;
  productID: number;
  imagePath: string;
  isActive: boolean;
  createdOn: string;
  createdBy: number;
  updatedOn: string | null;
  updatedBy: number | null;
}

export const useImage = createUseByIdHook<Image>(
  'image',
  getImageById,
  'Image',
  'image',
  5 * 60 * 1000 // Cache for 5 minutes
);

