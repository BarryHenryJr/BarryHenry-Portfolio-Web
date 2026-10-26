// Long-form write-ups behind each project card. Same rule as constants.ts: every fact here
// comes from Barry's master resume. Don't add metrics, users or outcomes that aren't there.

export interface CaseStudySection {
  heading: string;
  points: string[];
}

export interface CaseStudy {
  /** One or two sentences: what problem this solves and for whom */
  problem: string;
  /** What Barry personally owned */
  role: string;
  sections: CaseStudySection[];
  /** Where it stands today, stated plainly (shipped, internal, in development) */
  status: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "happy-harvest": {
    problem:
      "Farmers and gardeners in Hawaiʻi plan around both modern data and traditional knowledge, like the Hawaiian moon calendar (Mahina). Happy Harvest puts both in one mobile-first planning app. I farm on Maui myself, so it's built for work I do.",
    role: "Founder and lead engineer. I wrote roughly 90% of the commits, working with one other contributor.",
    sections: [
      {
        heading: "Architecture",
        points: [
          "TypeScript monorepo managed with pnpm: an Expo React Native mobile app, a Fastify API, and a shared domain package for moon-calendar and schema logic used by both.",
          "PostgreSQL with Drizzle ORM; local Postgres runs in Docker Compose.",
          "Authentication with Better Auth: email and password, Google and Apple sign-in.",
        ],
      },
      {
        heading: "What I built",
        points: [
          "A Mahina engine that tells growers which farming activity suits a given day, plus a live weather integration. Both are working.",
          "Rebuilt the app from an earlier Supabase version into the current React Native and Fastify architecture.",
        ],
      },
      {
        heading: "Delivery",
        points: [
          "GitHub Actions CI/CD: tests, security checks, policy validation and Maestro end-to-end mobile tests.",
          "Deploys to Railway.",
        ],
      },
    ],
    status: "In active development and used internally. Not yet publicly released.",
  },
  "telemetry-taco": {
    problem:
      "Product analytics usually means sending your users' events to a third party or running a heavy platform. TelemetryTaco is a lightweight, self-hosted alternative focused on the essentials.",
    role: "Creator. I designed and built the API, ingestion pipeline, dashboard and SDK.",
    sections: [
      {
        heading: "Architecture",
        points: [
          "Django and Django Ninja API with single and batch event capture, plus health and readiness endpoints.",
          "Celery workers and Redis batch ingestion into a PostgreSQL event store, with retention commands.",
          "React dashboard using React Query, with TypeScript types generated from the OpenAPI schema.",
        ],
      },
      {
        heading: "Reliability details",
        points: [
          "Idempotent ingestion via client-supplied event IDs, so retries never double-count.",
          "A queue-backed Python SDK that batches events before sending.",
        ],
      },
      {
        heading: "Delivery",
        points: [
          "One-command Docker Compose stack.",
          "Tagged releases publish container images to GitHub Container Registry.",
          "pytest, Vitest, Ruff and Bandit run in CI.",
        ],
      },
    ],
    status: "Open source. The code is public on GitHub.",
  },
  cara: {
    problem:
      "\"How Cara Lost Her Color\" is a children's book about coral bleaching that existed as a single physical copy. The goal was to publish it, then turn it into an interactive storybook with its own store.",
    role: "Publishing and engineering lead, working with the author on content and revisions.",
    sections: [
      {
        heading: "Publishing",
        points: [
          "Converted the book from its only physical copy into an ebook and managed two years of revisions with the author.",
          "Built and run the current live site on Shopify.",
        ],
      },
      {
        heading: "Next version: interactive storybook and store",
        points: [
          "Next.js 16, React 19 and strict TypeScript with Tailwind CSS and shadcn/ui.",
          "Rive animations, Zustand state and a Keystatic CMS for the story content.",
          "Commerce and fulfillment: Stripe Checkout, Printful print-on-demand, EasyPost shipping, and Resend with React Email for transactional email.",
        ],
      },
      {
        heading: "Operations",
        points: [
          "Runs on Vercel with Upstash Redis and QStash and Vercel Blob.",
          "Sentry error tracking and PostHog analytics.",
          "Playwright tests and Lighthouse CI performance budgets.",
        ],
      },
    ],
    status: "The ebook and Shopify site are live. The interactive version is in development, with launch planned for about November 2026.",
  },
  "happy-scheduler": {
    problem:
      "Someone running social media for several separate businesses needs to schedule one post to Instagram, Facebook and TikTok at once, without mixing up accounts or time zones.",
    role: "Creator. I designed the data model, platform integrations and scheduling engine.",
    sections: [
      {
        heading: "Architecture",
        points: [
          "Next.js with Prisma and PostgreSQL, hosted on Vercel with Vercel Cron and Blob.",
          "Invite-only sign-in with Better Auth and Google; owner and editor roles scoped to each business.",
        ],
      },
      {
        heading: "Hard parts",
        points: [
          "A platform adapter layer with error classification and retries, so one network's failure doesn't block the others.",
          "A Postgres-backed cron that publishes each scheduled post exactly once.",
          "DST-safe recurring series in each business's own time zone.",
          "OAuth tokens encrypted at rest.",
        ],
      },
      {
        heading: "Testing",
        points: [
          "Vitest unit tests and Playwright tests running WebKit on iPhone, in a GitHub Actions pipeline.",
        ],
      },
    ],
    status: "In development.",
  },
  "job-hunter": {
    problem:
      "Job boards are scattered, and tailoring every application by hand is slow. Job Hunter gathers postings daily and helps me decide which ones fit.",
    role: "Sole developer.",
    sections: [
      {
        heading: "What it does",
        points: [
          "Pulls postings daily from the Greenhouse, Lever and Ashby public APIs, plus RSS and Hacker News feeds.",
          "Filters by role, location and salary, tracks postings in a spreadsheet, and emails a digest through the Resend API.",
        ],
      },
      {
        heading: "AI assist",
        points: [
          "A local web dashboard for triage.",
          "A Claude API step that scores job fit and drafts tailored application materials from my master resume.",
        ],
      },
    ],
    status: "A personal tool, built for my own job search.",
  },
  "banking-tools": {
    problem:
      "In banking implementations, customer problems often can't wait for the next product release. I built tools that fixed issues for financial institutions right away, until the product team shipped permanent fixes.",
    role: "Senior Professional Services Consultant at Cook Solutions Group. Each tool was solo-built.",
    sections: [
      {
        heading: "Security (C#)",
        points: [
          "A log-scraping tool that detects, hashes and redacts PII in server logs from legacy third-party applications.",
        ],
      },
      {
        heading: "Integration (Python)",
        points: [
          "Middleware that parses XML/TIF transaction data from ATMs and routes it to vendor APIs, enabling automated deposit processing for credit unions.",
          "Python proofs of concept for Conveyance, Cook's check imaging product, as the liaison between the product team and customers.",
        ],
      },
      {
        heading: "Observability and automation",
        points: [
          "A real-time status dashboard for 35+ Vidyo video components, aggregating UDP latency and certificate health.",
          "PowerShell scripts for Conveyance install and firewall testing, TLS certificate rollout, and a client-side DNS and TCP/UDP network test.",
          "Kaseya and PowerShell automation of ITM-specific tasks for the NOC and managed services team.",
        ],
      },
    ],
    status: "Used in production at financial institutions. Internal to Cook Solutions Group, so there's no public code.",
  },
  portfolio: {
    problem:
      "A portfolio should show how I build, not just list it. This site is styled as a SaaS admin dashboard and engineered like a production app.",
    role: "Designer and developer.",
    sections: [
      {
        heading: "Stack",
        points: [
          "Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui and Radix, and Framer Motion.",
          "A ⌘K command palette, light and dark themes, and a mobile drawer navigation.",
          "A JSON API at /api/me with Redis-backed rate limiting that falls back to in-memory.",
        ],
      },
      {
        heading: "Delivery",
        points: [
          "GitHub Actions CI with lint, build, dependency-audit and secret-scanning jobs.",
          "Automated versioning and changelogs with release-please.",
          "Docker builds deployed to Railway, with a preview environment for every pull request.",
        ],
      },
    ],
    status: "Live at barryhenry.com. The code is public on GitHub.",
  },
};
