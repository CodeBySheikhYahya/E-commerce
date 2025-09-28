make sure make sure componenet base mobile friendly which is best look good for mobile and make a css variables for color theme which will be the best and make sure make sure most most modular approach which make code best 

```markdown
# 🦺 Industrial Safety Products E-Commerce (Frontend)

This is the **frontend** for an e-commerce platform selling **industrial safety products** (helmets, gloves, shoes, jackets, etc.).  
It is built with **Next.js + TypeScript + TailwindCSS + shadcn/ui**, and connects to a **.NET backend API**.

---

## 🚀 Features
- Beautiful, responsive design (mobile-first)
- Modular and reusable components
- Product catalog with search, filters, and categories
- Product detail pages with images and specs
- Shopping cart and checkout
- Stripe payment integration
- Dropshipping workflow (supplier → customer shipping)

---

## 🛠️ Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- *t

---



````

---

## 📄 Pages
- **Home Page** → Hero, featured products, categories
- **Product Listing** → Grid/list, filters, search, pagination
- **Product Detail** → Images, description, add to cart
- **Cart & Checkout** → Stripe payments
- **Auth** (future) → Login, Register, Profile
- **Orders** (future) → Order history
- **Static Pages** → About, Contact, Privacy, Terms

---

## 🔌 API Endpoints (from .NET backend)
- **Products**
  - `GET /api/products` → list products
  - `GET /api/products/:id` → product details
- **Categories**
  - `GET /api/categories` → list categories
- **Search**
  - `GET /api/search?q=query`
- **Orders**
  - `POST /api/orders` → create order
- **Auth (future)**
  - `POST /api/auth/login`
  - `POST /api/auth/register`

---

## 💳 Payment & Dropshipping
- Payments handled by **Stripe**
- Flow: Customer orders → Our system → Supplier ships directly



# Setup UI
npx shadcn-ui@latest init

# Install dependencies
npm install @tanstack/react-query react-hook-form @hookform/resolvers zod stripe
````

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## 🎯 Development Phases

**Phase 1 (Demo - Weekend)**
✅ Project setup
✅ Header + Footer layout
✅ Home Page (hero section)
✅ Product Listing Page with mock data

**Phase 2 (MVP - Week 1)**
🔲 API integration
🔲 Product details
🔲 Shopping cart
🔲 Basic checkout

**Phase 3 (Full Features - Week 2+)**
🔲 Stripe payments
🔲 Authentication
🔲 Order management
🔲 Dropshipping flow

---

## ✅ Success Criteria

* Fast, responsive, mobile-first design
* Clean and modular code (TypeScript + reusable components)
* Impressive UI/UX for client demo
* Scalable architecture for future features

```

---

