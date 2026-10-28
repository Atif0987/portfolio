export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// The "Kind words" section only renders once this list has entries, e.g.
// { quote: "…", name: "Jane Doe", role: "Head of eCommerce, Brand" }
export const testimonials: Testimonial[] = [];
