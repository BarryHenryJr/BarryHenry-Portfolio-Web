import type { MetadataRoute } from "next";
import { NAVIGATION_ITEMS, PROJECTS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = NAVIGATION_ITEMS.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const caseStudies: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...caseStudies];
}
