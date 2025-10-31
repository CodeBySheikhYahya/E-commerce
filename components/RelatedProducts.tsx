"use client";

import { useState, useCallback } from "react";
import { demoProducts, Product } from "./DemoData";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentProductId?: string;
  limit?: number;
}

export default function RelatedProducts({ currentProductId, limit = 4 }: RelatedProductsProps) {
  // Get related products (exclude current product and get random products)
  const relatedProducts = demoProducts
    .filter(product => !currentProductId || product.id !== currentProductId)
    .slice(0, limit);
  
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle quick view modal
  const handleQuickView = useCallback((productId: string) => {
    const product = demoProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Related Products
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover more products that might interest you
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
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

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}