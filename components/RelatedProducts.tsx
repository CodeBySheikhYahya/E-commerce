"use client";

import ProductCard from "./ProductCard";
import { demoProducts } from "./DemoData";

export default function RelatedProducts() {
  // Get first 4 products from demo data as related products
  const relatedProducts = demoProducts.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Related Products
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            You might also like these safety products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {relatedProducts.map((product) => (
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
      </div>
    </section>
  );
}
