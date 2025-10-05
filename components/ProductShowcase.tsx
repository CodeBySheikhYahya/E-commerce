"use client";

import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import UnderlineTab from "./ui/underline-tab";
import Link from "next/link";
import { useState } from "react";
import { demoProducts } from "./DemoData";

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"best" | "new" | "featured">("best");
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="section-heading">
            Featured Products
          </h2>
          <p className="section-subtitle max-w-2xl">
            Explore the best of Furnisy Featured Collection.
          </p>
        </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {demoProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300" style={{fontFamily: 'var(--header-font-family)'}}>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

