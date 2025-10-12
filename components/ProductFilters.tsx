"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { demoProducts } from "./DemoData";

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (range: { min: number; max: number }) => void;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  className?: string;
}

// Extract unique categories from demo data
const categories = Array.from(new Set(demoProducts.map(product => product.category).filter(Boolean)));

// Extract best sellers (products with discount > 25%)
const bestSellers = demoProducts.filter(product => {
  if (!product.discount) return false;
  const discount = parseInt(product.discount.replace('% OFF', ''));
  return discount > 25;
});

// Sample colors for safety equipment
const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Orange", value: "#FF8C00" },
  { name: "Yellow", value: "#FFD700" },
  { name: "Red", value: "#DC2626" },
  { name: "Blue", value: "#2563EB" },
  { name: "Green", value: "#16A34A" },
  { name: "Gray", value: "#6B7280" }
];

export default function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedColors,
  onColorChange,
  className = ""
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    bestSellers: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleColorToggle = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      onColorChange(selectedColors.filter(c => c !== colorName));
    } else {
      onColorChange([...selectedColors, colorName]);
    }
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Categories */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left text-xl font-semibold text-gray-900 uppercase tracking-wide mb-3"
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => category && handleCategoryToggle(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-base transition-colors duration-200 ${
                  category && selectedCategories.includes(category)
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-4">
        {/* Always visible heading - no collapse functionality */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">
            Filter by Price
          </h3>
        </div>
        
        {/* Always visible price range slider */}
        <div className="space-y-4">
          {/* Price Range Slider */}
          <div className="relative h-6 flex items-center">
            {/* Background track */}
            <div className="absolute w-full h-1 bg-gray-300 rounded-lg"></div>
            
            {/* Selected range track */}
            <div 
              className="absolute h-1 bg-gray-800 rounded-lg"
              style={{
                left: `${(priceRange.min / 1000) * 100}%`,
                width: `${((priceRange.max - priceRange.min) / 1000) * 100}%`
              }}
            ></div>
            
            {/* Min handle */}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.min}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin < priceRange.max) {
                  onPriceChange({ ...priceRange, min: newMin });
                }
              }}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
              style={{ zIndex: 2 }}
            />
            
            {/* Max handle */}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax > priceRange.min) {
                  onPriceChange({ ...priceRange, max: newMax });
                }
              }}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
              style={{ zIndex: 3 }}
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('colors')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Colors
          {expandedSections.colors ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.colors && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColors.includes(color.name)
                    ? "border-black scale-110"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Best Sellers */}
      <div>
        <button
          onClick={() => toggleSection('bestSellers')}
          className="flex items-center justify-between w-full text-left text-xl font-semibold text-gray-900 uppercase tracking-wide mb-3"
        >
          Best Sellers
          {expandedSections.bestSellers ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.bestSellers && (
          <div className="space-y-4">
            {bestSellers.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 line-clamp-2 leading-tight">{product.name}</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Slider Styles */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 2px;
          background: #374151;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .slider-thumb::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 2px;
          background: #374151;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}
