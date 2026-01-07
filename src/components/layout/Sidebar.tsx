"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS, type NavigationItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("fixed left-0 top-0 z-50 h-full w-64 bg-background border-r border-border", className)}>
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-semibold text-foreground">Portfolio</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {NAVIGATION_ITEMS.map((item: NavigationItem) => {
            const Icon = item.icon as LucideIcon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
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

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="text-xs text-muted-foreground">
            v1.0.0
          </div>
        </div>
      </div>
    </aside>
  );
}
