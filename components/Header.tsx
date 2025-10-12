"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, User, ChevronDown, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import CartSidebar from "./CartSidebar";
import { useCartStore } from "../lib/cartStore";
import { useWishlistStore } from "../lib/wishlistStore";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const { isOpen: isCartOpen, openCart, closeCart, getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const cartItemCount = getItemCount();
  const wishlistCount = getWishlistCount();
  const router = useRouter();


  // No body scroll lock: header remains fixed via classes only

  return (
    <header className={`relative z-50 bg-[var(--header-bg)] border-b border-[var(--header-border)]`}>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block h-[var(--desktop-top-bar-height)] bg-[var(--header-bg)] border-b border-[var(--header-border)]">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-sm">
          <div className="text-[var(--header-text-muted)]" style={{
            fontFamily: 'var(--top-bar-font-family)',
            fontSize: 'var(--top-bar-font-size)',
            fontWeight: 'var(--top-bar-font-weight)',
            lineHeight: 'var(--top-bar-line-height)',
            color: 'var(--top-bar-color)'
          }}>
            15% Off First Order <br /> Sign Up Today
          </div>
          <div className="flex items-center space-x-4 text-[var(--header-text-muted)]" style={{
            fontFamily: 'var(--top-bar-font-family)',
            fontSize: 'var(--top-bar-font-size)',
            fontWeight: 'var(--top-bar-font-weight)',
            lineHeight: 'var(--top-bar-line-height)',
            color: 'var(--top-bar-color)'
          }}>
            <span>Javeria.aman@buywithuspkltd.co.uk</span>
            <span className="text-[var(--header-vertical-line)]">|</span>
            <span className="max-w-[15vw]">Ilford, England IG14PG</span>
            <span className="text-[var(--header-vertical-line)]">|</span>
            <span className="max-w-[15vw]">+44 7946 252194</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="h-[var(--mobile-header-height)] lg:h-[var(--desktop-header-height)]">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="lg:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-[var(--header-text)]" />
          </button>

          {/* Desktop Navigation - Left */}
          <div className="flex-1 min-w-0">
            <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] bg-transparent font-normal cursor-pointer" style={{fontFamily: 'var(--header-font-family)', fontSize: 'var(--header-font-size)'}}>
                  Home
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Home</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Welcome to our industrial safety products store
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/about-us" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">About Us</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn about our company and mission
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/contact-us" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Contact Us</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Get in touch with our support team
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] bg-transparent font-normal cursor-pointer" style={{fontFamily: 'var(--header-font-family)', fontSize: 'var(--header-font-size)'}}>
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[300px]">
                    <NavigationMenuLink href="/products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">View All Products</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse our complete product catalog
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=best-sellers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Best Sellers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Our most popular safety equipment
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=new-arrivals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">New Arrivals</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Latest safety products and equipment
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=on-sale" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">On Sale</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Special offers and discounted items
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=recently-viewed" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Recently Viewed</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Continue where you left off
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] bg-transparent font-normal cursor-pointer" style={{fontFamily: 'var(--header-font-family)', fontSize: 'var(--header-font-size)'}}>
                  Search by Category
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/category/safety-vests" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Safety Vests</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        High visibility safety vests and reflective clothing
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/category/safety-helmets" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Safety Helmets</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Industrial hard hats and safety helmets
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/category/goggles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Goggles</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Safety goggles and protective eyewear
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/category/industrial-parts" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer">
                      <div className="text-sm font-medium leading-none">Industrial Parts</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Industrial safety equipment and replacement parts
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              
            </NavigationMenuList>
          </NavigationMenu>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center lg:justify-center min-w-0">
            <Image
              src="/logo.png"
              alt="BuyWithUsPK"
              width={200}
              height={64}
              className="h-6 sm:h-7 lg:h-12 w-auto max-w-[120px] sm:max-w-[140px] lg:max-w-none"
              priority
            />
          </div>


          {/* Right Side Icons */}
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-4 min-w-0">
            {/* Search Icon */}
            <button 
              className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Removed currency and language selectors */}

            {/* Desktop User Icon */}
            <Link href="/login" className="hidden lg:block text-[var(--header-text)] hover:text-[var(--header-text-muted)] cursor-pointer">
              <User className="h-5 w-5" />
            </Link>
            
            <button 
              className="relative text-[var(--header-text)] hover:text-[var(--header-text-muted)] transition-colors duration-200 cursor-pointer"
              onClick={() => {
                // On mobile, open sidebar. On desktop, go to cart page
                if (window.innerWidth < 1024) {
                  openCart();
                } else {
                  router.push('/cart');
                }
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-300">
          <div className="fixed inset-0 backdrop-blur-md animate-in fade-in duration-300" onClick={() => {
            setIsMobileMenuOpen(false);
            setIsCategoryDropdownOpen(false);
          }} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white animate-in slide-in-from-left duration-300">
            <div className="h-full w-full p-6 flex flex-col bg-white overflow-y-auto" style={{minHeight: '100vh'}}>
              <div className="flex justify-end mb-6">
                <button onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCategoryDropdownOpen(false);
                }} className="cursor-pointer">
                  <X className="h-6 w-6 text-[var(--header-text)] " />
                </button>
              </div>
              
              <nav className="space-y-4">
              <Link 
                href="/" 
                className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <div className="relative">
                <button 
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center justify-between text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 w-full text-left cursor-pointer"
                >
                  Search by Category 
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <Link 
                      href="/category/safety-vests" 
                      className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 text-sm cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Safety Vests
                    </Link>
                    <Link 
                      href="/category/safety-helmets" 
                      className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 text-sm cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Safety Helmets
                    </Link>
                    <Link 
                      href="/category/goggles" 
                      className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 text-sm cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Goggles
                    </Link>
                    <Link 
                      href="/category/industrial-parts" 
                      className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 text-sm cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Industrial Parts
                    </Link>
                  </div>
                )}
              </div>
              <Link 
                href="/contact-us" 
                className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                href="/about-us" 
                className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/wishlist" 
                className="flex items-center justify-between text-[var(--header-text)] hover:text-[var(--header-text-muted)] py-2 pr-4 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Removed currency and language selectors in mobile menu */}
            </nav>
            </div>
          </div>
        </div>
      )}

      {/* Search Dropdown Panel */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-white shadow-lg border-b animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--header-text)]" style={{fontFamily: 'var(--header-font-family)'}}>
                Search Products
              </h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <SearchBar 
              placeholder="Search safety products..."
              onSubmit={(value) => {
                console.log("Search:", value);
                setIsSearchOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Cart Sidebar moved to app root */}
    </header>
  );
}
