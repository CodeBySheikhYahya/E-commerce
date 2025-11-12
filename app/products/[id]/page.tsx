"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductImageGallery from "../../../components/ProductImageGallery";
import ProductInfo from "../../../components/ProductInfo";
import ProductTabs from "../../../components/ProductTabs";
import RelatedProducts from "../../../components/RelatedProducts";
import RecentlyViewed from "../../../components/RecentlyViewed";
import NewsletterSection from "../../../components/NewsletterSection";
import ErrorState from "../../../components/ErrorState";
import { useProduct } from "../../../lib/hooks/useProducts";
import { useProductImages } from "../../../lib/hooks/useProductImages";
import { useImage } from "../../../lib/hooks/useImage";
import { useRecentlyViewedStore } from "../../../lib/recentlyViewedStore";
import { Product } from "../../../components/DemoData";

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
    if (product && typeof product === 'object' && 'id' in product) {
      const validProduct = product as Product;
      addProduct({
        id: validProduct.id,
        name: validProduct.name,
        price: validProduct.price,
        image: validProduct.image,
        originalPrice: validProduct.originalPrice,
        discount: validProduct.discount,
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
      <div className="min-h-screen">
        <ErrorState onRetry={() => window.location.reload()} />
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

  // Type assertion after null check - TypeScript needs help here
  const validProduct = product as Product;

  // Helper function to validate image path
  const isValidImagePath = (path: string | undefined | null): boolean => {
    return !!path && typeof path === 'string' && path.trim() !== "" && path !== "/";
  };

  // Map product images from API, fallback to product.image if no images or still loading
  const images = Array.isArray(productImages) && productImages.length > 0 
    ? productImages
        .map((img: { imagePath: string; id?: number }) => img.imagePath)
        .filter((path: string) => isValidImagePath(path)) // Filter out empty strings
    : isValidImagePath(validProduct.image)
      ? [validProduct.image] 
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
            productName={validProduct.name}
          />
        </div>

        {/* Right Column - Product Information */}
        <div className="p-8 lg:p-12">
          <ProductInfo product={validProduct} />
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden">
        {/* Mobile Image Section */}
        <div className="p-4">
          <ProductImageGallery 
            images={validImages} 
            productName={validProduct.name}
          />
        </div>

        {/* Mobile Product Info */}
        <div className="p-4">
          <ProductInfo product={validProduct} />
        </div>
      </div>

      {/* Product Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductTabs product={validProduct} />
      </div>

      {/* Related Products Section */}
      <RelatedProducts currentProductId={validProduct.id} />

      {/* Recently Viewed Section */}
      <RecentlyViewed currentProductId={validProduct.id} limit={4} />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
