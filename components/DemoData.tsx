export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  originalPrice?: string;
  discount?: string;
  category?: string;
  isNew?: boolean;
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
    isNew: false
  },
  {
    id: "2", 
    name: "High Visibility Safety Vest",
    price: "$24.99",
    image: "/sa.webp",
    originalPrice: "$34.99",
    discount: "29% OFF",
    category: "Safety Vests",
    isNew: false
  },
  {
    id: "3",
    name: "Protective Safety Goggles",
    price: "$19.99", 
    image: "/sa.webp",
    originalPrice: "$29.99",
    discount: "33% OFF",
    category: "Goggles",
    isNew: true
  },
  {
    id: "4",
    name: "Steel Toe Safety Boots",
    price: "$89.99",
    image: "/sa.webp",
    originalPrice: "$119.99",
    discount: "25% OFF",
    category: "Safety Shoes",
    isNew: false
  },
  {
    id: "5",
    name: "Industrial Work Gloves",
    price: "$14.99",
    image: "/sa.webp",
    originalPrice: "$19.99",
    discount: "25% OFF",
    category: "Safety Gloves",
    isNew: false
  },
  {
    id: "6",
    name: "Safety Harness System",
    price: "$129.99",
    image: "/sa.webp",
    originalPrice: "$159.99",
    discount: "19% OFF",
    category: "Safety Harness",
    isNew: true
  },
  {
    id: "7",
    name: "Construction Hard Hat",
    price: "$39.99",
    image: "/sa.webp",
    originalPrice: "$49.99",
    discount: "20% OFF",
    category: "Safety Helmets",
    isNew: false
  },
  {
    id: "8",
    name: "Reflective Safety Jacket",
    price: "$34.99",
    image: "/sa.webp",
    originalPrice: "$44.99",
    discount: "22% OFF",
    category: "Safety Vests",
    isNew: false
  }
];

export default demoProducts;
