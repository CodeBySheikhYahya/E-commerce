"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRecentlyViewedStore } from "../lib/recentlyViewedStore";
import ProductCard from "./ProductCard";
import { Product } from "./DemoData";

interface RecentlyViewedProps {
  currentProductId?: string;
  limit?: number;
}

export default function RecentlyViewed({ currentProductId, limit = 4 }: RecentlyViewedProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const getRecentProducts = useRecentlyViewedStore(state => state.getRecentProducts);

  // Only render after mount to avoid hydration issues with localStorage
  useEffect(() => {
    setIsMounted(true);
    // Get products from store after mount
    const products = getRecentProducts(limit + 1);
    setRecentProducts(products);
  }, [limit, getRecentProducts]);

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle quick view modal
  const handleQuickView = useCallback((productId: string) => {
    const product = recentProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product as unknown as Product);
      setIsModalOpen(true);
    }
  }, [recentProducts]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // Filter out current product if on detail page
  const displayProducts = currentProductId 
    ? recentProducts.filter(product => product.id !== currentProductId).slice(0, limit)
    : recentProducts.slice(0, limit);

  // Don't render on server or if no products
  if (!isMounted || displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Recently Viewed
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Continue browsing products you've recently checked out
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              originalPrice={product.originalPrice}
              discount={product.discount}
              view="grid"
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

