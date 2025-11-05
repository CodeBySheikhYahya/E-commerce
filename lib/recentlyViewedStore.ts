import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecentlyViewedProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  originalPrice?: string;
  discount?: string;
  viewedAt: number; // timestamp
}

interface RecentlyViewedStore {
  items: RecentlyViewedProduct[];
  addProduct: (product: Omit<RecentlyViewedProduct, 'viewedAt'>) => void;
  getRecentProducts: (limit?: number) => RecentlyViewedProduct[];
  clearHistory: () => void;
}

const MAX_ITEMS = 10; // Store maximum 10 recently viewed products

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product) => {
        const currentItems = get().items;
        
        // Remove if product already exists
        const filteredItems = currentItems.filter(item => item.id !== product.id);
        
        // Add new product at the beginning with current timestamp
        const newItems = [
          { ...product, viewedAt: Date.now() },
          ...filteredItems
        ].slice(0, MAX_ITEMS); // Keep only the most recent MAX_ITEMS

        set({ items: newItems });
      },

      getRecentProducts: (limit = 8) => {
        return get().items.slice(0, limit);
      },

      clearHistory: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'recently-viewed-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

