import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atif Raza | Shopify Plus Engineer",
    template: "%s | Atif Raza",
  },
  description:
    "Portfolio of Atif Raza, Shopify Plus Engineer, WordPress Developer, and React Developer.",
  keywords: [
    "Shopify",
    "Shopify Plus",
    "WordPress",
    "WooCommerce",
    "React",
    "Next.js",
    "Laravel",
    "Full Stack Developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
