"use client";

import { useParams } from "next/navigation";
import { demoProducts } from "../../../components/DemoData";
import ProductImageGallery from "../../../components/ProductImageGallery";
import ProductInfo from "../../../components/ProductInfo";
import ProductTabs from "../../../components/ProductTabs";
import RelatedProducts from "../../../components/RelatedProducts";
import NewsletterSection from "../../../components/NewsletterSection";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  // Find the product by ID (for now using demo data)
  const product = demoProducts.find(p => p.id === productId);
  
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

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - 2 Columns */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:min-h-screen">
        {/* Left Column - Product Images */}
        <div className="p-8 lg:p-12">
          <ProductImageGallery 
            images={[product.image, product.image, product.image, product.image, product.image]} 
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
            images={[product.image, product.image, product.image, product.image, product.image]} 
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
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
