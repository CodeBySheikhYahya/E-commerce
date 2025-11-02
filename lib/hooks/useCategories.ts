"use client";

import { getAllCategories, getCategoryById } from '../categoryApi';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

export interface Category {
  id: number;
  code: string;
  name: string;
  fullName: string;
  isActive: boolean;
}

export const useCategories = createUseAllHook<Category>(
  'categories',
  getAllCategories,
  'Categories',
  'categories',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

export const useCategory = createUseByIdHook<Category>(
  'category',
  getCategoryById,
  'Category',
  'category',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

