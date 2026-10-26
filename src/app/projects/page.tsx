import React from "react";
import { PROJECTS, type ProjectStatus } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  CalendarClock,
  ExternalLink,
  Github,
  LayoutDashboard,
  Lock,
  Search,
  Sprout,
} from "lucide-react";
import { AnimatedGrid } from "./components/AnimatedGrid";

// Type-safe mapping of valid project icon names to components
const PROJECT_ICONS = {
  LayoutDashboard,
  BarChart3,
  Sprout,
  BookOpen,
  CalendarClock,
  Search,
} as const;

const STATUS_CLASS: Record<ProjectStatus, string> = {
  "live": "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
  "open source": "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  "in development": "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "internal": "border-border bg-muted text-muted-foreground",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground max-w-3xl">
          Products I design and build end to end, mostly through Agile-Flimflam, a small builders&apos; collective I
          co-founded in 2021. Most repos are private; TelemetryTaco and this site are public.
        </p>
      </div>

      {/* Projects Grid */}
      <AnimatedGrid>
        {PROJECTS.map((project) => {
          const IconComponent = PROJECT_ICONS[project.icon];

          return (
            <Card key={project.id} className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold leading-tight">{project.title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {project.role} · {project.period}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_CLASS[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <ul className="list-disc pl-4 space-y-1">
                  {project.highlights.map((highlight, index) => (
                    <li key={`${project.id}-hl-${index}`} className="text-xs text-muted-foreground leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, index) => (
                      <Badge key={`${tech}-${index}`} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.href == null && project.repo == null ? (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" aria-hidden="true" />
                      Private repo; happy to walk through it on a call.
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      {project.href != null && (
                        <Button size="sm" className="flex-1" asChild>
                          <a href={project.href} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                            Visit site
                          </a>
                        </Button>
                      )}
                      {project.repo != null && (
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                          <a href={project.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" />
                            View source
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </AnimatedGrid>
    </div>
  );
}
