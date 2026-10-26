import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Shell } from "@/components/layout/Shell";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { PROFILE, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE = `${PROFILE.name} · ${PROFILE.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.summary,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: PROFILE.name,
    title: DEFAULT_TITLE,
    description: PROFILE.summary,
    firstName: "Barry",
    lastName: "Henry",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: PROFILE.summary,
  },
};

// schema.org Person, so search engines can show a proper result for Barry's name
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.headline,
  url: SITE_URL,
  email: `mailto:${SOCIAL_LINKS.email}`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "HI",
    addressCountry: "US",
  },
  worksFor: { "@type": "Organization", name: "Cook Solutions Group" },
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          // Static, trusted object from constants; escape "<" so it can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Shell>
            {children}
          </Shell>
          <CommandMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
