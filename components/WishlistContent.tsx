"use client";

import { useWishlistStore } from "../lib/wishlistStore";
import { useCartStore } from "../lib/cartStore";
import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";

export default function WishlistContent() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id);
  };

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-heading">Wishlist</h1>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Stock Status</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <WishlistItem
                      key={item.id}
                      product={item}
                      onAddToCart={handleAddToCart}
                      onRemove={handleRemoveFromWishlist}
                      variant="table"
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scroll (entire list scrolls together) */}
        <div className="lg:hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <div className="min-w-[720px]">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Product Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Stock status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <WishlistItem
                      key={item.id}
                      product={item}
                      onAddToCart={handleAddToCart}
                      onRemove={handleRemoveFromWishlist}
                      variant="table"
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
