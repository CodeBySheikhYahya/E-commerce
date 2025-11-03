"use client";

import Link from "next/link";
import { Home, Heart, ShoppingBag } from "lucide-react";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--header-border)] lg:hidden">
      <div className="flex items-center justify-around py-2">
        <Link href="/" className="flex flex-col items-center space-y-1 py-2 px-4 text-[var(--header-text)] hover:text-[var(--header-text-muted)]">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link href="/wishlist" className="flex flex-col items-center space-y-1 py-2 px-4 text-[var(--header-text)] hover:text-[var(--header-text-muted)]">
          <Heart className="h-5 w-5" />
          <span className="text-xs">Wishlist</span>
        </Link>
        
        <Link href="/products" className="flex flex-col items-center space-y-1 py-2 px-4 text-[var(--header-text)] hover:text-[var(--header-text-muted)]">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs">Shop</span>
        </Link>
        
        {/* Account link temporarily hidden for demo */}
        {false && (
        <Link href="/login" className="flex flex-col items-center space-y-1 py-2 px-4 text-[var(--header-text)] hover:text-[var(--header-text-muted)]">
          {/* <User className="h-5 w-5" /> */}
          <span className="text-xs">Account</span>
        </Link>
        )}
      </div>
    </div>
  );
}


