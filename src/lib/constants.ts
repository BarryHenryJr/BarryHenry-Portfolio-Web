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
  icon: ProjectIcon; // String identifier for the Lucide icon component to display
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

export type StackCategory = "Frontend" | "Backend" | "DevOps" | "Design" | "Tools";
export type StackProficiency = "Expert" | "Advanced" | "Intermediate";

// A type for the supported Lucide icon names, to ensure type safety.
export type StackIconName =
  | "Layers"
  | "FileCode"
  | "Atom"
  | "Palette"
  | "Server"
  | "Database"
  | "Cloud"
  | "Container"
  | "PenTool"
  | "Image"
  | "GitBranch"
  | "Code"
  | "Send"
  | "Package";

export interface StackItem {
  id: string;
  name: string;
  category: StackCategory;
  proficiency: StackProficiency;
  years: number;
  icon: StackIconName; // Lucide icon name
  description: string;
}

export const STACK: StackItem[] = [
  // Frontend
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    proficiency: "Expert",
    years: 4,
    icon: "Layers",
    description: "App Router, Server Actions, React Server Components"
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    proficiency: "Expert",
    years: 5,
    icon: "FileCode",
    description: "Strict typing, generics, utility types"
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    proficiency: "Expert",
    years: 5,
    icon: "Atom",
    description: "Hooks, Context, component lifecycle"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    proficiency: "Expert",
    years: 3,
    icon: "Palette",
    description: "Utility-first, responsive design"
  },

  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    proficiency: "Advanced",
    years: 4,
    icon: "Server",
    description: "Express, APIs, server-side logic"
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Backend",
    proficiency: "Advanced",
    years: 3,
    icon: "Database",
    description: "Complex queries, indexing, Supabase/Prisma"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Backend",
    proficiency: "Intermediate",
    years: 2,
    icon: "Database",
    description: "NoSQL document storage, aggregation"
  },

  // DevOps
  {
    id: "vercel",
    name: "Vercel",
    category: "DevOps",
    proficiency: "Expert",
    years: 3,
    icon: "Cloud",
    description: "Deployment, edge functions, analytics"
  },
  {
    id: "aws",
    name: "AWS",
    category: "DevOps",
    proficiency: "Advanced",
    years: 2,
    icon: "Cloud",
    description: "EC2, S3, Lambda, CloudFormation"
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    proficiency: "Intermediate",
    years: 2,
    icon: "Container",
    description: "Containerization, Docker Compose"
  },

  // Design
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    proficiency: "Advanced",
    years: 3,
    icon: "PenTool",
    description: "UI/UX design, prototyping, collaboration"
  },
  {
    id: "photoshop",
    name: "Photoshop",
    category: "Design",
    proficiency: "Intermediate",
    years: 4,
    icon: "Image",
    description: "Image editing, digital art"
  },

  // Tools
  {
    id: "git",
    name: "Git",
    category: "Tools",
    proficiency: "Expert",
    years: 6,
    icon: "GitBranch",
    description: "Version control, branching strategies"
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools",
    proficiency: "Expert",
    years: 5,
    icon: "Code",
    description: "Extensions, debugging, productivity"
  },
  {
    id: "postman",
    name: "Postman",
    category: "Tools",
    proficiency: "Advanced",
    years: 4,
    icon: "Send",
    description: "API testing, documentation"
  }
];

// Social and contact information
export const SOCIAL_LINKS = {
  github: "https://github.com/barryhenryjr",
  linkedin: "https://linkedin.com/in/barrynhenry",
  email: "barryhenryjr@gmail.com",
};