import type { Metadata } from "next";
import {
  EDUCATION,
  PROFILE,
  PROJECTS,
  SITE_URL,
  SOCIAL_LINKS,
  STACK,
  type StackCategory,
} from "@/lib/constants";
import {
  RESUME_CERTIFICATIONS,
  RESUME_EARLIER_CAREER,
  RESUME_OTHER,
  RESUME_PROJECT_IDS,
  RESUME_ROLES,
} from "@/lib/resume";
import { PrintButton } from "./components/PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${PROFILE.name}, ${PROFILE.headline}.`,
  alternates: { canonical: "/resume" },
};

const SKILL_CATEGORIES: StackCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Infrastructure",
  "Integrations",
  "Banking & Security",
];

const RESUME_PROJECTS = PROJECTS.filter((project) => RESUME_PROJECT_IDS.includes(project.id));

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-border pb-1 text-sm font-semibold uppercase tracking-wider text-foreground print:border-black">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted-foreground">
          Choose &ldquo;Save as PDF&rdquo; in the print dialog to download a copy.
        </p>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-4xl space-y-6 rounded-lg border border-border bg-card p-6 text-card-foreground sm:p-10 print:max-w-none print:rounded-none print:border-0 print:bg-white print:px-[0.6in] print:py-0 print:text-black print:text-[11px] print:space-y-2">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight print:text-2xl">{PROFILE.name}</h1>
          <p className="text-lg text-muted-foreground print:text-sm print:text-black">{PROFILE.headline}</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground print:text-[11px] print:text-black">
            <span>{PROFILE.location}</span>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:underline">{SOCIAL_LINKS.email}</a>
            <a href={SOCIAL_LINKS.linkedin} className="hover:underline">linkedin.com/in/barrynhenry</a>
            <a href={SOCIAL_LINKS.github} className="hover:underline">github.com/barryhenryjr</a>
          </p>
        </header>

        <section className="space-y-2">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm leading-relaxed print:text-[11px]">{PROFILE.summary}</p>
        </section>

        <section className="space-y-3 print:space-y-1.5">
          <SectionHeading>Experience</SectionHeading>
          {RESUME_ROLES.map((job) => (
            <div key={job.id} className="space-y-1 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-semibold">
                  {job.role} · <span className="font-normal">{job.company}</span>
                </h3>
                <span className="text-xs text-muted-foreground print:text-black">{job.period}</span>
              </div>
              <ul className="list-disc space-y-0.5 pl-5 text-sm print:text-[11px]">
                {job.points.map((line, index) => (
                  <li key={`${job.id}-${index}`}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-1 break-inside-avoid text-sm print:text-[11px]">
            {RESUME_OTHER.map((item) => (
              <div key={item.id} className="flex items-baseline justify-between gap-x-3">
                <p className="min-w-0">
                  <span className="font-semibold">{item.role}</span> · {item.company}: {item.detail}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground print:text-black">{item.period}</span>
              </div>
            ))}
            <p className="text-muted-foreground print:text-black">{RESUME_EARLIER_CAREER}</p>
          </div>
        </section>

        <section className="space-y-3 print:space-y-1.5">
          <SectionHeading>Engineering projects</SectionHeading>
          {RESUME_PROJECTS.map((project) => (
            <div key={project.id} className="break-inside-avoid text-sm print:text-[11px]">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-semibold">
                  {project.title} · <span className="font-normal">{project.role}</span>
                </h3>
                <span className="text-xs text-muted-foreground print:text-black">{project.period}</span>
              </div>
              <p>
                {project.description} <span className="text-muted-foreground print:text-black">({project.tech.join(", ")})</span>{" "}
                <a href={`/projects/${project.id}`} className="text-muted-foreground underline print:text-black">
                  {SITE_URL.replace("https://", "")}/projects/{project.id}
                </a>
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-2 break-inside-avoid">
          <SectionHeading>Skills</SectionHeading>
          <dl className="space-y-1 text-sm print:text-[11px]">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category} className="flex flex-wrap gap-x-2">
                <dt className="font-semibold">{category}:</dt>
                <dd>{STACK.filter((item) => item.category === category).map((item) => item.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2 print:gap-4">
          <section className="space-y-2 break-inside-avoid">
            <SectionHeading>Certifications</SectionHeading>
            <ul className="space-y-0.5 text-sm print:text-[11px]">
              {RESUME_CERTIFICATIONS.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-2 break-inside-avoid">
            <SectionHeading>Education</SectionHeading>
            <ul className="space-y-1 text-sm print:text-[11px]">
              {EDUCATION.map((item) => (
                <li key={item.id}>
                  <span className="font-semibold">{item.school}</span>
                  <br />
                  {item.detail}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="border-t border-border pt-3 text-center text-sm text-muted-foreground print:border-black print:text-[11px] print:text-black">
          Full resume with references available on request:{" "}
          <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:underline">{SOCIAL_LINKS.email}</a>
        </p>
      </article>
    </div>
  );
}
