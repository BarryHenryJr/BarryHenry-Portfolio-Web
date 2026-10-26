import { PROJECTS } from "@/lib/constants";

export interface RecentCommit {
  sha: string;
  repo: string;
  projectTitle: string;
  message: string;
  date: string;
  url: string;
}

interface GitHubCommitResponse {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string } | null;
    committer: { date: string } | null;
  };
}

// Only repos already linked from a project card, so the feed can never expose a private repo
const PUBLIC_REPOS = PROJECTS.flatMap((project) => {
  const match = project.repo?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)$/);
  return match == null ? [] : [{ repo: match[1], projectTitle: project.title }];
});

// Automated version bumps and bare merge commits say nothing about the work itself
const NOISE = /^(chore(\(main\))?: (release|update version badge)|Merge (pull request|branch) )/i;

async function fetchRepoCommits(repo: string, projectTitle: string): Promise<RecentCommit[]> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=30`, {
    headers,
    // Unauthenticated calls allow 60 an hour; one refresh an hour per repo stays well under it
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];

  const commits = (await res.json()) as GitHubCommitResponse[];
  return commits
    .map((item) => ({
      sha: item.sha,
      repo,
      projectTitle,
      message: item.commit.message.split("\n")[0],
      date: item.commit.author?.date ?? item.commit.committer?.date ?? "",
      url: item.html_url,
    }))
    .filter((commit) => commit.date !== "" && !NOISE.test(commit.message));
}

/** Latest commits across Barry's public repos, newest first. Empty if GitHub can't be reached. */
export async function getRecentCommits(limit = 6): Promise<RecentCommit[]> {
  const results = await Promise.allSettled(
    PUBLIC_REPOS.map(({ repo, projectTitle }) => fetchRepoCommits(repo, projectTitle))
  );
  return results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
