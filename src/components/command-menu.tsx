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

const GITHUB_URL = "https://github.com/TODO";
const LINKEDIN_URL = "https://www.linkedin.com/in/TODO";
const EMAIL = "todo@example.com";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

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
    await navigator.clipboard.writeText(EMAIL);
  }

  function toggleThemePlaceholder() {
    setOpen(false);
    console.log("TODO: Toggle theme");
  }

  return (
    <AnimatePresence>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
        >
          <Command className="bg-slate-950">
            <CommandInput placeholder="Search pages and actions…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Pages">
                {NAVIGATION_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem key={item.id} onSelect={() => goToPage(item)}>
                      <Icon className="h-4 w-4 text-slate-500" />
                      <span className="flex-1">{item.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-600" />
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Social">
                <CommandItem onSelect={() => openExternal(GITHUB_URL)}>
                  <Github className="h-4 w-4 text-slate-500" />
                  <span className="flex-1">GitHub</span>
                  <CommandShortcut>↗</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => openExternal(LINKEDIN_URL)}>
                  <Linkedin className="h-4 w-4 text-slate-500" />
                  <span className="flex-1">LinkedIn</span>
                  <CommandShortcut>↗</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="General">
                <CommandItem onSelect={() => void copyEmail()}>
                  <Copy className="h-4 w-4 text-slate-500" />
                  <span className="flex-1">Copy Email</span>
                </CommandItem>
                <CommandItem onSelect={toggleThemePlaceholder}>
                  <SunMoon className="h-4 w-4 text-slate-500" />
                  <span className="flex-1">Toggle Theme</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>

            <div className="flex items-center justify-between border-t border-slate-800 px-4 py-2 text-xs text-slate-500">
              <span>Tip: Press Esc to close</span>
              <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1">⌘K / CtrlK</span>
            </div>
          </Command>
        </motion.div>
      </CommandDialog>
    </AnimatePresence>
  );
}
