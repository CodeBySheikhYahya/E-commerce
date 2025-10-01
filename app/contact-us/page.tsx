import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
import ContactForm from "../../components/forms/ContactForm";
import ContactInfoPanel from "../../components/ContactInfoPanel";

export default function ContactUs() {
  return (
   <>
    <Header />
    <main className="min-h-screen pb-20 lg:pb-0 pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfoPanel
                whatsappPhone={"+44 7946 252194"}
                email={"Javeria.aman@buywithuspkltd.co.uk"}
                addressLines={[
                  "Suite 9 2nd Floor, Cranbrook house, 61",
                  "Cranbrook Road ilford, England IG14PG",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <MobileBottomNav />
   </>
  );
}


