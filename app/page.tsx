import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ShopByCategory from "../components/ShopByCategory";
import ProductShowcase from "../components/ProductShowcase";
import BeInspiredSection from "../components/BeInspiredSection";
import NewsletterSection from "../components/NewsletterSection";
import MobileBottomNav from "../components/MobileBottomNav";

export default function Home() {
  return (
   <>
    <Header />
    <main className="min-h-screen pb-20 lg:pb-0">
      <HeroSection />
      <ShopByCategory />
      <ProductShowcase />
      <BeInspiredSection />
      <NewsletterSection />
    </main>
    <Footer />
    <MobileBottomNav />
   </>
  );
}
