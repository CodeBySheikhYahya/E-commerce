"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
import ContactForm from "../../components/forms/ContactForm";
import ContactInfoPanel from "../../components/ContactInfoPanel";
import ContactMap from "../../components/ContactMap";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
   <>
    <Header />
    <main className="min-h-screen pb-20 lg:pb-0 pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] lg:h-[70vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/contactus.avif"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                Contact Us
              </h1>
              <p className="text-xl lg:text-2xl text-white font-medium">
                We're Here to Help
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
        
        {/* Map Section */}
        <div className="mt-12">
          <ContactMap 
            embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.123456789!2d-0.123456!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjQiTiAwwrAwNyc0My4yIlc!5e0!3m2!1sen!2suk!4v1234567890"
          />
        </div>
      </section>
    </main>
    <Footer />
    <MobileBottomNav />
   </>
  );
}


