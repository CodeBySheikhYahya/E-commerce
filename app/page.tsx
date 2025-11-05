import HeroSection from "../components/HeroSection";
import ShopByCategory from "../components/ShopByCategory";
import ProductShowcase from "../components/ProductShowcase";
import RecentlyViewed from "../components/RecentlyViewed";
import BeInspiredSection from "../components/BeInspiredSection";
import VideoSection from "../components/VideoSection";
import TestimonialSection from "../components/TestimonialSection";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
  return (
   <>
      <HeroSection />
      <ShopByCategory />
      <ProductShowcase />
      <RecentlyViewed limit={4} />
      <BeInspiredSection />
      <VideoSection />
      <TestimonialSection />
      <NewsletterSection />
   </>
  );
}
