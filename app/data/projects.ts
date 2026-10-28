export interface Screenshot {
  src: string;
  alt: string;
  device: "desktop" | "mobile";
  width: number;
  height: number;
}

export interface CaseStudy {
  /** Drafts render in `next dev` only and are never built for production. */
  published: boolean;
  client: string;
  industry: string;
  year?: string;
  role?: string;
  overview: string;
  challenge: string;
  solution: string[];
  outcome: string;
  screenshots: Screenshot[];
}

export interface Project {
  slug: string;
  title: string;
  label: string;
  description: string;
  stack: string[];
  featured?: boolean;
  image?: { src: string; alt: string; width: number; height: number };
  liveUrl?: string;
  /** Link text for liveUrl; defaults to "Visit live store". */
  liveLabel?: string;
  caseStudy?: CaseStudy;
}

// Mirrors "Featured projects" and the experience bullets on the resume.
export const projects: Project[] = [
  {
    slug: "session-flow",
    title: "Session Flow",
    label: "Public Shopify App",
    description:
      "A paid Shopify App Store app that keeps customers logged in across visits, so stores retain carts, preferences and account context for returning shoppers.",
    stack: ["React.js", "Admin GraphQL API", "OAuth", "Theme App Extension"],
    featured: true,
    image: {
      src: "/work/session-flow/listing-desktop.webp",
      alt: "Session Flow: Persistent Login on the Shopify App Store",
      width: 1440,
      height: 900,
    },
    liveUrl: "https://apps.shopify.com/session-flow",
    liveLabel: "View on Shopify App Store",
    caseStudy: {
      published: true,
      client: "Public app on the Shopify App Store",
      industry: "Shopify apps · Customer identity",
      year: "2026",
      role: "Co-developer & maintainer (Skylinx Technologies)",
      overview:
        "Session Flow: Persistent Login is a paid Shopify App Store app that keeps customers logged in across visits using first-party identity, so returning shoppers are recognised instantly.",
      challenge:
        "When shoppers are logged out between visits, stores lose carts, preferences and account context — and email, loyalty and subscription tools stop recognising returning customers.",
      solution: [
        "Co-developed merchant authentication with OAuth and the Shopify Admin GraphQL API integration",
        "Built the App Embed (Theme App Extension) that installs on draft or live themes without editing theme code",
        "Co-developed and maintained the app as a paid, publicly listed Shopify App Store product",
      ],
      outcome:
        "Merchants can switch persistent login on from the theme editor in minutes — no theme code changes — and returning shoppers keep their carts, preferences and account context.",
      screenshots: [
        {
          src: "/work/session-flow/listing-desktop.webp",
          alt: "Session Flow listing on the Shopify App Store, desktop",
          device: "desktop",
          width: 1440,
          height: 900,
        },
        {
          src: "/work/session-flow/listing-mobile.webp",
          alt: "Session Flow listing on the Shopify App Store, mobile",
          device: "mobile",
          width: 780,
          height: 1688,
        },
      ],
    },
  },
  {
    slug: "donate-directly",
    title: "Donate Directly",
    label: "Shopify Store · My Digital People",
    description:
      "A cause-led Shopify store for Palestine — shoppers buy Palestinian products like date tins and olive oil, and fund donation gifts that go directly to families in Gaza.",
    stack: ["Shopify", "Liquid", "Online Store 2.0"],
    liveUrl: "https://www.donatedirectly.com/",
    caseStudy: {
      // DRAFT — confirm "What I built" with what you actually shipped, then publish.
      published: false,
      client: "Donate Directly",
      industry: "Charity & cause-led commerce",
      year: "2026",
      role: "Shopify Developer at My Digital People",
      overview:
        "A Shopify store that combines charity appeals with ethical shopping: visitors donate to urgent Gaza appeals, give Zakat, or buy Palestinian products whose proceeds support families directly.",
      challenge:
        "The store has to make donating feel immediate and trustworthy on mobile, while also working as a normal shop for products like date tins and olive oil.",
      solution: [
        "Theme sections for urgent appeals, Zakat giving and the product shop",
        "Live impact counters and a recent-donations ticker to build trust",
        "Mobile-first donation journeys with a persistent Donate Now call to action",
        "Ongoing store customisations and performance work",
      ],
      outcome:
        "One storefront that handles both donations and product sales, with impact shown front and centre to encourage giving.",
      screenshots: [
        {
          src: "/work/donate-directly/desktop.webp",
          alt: "Donate Directly homepage on desktop",
          device: "desktop",
          width: 1440,
          height: 900,
        },
        {
          src: "/work/donate-directly/mobile.webp",
          alt: "Donate Directly homepage on mobile",
          device: "mobile",
          width: 780,
          height: 1688,
        },
      ],
    },
  },
  {
    slug: "location-aware-pages",
    title: "Location-aware city pages",
    label: "Shopify · My Digital People",
    description:
      "Per-city content pages built with Shopify Metaobjects, a single reusable template and browser geolocation — the client manages every city's content from the admin.",
    stack: ["Metaobjects", "Liquid", "Geolocation API"],
  },
  {
    slug: "checkout-carousel",
    title: "Checkout product carousel",
    label: "Checkout UI Extension · Shopify Plus",
    description:
      "A Checkout UI Extension that surfaces additional products to customers before purchase, alongside Shopify Functions that customise checkout and commerce logic.",
    stack: ["Checkout UI Extensions", "Shopify Functions", "Shopify Plus"],
  },
  {
    slug: "maeva-subscriptions",
    title: "Maeva subscriptions",
    label: "Loop Subscriptions integration",
    description:
      "Integrated Loop Subscriptions APIs for recurring billing and subscription bundles, creating subscription transactions before cart creation so recurring payments process correctly.",
    stack: ["Loop Subscriptions API", "Subscription bundles", "Shopify"],
    liveUrl: "https://maeva.co/",
  },
  {
    slug: "guts-app-headless",
    title: "Guts App storefront",
    label: "Headless Shopify",
    description:
      "A headless Shopify storefront built with React.js on top of the Shopify Storefront API.",
    stack: ["React.js", "Storefront API", "Headless"],
  },
  {
    slug: "business-directory",
    title: "Dynamic Business Directory",
    label: "Custom WordPress application",
    description:
      "Imports business data from the Google Business Profile API into PostgreSQL and publishes it as directory pages, with an admin dashboard and OpenAI-generated SEO content and images.",
    stack: ["WordPress", "PHP", "React.js", "Node.js", "PostgreSQL", "Prisma", "OpenAI API"],
  },
];

const showDrafts = process.env.NODE_ENV !== "production";

/** Projects whose case study page should exist in this environment. */
export function getCaseStudyProjects() {
  return projects.filter(
    (p) => p.caseStudy && (p.caseStudy.published || showDrafts)
  );
}

export function getCaseStudyProject(slug: string) {
  return getCaseStudyProjects().find((p) => p.slug === slug);
}
