import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Barry Henry by email, LinkedIn or GitHub.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    id: "email",
    label: "Email",
    value: SOCIAL_LINKS.email,
    href: `mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent("Opportunity for Barry Henry")}`,
    icon: Mail,
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/barrynhenry",
    href: SOCIAL_LINKS.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/barryhenryjr",
    href: SOCIAL_LINKS.github,
    icon: Github,
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground max-w-2xl">
          Hiring for a solutions engineering or full-stack role? Email is the fastest way to reach me. I&apos;m based
          in {PROFILE.location} (Hawaiʻi time, UTC−10).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Get in touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 rounded-md border border-border p-3 transition-colors hover:bg-accent"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{channel.label}</p>
                    <p className="text-sm text-muted-foreground truncate">{channel.value}</p>
                  </div>
                </a>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A one-page view of my experience, projects, skills and certifications. Save it as a PDF from the resume
              page.
            </p>
            <Button asChild>
              <Link href="/resume">
                <FileText className="h-4 w-4" />
                View resume
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
