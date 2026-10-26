"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAVIGATION_ITEMS, PROFILE, type NavigationItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarProps {
  className?: string;
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1 p-4" aria-label="Main">
      {NAVIGATION_ITEMS.map((item: NavigationItem) => {
        const Icon = item.icon as LucideIcon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-accent-foreground border border-accent"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/" className="min-w-0">
      <p className="text-base font-semibold text-foreground leading-tight">{PROFILE.name}</p>
      <p className="text-xs text-muted-foreground truncate">{PROFILE.headline}</p>
    </Link>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the drawer with Escape so keyboard users are never trapped behind it
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4 md:hidden print:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 md:hidden print:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div id="mobile-nav" className="relative border-b border-border bg-background">
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn("fixed left-0 top-0 z-50 hidden h-full w-64 bg-background border-r border-border md:block print:hidden", className)}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border px-6">
            <Brand />
          </div>

          <NavLinks pathname={pathname} />

          <div className="border-t border-border p-4">
            <div className="text-xs text-muted-foreground">
              Press <kbd className="rounded border border-border px-1 font-mono">⌘K</kbd> to search
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
