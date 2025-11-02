"use client";

import { getAllColors, getColorById } from '../colorApi';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

export interface Color {
  id: number;
  code: string | null;
  name: string;
  fullName: string;
  isActive: boolean;
}

export const useColors = createUseAllHook<Color>(
  'colors',
  getAllColors,
  'Colors',
  'colors',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

export const useColor = createUseByIdHook<Color>(
  'color',
  getColorById,
  'Color',
  'color',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

