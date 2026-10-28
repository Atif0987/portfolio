export type Client = {
  name: string;
  url: string;
  category: "shopify" | "wordpress";
  /** Homepage screenshot in /public/clients (16:10 WebP). Clients with one appear in the gallery. */
  image?: string;
  /** What you did for this client (from the resume) — shown under "More client work". */
  work?: string;
};

export const clients: Client[] = [
  // Shopify
  { name: "Soapbox",                url: "https://www.soapboxsoaps.com/",         category: "shopify" },
  { name: "The Detox Market",       url: "https://www.thedetoxmarket.ca/",        category: "shopify" },
  { name: "Maeva",                  url: "https://maeva.co/",                     category: "shopify" },
  { name: "Violet Grey",            url: "https://www.violetgrey.com/",           category: "shopify" },
  { name: "Vitality CBD",           url: "https://vitalitycbd.co.uk/",            category: "shopify", work: "Payment gateway and compliance integrations" },
  { name: "BitsyBug Boutique",      url: "https://bitsybugboutique.com/",         category: "shopify", work: "Checkout optimisation and metafields architecture" },
  { name: "Fanarch",                url: "https://fanarch.com/",                  category: "shopify" },
  { name: "Jewelry Lab",            url: "https://jewelrylab.co/",                category: "shopify", work: "Custom Shopify theme and app integrations" },
  { name: "Residence Supply",       url: "https://residencesupply.com/",          category: "shopify", work: "Shopify Plus store development" },
  { name: "RetroFam",               url: "https://retrofam.com/",                 category: "shopify", work: "Shopify Plus store development" },
  { name: "Reggie Begelton",        url: "https://reggiebegelton.com/",           category: "shopify" },
  { name: "Goldfarb Inc",           url: "https://goldfarbinc.com/",              category: "shopify" },
  { name: "Keeot",                  url: "https://keeot.com/",                    category: "shopify" },
  // WordPress
  { name: "Stride Care",            url: "https://www.stridecare.com/",           category: "wordpress" },
  { name: "Nashville Song Critique",url: "https://nashvillesongcritique.com/",    category: "wordpress" },
  { name: "Gables Cinema",          url: "https://gablescinema.com/",             category: "wordpress" },
  { name: "Sudsies",                url: "https://sudsies.com/",                  category: "wordpress" },
  { name: "Coral Gables Chamber",   url: "https://coralgableschamber.org/",       category: "wordpress" },
];
