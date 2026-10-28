export type SkillGroup = "commerce" | "frontend" | "backend";

/** Hero "Daily stack" chips. */
export const skills: { name: string; group: SkillGroup }[] = [
  { name: "Shopify Plus", group: "commerce" },
  { name: "Liquid", group: "commerce" },
  { name: "Checkout UI Extensions", group: "commerce" },
  { name: "Shopify Functions", group: "commerce" },
  { name: "React / Next.js", group: "frontend" },
  { name: "TypeScript", group: "frontend" },
  { name: "Node.js", group: "backend" },
  { name: "PHP", group: "backend" },
  { name: "GraphQL", group: "backend" },
  { name: "WordPress", group: "commerce" },
];

/** Full toolkit — mirrors "Technical skills" on the resume. */
export const toolkit: { group: string; items: string[] }[] = [
  {
    group: "Shopify",
    items: [
      "Shopify Plus", "Liquid", "Online Store 2.0", "Theme Development", "App Development",
      "Shopify Functions", "Checkout UI Extensions", "Theme App Extensions",
      "Metafields & Metaobjects", "Headless Shopify", "Shopify CLI",
    ],
  },
  {
    group: "WordPress & CMS",
    items: [
      "WordPress", "WooCommerce", "Custom Plugins", "Custom Themes", "Gutenberg", "ACF",
      "Custom Post Types", "WordPress REST API",
    ],
  },
  {
    group: "Frontend",
    items: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "PHP", "Laravel", "GraphQL", "REST APIs", "OAuth", "Webhooks", "MySQL", "PostgreSQL", "Prisma ORM"],
  },
  {
    group: "APIs & Tools",
    items: [
      "Admin GraphQL API", "Storefront API", "Loop Subscriptions API", "Payment Gateways",
      "OpenAI API", "Git", "GitHub", "GitLab", "Postman", "Figma", "Vercel",
    ],
  },
];
