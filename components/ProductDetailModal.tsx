"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Heart, Minus, Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "../lib/cartStore";
import { useWishlistStore } from "../lib/wishlistStore";
import { useSizes } from "../lib/hooks/useSizes";
import { useColors } from "../lib/hooks/useColors";
import { useQuantities } from "../lib/hooks/useQuantities";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    originalPrice?: string;
    discount?: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    stock?: string;
    colors?: string[];
    sizes?: string[];
    sku?: string;
    categories?: string[];
    tags?: string[];
  };
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedQuantityPack, setSelectedQuantityPack] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addItem: addToCart, openCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { sizes: apiSizes, isLoading: sizesLoading } = useSizes();
  const { colors: apiColors, isLoading: colorsLoading } = useColors();
  const { quantities: apiQuantities, isLoading: quantitiesLoading } = useQuantities();

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

  // Initialize default selections when product changes
  useEffect(() => {
    if (product) {
      // Set first color from API as default if available
      // Prefer active colors, but show all if none are active
      const activeColors = apiColors.filter(color => color.isActive);
      const colorsToShow = activeColors.length > 0 ? activeColors : apiColors;
      if (colorsToShow.length > 0 && !selectedColor) {
        setSelectedColor(colorsToShow[0].name);
      }
      
      // Set first size from API as default if available
      if (apiSizes.length > 0 && !selectedSize) {
        setSelectedSize(apiSizes[0].name);
      }

      // Set first active quantity pack as default (fallback to first)
      const activeQuantities = apiQuantities.filter(q => q.isActive);
      const quantitiesToShow = activeQuantities.length > 0 ? activeQuantities : apiQuantities;
      if (quantitiesToShow.length > 0 && !selectedQuantityPack) {
        setSelectedQuantityPack(quantitiesToShow[0].name);
      }
      
      // Check if product is in wishlist
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, selectedColor, selectedSize, selectedQuantityPack, isInWishlist, apiSizes, apiColors, apiQuantities]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize
    });
    openCart();
    onClose(); // Close modal after adding to cart
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        discount: product.discount
      });
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this ${product.name} - ${product.price}`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert('Product link copied to clipboard! You can paste it in your Instagram story or post.');
        return;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };


  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal content */}
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Product Image Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <Button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-medium shadow-lg">
                View Details
              </Button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 lg:pl-0">
            {/* Product Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight" style={{fontFamily: 'var(--header-font-family)'}}>
              {product.name}
            </h2>

            {/* Rating and Stock */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">({product.reviewCount || 3})</span>
              </div>
              <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                Stock: {product.stock || "In stock"}
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-6" style={{fontFamily: 'var(--header-font-family)'}}>
              {product.price}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed text-base">
              {product.description || "The Tacoma Carver Dining Chair features a sleek, Its clean lines and refined silhouette make a standout piece any room."}
            </p>

            {/* Color Options - Dynamic from API */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">Color:</label>
              {colorsLoading ? (
                <div className="text-sm text-gray-500 py-2">Loading colors...</div>
              ) : apiColors.length === 0 ? (
                <div className="text-sm text-gray-500 py-2">No colors available</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {apiColors.map((color) => {
                    const hexValue = colorNameToHex[color.name] || "#808080";
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-3 transition-all duration-200 hover:scale-110 ${
                          selectedColor === color.name ? 'border-gray-800 shadow-lg' : 'border-gray-300 hover:border-gray-500'
                        } ${!color.isActive ? 'opacity-60' : ''}`}
                        style={{ backgroundColor: color.name === 'White' ? '#f3f4f6' : hexValue }}
                        title={color.fullName || color.name}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Size Options - Dynamic from API */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">Size:</label>
              {sizesLoading ? (
                <div className="text-sm text-gray-500 py-2">Loading sizes...</div>
              ) : apiSizes.length === 0 ? (
                <div className="text-sm text-gray-500 py-2">No sizes available</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {apiSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === size.name 
                          ? 'bg-black text-white border-black shadow-lg' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                      }`}
                      title={size.fullName}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity Pack - Dynamic from API */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">Quantity Pack:</label>
              {quantitiesLoading ? (
                <div className="text-sm text-gray-500 py-2">Loading quantity packs...</div>
              ) : apiQuantities.length === 0 ? (
                <div className="text-sm text-gray-500 py-2">No quantity packs available</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {apiQuantities.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuantityPack(q.name)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedQuantityPack === q.name 
                          ? 'bg-black text-white border-black shadow-lg' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                      } ${!q.isActive ? 'opacity-60' : ''}`}
                      title={q.fullName}
                    >
                      {q.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="px-6 py-3 min-w-[4rem] text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-gray-800 py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                style={{fontFamily: 'var(--header-font-family)'}}
              >
                Add To Cart
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-6 mb-8">
              <button
                onClick={handleWishlistToggle}
                className={`text-base font-medium transition-colors flex items-center gap-2 ${
                  isWishlisted 
                    ? 'text-red-600 hover:text-red-700' 
                    : 'text-gray-600 hover:text-gray-800 underline'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              </button>
              <button className="text-base text-gray-600 hover:text-gray-800 underline font-medium transition-colors">
                Compare
              </button>
            </div>

            {/* Product Information */}
            <div className="space-y-3 mb-8 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
              <div className="font-medium">SKU: <span className="text-gray-800">{product.sku || "D1008"}</span></div>
              <div className="font-medium">Categories: <span className="text-gray-800">{product.categories?.join(", ") || "Furniture, Chair"}</span></div>
              <div className="font-medium">Tag: <span className="text-gray-800">{product.tags?.join(", ") || "Chair, Table, Furniture, Decor"}</span></div>
            </div>

            {/* Share Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Share:</span>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  title="Share on Facebook"
                >
                  f
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
                  title="Share on X (Twitter)"
                >
                  X
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
                  title="Share on LinkedIn"
                >
                  in
                </button>
                <button 
                  onClick={() => handleShare('instagram')}
                  className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg"
                  title="Copy link for Instagram"
                >
                  ig
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
