import {
  BarChart3,
  Briefcase,
  Code,
  FileText,
  Home,
  Mail,
} from "lucide-react";

// Content source of truth: Barry's master resume. Only add facts that appear there;
// never invent roles, metrics, or links (private repos must not be linked).

export const SITE_URL = "https://www.barryhenry.com";

export const PROFILE = {
  name: "Barry Henry",
  headline: "Solutions Engineer & Full-Stack Developer",
  location: "Maui, Hawaiʻi",
  timeZone: "Pacific/Honolulu",
  availability: "Open to new roles",
  summary:
    "10 years leading banking technology implementations at Cook Solutions Group: on every qualified pre-sales call, then owning the rollout through go-live. Outside work I build full-stack products end to end with TypeScript, React, Node.js, Python and PostgreSQL.",
} as const;

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
    id: "resume",
    label: "Resume",
    icon: FileText,
    href: "/resume",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    href: "/contact",
  },
] as const;

export type NavigationItem = typeof NAVIGATION_ITEMS[number];

export interface Metric {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export const METRICS: Metric[] = [
  {
    id: "years",
    label: "Years in banking technology",
    value: "10",
    detail: "Cook Solutions Group, since April 2016",
  },
  {
    id: "itm",
    label: "NCR ITM implementations led",
    value: "100+",
    detail: "Nearly all of the company's rollouts",
  },
  {
    id: "imaging",
    label: "Check imaging rollouts",
    value: "80+",
    detail: "Every Conveyance implementation to date",
  },
  {
    id: "certs",
    label: "Manufacturer certifications",
    value: "10",
    detail: "NCR, Vidyo, Lenel, RS2 and more",
  },
];

export type ProjectIcon =
  | "LayoutDashboard"
  | "BarChart3"
  | "Sprout"
  | "BookOpen"
  | "CalendarClock"
  | "Search"
  | "Landmark";

export type ProjectStatus = "live" | "open source" | "in development" | "internal";

export interface Project {
  id: string;
  /** "work" projects were built on the job and are already covered by the resume's experience section */
  kind: "personal" | "work";
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  icon: ProjectIcon; // String identifier for the Lucide icon component to display
  status: ProjectStatus;
  tech: string[];
  /** Public site or demo; null when there is nothing public to visit */
  href: string | null;
  /** Public source repo; null for private repos, which must never be linked */
  repo: string | null;
}

export const PROJECTS: Project[] = [
  {
    id: "happy-harvest",
    kind: "personal",
    title: "Happy Harvest",
    role: "Founder & Lead Engineer",
    period: "Apr 2025 – Present",
    description:
      "Mobile-first planning app for farmers and gardeners that pairs modern tooling with traditional Hawaiian growing knowledge.",
    highlights: [
      "TypeScript pnpm monorepo: Expo React Native app, Fastify API on PostgreSQL with Drizzle ORM, shared domain package.",
      "Hawaiian moon calendar (Mahina) engine that tells growers which farming activity suits a given day, plus live weather.",
      "CI/CD in GitHub Actions with Maestro end-to-end mobile tests and Railway deploys; author of ~90% of commits.",
    ],
    icon: "Sprout",
    status: "in development",
    tech: ["React Native", "Expo", "Fastify", "PostgreSQL", "Drizzle", "Better Auth"],
    href: null,
    repo: null,
  },
  {
    id: "banking-tools",
    kind: "work",
    title: "Banking ops tooling",
    role: "Cook Solutions Group",
    period: "2017 – Present",
    description:
      "Tools I built on the job to fix customer problems at financial institutions right away, until the product team shipped permanent fixes.",
    highlights: [
      "C# tool that detects, hashes and redacts PII in logs from legacy third-party applications.",
      "Python middleware routing ATM XML/TIF transaction data to vendor APIs for automated credit union deposits.",
      "Real-time status dashboard for 35+ Vidyo components; PowerShell install, TLS and network-test automation.",
    ],
    icon: "Landmark",
    status: "internal",
    tech: ["C#", "Python", "PowerShell", "Azure", "REST & SOAP APIs"],
    href: null,
    repo: null,
  },
  {
    id: "telemetry-taco",
    kind: "personal",
    title: "TelemetryTaco",
    role: "Creator",
    period: "Dec 2025 – Present",
    description:
      "Lightweight, self-hosted product analytics platform: a focused alternative to PostHog.",
    highlights: [
      "Django Ninja API with single and batch event capture and idempotency via client-supplied event IDs.",
      "Celery and Redis batch ingestion into a PostgreSQL event store; queue-backed Python SDK.",
      "One-command Docker Compose stack; tagged releases publish images to GitHub Container Registry.",
    ],
    icon: "BarChart3",
    status: "open source",
    tech: ["Python", "Django", "Celery", "Redis", "PostgreSQL", "React"],
    href: null,
    repo: "https://github.com/Agile-Flimflam/TelemetryTaco",
  },
  {
    id: "cara",
    kind: "personal",
    title: "How Cara Lost Her Color",
    role: "Publishing & Engineering Lead",
    period: "Jan 2024 – Present",
    description:
      "A children's book about coral bleaching, taken from its only physical copy to a published ebook, with an interactive storybook and store in progress.",
    highlights: [
      "Built and runs the live Shopify site; next version (launching ~Nov 2026) is an interactive storybook and e-commerce platform.",
      "Next.js 16, React 19 and strict TypeScript with Rive animations, Zustand and a Keystatic CMS.",
      "Stripe Checkout, Printful print-on-demand, EasyPost shipping and Resend email; Playwright and Lighthouse CI budgets.",
    ],
    icon: "BookOpen",
    status: "live",
    tech: ["Next.js", "TypeScript", "Stripe", "Printful", "Vercel", "Sentry"],
    href: "https://howcaralosthercolor.com",
    repo: null,
  },
  {
    id: "happy-scheduler",
    kind: "personal",
    title: "Happy Scheduler",
    role: "Creator",
    period: "2026 – Present",
    description:
      "Mobile-first web app for scheduling one post to Instagram, Facebook and TikTok across several separate businesses.",
    highlights: [
      "Platform adapter layer with error classification and retries; Postgres-backed cron publishes each post exactly once.",
      "DST-safe recurring series per business time zone; OAuth tokens encrypted at rest.",
      "Invite-only sign-in with owner/editor roles scoped to each business.",
    ],
    icon: "CalendarClock",
    status: "in development",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Better Auth", "Playwright"],
    href: null,
    repo: null,
  },
  {
    id: "job-hunter",
    kind: "personal",
    title: "Job Hunter",
    role: "Personal project",
    period: "2026",
    description:
      "Python tool that pulls job postings daily, filters them by role, location and salary, and emails a digest.",
    highlights: [
      "Pulls from the Greenhouse, Lever and Ashby public APIs plus RSS and Hacker News feeds.",
      "Local web dashboard for triage; a Claude API step scores job fit and drafts tailored application materials.",
    ],
    icon: "Search",
    status: "internal",
    tech: ["Python", "Claude API", "Resend"],
    href: null,
    repo: null,
  },
  {
    id: "portfolio",
    kind: "personal",
    title: "This portfolio",
    role: "Designer & Developer",
    period: "Jan 2026",
    description:
      "Personal portfolio styled as a SaaS dashboard, with a command palette (⌘K) and a rate-limited JSON API at /api/me.",
    highlights: [
      "Next.js 16, React 19, Tailwind CSS 4, shadcn/ui and Framer Motion.",
      "GitHub Actions CI with lint and security-audit jobs, release-please releases, Docker deploys to Railway.",
    ],
    icon: "LayoutDashboard",
    status: "live",
    tech: ["Next.js", "Tailwind", "shadcn/ui", "Redis", "Docker"],
    href: "https://www.barryhenry.com",
    repo: "https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web",
  },
];

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  version: string; // e.g., "v3.0.0"
  summary?: string;
  description: string[];
  tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "csg-senior",
    company: "Cook Solutions Group",
    role: "Senior Professional Services Consultant",
    period: "Apr 2017 – Present",
    version: "v7.0.0",
    description: [
      "Leads banking technology implementations for community banks and credit unions, from pre-sales through go-live.",
    ],
    tech: ["Azure", "Azure SQL", "PowerShell", "Python", "C#", "REST & SOAP APIs", "NCR ITM"],
  },
  {
    id: "happy-lau-farms",
    company: "Happy Lau Farms LLC",
    role: "Owner",
    period: "Jul 2024 – Present",
    location: "Maui",
    version: "v6.0.0",
    description: [
      "Natural farming business on Maui.",
    ],
    tech: ["Korean Natural Farming", "JADAM"],
  },
  {
    id: "cgc",
    company: "Common Ground Collective",
    role: "Board President (volunteer)",
    period: "Oct 2023 – Oct 2025",
    location: "Maui",
    version: "v5.0.0",
    description: [
      "Led technology and grant funding for a Maui nonprofit food hub.",
    ],
    tech: ["Google Workspace", "Microsoft 365", "Stripe", "Google Sheets API"],
  },
  {
    id: "csg-field",
    company: "Cook Solutions Group",
    role: "Field Technical Specialist",
    period: "Apr 2016 – Apr 2017",
    version: "v4.0.0",
    description: [
      "Installed and sold bank security equipment, and led the company's expansion into Arizona.",
    ],
    tech: ["Access control", "CCTV", "Alarm systems"],
  },
  {
    id: "stanley",
    company: "Stanley Convergent Security Solutions",
    role: "Banking Security Technician 2",
    period: "Dec 2014 – Apr 2016",
    version: "v3.0.0",
    description: [
      "Installed and serviced security systems for financial institutions.",
    ],
    tech: ["Intrusion detection", "Video surveillance", "Card access"],
  },
  {
    id: "wells-fargo",
    company: "Wells Fargo Bank",
    role: "Branch Manager",
    period: "Apr 2008 – Dec 2014",
    version: "v2.0.0",
    description: [
      "Managed bank branches and their teams.",
    ],
    tech: ["P&L", "Compliance", "Team leadership"],
  },
  {
    id: "copperstate",
    company: "Copperstate Lock & Security",
    role: "General Manager",
    period: "Apr 2004 – Apr 2008",
    location: "Tempe, AZ",
    version: "v1.0.0",
    description: [
      "Ran operations for a growing security services company.",
    ],
    tech: ["Security integration", "Sales", "Operations"],
  },
];

