"use client";

import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import ScrollableContainer from "./ScrollableContainer";
import ErrorState from "./ErrorState";
import { motion } from "framer-motion";
import { useCategories } from "../lib/hooks/useCategories";
import { useSubCategories } from "../lib/hooks/useSubCategories";
import { useMemo } from "react";

export default function ShopByCategory() {
  const { categories: apiCategories, isLoading, error: categoriesError } = useCategories();
  const { subcategories: apiSubCategories, isLoading: subCategoriesLoading, error: subCategoriesError } = useSubCategories();
  
  // Map API categories to display format with subcategories
  const categories = useMemo(() => {
    if (isLoading) return [];
    return apiCategories.map((category) => {
      // Filter subcategories for this main category
      const categorySubCategories = apiSubCategories.filter(
        (sub) => sub.mainCategoryID === category.id && sub.isActive && !sub.isDeleted
      );
      
      return {
        id: category.id.toString(),
        name: category.name || category.fullName,
        image: "/sa.webp",
        href: `/products?category=${encodeURIComponent(category.name || category.fullName)}`,
        subcategories: categorySubCategories.map((sub) => ({
          id: sub.id,
          name: sub.name,
          fullName: sub.fullName,
        })),
      };
    });
  }, [apiCategories, apiSubCategories, isLoading]);
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
          <ScrollableContainer>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-48 lg:w-64">
                <CategoryCardSkeleton />
              </div>
            ))}
          </ScrollableContainer>
        ) : categoriesError || subCategoriesError ? (
          <ErrorState onRetry={() => window.location.reload()} />
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
                  subcategories={category.subcategories}
                />
              </div>
            ))}
          </ScrollableContainer>
        )}
      </div>
    </section>
  );
}
