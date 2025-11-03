"use client";

import { getAllQuantities, getQuantityById } from '../quantityApi';
import { createUseAllHook, createUseByIdHook } from './useApiQuery';

export interface Quantity {
  id: number;
  name: string;
  fullName: string;
  isActive: boolean;
}

export const useQuantities = createUseAllHook<Quantity>(
  'quantities',
  getAllQuantities,
  'Quantities',
  'quantities',
  10 * 60 * 1000
);

export const useQuantity = createUseByIdHook<Quantity>(
  'quantity',
  getQuantityById,
  'Quantity',
  'quantity',
  10 * 60 * 1000
);


