"use client";

import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import { Button } from "./ui/button";
import UnderlineTab from "./ui/underline-tab";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { demoProducts, Product } from "./DemoData";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"best" | "new" | "featured">("best");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredProducts = useMemo(() => {
    if (activeTab === "best") {
      // Best sellers: products with discount > 25%
      return demoProducts.filter(product => {
        if (!product.discount) return false;
        const discount = parseInt(product.discount.replace('% OFF', ''));
        return discount > 25;
      });
    } else if (activeTab === "new") {
      // New arrivals: products with isNew: true
      return demoProducts.filter(product => product.isNew === true);
    } else {
      // Featured: all products
      return demoProducts;
    }
  }, [activeTab]);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-heading">
            Featured Products
          </h2>
          <p className="section-subtitle max-w-2xl">
            Explore the best of Furnisy Featured Collection.
          </p>
        </motion.div>

        {/* Top Controls Row (tabs left, view all right) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap sm:overflow-visible">
            <UnderlineTab 
              label="Best Sellers" 
              isActive={activeTab === "best"}
              onClick={() => setActiveTab("best")} 
            />
            <UnderlineTab 
              label="New Arrivals" 
              isActive={activeTab === "new"}
              onClick={() => setActiveTab("new")} 
            />
            <UnderlineTab 
              label="Featured" 
              isActive={activeTab === "featured"}
              onClick={() => setActiveTab("featured")} 
            />
          </div>
          <div className="order-2 sm:order-none">
            <UnderlineTab label="View All" href="/products" />
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" }
                }
              }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                originalPrice={product.originalPrice}
                discount={product.discount}
                onQuickView={handleQuickView}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300" style={{fontFamily: 'var(--header-font-family)'}}>
            <Link href="/products">View All Products</Link>
          </Button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </section>
  );
}

