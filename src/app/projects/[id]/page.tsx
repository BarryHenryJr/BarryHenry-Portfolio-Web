import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CASE_STUDIES } from "@/lib/case-studies";
import { PROJECTS, SOCIAL_LINKS } from "@/lib/constants";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
}

function findProject(id: string) {
  const project = PROJECTS.find((item) => item.id === id);
  const caseStudy = CASE_STUDIES[id];
  if (project == null || caseStudy == null) return null;
  return { project, caseStudy };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const found = findProject(id);
  if (found == null) return {};
  return {
    title: `${found.project.title} case study`,
    description: found.caseStudy.problem,
    alternates: { canonical: `/projects/${id}` },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const found = findProject(id);
  if (found == null) notFound();
  const { project, caseStudy } = found;

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
      </Button>

      <header className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {project.role} · {project.period}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{caseStudy.problem}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">My role</h2>
        <p className="text-muted-foreground leading-relaxed">{caseStudy.role}</p>
      </section>

      {caseStudy.sections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="text-lg font-semibold">{section.heading}</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground leading-relaxed">
            {section.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Where it stands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{caseStudy.status}</p>
          <div className="flex flex-wrap gap-2">
            {project.href != null && (
              <Button asChild size="sm">
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                  Visit site
                </a>
              </Button>
            )}
            {project.repo != null && (
              <Button asChild size="sm" variant="outline">
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3 w-3" />
                  View source
                </a>
              </Button>
            )}
            {project.repo == null && (
              <Button asChild size="sm" variant="outline">
                <a href={`mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(`Walkthrough: ${project.title}`)}`}>
                  <Lock className="h-3 w-3" />
                  Ask for a walkthrough
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
