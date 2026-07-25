export type Client = {
  name: string;
  url: string;
  category: "shopify" | "wordpress";
};

export const clients: Client[] = [
  // Shopify (11)
  { name: "Soapbox",                url: "https://www.soapboxsoaps.com/",         category: "shopify" },
  { name: "The Detox Market",       url: "https://www.thedetoxmarket.ca/",        category: "shopify" },
  { name: "Maeva",                  url: "https://maeva.co/",                     category: "shopify" },
  { name: "Violet Grey",            url: "https://www.violetgrey.com/",           category: "shopify" },
  { name: "Vitality CBD",           url: "https://vitalitycbd.co.uk/",            category: "shopify" },
  { name: "Bitsy Bug Boutique",     url: "https://bitsybugboutique.com/",         category: "shopify" },
  { name: "Fanarch",                url: "https://fanarch.com/",                  category: "shopify" },
  { name: "Jewelry Lab",            url: "https://jewelrylab.co/",                category: "shopify" },
  { name: "Reggie Begelton",        url: "https://reggiebegelton.com/",           category: "shopify" },
  { name: "Goldfarb Inc",           url: "https://goldfarbinc.com/",              category: "shopify" },
  { name: "Keeot",                  url: "https://keeot.com/",                    category: "shopify" },
  // WordPress (5)
  { name: "Stride Care",            url: "https://www.stridecare.com/",           category: "wordpress" },
  { name: "Nashville Song Critique",url: "https://nashvillesongcritique.com/",    category: "wordpress" },
  { name: "Gables Cinema",          url: "https://gablescinema.com/",             category: "wordpress" },
  { name: "Sudsies",                url: "https://sudsies.com/",                  category: "wordpress" },
  { name: "Coral Gables Chamber",   url: "https://coralgableschamber.org/",       category: "wordpress" },
];
