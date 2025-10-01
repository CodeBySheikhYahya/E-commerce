import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsletterSection from "../../components/NewsletterSection";
import ProductCard from "../../components/ProductCard";
import { demoProducts } from "../../components/DemoData";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="section-heading">Shop</h1>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-8">
              {demoProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                />
              ))}
            </div>
          </div>
        </section>
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}


