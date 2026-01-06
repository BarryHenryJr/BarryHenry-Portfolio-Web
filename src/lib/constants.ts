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
