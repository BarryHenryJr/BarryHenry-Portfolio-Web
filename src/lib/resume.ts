// The public /resume page (and its PDF) is a teaser, not the full master resume. Barry chose to keep
// exact counts, awards, dollar amounts and older-role detail off the public download; the full
// version is shared on request. The Experience page still reads from EXPERIENCE in constants.ts.

export interface ResumeRole {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface ResumeLine {
  id: string;
  role: string;
  company: string;
  period: string;
  detail: string;
}

export const RESUME_ROLES: ResumeRole[] = [
  {
    id: "csg-senior",
    role: "Senior Professional Services Consultant",
    company: "Cook Solutions Group",
    period: "Apr 2017 – Present",
    points: [
      "Led nearly all of the company's NCR Interactive Teller Machine and Conveyance check imaging rollouts for community banks and credit unions nationwide.",
      "Join qualified pre-sales calls for demos, technical discovery, scoping, solution design and RFP responses.",
      "Stand up each customer's Azure environment and live teller video infrastructure, then own the rollout through go-live.",
      "Built C#, Python and PowerShell tools that fixed customer problems before permanent product fixes shipped.",
      "Original and longest-tenured member of the team; built its processes and trained everyone on it.",
    ],
  },
  {
    id: "csg-field",
    role: "Field Technical Specialist",
    company: "Cook Solutions Group",
    period: "Apr 2016 – Apr 2017",
    points: [
      "Installed, maintained and sold bank security equipment.",
      "Led the company's expansion into Arizona, its first market beyond the West Coast.",
    ],
  },
];

export const RESUME_OTHER: ResumeLine[] = [
  {
    id: "happy-lau-farms",
    role: "Owner",
    company: "Happy Lau Farms LLC",
    period: "Jul 2024 – Present",
    detail: "Natural farming business on Maui.",
  },
  {
    id: "cgc",
    role: "Board President (volunteer)",
    company: "Common Ground Collective",
    period: "Oct 2023 – Oct 2025",
    detail: "Led tech modernization and grants for a Maui food hub.",
  },
];

export const RESUME_EARLIER_CAREER =
  "Earlier: bank branch management and security operations, 2004 – 2016.";

export const RESUME_CERTIFICATIONS = ["Vidyo Certified Engineer", "NCR Certified ITM Engineer"];

export const RESUME_PROJECT_IDS = ["happy-harvest", "telemetry-taco", "cara"];
