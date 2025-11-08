"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductImageGallery from "../../../components/ProductImageGallery";
import ProductInfo from "../../../components/ProductInfo";
import ProductTabs from "../../../components/ProductTabs";
import RelatedProducts from "../../../components/RelatedProducts";
import RecentlyViewed from "../../../components/RecentlyViewed";
import NewsletterSection from "../../../components/NewsletterSection";
import { useProduct } from "../../../lib/hooks/useProducts";
import { useProductImages } from "../../../lib/hooks/useProductImages";
import { useImage } from "../../../lib/hooks/useImage";
import { useRecentlyViewedStore } from "../../../lib/recentlyViewedStore";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { product, isLoading, error } = useProduct(productId);
  const { images: productImages, isLoading: imagesLoading } = useProductImages(productId);
  const addProduct = useRecentlyViewedStore(state => state.addProduct);

  // Get current image ID if available
  const currentImageId = Array.isArray(productImages) && productImages.length > 0 
    ? productImages[0]?.id?.toString() 
    : "";
  
  // Fetch current image details using image-by-ID API (always call hook, even if empty)
  const { image: currentImageDetails } = useImage(currentImageId);

  // Save product to recently viewed when it loads
  useEffect(() => {
    if (product) {
      addProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        discount: product.discount,
      });
    }
  }, [product, addProduct]);

  // Log current image details when available (for debugging/demo)
  useEffect(() => {
    if (currentImageDetails) {
      console.log('Current Image Details:', currentImageDetails);
    }
  }, [currentImageDetails]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
          <p className="text-gray-600 mb-2">{error.message || 'Failed to fetch product'}</p>
          <p className="text-gray-400 text-sm">Please check if the API server is running and CORS is configured.</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Helper function to validate image path
  const isValidImagePath = (path: string | undefined | null): boolean => {
    return !!path && typeof path === 'string' && path.trim() !== "" && path !== "/";
  };

  // Map product images from API, fallback to product.image if no images or still loading
  const images = Array.isArray(productImages) && productImages.length > 0 
    ? productImages
        .map((img: { imagePath: string; id?: number }) => img.imagePath)
        .filter((path: string) => isValidImagePath(path)) // Filter out empty strings
    : isValidImagePath(product?.image)
      ? [product.image!] 
      : ['/sa.webp'];
  
  // Ensure we always have at least one valid image
  const validImages = images.length > 0 && images.every(img => isValidImagePath(img))
    ? images 
    : ['/sa.webp'];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - 2 Columns */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:min-h-screen">
        {/* Left Column - Product Images */}
        <div className="p-8 lg:p-12">
          <ProductImageGallery 
            images={validImages} 
            productName={product.name}
          />
        </div>

        {/* Right Column - Product Information */}
        <div className="p-8 lg:p-12">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden">
        {/* Mobile Image Section */}
        <div className="p-4">
          <ProductImageGallery 
            images={validImages} 
            productName={product.name}
          />
        </div>

        {/* Mobile Product Info */}
        <div className="p-4">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Product Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductTabs product={product} />
      </div>

      {/* Related Products Section */}
      <RelatedProducts currentProductId={product.id} />

      {/* Recently Viewed Section */}
      <RecentlyViewed currentProductId={product.id} limit={4} />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
