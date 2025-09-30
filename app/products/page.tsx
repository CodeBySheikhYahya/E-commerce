import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsletterSection from "../../components/NewsletterSection";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="section-heading">Shop</h1>
          </div>
        </section>
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}


