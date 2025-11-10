export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  originalPrice?: string;
  discount?: string;
  category?: string;
  categoryId?: number;
  subCategoryId?: number | null;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  isFeatures?: boolean;
  isActive?: boolean;
  priceAfter?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  stock?: string;
  colors?: string[];
  sizes?: string[];
  sku?: string;
  categories?: string[];
  tags?: string[];
}

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "Industrial Safety Helmet",
    price: "$49.99",
    image: "/sa.webp",
    originalPrice: "$69.99",
    discount: "29% OFF",
    category: "Safety Helmets",
    isNew: false,
    description: "Premium industrial safety helmet with advanced impact protection and comfortable suspension system. Features adjustable headband and ventilation for all-day comfort.",
    rating: 4.5,
    reviewCount: 127,
    stock: "In stock",
    colors: ["white", "yellow", "orange", "blue", "red"],
    sizes: ["S", "M", "L", "XL"],
    sku: "SH001",
    categories: ["Safety Equipment", "Helmets"],
    tags: ["Industrial", "Safety", "Protection", "Construction", "Workplace"]
  },
  {
    id: "2", 
    name: "High Visibility Safety Vest",
    price: "$24.99",
    image: "/sa.webp",
    originalPrice: "$34.99",
    discount: "29% OFF",
    category: "Safety Vests",
    isNew: false,
    description: "ANSI-compliant high visibility safety vest with reflective strips for maximum visibility in low light conditions. Lightweight and breathable design.",
    rating: 4.3,
    reviewCount: 89,
    stock: "In stock",
    colors: ["lime", "orange", "yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sku: "SV002",
    categories: ["Safety Equipment", "Vests"],
    tags: ["High Visibility", "Reflective", "ANSI", "Construction", "Road Work"]
  },
  {
    id: "3",
    name: "Protective Safety Goggles",
    price: "$19.99", 
    image: "/sa.webp",
    originalPrice: "$29.99",
    discount: "33% OFF",
    category: "Goggles",
    isNew: true,
    description: "Anti-fog safety goggles with clear polycarbonate lenses. Provides excellent eye protection against dust, debris, and chemical splashes.",
    rating: 4.7,
    reviewCount: 203,
    stock: "In stock",
    colors: ["clear", "smoke", "amber"],
    sizes: ["One Size"],
    sku: "SG003",
    categories: ["Safety Equipment", "Eye Protection"],
    tags: ["Anti-fog", "Polycarbonate", "Chemical Resistant", "Industrial", "Laboratory"]
  },
  {
    id: "4",
    name: "Steel Toe Safety Boots",
    price: "$89.99",
    image: "/sa.webp",
    originalPrice: "$119.99",
    discount: "25% OFF",
    category: "Safety Shoes",
    isNew: false,
    description: "Heavy-duty steel toe work boots with slip-resistant sole and waterproof construction. Perfect for construction and industrial environments.",
    rating: 4.4,
    reviewCount: 156,
    stock: "In stock",
    colors: ["brown", "black", "tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    sku: "SB004",
    categories: ["Safety Equipment", "Footwear"],
    tags: ["Steel Toe", "Slip Resistant", "Waterproof", "Construction", "Industrial"]
  },
  {
    id: "5",
    name: "Industrial Work Gloves",
    price: "$14.99",
    image: "/sa.webp",
    originalPrice: "$19.99",
    discount: "25% OFF",
    category: "Safety Gloves",
    isNew: false,
    description: "Cut-resistant work gloves with excellent grip and dexterity. Made from high-quality materials for maximum protection and comfort.",
    rating: 4.2,
    reviewCount: 94,
    stock: "In stock",
    colors: ["black", "gray", "blue"],
    sizes: ["S", "M", "L", "XL"],
    sku: "WG005",
    categories: ["Safety Equipment", "Hand Protection"],
    tags: ["Cut Resistant", "Grip", "Industrial", "Construction", "Mechanical"]
  },
  {
    id: "6",
    name: "Safety Harness System",
    price: "$129.99",
    image: "/sa.webp",
    originalPrice: "$159.99",
    discount: "19% OFF",
    category: "Safety Harness",
    isNew: true,
    description: "Full-body safety harness with adjustable straps and D-rings for fall protection. Meets OSHA standards for construction and industrial use.",
    rating: 4.6,
    reviewCount: 78,
    stock: "In stock",
    colors: ["yellow", "orange", "blue"],
    sizes: ["S", "M", "L", "XL"],
    sku: "HS006",
    categories: ["Safety Equipment", "Fall Protection"],
    tags: ["Full Body", "OSHA", "Fall Protection", "Construction", "Height Work"]
  },
  {
    id: "7",
    name: "Construction Hard Hat",
    price: "$39.99",
    image: "/sa.webp",
    originalPrice: "$49.99",
    discount: "20% OFF",
    category: "Safety Helmets",
    isNew: false,
    description: "Durable construction hard hat with 4-point suspension system. Features front brim and meets ANSI Z89.1 standards for head protection.",
    rating: 4.1,
    reviewCount: 112,
    stock: "In stock",
    colors: ["white", "yellow", "blue", "red"],
    sizes: ["S", "M", "L", "XL"],
    sku: "CH007",
    categories: ["Safety Equipment", "Helmets"],
    tags: ["Construction", "ANSI", "4-Point Suspension", "Durable", "Head Protection"]
  },
  {
    id: "8",
    name: "Reflective Safety Jacket",
    price: "$34.99",
    image: "/sa.webp",
    originalPrice: "$44.99",
    discount: "22% OFF",
    category: "Safety Vests",
    isNew: false,
    description: "Heavy-duty reflective safety jacket with multiple pockets and adjustable fit. Perfect for road construction and traffic control work.",
    rating: 4.0,
    reviewCount: 67,
    stock: "In stock",
    colors: ["lime", "orange", "yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sku: "RJ008",
    categories: ["Safety Equipment", "Jackets"],
    tags: ["Reflective", "Heavy Duty", "Road Construction", "Traffic Control", "Multiple Pockets"]
  }
];

export const heroImages = ['/herosection1.png', '/herosection2.png'];

export const heroContent = {
  title: "Premium Safety",
  subtitle: "Equipment",
  description: "Protect your workforce with industry-leading safety gear and reliable protection solutions.",
  buttonText: "Shop Now"
};

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Liam Smith",
    title: "Co-Founder",
    text: "I am thrilled with my new safety equipment from this store. The quality of products is outstanding, the customization options allowed me to get exactly what I wanted. Customer support team was incredibly helpful. Highly recommend - I couldn't be happier with my purchase!"
  },
  {
    id: "2", 
    name: "Jon Deo",
    title: "CEO, Net2000",
    text: "Absolutely love my recent purchase from this safety equipment store! The craftsmanship is superb — you can tell these pieces are built to last. The delivery was smooth and efficient, and the equipment looks even better in person. I'm so happy with the way it has transformed our workplace safety."
  }
];

export default demoProducts;
