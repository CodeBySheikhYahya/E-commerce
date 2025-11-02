"use client";

import { getAllSizes, getSizeById } from '../sizeApi';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

export interface Size {
  id: number;
  code: string | null;
  name: string;
  fullName: string;
  isActive: boolean;
}

export const useSizes = createUseAllHook<Size>(
  'sizes',
  getAllSizes,
  'Sizes',
  'sizes',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

export const useSize = createUseByIdHook<Size>(
  'size',
  getSizeById,
  'Size',
  'size',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

