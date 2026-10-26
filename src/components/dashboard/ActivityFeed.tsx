import { Activity, AlertCircle, GitCommit, Rocket } from "lucide-react";

import { MILESTONES, type Milestone } from "@/lib/constants";

type EventType = Milestone["type"];

const EVENT_META: Record<
  EventType,
  {
    Icon: typeof GitCommit;
    iconClassName: string;
    nodeClassName: string;
  }
> = {
  code: {
    Icon: GitCommit,
    iconClassName: "text-emerald-500",
    nodeClassName: "border-emerald-500/30 bg-emerald-500/10",
  },
  deploy: {
    Icon: Rocket,
    iconClassName: "text-sky-500",
    nodeClassName: "border-sky-500/30 bg-sky-500/10",
  },
  system: {
    Icon: AlertCircle,
    iconClassName: "text-amber-500",
    nodeClassName: "border-amber-500/30 bg-amber-500/10",
  },
};

export function ActivityFeed() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-card-foreground">
            Recent Releases
          </h2>
        </div>
        <span className="text-xs font-mono text-muted-foreground">git log</span>
      </div>

      <ul className="space-y-0" aria-label="Recent projects and milestones">
        {MILESTONES.map((event, index) => {
          const isLast = index === MILESTONES.length - 1;
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
                aria-hidden="true"
              >
                <meta.Icon className={`h-3.5 w-3.5 ${meta.iconClassName}`} />
              </div>

              <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-card-foreground">
                    {event.title}
                  </p>
                  <span className="shrink-0 text-xs font-mono text-muted-foreground">
                    {event.date}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {event.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
