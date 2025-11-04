import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  show: (message: string, type?: ToastType, duration?: number) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  show: (message, type = 'success', duration = 2000) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, message, type, duration };
    
    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto remove after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  remove: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

