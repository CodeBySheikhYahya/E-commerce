"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, Info } from "lucide-react";
import { useToastStore, ToastType } from "../lib/toastStore";

const toastIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const toastStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: "text-green-600",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-600",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-600",
  },
};

export default function Toast() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full sm:w-auto">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];
          const styles = toastStyles[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                ${styles.bg} ${styles.border} ${styles.text}
                border rounded-lg shadow-lg p-4 
                flex items-start gap-3 pointer-events-auto
                backdrop-blur-sm
              `}
            >
              <Icon className={`h-5 w-5 ${styles.icon} flex-shrink-0 mt-0.5`} />
              <p className="flex-1 text-sm font-medium leading-relaxed">
                {toast.message}
              </p>
              <button
                onClick={() => remove(toast.id)}
                className={`
                  ${styles.icon} hover:opacity-70 
                  transition-opacity flex-shrink-0
                `}
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

