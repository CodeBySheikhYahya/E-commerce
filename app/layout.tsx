import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import CartOverlayRoot from "../components/CartOverlayRoot";
import SafetyGallery from "../components/SafetyGallery";
import { QueryProvider } from "../lib/providers/QueryProvider";

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
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BuyWithUsPK" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
              
              // PWA Install Prompt - Mobile Only
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                // Only show install prompt on mobile devices
                const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (!isMobile) {
                  e.preventDefault();
                  return;
                }
                deferredPrompt = e;
                window.deferredPrompt = e;
              });
            `,
          }}
        />
      </head>
      <body>
        <QueryProvider>
          <Header />
          <main className="min-h-screen pb-20 lg:pb-0">
            {children}
          </main>
          <SafetyGallery />
          <Footer />
          <MobileBottomNav />
          <CartOverlayRoot />
        </QueryProvider>
      </body>
    </html>
  );
}