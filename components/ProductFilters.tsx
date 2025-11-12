"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCategories } from "../lib/hooks/useCategories";
import { useSubCategories } from "../lib/hooks/useSubCategories";
import { useColors } from "../lib/hooks/useColors";
import { useProducts } from "../lib/hooks/useProducts";

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (range: { min: number; max: number }) => void;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  className?: string;
}

// Map color names to hex values
const colorNameToHex: Record<string, string> = {
  "Black": "#000000",
  "White": "#FFFFFF",
  "Orange": "#FF8C00",
  "Yellow": "#FFD700",
  "Red": "#DC2626",
  "Blue": "#2563EB",
  "Green": "#16A34A",
  "Gray": "#6B7280",
  "Grey": "#6B7280",
};

export default function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedColors,
  onColorChange,
  className = ""
}: ProductFiltersProps) {
  const router = useRouter();
  
  // Get categories from API
  const { categories: apiCategories, isLoading: categoriesLoading } = useCategories();
  
  // Get subcategories from API
  const { subcategories: apiSubCategories, isLoading: subCategoriesLoading } = useSubCategories();
  
  // Get colors from API
  const { colors: apiColors, isLoading: colorsLoading } = useColors();
  
  // Get products from API
  const { products, isLoading: productsLoading } = useProducts();
  
  // Map API categories with their subcategories
  const categories = useMemo(() => 
    apiCategories.map(cat => {
      const categorySubCategories = apiSubCategories.filter(
        (sub) => sub.mainCategoryID === cat.id && sub.isActive && !sub.isDeleted
      );
      
      return {
        name: cat.name || cat.fullName,
        id: cat.id,
        subcategories: categorySubCategories.map(sub => ({
          name: sub.name || sub.fullName,
          id: sub.id,
        })),
      };
    }).filter(cat => cat.name),
    [apiCategories, apiSubCategories]
  );

  // Map API colors to display format with hex values
  // Show all colors, but prefer active ones
  const colors = useMemo(() => 
    apiColors.map(color => ({
      name: color.name,
      value: colorNameToHex[color.name] || "#808080", // Default to gray if color not found
      isActive: color.isActive
    })),
    [apiColors]
  );

  // Extract best sellers (products with isBestSeller === true)
  const bestSellers = useMemo(() => 
    products.filter(product => product.isBestSeller === true),
    [products]
  );

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
            {categoriesLoading || subCategoriesLoading ? (
              <div className="text-gray-500 text-sm py-2">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="text-gray-500 text-sm py-2">No categories available</div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <button
                    onClick={() => category.name && handleCategoryToggle(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base lg:text-lg transition-colors duration-200 ${
                      category.name && selectedCategories.includes(category.name)
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="pl-4 space-y-1">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => sub.name && handleCategoryToggle(sub.name)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm lg:text-base transition-colors duration-200 ${
                            sub.name && selectedCategories.includes(sub.name)
                              ? "bg-gray-800 text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          • {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
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
            {colorsLoading ? (
              <div className="text-gray-500 text-sm py-2">Loading colors...</div>
            ) : colors.length === 0 ? (
              <div className="text-gray-500 text-sm py-2">No colors available</div>
            ) : (
              colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorToggle(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColors.includes(color.name)
                      ? "border-black scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  } ${!color.isActive ? 'opacity-60' : ''}`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                  title={color.name}
                />
              ))
            )}
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
            {productsLoading ? (
              <div className="text-gray-500 text-sm py-2">Loading best sellers...</div>
            ) : bestSellers.length === 0 ? (
              <div className="text-gray-500 text-sm py-2">No best sellers available</div>
            ) : (
              bestSellers.slice(0, 3).map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                >
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
              ))
            )}
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
