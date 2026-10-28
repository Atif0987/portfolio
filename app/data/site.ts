// Kept in sync with public/resume/atif-raza-resume.pdf.
export const siteConfig = {
  name: "Atif Raza",
  firstName: "Atif",
  role: "Shopify & Full-Stack Web Developer",
  currentTitle: "Shopify Developer",
  title: "Shopify Plus · WordPress · React/Next.js · Node.js/PHP",
  company: "My Digital People",
  description:
    "Shopify and full-stack web developer specialising in Shopify Plus — Liquid themes, custom apps, Checkout UI Extensions, Shopify Functions and headless storefronts — with strong WordPress/WooCommerce, React/Next.js and Node.js/PHP experience.",
  email: "ratif9739@gmail.com",
  github: "https://github.com/Atif0987",
  linkedin: "https://linkedin.com/in/atif-raza-97952a197",
  calendly: "https://calendly.com/ratif9739/30min",
  resume: "/resume/atif-raza-resume.pdf",
  // International format, digits only (e.g. "923001234567"). Empty hides all WhatsApp buttons.
  whatsapp: "923075579632",
  portrait: "/images/atif-raza.png",
  city: "Lahore",
  location: "Lahore, Pakistan",
  timezone: "PKT · UTC+5",
  timezonesCovered: "US, UK, EU, Gulf & Australian time zones",
  education: {
    degree: "BS Software Engineering",
    school: "University of Sargodha",
    period: "2018 — 2022",
  },
};

/** wa.me link with a prefilled greeting, or null while no number is set. */
export function getWhatsAppUrl() {
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const text = encodeURIComponent(
    `Hi ${siteConfig.firstName}, I found your portfolio and I'd like to talk about a Shopify project.`
  );
  return `https://wa.me/${number}?text=${text}`;
}
