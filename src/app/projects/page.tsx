import React from "react";
import { PROJECTS } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Package, LayoutDashboard, BarChart3 } from "lucide-react";
import { AnimatedGrid } from "./components/AnimatedGrid";

// Type-safe mapping of valid project icon names to components
const PROJECT_ICONS = {
  LayoutDashboard,
  BarChart3,
} as const;

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage your installed integrations and active developments.
        </p>
      </div>

      {/* Projects Grid */}
      <AnimatedGrid>
        {PROJECTS.map((project) => {
          // Type-safe icon lookup with fallback
          const IconComponent = PROJECT_ICONS[project.icon] || Package;

          return (
            <Card key={project.id} className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{project.title}</h3>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-auto space-y-3">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.href === "#" ? undefined : project.href}
                        target={project.href === "#" ? undefined : "_blank"}
                        rel={project.href === "#" ? undefined : "noopener noreferrer"}
                        aria-disabled={project.href === "#"}
                        className={`inline-flex items-center gap-2 ${
                          project.href === "#" ? "pointer-events-none opacity-50" : ""
                        }`}
                      >
                        Install
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.repo === "#" ? undefined : project.repo}
                        target={project.repo === "#" ? undefined : "_blank"}
                        rel={project.repo === "#" ? undefined : "noopener noreferrer"}
                        aria-disabled={project.repo === "#"}
                        className={`inline-flex items-center gap-2 ${
                          project.repo === "#" ? "pointer-events-none opacity-50" : ""
                        }`}
                      >
                        <Github className="h-3 w-3" />
                        View Source
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </AnimatedGrid>
    </div>
  );
}
