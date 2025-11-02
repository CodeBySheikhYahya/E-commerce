"use client";

import { useState, useCallback, useMemo } from "react";
import NewsletterSection from "../../components/NewsletterSection";
import ProductCard from "../../components/ProductCard";
import ProductFilters from "../../components/ProductFilters";
import ViewToggle from "../../components/ViewToggle";
import SortDropdown from "../../components/SortDropdown";
import MobileFilterSidebar from "../../components/MobileFilterSidebar";
import ProductDetailModal from "../../components/ProductDetailModal";
import { Product } from "../../components/DemoData";
import { useProducts } from "../../lib/hooks/useProducts";

export default function ProductsPage() {
  const { products, isLoading, error } = useProducts();
  // State management for filters and view
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [currentSort, setCurrentSort] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    if (isLoading) return [];
    
    return products.filter(product => {
      // Category filter
      if (selectedCategories.length > 0 && product.category) {
        if (!selectedCategories.includes(product.category)) return false;
      }
      
      // Price filter
      const productPrice = parseFloat(product.price.replace('$', ''));
      if (productPrice < priceRange.min || productPrice > priceRange.max) return false;
      
      return true;
    });
  }, [products, isLoading, selectedCategories, priceRange]);

  // Sort products based on current sort
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (currentSort) {
        case "price-low":
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case "price-high":
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case "latest":
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });
  }, [filteredProducts, currentSort]);

  // Handle quick view modal
  const handleQuickView = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  }, [products]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-heading">Shop</h1>
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Filter
            </button>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Left Sidebar - Filters - Desktop */}
            <div className="hidden lg:block w-full lg:w-1/4">
              <ProductFilters
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedColors={selectedColors}
                onColorChange={setSelectedColors}
              />
            </div>

            {/* Right Side - Products */}
            <div className="w-full lg:w-3/4">
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <ViewToggle
                    currentView={currentView}
                    onViewChange={setCurrentView}
                  />
                  <SortDropdown
                    currentSort={currentSort}
                    onSortChange={setCurrentSort}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  Showing {sortedProducts.length} products
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={`grid gap-6 ${
                currentView === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    view={currentView}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading products...</p>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-red-600 font-medium mb-2">Error loading products</p>
                  <p className="text-gray-500 text-sm">{error.message || 'Failed to fetch products. Please try again later.'}</p>
                  <p className="text-gray-400 text-xs mt-2">Check console for more details</p>
                </div>
              )}

              {/* No Products Message */}
              {!isLoading && !error && sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
      
      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <ProductFilters
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedColors={selectedColors}
          onColorChange={setSelectedColors}
        />
      </MobileFilterSidebar>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </>
  );
}


