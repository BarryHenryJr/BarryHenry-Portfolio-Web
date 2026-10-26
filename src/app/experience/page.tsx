import React from "react";
import { EXPERIENCE } from "@/lib/constants";
import { ExperienceTimeline } from "./components/ExperienceTimeline";

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
