import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";
import { getCaseStudyProjects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return [
    { url: new URL("/", base).href, changeFrequency: "monthly", priority: 1 },
    ...getCaseStudyProjects().map((project) => ({
      url: new URL(`/work/${project.slug}`, base).href,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
