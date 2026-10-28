export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  highlights: string[];
  tags?: string[];
  active?: boolean;
}

// Mirrors "Professional experience" on the resume.
export const experience: ExperienceItem[] = [
  {
    period: "Sep 2026 — Now",
    title: "Shopify Developer",
    company: "My Digital People",
    highlights: [
      "Develop Shopify themes in Liquid using Online Store 2.0 sections, blocks and theme settings so merchants can manage content without code changes.",
      "Built location-aware content pages using Shopify Metaobjects, a single reusable template and browser geolocation, letting the client manage per-city content from the admin.",
      "Build custom storefront features and Shopify app functionality to client requirements across multiple concurrent projects.",
    ],
    tags: ["Liquid", "Online Store 2.0", "Metaobjects"],
    active: true,
  },
  {
    period: "Mar 2026 — Sep 2026",
    title: "Shopify Developer",
    company: "Skylinx Technologies",
    highlights: [
      "Built Checkout UI Extensions for Shopify Plus, including a checkout product carousel that surfaces additional products before purchase.",
      "Implemented Shopify Functions to customise checkout and commerce logic.",
      "Integrated Loop Subscriptions APIs for Maeva's recurring billing and subscription bundles, creating subscription transactions before cart creation so recurring payments process correctly.",
      "Built a headless Shopify storefront for Guts App using React.js and the Storefront API.",
      "Co-developed and maintained Session Flow, a paid public app on the Shopify App Store.",
    ],
    tags: ["Checkout UI Extensions", "Shopify Functions", "Loop Subscriptions", "Headless"],
  },
  {
    period: "Jan 2026 — Mar 2026",
    title: "Senior Shopify Developer",
    company: "Bufferstack",
    highlights: [
      "Worked on Shopify and Shopify Plus client stores in a senior developer capacity.",
    ],
    tags: ["Shopify Plus"],
  },
  {
    period: "May 2023 — Dec 2025",
    title: "Software Engineer (Shopify & WordPress)",
    company: "Techleadz",
    highlights: [
      "Delivered Shopify and Shopify Plus stores for international clients on Online Store 2.0, building reusable sections, theme components and merchant-specific features.",
      "Built 4+ custom Shopify apps using the Shopify Admin GraphQL API, REST API, OAuth and webhooks.",
      "Migrated WooCommerce stores to Shopify while preserving required e-commerce functionality and customer experience.",
      "Implemented subscription workflows, payment integrations, metafield-driven features and third-party API integrations, and optimised theme code to improve storefront performance.",
      "Built 2+ custom WordPress plugins from scratch, including a listing and filter plugin with Custom Post Types, taxonomies and auto-generated Gutenberg pages for non-technical editors.",
      "Developed custom WordPress themes and WooCommerce customisations across product, cart, checkout, pricing and payments using hooks and filters.",
    ],
    tags: ["Shopify apps", "WooCommerce → Shopify", "WordPress plugins"],
  },
];