export interface Education {
  id: string;
  school: string;
  detail: string;
}

export const EDUCATION: Education[] = [
  {
    id: "wgu",
    school: "Western Governors University",
    detail: "Computer Science coursework, 2020 – 2022",
  },
  {
    id: "cgcc",
    school: "Chandler-Gilbert Community College",
    detail: "Coursework, 2008 – 2010; Phi Theta Kappa Honor Society",
  },
];

export const CERTIFICATIONS: string[] = [
  "Vidyo Certified Engineer",
  "NCR Certified ITM Engineer",
  "NCR Level 2 Customer Engineer",
  "Lenel OnGuard Access Control Engineer",
  "RS2 Access Control Engineer",
  "DMP Access Control Certified",
  "DMP Burglary Panel Certified",
  "3VR Video Intelligence Platform Certified",
  "March Networks NVR Engineer",
  "Exacq exacqVision VMS Engineer",
];

export type StackCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Infrastructure"
  | "Integrations"
  | "Banking & Security";

/** Where a skill has been used: on the job, in personal projects, or both */
export type StackContext = "Work" | "Projects" | "Work + Projects";

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
  | "GitBranch"
  | "Code"
  | "Send"
  | "Package"
  | "Terminal"
  | "Shield"
  | "Smartphone"
  | "Landmark";

