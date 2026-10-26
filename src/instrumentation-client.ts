import posthog from "posthog-js";

// Visitor analytics (PostHog). Disabled unless NEXT_PUBLIC_POSTHOG_KEY is set at build time,
// so local dev and forks send nothing.
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey != null && posthogKey !== "") {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    // Captures pageviews on client-side navigation as well as full loads
    defaults: "2025-05-24",
    person_profiles: "identified_only",
  });
}
