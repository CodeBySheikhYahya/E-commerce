import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsletterSection from "../../components/NewsletterSection";
import MobileBottomNav from "../../components/MobileBottomNav";
import CheckoutLayout from "../../components/CheckoutLayout";

export default function Checkout() {
  return (
   <>
    <Header />
    <main className="min-h-screen pb-20 lg:pb-0 pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
      <CheckoutLayout />
      <NewsletterSection />
    </main>
    <Footer />
    <MobileBottomNav />
   </>
  );
}
