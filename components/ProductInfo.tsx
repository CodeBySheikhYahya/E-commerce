"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import { useCartStore } from "../lib/cartStore";
import { useWishlistStore } from "../lib/wishlistStore";
import { Product } from "./DemoData";
import { useSizes } from "../lib/hooks/useSizes";
import { useColors } from "../lib/hooks/useColors";
import { useQuantities } from "../lib/hooks/useQuantities";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedQuantityPack, setSelectedQuantityPack] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { sizes, isLoading: sizesLoading } = useSizes();
  const { colors: apiColors, isLoading: colorsLoading } = useColors();
  const { quantities, isLoading: quantitiesLoading } = useQuantities();
  
  const isWishlisted = isInWishlist(product.id);

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

  // Set default size when sizes are loaded
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0].name);
    }
  }, [sizes, selectedSize]);

  // Set default color when colors are loaded
  useEffect(() => {
    // Show active colors first, but if none, show all colors
    const activeColors = apiColors.filter(color => color.isActive);
    const colorsToShow = activeColors.length > 0 ? activeColors : apiColors;
    if (colorsToShow.length > 0 && !selectedColor) {
      setSelectedColor(colorsToShow[0].name);
    }
  }, [apiColors, selectedColor]);

  // Set default quantity pack when quantities are loaded
  useEffect(() => {
    const active = quantities.filter(q => q.isActive);
    const list = active.length > 0 ? active : quantities;
    if (list.length > 0 && !selectedQuantityPack) {
      setSelectedQuantityPack(list[0].name);
    }
  }, [quantities, selectedQuantityPack]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2" style={{fontFamily: 'var(--header-font-family)'}}>
          {product.name}
        </h1>
        {product.rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
          </div>
        )}
        {product.stock && (
          <p className={`text-sm font-medium ${product.stock === 'In stock' ? 'text-green-600' : 'text-red-600'}`}>
            Stock: {product.stock}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
          {product.price}
        </span>
        {product.originalPrice && (
          <span className="text-xl text-gray-500 line-through">
            {product.originalPrice}
          </span>
        )}
        {product.discount && (
          <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Color Selection - Dynamic from API */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Color:</h3>
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
                  className={`w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                    selectedColor === color.name 
                      ? 'border-black scale-110' 
                      : 'border-gray-300 hover:border-gray-400'
                  } ${!color.isActive ? 'opacity-60' : ''}`}
                  style={{ backgroundColor: color.name === 'White' ? '#f3f4f6' : hexValue }}
                  title={color.fullName || color.name}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Size Selection - Dynamic from API */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Size:</h3>
        {sizesLoading ? (
          <div className="text-sm text-gray-500 py-2">Loading sizes...</div>
        ) : sizes.length === 0 ? (
          <div className="text-sm text-gray-500 py-2">No sizes available</div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.name)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedSize === size.name
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
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
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity Pack:</h3>
        {quantitiesLoading ? (
          <div className="text-sm text-gray-500 py-2">Loading quantity packs...</div>
        ) : quantities.length === 0 ? (
          <div className="text-sm text-gray-500 py-2">No quantity packs available</div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {quantities.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelectedQuantityPack(q.name)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedQuantityPack === q.name
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
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
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            className="p-2 hover:bg-gray-50 transition-colors duration-200"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="p-2 hover:bg-gray-50 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
          style={{fontFamily: 'var(--header-font-family)'}}
        >
          Add To Cart
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleWishlistToggle}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 border-red-200'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors duration-200">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* Product Details */}
      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {product.sku && (
            <div>
              <span className="font-medium text-gray-900">SKU:</span>
              <span className="ml-2 text-gray-600">{product.sku}</span>
            </div>
          )}
          {product.categories && (
            <div>
              <span className="font-medium text-gray-900">Categories:</span>
              <span className="ml-2 text-gray-600">{product.categories.join(', ')}</span>
            </div>
          )}
        </div>
        {product.tags && (
          <div className="mt-4">
            <span className="font-medium text-gray-900 text-sm">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
