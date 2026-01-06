import React from "react";
import { EXPERIENCE } from "@/lib/constants";
import { ExperienceTimeline } from "./components/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground">
          A history of versions and major updates to my professional career.
        </p>
      </div>

      {/* Timeline */}
      <ExperienceTimeline items={EXPERIENCE} />
    </div>
  );
}
