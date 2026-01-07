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

interface ProjectLinkButtonProps {
  href: string;
  variant?: "default" | "ghost";
  children: React.ReactNode;
}

function ProjectLinkButton({ href, variant = "default", children }: ProjectLinkButtonProps) {
  if (href !== "#") {
    return (
      <Button size="sm" variant={variant} className="flex-1" asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button size="sm" variant={variant} className="flex-1" disabled>
      {children}
    </Button>
  );
}

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
                    {project.tech.map((tech, index) => (
                      <Badge key={`${tech}-${index}`} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <ProjectLinkButton href={project.href}>
                      <ExternalLink className="h-3 w-3" />
                      Install
                    </ProjectLinkButton>

                    <ProjectLinkButton href={project.repo} variant="ghost">
                      <Github className="h-3 w-3" />
                      View Source
                    </ProjectLinkButton>
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
