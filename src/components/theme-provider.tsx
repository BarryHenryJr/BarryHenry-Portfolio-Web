"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// This is a wrapper component to ensure type safety and proper client-side rendering
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
