import Link from "next/link";
import { FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TechRadar } from "@/components/dashboard/TechRadar";
import { Button } from "@/components/ui/button";
import { METRICS, PROFILE, SOCIAL_LINKS } from "@/lib/constants";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="rounded-lg border border-border bg-card p-6 sm:p-8" aria-labelledby="hero-name">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            {PROFILE.availability}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {PROFILE.location}
          </span>
        </div>

        <h1 id="hero-name" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {PROFILE.name}
        </h1>
        <p className="mt-1 text-lg sm:text-xl font-medium text-muted-foreground">
          {PROFILE.headline}
        </p>
        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          {PROFILE.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/resume">
              <FileText className="h-4 w-4" />
              View resume
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`mailto:${SOCIAL_LINKS.email}`}>
              <Mail className="h-4 w-4" />
              Email me
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Metrics Row - every number comes from the resume */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <div key={metric.id} className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <p className="text-2xl sm:text-3xl font-bold text-card-foreground">{metric.value}</p>
            <p className="mt-1 text-sm font-medium text-card-foreground">{metric.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{metric.detail}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1 min-w-0">
          <ActivityFeed />
        </div>

        <div className="lg:col-span-1 min-w-0">
          <TechRadar />
        </div>
      </div>
    </div>
  );
}
