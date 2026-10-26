import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Shell } from "@/components/layout/Shell";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { PROFILE } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${PROFILE.name} · ${PROFILE.headline}`,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.summary,
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
