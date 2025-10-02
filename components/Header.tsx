"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, User, ChevronDown, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import CartSidebar from "./CartSidebar";
import { useCartStore } from "../lib/cartStore";
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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { isOpen: isCartOpen, openCart, closeCart, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] border-b border-[var(--header-border)] transition-transform duration-300 ${
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block h-[var(--desktop-top-bar-height)] bg-[var(--header-bg)] border-b border-[var(--header-border)]">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-sm">
          <div className="text-[var(--header-text-muted)]">
            15% Off First Order - Sign Up Today
          </div>
          <div className="flex items-center space-x-4 text-[var(--header-text-muted)]">
            <span>Javeria.aman@buywithuspkltd.co.uk</span>
            <span className="text-[var(--header-border)]">|</span>
            <span>Suite 9 2nd Floor, Cranbrook house, 61 Cranbrook Road ilford, England IG14PG</span>
            <span className="text-[var(--header-border)]">|</span>
            <span>+44 7946 252194</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="h-[var(--mobile-header-height)] lg:h-[var(--desktop-header-height)]">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-[var(--header-text)]" />
          </button>

          {/* Desktop Navigation - Left */}
          <div className="flex-1">
            <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] bg-transparent font-normal" style={{fontFamily: 'var(--header-font-family)', fontSize: 'var(--header-font-size)'}}>
                  Home
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Home</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Welcome to our industrial safety products store
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/about-us" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">About Us</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn about our company and mission
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] bg-transparent font-normal" style={{fontFamily: 'var(--header-font-family)', fontSize: 'var(--header-font-size)'}}>
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[300px]">
                    <NavigationMenuLink href="/products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">View All Products</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse our complete product catalog
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=best-sellers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Best Sellers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Our most popular safety equipment
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=new-arrivals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">New Arrivals</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Latest safety products and equipment
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=on-sale" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">On Sale</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Special offers and discounted items
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/products?filter=recently-viewed" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Recently Viewed</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Continue where you left off
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] bg-transparent font-normal" style={{fontFamily: 'var(--header-font-family)', fontSize: 'var(--header-font-size)'}}>
                  Search by Category
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/category/safety-vests" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Safety Vests</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        High visibility safety vests and reflective clothing
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/category/safety-helmets" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Safety Helmets</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Industrial hard hats and safety helmets
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/category/goggles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Goggles</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Safety goggles and protective eyewear
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/category/industrial-parts" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
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
          <div className="flex-1 flex justify-center lg:justify-center">
            <Image
              src="/logo.png"
              alt="BuyWithUsPK"
              width={100}
              height={32}
              className="h-6 lg:h-10 w-auto"
            />
          </div>


          {/* Right Side Icons */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Search Icon */}
            <button 
              className="text-[var(--header-text)] hover:text-[var(--header-text-muted)]"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Desktop Currency & Language */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center">
                🇺🇸 USD $ <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <button className="text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center">
                EN <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Desktop User Icon */}
            <button className="hidden lg:block text-[var(--header-text)] hover:text-[var(--header-text-muted)]">
              <User className="h-5 w-5" />
            </button>
            
            <button 
              className="relative text-[var(--header-text)] hover:text-[var(--header-text-muted)] transition-colors duration-200"
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
          <div className="fixed inset-0 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white animate-in slide-in-from-left duration-300">
            <div className="h-full w-full p-6 flex flex-col bg-white" style={{minHeight: '100vh'}}>
              <div className="flex justify-end mb-6">
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-[var(--header-text)] " />
                </button>
              </div>
              
              <nav className="space-y-4">
              <a href="/" className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between py-2 pr-4">
                Home <ChevronDown className="h-4 w-4" />
              </a>
              <a href="/shop" className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between py-2 pr-4">
                Shop <ChevronDown className="h-4 w-4" />
              </a>
              <a href="/category" className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between py-2 pr-4">
                Search by Category <ChevronDown className="h-4 w-4" />
              </a>
              <a href="/contact" className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between py-2 pr-4">
                Contact Us <ChevronDown className="h-4 w-4" />
              </a>
              <a href="/about-us" className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between py-2 pr-4">
                About Us <ChevronDown className="h-4 w-4" />
              </a>
              
              <div className="pt-4 border-t border-[var(--header-border)] space-y-2">
                <button className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between w-full py-2 pr-4">
                  🇺🇸 USD $ <ChevronDown className="h-4 w-4" />
                </button>
                <button className="block text-[var(--header-text)] hover:text-[var(--header-text-muted)] flex items-center justify-between w-full py-2 pr-4">
                  EN <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </nav>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--header-text)]" style={{fontFamily: 'var(--header-font-family)'}}>
                Search Products
              </h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-[var(--header-text)] hover:text-[var(--header-text-muted)]"
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

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </header>
  );
}
