import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './toastStore';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedQuantityPack?: string;
  quantity: number;
  // Order API required fields
  productCode?: string;
  colorID?: number;
  sizeID?: number;
  quantityID?: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isClosing: boolean;
  appliedCouponCode: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  closeCartWithAnimation: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  setAppliedCoupon: (code: string | null) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isClosing: false,
      appliedCouponCode: null,

      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        if (existingItem) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }));
          // Show toast notification
          if (typeof window !== 'undefined') {
            useToastStore.getState().show('Item quantity updated in cart!', 'success');
          }
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1 }]
          }));
          // Show toast notification
          if (typeof window !== 'undefined') {
            useToastStore.getState().show('Added to cart!', 'success');
          }
        }
      },

      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }));
        // Show toast notification
        if (typeof window !== 'undefined') {
          useToastStore.getState().show('Item removed from cart', 'info');
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      closeCartWithAnimation: () => {
        set({ isClosing: true });
        setTimeout(() => {
          set({ isOpen: false, isClosing: false });
        }, 300); // Match the animation duration
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return total + (price * item.quantity);
        }, 0);
      },

      setAppliedCoupon: (code) => {
        set({ appliedCouponCode: code });
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      partialize: (state) => ({ items: state.items, appliedCouponCode: state.appliedCouponCode }), // persist items and coupon
    }
  )
);

// Selector hooks for optimized access
export const useCartItemCount = () => 
  useCartStore(state => state.items.reduce((total, item) => total + item.quantity, 0));

export const useCartSubtotal = () => 
  useCartStore(state => state.items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + (price * item.quantity);
  }, 0));