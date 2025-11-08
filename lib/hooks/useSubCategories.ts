"use client";

import { getAllSubCategories, getSubCategoryById } from '../subCategoryApi';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

export interface SubCategory {
  id: number;
  code: string;
  name: string;
  mainCategoryID: number;
  fullName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdOn: string | null;
  createdBy: number | null;
  updatedOn: string | null;
  updatedBy: number | null;
}

export const useSubCategories = createUseAllHook<SubCategory>(
  'subcategories',
  getAllSubCategories,
  'Sub Categories',
  'subcategories',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

export const useSubCategory = createUseByIdHook<SubCategory>(
  'subcategory',
  getSubCategoryById,
  'Sub Category',
  'subcategory',
  10 * 60 * 1000 // Cache for 10 minutes (static data)
);

