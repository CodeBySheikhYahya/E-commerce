"use client";

import { useState } from "react";
import { Product } from "./DemoData";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Premium quality materials for durability and comfort</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ergonomic design for optimal user experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Easy to maintain and clean</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Versatile design suitable for various environments</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
              <p className="text-gray-600">
                Ideal for industrial workplaces, construction sites, manufacturing facilities, 
                and any environment where safety and protection are paramount. This product 
                meets industry standards and provides reliable protection for professionals.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "additional",
      label: "Additional Information",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="text-gray-900">Premium Quality</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="text-gray-900">Lightweight</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification:</span>
                  <span className="text-gray-900">Industry Standard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Warranty:</span>
                  <span className="text-gray-900">1 Year</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Shipping & Returns</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Free Shipping:</span>
                  <span className="text-gray-900">Orders over $50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Time:</span>
                  <span className="text-gray-900">2-5 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Policy:</span>
                  <span className="text-gray-900">30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exchange:</span>
                  <span className="text-gray-900">7 Days</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Care Instructions</h4>
            <p className="text-gray-600 text-sm">
              Clean with mild soap and water. Avoid harsh chemicals. Store in a dry place 
              when not in use. Regular inspection recommended for optimal performance.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "reviews",
      label: `Reviews (${product.reviewCount || 0})`,
      content: (
        <div className="space-y-6">
          {/* Overall Rating */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{product.rating || 0}</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">{product.reviewCount || 0} reviews</div>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{star}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{Math.floor(Math.random() * 20)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="font-medium text-gray-900">John Smith</span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-600">
                Excellent product! Great quality and exactly as described. Fast shipping and 
                excellent customer service. Highly recommend this to anyone looking for 
                reliable safety equipment.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="text-gray-300">★</span>
                </div>
                <span className="font-medium text-gray-900">Sarah Johnson</span>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-gray-600">
                Very good product overall. The quality is solid and it does what it's supposed to do. 
                The only minor issue is the sizing, but customer service was helpful in resolving it.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="font-medium text-gray-900">Mike Wilson</span>
                <span className="text-sm text-gray-500">2 weeks ago</span>
              </div>
              <p className="text-gray-600">
                Outstanding quality and value for money. This product has exceeded my expectations. 
                The build quality is excellent and it's very comfortable to use. Will definitely buy again.
              </p>
            </div>
          </div>

          {/* Write Review Button */}
          <div className="pt-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors duration-200">
              Write a Review
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
