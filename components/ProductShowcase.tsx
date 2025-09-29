"use client";

import ProductCard from "./ProductCard";

// Sample product data - replace with real data later
const sampleProducts = [
  {
    id: "1",
    name: "Industrial Safety Helmet",
    price: "$49.99",
    image: "/sa.webp",
    originalPrice: "$69.99",
    discount: "29% OFF"
  },
  {
    id: "2", 
    name: "High Visibility Safety Vest",
    price: "$24.99",
    image: "/sa.webp",
    originalPrice: "$34.99",
    discount: "29% OFF"
  },
  {
    id: "3",
    name: "Protective Safety Goggles",
    price: "$19.99", 
    image: "/sa.webp",
    originalPrice: "$29.99",
    discount: "33% OFF"
  },
  {
    id: "4",
    name: "Steel Toe Safety Boots",
    price: "$89.99",
    image: "/sa.webp",
    originalPrice: "$119.99",
    discount: "25% OFF"
  },
  {
    id: "5",
    name: "Industrial Work Gloves",
    price: "$14.99",
    image: "/sa.webp",
    originalPrice: "$19.99",
    discount: "25% OFF"
  },
  {
    id: "6",
    name: "Safety Harness System",
    price: "$129.99",
    image: "/sa.webp",
    originalPrice: "$159.99",
    discount: "19% OFF"
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Featured Safety Products
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover our top-rated safety equipment designed to protect your workforce with industry-leading quality and reliability.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {sampleProducts.map((product) => (
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
          <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300" style={{fontFamily: 'var(--header-font-family)'}}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
