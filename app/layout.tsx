import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { getSiteUrl } from "@/lib/site-url";
import WhatsAppButton from "./components/layout/whatsapp-button";
import SiteAnalytics from "./components/shared/analytics";
import { siteConfig } from "./data/site";

const siteUrl = getSiteUrl();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  // Only used for small labels — don't compete with the hero heading font on first load.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: "/" },
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Shopify Developer",
    "Shopify Plus",
    "Liquid",
    "Custom Shopify Apps",
    "Checkout UI Extensions",
    "Shopify Functions",
    "Headless Shopify",
    "WordPress",
    "WooCommerce",
    "React",
    "Next.js",
    "Node.js",
    "PHP",
    "Lahore",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteUrl.href,
  image: new URL(siteConfig.portrait, siteUrl).href,
  email: `mailto:${siteConfig.email}`,
  worksFor: { "@type": "Organization", name: siteConfig.company },
  address: { "@type": "PostalAddress", addressLocality: siteConfig.city, addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: siteConfig.education.school },
  knowsAbout: [
    "Shopify Plus", "Liquid", "Shopify app development", "Checkout UI Extensions",
    "Shopify Functions", "Headless Shopify", "WordPress", "WooCommerce", "React", "Next.js",
    "Node.js", "PHP",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a110d" },
  ],
};

// Applies the saved theme before first paint so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Sections fade in via JS; keep them visible when JS is unavailable */}
        <noscript>
          <style>{`.scroll-fade-in { opacity: 1; transform: none; }`}</style>
        </noscript>
      </head>
      <body className="min-h-screen overflow-x-clip bg-bg font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-btn focus:px-4 focus:py-2 focus:text-btn-ink"
        >
          Skip to content
        </a>
        {children}
        <WhatsAppButton />
        <SiteAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
