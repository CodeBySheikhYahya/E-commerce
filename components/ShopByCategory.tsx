"use client";

import CategoryCard from "./CategoryCard";
import ScrollableContainer from "./ScrollableContainer";
import { motion } from "framer-motion";
import { useCategories } from "../lib/hooks/useCategories";
import { useMemo } from "react";

export default function ShopByCategory() {
  const { categories: apiCategories, isLoading } = useCategories();
  
  // Map API categories to display format
  const categories = useMemo(() => {
    if (isLoading) return [];
    return apiCategories.map((category) => ({
      id: category.id.toString(),
      name: category.name || category.fullName,
      image: "/sa.webp",
      href: `/category/${(category.name || category.fullName).toLowerCase().replace(/\s+/g, '-')}`
    }));
  }, [apiCategories, isLoading]);
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="w-full px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-heading">
            Shop by Category
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover everything you need through our safety product categories
          </p>
        </motion.div>

        {/* Categories - Horizontal Scrollable Layout */}
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No categories available</div>
        ) : (
          <ScrollableContainer>
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 w-48 lg:w-64">
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  image={category.image}
                  href={category.href}
                />
              </div>
            ))}
          </ScrollableContainer>
        )}
      </div>
    </section>
  );
}