export interface StackItem {
  id: string;
  name: string;
  category: StackCategory;
  context: StackContext;
  icon: StackIconName; // Lucide icon name
  /** Where it was used, so every skill is backed by a role or project */
  description: string;
}

export const STACK: StackItem[] = [
  // Languages
  { id: "typescript", name: "TypeScript", category: "Languages", context: "Projects", icon: "FileCode", description: "Happy Harvest, Happy Scheduler, Cara storybook, this site" },
  { id: "python", name: "Python", category: "Languages", context: "Work + Projects", icon: "FileCode", description: "ATM transaction middleware, Conveyance proofs of concept, TelemetryTaco, Job Hunter" },
  { id: "powershell", name: "PowerShell", category: "Languages", context: "Work", icon: "Terminal", description: "Install automation, TLS cert rollout, client network tests" },
  { id: "sql", name: "SQL", category: "Languages", context: "Work + Projects", icon: "Database", description: "Azure SQL reporting for 100+ ITM environments; PostgreSQL in projects" },
  { id: "csharp", name: "C#", category: "Languages", context: "Work", icon: "Code", description: "PII detection and redaction tool for legacy server logs" },

  // Frontend
  { id: "react", name: "React", category: "Frontend", context: "Projects", icon: "Atom", description: "TelemetryTaco dashboard, Cara storybook, this site" },
  { id: "nextjs", name: "Next.js", category: "Frontend", context: "Projects", icon: "Layers", description: "Cara storybook and store, Happy Scheduler, this site" },
  { id: "react-native", name: "React Native (Expo)", category: "Frontend", context: "Projects", icon: "Smartphone", description: "Happy Harvest mobile app" },
  { id: "tailwind", name: "Tailwind & shadcn/ui", category: "Frontend", context: "Projects", icon: "Palette", description: "Cara storybook, this site" },

  // Backend
  { id: "nodejs", name: "Node.js & Fastify", category: "Backend", context: "Projects", icon: "Server", description: "Happy Harvest API" },
  { id: "django", name: "Django & Celery", category: "Backend", context: "Projects", icon: "Server", description: "TelemetryTaco ingestion API and workers" },
  { id: "postgres", name: "PostgreSQL", category: "Backend", context: "Projects", icon: "Database", description: "Drizzle and Prisma ORMs; event store in TelemetryTaco" },
  { id: "redis", name: "Redis", category: "Backend", context: "Projects", icon: "Database", description: "Celery queues, rate limiting on this site" },

  // Infrastructure
  { id: "azure", name: "Azure", category: "Infrastructure", context: "Work", icon: "Cloud", description: "Windows Server VMs, networking and VPNs for hosted ITM environments" },
  { id: "docker", name: "Docker", category: "Infrastructure", context: "Projects", icon: "Container", description: "Compose stacks for TelemetryTaco and Happy Harvest" },
  { id: "github-actions", name: "GitHub Actions", category: "Infrastructure", context: "Projects", icon: "GitBranch", description: "CI/CD with tests, security checks and deploys" },
  { id: "railway-vercel", name: "Railway & Vercel", category: "Infrastructure", context: "Projects", icon: "Cloud", description: "Hosting for this site, Happy Harvest and Cara" },

  // Integrations
  { id: "stripe", name: "Stripe", category: "Integrations", context: "Projects", icon: "Send", description: "Checkout for the Cara store" },
  { id: "apis", name: "REST & SOAP APIs", category: "Integrations", context: "Work + Projects", icon: "Send", description: "Conveyance REST APIs, Vidyo SOAP APIs, vendor deposit APIs" },
  { id: "observability", name: "Sentry & PostHog", category: "Integrations", context: "Projects", icon: "Package", description: "Error tracking and analytics for the Cara platform" },

  // Banking & Security
  { id: "ncr-itm", name: "NCR ITM & Hyosung", category: "Banking & Security", context: "Work", icon: "Landmark", description: "Interactive Teller Machine implementations and RDI upgrades" },
  { id: "check-imaging", name: "Check imaging", category: "Banking & Security", context: "Work", icon: "Landmark", description: "Conveyance, Alogent/Unify and TranzCapture integrations" },
  { id: "vidyo", name: "Vidyo", category: "Banking & Security", context: "Work", icon: "Server", description: "~35 VidyoPortal, Router and Replay appliances" },
  { id: "physical-security", name: "Physical security", category: "Banking & Security", context: "Work", icon: "Shield", description: "Access control, alarms and NVRs for financial institutions" },
];

