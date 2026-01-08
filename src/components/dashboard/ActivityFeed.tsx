import { useMemo } from "react";
import { Activity, AlertCircle, GitCommit, Rocket } from "lucide-react";

import { PROJECTS } from "@/lib/constants";

type EventType = "code" | "deploy" | "system";

type Event = {
  id: string;
  type: EventType;
  title: string;
  detail?: string;
  /** Age in milliseconds (how long ago the event occurred) */
  ageMs: number;
};

function formatRelativeAge(ageMs: number): string {
  if (ageMs < 0) return "0ms";
  if (ageMs < 1000) return "just now";

  const seconds = Math.floor(ageMs / 1000);
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const EVENT_META: Record<
  EventType,
  {
    Icon: typeof GitCommit;
    iconLabel: string;
    iconClassName: string;
    nodeClassName: string;
  }
> = {
  code: {
    Icon: GitCommit,
    iconLabel: "Code event",
    iconClassName: "text-emerald-500",
    nodeClassName: "border-emerald-500/30 bg-emerald-500/10",
  },
  deploy: {
    Icon: Rocket,
    iconLabel: "Deployment event",
    iconClassName: "text-sky-500",
    nodeClassName: "border-sky-500/30 bg-sky-500/10",
  },
  system: {
    Icon: AlertCircle,
    iconLabel: "System event",
    iconClassName: "text-amber-500",
    nodeClassName: "border-amber-500/30 bg-amber-500/10",
  },
};

export function ActivityFeed() {
  const events: Event[] = useMemo(() => {
    const deployEvents: Event[] = PROJECTS.filter(
      (p) => p.status !== "archived"
    ).map((project, index) => {
      // Deployments are spaced 1 hour apart, starting 2 hours ago
      // First project: 2 hours ago, second: 3 hours ago, etc.
      const ageMs = (index + 2) * 60 * 60 * 1000;

      return {
        id: `deploy-${project.id}`,
        type: "deploy",
        title: `Deployed ${project.title}`,
        detail: `Status: ${project.status}`,
        ageMs,
      };
    });

    const activityEvents: Event[] = [
      {
        id: "commit-1",
        type: "code",
        title: "feat(dashboard): add System Events feed",
        detail: "commit 7f3a2c1",
        ageMs: 12 * 60 * 1000,
      },
      {
        id: "system-1",
        type: "system",
        title: "Rate limit thresholds optimized",
        detail: "redis-backed limiter tuned",
        ageMs: 14 * 60 * 1000,
      },
      {
        id: "commit-2",
        type: "code",
        title: "fix(api): harden client IP detection",
        detail: "commit b91d8e0",
        ageMs: 46 * 60 * 1000,
      },
      {
        id: "system-2",
        type: "system",
        title: "Cache purged",
        detail: "stale artifacts removed",
        ageMs: 6 * 60 * 60 * 1000,
      },
    ];

    return [...deployEvents, ...activityEvents].sort(
      (a, b) => a.ageMs - b.ageMs
    );
  }, []); // PROJECTS is a constant, so no dependencies needed

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-card-foreground">
            System Events
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">git log</span>
      </div>

      <ul className="space-y-0" aria-label="System events feed">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          const meta = EVENT_META[event.type];

          return (
            <li key={event.id} className="relative pl-10 pb-4 last:pb-0">
              {!isLast && (
                <div
                  className="absolute left-3 top-7 bottom-0 w-px bg-border"
                  aria-hidden="true"
                />
              )}

              <div
                className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border ${meta.nodeClassName}`}
                aria-label={meta.iconLabel}
              >
                <meta.Icon className={`h-3.5 w-3.5 ${meta.iconClassName}`} />
              </div>

              <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-card-foreground">
                    {event.title}
                  </p>
                  <span className="shrink-0 text-xs font-mono text-muted-foreground">
                    {formatRelativeAge(event.ageMs)}
                  </span>
                </div>
                {event.detail && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.detail}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
