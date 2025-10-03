import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../components/DemoData';

interface WishlistStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        if (!existingItem) {
          set(state => ({
            items: [...state.items, item]
          }));
        }
      },

      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
