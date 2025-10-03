"use client";

import CartSidebar from "./CartSidebar";
import { useCartStore } from "../lib/cartStore";

export default function CartOverlayRoot() {
  const { isOpen, closeCart } = useCartStore();
  return <CartSidebar isOpen={isOpen} onClose={closeCart} />;
}