export interface Milestone {
  id: string;
  date: string;
  type: "code" | "deploy" | "system";
  title: string;
  detail: string;
}

// Shown on the Overview as a changelog; newest first.
export const MILESTONES: Milestone[] = [
  { id: "cara-v2", date: "Sep 2026", type: "code", title: "Started the interactive Cara storybook and store", detail: "Next.js 16, Stripe, Printful, EasyPost" },
  { id: "lockdown", date: "2026", type: "system", title: "Designed a remote lockdown system for bank tellers", detail: "Two-button wireless remote driving 600 lb maglocks" },
  { id: "job-hunter", date: "2026", type: "code", title: "Built Job Hunter", detail: "Daily job digest with Claude-scored fit" },
  { id: "portfolio", date: "Jan 2026", type: "deploy", title: "Shipped this portfolio", detail: "Next.js 16 on Railway" },
  { id: "telemetry-taco", date: "Dec 2025", type: "deploy", title: "Released TelemetryTaco (open source)", detail: "Self-hosted product analytics" },
  { id: "happy-harvest", date: "Apr 2025", type: "code", title: "Started Happy Harvest", detail: "React Native + Fastify farm planner" },
];

// Social and contact information
export const SOCIAL_LINKS = {
  github: "https://github.com/barryhenryjr",
  linkedin: "https://linkedin.com/in/barrynhenry",
  email: "barryhenryjr@gmail.com",
};
