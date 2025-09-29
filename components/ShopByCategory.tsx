"use client";

import CategoryCard from "./CategoryCard";
import ScrollableContainer from "./ScrollableContainer";

// Sample category data - replace with real data later
const categories = [
  {
    id: "1",
    name: "Safety Vests",
    image: "/sa.webp",
    href: "/category/safety-vests"
  },
  {
    id: "2", 
    name: "Safety Helmets",
    image: "/sa.webp",
    href: "/category/safety-helmets"
  },
  {
    id: "3",
    name: "Goggles",
    image: "/sa.webp",
    href: "/category/goggles"
  },
  {
    id: "4",
    name: "Industrial Parts",
    image: "/sa.webp",
    href: "/category/industrial-parts"
  },
  {
    id: "5",
    name: "Safety Gloves",
    image: "/sa.webp",
    href: "/category/safety-gloves"
  },
  {
    id: "6",
    name: "Safety Shoes",
    image: "/sa.webp",
    href: "/category/safety-shoes"
  },
  {
    id: "7",
    name: "Safety Harness",
    image: "/sa.webp",
    href: "/category/safety-harness"
  }
];

export default function ShopByCategory() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="w-full px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Shop by Category
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover everything you need through our safety product categories
          </p>
        </div>

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
