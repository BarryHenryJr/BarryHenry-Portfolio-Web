import React from "react";
import type { Metadata } from "next";
import { EXPERIENCE } from "@/lib/constants";
import { ExperienceTimeline } from "./components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Ten years leading banking technology implementations at Cook Solutions Group, plus earlier careers in bank branch management and security systems.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground">
          Ten years in banking technology, built on earlier careers in bank branch management and security systems.
        </p>
      </div>

      {/* Timeline */}
      <ExperienceTimeline items={EXPERIENCE} />
    </div>
  );
}
