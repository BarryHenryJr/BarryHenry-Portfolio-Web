import {
  BarChart3,
  Briefcase,
  Code,
  Home,
  Mail,
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
    href: "/",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Code,
    href: "/projects",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    href: "/experience",
  },
  {
    id: "stack",
    label: "Stack",
    icon: BarChart3,
    href: "/stack",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    href: "/contact",
  },
] as const;

export type NavigationItem = typeof NAVIGATION_ITEMS[number];

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string; // We will use Lucide icon names or emojis for now
  status: "live" | "beta" | "archived";
  tech: string[];
  href: string;
  repo: string;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-v1",
    title: "Admin Console Portfolio",
    description: "A high-fidelity personal portfolio designed to mimic a SaaS dashboard. Features a command palette, theme switching, and real-time metrics.",
    icon: "LayoutDashboard", 
    status: "live",
    tech: ["Next.js", "Tailwind", "Shadcn", "Framer Motion"],
    href: "https://barryhenry.com",
    repo: "https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web"
  },
  {
    id: "project-alpha",
    title: "E-Commerce Analytics",
    description: "Real-time revenue tracking dashboard for Shopify merchants. Processed $2M+ in GMV during beta.",
    icon: "BarChart3",
    status: "beta",
    tech: ["React", "Tremor", "Postgres"],
    href: "#",
    repo: "#"
  },
  // Add more mock projects as needed
];