export const projectTypes = [
  "Shopify Plus store build",
  "Custom Shopify app",
  "Checkout / post-purchase",
  "WordPress / WooCommerce",
  "Speed or bug fixes",
  "Job opportunity",
  "Something else",
] as const;

export const budgets = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
] as const;

export type ContactField = "name" | "email" | "projectType" | "message";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the form (which React resets after an action) keeps what was typed. */
  values?: Record<ContactField | "budget", string>;
  /** Bumped on every submit so the form remounts with `values` as its defaults. */
  attempt?: number;
}

export const isContactFormEnabled = () => Boolean(process.env.RESEND_API_KEY);
