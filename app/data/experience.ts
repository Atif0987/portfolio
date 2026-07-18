export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
  tags?: string[];
  active?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    period: "March 2026 – Present",
    title: "Senior Shopify Engineer",
    company: "Skylinx Technologies",
    description:
      "Leading the engineering team in delivering complex Shopify Plus solutions for enterprise clients. Architecting custom app infrastructures and optimizing large-scale store performance.",
    tags: ["Plus", "React", "Leadership"],
    active: true,
  },
  {
    period: "May 2023 – Dec 2025",
    title: "Shopify Developer & Tech Lead",
    company: "Techleadz",
    description:
      "Spearheaded full-stack commerce projects. Developed proprietary Shopify apps and custom integrations that scaled with client growth. Managed codebase quality and deployment pipelines.",
    active: false,
  },
];
