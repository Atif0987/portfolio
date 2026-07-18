export interface Project {
  id: string;
  title: string;
  description: string;
  tags: { label: string; variant: "default" | "primary" }[];
  width: "full" | "half";
  image?: string;
  icon?: string;
  iconPosition?: "center" | "end";
  href?: string;
}

export const projects: Project[] = [
  {
    id: "session-flow",
    title: "Session Flow",
    description:
      "A comprehensive Shopify application designed to monitor and optimize customer journey sessions in real-time.",
    tags: [
      { label: "Shopify App", variant: "default" },
      { label: "React / Node", variant: "primary" },
    ],
    width: "full",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3GllYNcKA-UuLK7Q3UZzL2iACFafI8WVTWy1Yqly1bywYnfsJLoe819UfS6hI6z9-BNM9V73eHuTNyHxhIjmqrgVGYSgUhwiUAbMWoijcg_107ckeRt93jMJKchKtGZ7pjI4kTM664sdOe00zql0-EiOyXLP0eaTF0mhixh_A8QAenzqZ0iaoMiETBCCwPFA_OmK1E5dQcG6gMoFChBVZjV1Elbxqbmi3ZXIybwYwVNeyCG11hRKp",
  },
  {
    id: "loop-subscription",
    title: "Loop Subscription",
    description:
      "Complex logic implementation for recurring billing and customer portals on high-volume stores.",
    tags: [{ label: "Integration", variant: "default" }],
    width: "half",
    icon: "sync",
    iconPosition: "center",
  },
  {
    id: "product-carousel",
    title: "Product Carousel",
    description:
      "Optimizing post-purchase and checkout conversions with custom Liquid and JS extensions.",
    tags: [{ label: "Checkout UI", variant: "default" }],
    width: "half",
    icon: "shopping_bag",
    iconPosition: "end",
  },
];
