import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import CartOverlayRoot from "../components/CartOverlayRoot";
import SafetyGallery from "../components/SafetyGallery";

export const metadata: Metadata = {
  title: "BuyWithUsPK - Safety Equipment Store",
  description: "Premium industrial safety equipment and protective gear",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BuyWithUsPK"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BuyWithUsPK" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
              
              // PWA Install Prompt
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                window.deferredPrompt = e;
              });
            `,
          }}
        />
      </head>
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