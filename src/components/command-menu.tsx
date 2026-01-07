"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Copy,
  SunMoon,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { NAVIGATION_ITEMS, type NavigationItem } from "@/lib/constants";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useTheme } from "next-themes";

const GITHUB_URL = "https://github.com/barryhenryjr";
const LINKEDIN_URL = "https://linkedin.com/in/barrynhenry";
const EMAIL = "barryhenryjr@gmail.com";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [copyError, setCopyError] = React.useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if (!isK) return;

      const isModifier = e.metaKey || e.ctrlKey;
      if (!isModifier) return;

      e.preventDefault();
      setOpen((prev) => !prev);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function goToPage(item: NavigationItem) {
    setOpen(false);
    router.push(item.href);
  }

  function openExternal(url: string) {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function copyEmail() {
    setOpen(false);

    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch (error) {
      // Determine specific error message based on error type
      const errorMessage = EMAIL;
      let userMessage = "Copy failed";

      if (error instanceof Error) {
        // Log error for debugging (only in development)
        if (process.env.NODE_ENV === 'development') {
          console.error('Clipboard copy failed:', error);
        }

        // Provide specific user feedback based on error type
        if (error.name === 'NotAllowedError') {
          userMessage = "Permission denied - please allow clipboard access";
        } else if (error.name === 'NotSupportedError') {
          userMessage = "Clipboard not supported in this browser";
        } else if (error.name === 'SecurityError') {
          userMessage = "Cannot copy from insecure context";
        } else {
          userMessage = "Copy failed - please copy manually";
        }
      }

      // Show user-friendly error message with specific feedback
      setCopyError(`${userMessage}. Email: ${errorMessage}`);
      setTimeout(() => setCopyError(null), 5000); // Clear after 5 seconds
    }
  }

  function toggleTheme() {
    // Use resolvedTheme to respect system preferences when theme is set to "system"
    const currentResolvedTheme = resolvedTheme || (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(currentResolvedTheme === "dark" ? "light" : "dark");
    setOpen(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} label="Command Palette">
      <AnimatePresence>
        {open && (
          <motion.div
            key="command-menu"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <Command className="bg-popover text-popover-foreground border-border">
              <CommandInput placeholder="Search pages and actions…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Pages">
                  {NAVIGATION_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem key={item.id} onSelect={() => goToPage(item)}>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1">{item.label}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Social">
                  <CommandItem onSelect={() => openExternal(GITHUB_URL)}>
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">GitHub</span>
                    <CommandShortcut>↗</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => openExternal(LINKEDIN_URL)}>
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">LinkedIn</span>
                    <CommandShortcut>↗</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="General">
                  <CommandItem onSelect={copyEmail}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">Copy Email</span>
                  </CommandItem>
                  <CommandItem onSelect={toggleTheme}>
                    <SunMoon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">Toggle Theme</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>

              {copyError && (
                <div className="border-t border-border bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Copy failed. Email: <span className="font-mono text-foreground select-all">{copyError}</span>
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
                <span>Tip: Press Esc to close</span>
                <span className="rounded-md border border-border bg-muted px-2 py-1">⌘K / Ctrl+K</span>
              </div>
            </Command>
          </motion.div>
        )}
      </AnimatePresence>
    </CommandDialog>
  );
}
