import HeroSection from "../components/HeroSection";
import ShopByCategory from "../components/ShopByCategory";
import ProductShowcase from "../components/ProductShowcase";
import BeInspiredSection from "../components/BeInspiredSection";
import TestimonialSection from "../components/TestimonialSection";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
  return (
   <>
      <HeroSection />
      <ShopByCategory />
      <ProductShowcase />
      <BeInspiredSection />
      <TestimonialSection />
      <NewsletterSection />
   </>
  );
}
