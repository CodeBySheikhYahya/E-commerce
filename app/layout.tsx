import type { Metadata } from "next";
import "./globals.css";
import CartOverlayRoot from "../components/CartOverlayRoot";

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
        {children}
        <CartOverlayRoot />
      </body>
    </html>
  );
}