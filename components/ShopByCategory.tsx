"use client";

import CategoryCard from "./CategoryCard";
import ScrollableContainer from "./ScrollableContainer";
import { demoProducts } from "./DemoData";
import { motion } from "framer-motion";

// Generate categories from demo products
const categories = Array.from(new Set(demoProducts.map(product => product.category).filter(Boolean))).map((category, index) => ({
  id: (index + 1).toString(),
  name: category!,
  image: "/sa.webp",
  href: `/category/${category!.toLowerCase().replace(/\s+/g, '-')}`
}));

export default function ShopByCategory() {
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
      </div>
    </section>
  );
}
