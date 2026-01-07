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

export type ProjectIcon = "LayoutDashboard" | "BarChart3";

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: ProjectIcon; // Lucide icon component name
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
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  version: string; // e.g., "v3.0.0"
  description: string[];
  tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-current",
    company: "Tech Corp Inc.",
    role: "Senior Product Engineer",
    period: "2023 - Present",
    version: "v3.0.0",
    description: [
      "Architected the new SaaS billing engine using Stripe and Next.js.",
      "Reduced build times by 40% by migrating to Turborepo."
    ],
    tech: ["Next.js", "TypeScript", "Stripe", "AWS"]
  },
  {
    id: "exp-prev",
    company: "Startup XYZ",
    role: "Full Stack Developer",
    period: "2021 - 2023",
    version: "v2.0.0",
    description: [
      "Employee #3. Built the MVP from scratch.",
      "Scaled database to handle 100k daily active users."
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Redis"]
  },
  // Add more history...
];