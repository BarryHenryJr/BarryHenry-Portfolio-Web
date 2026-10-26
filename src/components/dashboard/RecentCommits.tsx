import { GitCommit, Github } from "lucide-react";

import { getRecentCommits } from "@/lib/github";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Pacific/Honolulu",
  });
}

export async function RecentCommits() {
  const commits = await getRecentCommits();
  // Hide the card rather than show an empty or broken state if GitHub is unreachable
  if (commits.length === 0) return null;

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6" aria-labelledby="recent-commits">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 id="recent-commits" className="text-lg font-semibold text-card-foreground">
            Latest commits
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">Live from my public repos</span>
      </div>

      <ul className="divide-y divide-border">
        {commits.map((commit) => (
          <li key={commit.sha} className="flex items-start gap-3 py-2.5">
            <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-sm font-medium text-card-foreground hover:underline"
              >
                {commit.message}
              </a>
              <p className="text-xs text-muted-foreground">
                {commit.projectTitle} · <span className="font-mono">{commit.sha.slice(0, 7)}</span>
              </p>
            </div>
            <time dateTime={commit.date} className="shrink-0 text-xs font-mono text-muted-foreground">
              {formatDate(commit.date)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
