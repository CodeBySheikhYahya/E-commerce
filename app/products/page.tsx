"use client";

import { useState, useCallback, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NewsletterSection from "../../components/NewsletterSection";
import ProductCard from "../../components/ProductCard";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";
import ProductFilters from "../../components/ProductFilters";
import ViewToggle from "../../components/ViewToggle";
import SortDropdown from "../../components/SortDropdown";
import MobileFilterSidebar from "../../components/MobileFilterSidebar";
import ProductDetailModal from "../../components/ProductDetailModal";
import ErrorState from "../../components/ErrorState";
import { Product } from "../../components/DemoData";
import { useProducts } from "../../lib/hooks/useProducts";
import { useProductSearch } from "../../lib/hooks/useProductSearch";
import { useCategories } from "../../lib/hooks/useCategories";
import { useSubCategories } from "../../lib/hooks/useSubCategories";
import { useRecentlyViewedStore } from "../../lib/recentlyViewedStore";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = (searchParams.get('search') || '').trim();
  const searching = searchQuery.length > 0;
  const filterType = searchParams.get('filter') || '';
  const { getRecentProducts } = useRecentlyViewedStore();

  const { products, isLoading, error } = useProducts();
  const { results: searchResults, isLoading: searchLoading, error: searchError } = useProductSearch(searchQuery);
  const { categories } = useCategories();
  const { subcategories } = useSubCategories();
  
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
  
  // Track client-side mount to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    if (isLoading) return [];
    
    let filtered = products;
    
    // Apply filter from URL (best-sellers, new-arrivals, on-sale, recently-viewed)
    if (filterType) {
      switch (filterType) {
        case 'best-sellers':
          filtered = filtered.filter(product => product.isBestSeller === true);
          break;
        case 'new-arrivals':
          filtered = filtered.filter(product => product.isNew === true);
          break;
        case 'on-sale':
          filtered = filtered.filter(product => 
            product.isOnSale === true || 
            (product.originalPrice !== undefined && product.discount !== undefined)
          );
          break;
        case 'recently-viewed':
          const recentProductIds = getRecentProducts().map(p => p.id);
          filtered = filtered.filter(product => recentProductIds.includes(product.id));
          break;
        default:
          break;
      }
    }
    
    return filtered.filter(product => {
      // Category filter - handle both category and subcategory matching
      if (selectedCategories.length > 0) {
        let matchesCategory = false;
        
        // Check if product's category/subcategory name matches any selected category
        if (product.category && selectedCategories.includes(product.category)) {
          matchesCategory = true;
        } else {
          // If product has subcategory, check if parent category matches
          if (product.subCategoryId) {
            const productSubcategory = subcategories.find(sub => sub.id === product.subCategoryId);
            if (productSubcategory) {
              const parentCategory = categories.find(cat => cat.id === productSubcategory.mainCategoryID);
              if (parentCategory && selectedCategories.includes(parentCategory.name || parentCategory.fullName)) {
                matchesCategory = true;
              }
            }
          }
          // If product has no subcategory, check if category matches
          else if (product.categoryId) {
            const productCategory = categories.find(cat => cat.id === product.categoryId);
            if (productCategory && selectedCategories.includes(productCategory.name || productCategory.fullName)) {
              matchesCategory = true;
            }
          }
        }
        
        if (!matchesCategory) return false;
      }
      
      // Price filter
      const productPrice = parseFloat(product.price.replace('$', ''));
      if (productPrice < priceRange.min || productPrice > priceRange.max) return false;
      
      return true;
    });
  }, [products, isLoading, selectedCategories, priceRange, categories, subcategories, filterType, getRecentProducts]);

  // Sort products based on current sort
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (currentSort) {
        case "price-low":
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case "price-high":
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case "latest":
          return b.id < a.id ? -1 : b.id > a.id ? 1 : 0;
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
    <Suspense fallback={null}>
    <>
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-heading">
            {filterType === 'best-sellers' && 'Best Sellers'}
            {filterType === 'new-arrivals' && 'New Arrivals'}
            {filterType === 'on-sale' && 'On Sale'}
            {filterType === 'recently-viewed' && 'Recently Viewed'}
            {!filterType && 'Shop'}
          </h1>
          
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
                {isMounted && (
                  <div className="text-sm text-gray-600">
                    Showing {sortedProducts.length} products
                  </div>
                )}
              </div>

              {/* Search Results or Full Catalog */}
              {searching ? (
                <div className="space-y-3">
                  {searchLoading && (
                    <div className={`grid gap-6 ${
                      currentView === "grid" 
                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                        : "grid-cols-1"
                    }`}>
                      {[...Array(3)].map((_, index) => (
                        <ProductCardSkeleton key={index} view={currentView} />
                      ))}
                    </div>
                  )}
                  {searchError && !searchLoading && (
                    <ErrorState onRetry={() => window.location.reload()} />
                  )}
                  {!searchLoading && !searchError && searchResults.length === 0 && (
                    <div className="text-center py-12 text-gray-600">No products found for "{searchQuery}"</div>
                  )}
                  {!searchLoading && searchResults.length > 0 && (
                    <ul className="divide-y divide-gray-200 bg-white rounded-md border">
                      {searchResults.map((item) => (
                        <li key={item.id} className="p-4">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.fullName}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : isLoading ? (
                <div className={`grid gap-6 ${
                  currentView === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {[...Array(6)].map((_, index) => (
                    <ProductCardSkeleton key={index} view={currentView} />
                  ))}
                </div>
              ) : (
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
              )}

              {/* Error State */}
              {!searching && error && !isLoading && (
                <ErrorState onRetry={() => window.location.reload()} />
              )}

              {/* No Products Message */}
              {!searching && !isLoading && !error && sortedProducts.length === 0 && (
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
    </Suspense>
  );
}


