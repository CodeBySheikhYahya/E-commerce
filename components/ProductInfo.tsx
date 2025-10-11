"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import { useCartStore } from "../lib/cartStore";
import { useWishlistStore } from "../lib/wishlistStore";
import { Product } from "./DemoData";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize,
      quantity
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

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Color:</h3>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-colors duration-200 ${
                  selectedColor === color 
                    ? 'border-black' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color === 'white' ? '#f3f4f6' : color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Size:</h3>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

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
