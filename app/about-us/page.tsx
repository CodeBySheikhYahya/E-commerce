import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsletterSection from "../../components/NewsletterSection";
import MobileBottomNav from "../../components/MobileBottomNav";

export default function AboutUs() {
  return (
   <>
    <Header />
    <main className="min-h-screen pb-20 lg:pb-0 pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        {/* About content will go here */}
      </div>
      <NewsletterSection />
    </main>
    <Footer />
    <MobileBottomNav />
   </>
  );
}


