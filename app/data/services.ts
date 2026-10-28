export interface Service {
  title: string;
  description: string;
  tech: string;
}

export const services: Service[] = [
  {
    title: "Shopify Plus theme development",
    description:
      "Liquid themes on Online Store 2.0 — sections, blocks, theme settings, metafields and metaobjects — so merchants can manage content without code changes.",
    tech: "Liquid · OS 2.0 · Metaobjects",
  },
  {
    title: "Custom Shopify apps",
    description:
      "Private and public apps built on the Admin GraphQL and REST APIs, OAuth, webhooks and Theme App Extensions — including a paid App Store app.",
    tech: "React · Node.js · GraphQL",
  },
  {
    title: "Checkout & Shopify Functions",
    description:
      "Checkout UI Extensions such as product carousels, plus Shopify Functions for custom checkout and commerce logic on Shopify Plus.",
    tech: "Checkout UI · Functions",
  },
  {
    title: "Subscriptions & integrations",
    description:
      "Loop Subscriptions, recurring billing and bundles, payment gateways and third-party API integrations.",
    tech: "Loop · Payments · REST",
  },
  {
    title: "Headless & migrations",
    description:
      "Headless storefronts with React and the Storefront API, and WooCommerce-to-Shopify migrations that keep key functionality intact.",
    tech: "Storefront API · React · Next.js",
  },
  {
    title: "WordPress & WooCommerce",
    description:
      "Custom plugins and themes, Gutenberg, ACF and Custom Post Types, and WooCommerce customisations across cart, checkout and payments.",
    tech: "PHP · WooCommerce · Gutenberg",
  },
];
