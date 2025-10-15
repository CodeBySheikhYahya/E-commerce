import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import CartOverlayRoot from "../components/CartOverlayRoot";
import SafetyGallery from "../components/SafetyGallery";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "An online shopping platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen pb-20 lg:pb-0">
          {children}
        </main>
        <SafetyGallery />
        <Footer />
        <MobileBottomNav />
        <CartOverlayRoot />
      </body>
    </html>
  );
}