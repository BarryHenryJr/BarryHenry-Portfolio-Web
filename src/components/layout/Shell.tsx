import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { cn } from "@/lib/utils";

interface ShellProps {
  children: ReactNode;
  className?: string;
}

export function Shell({ children, className }: ShellProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Sidebar - fixed left on desktop, top bar + drawer on mobile */}
      <Sidebar />

      {/* Main Content Area - offset for the mobile top bar (h-14) or the desktop sidebar (w-64) */}
      <main className="pt-14 md:pt-0 md:ml-64 mb-10 min-h-screen min-w-0 print:m-0 print:p-0">
        <div className="p-4 sm:p-6 print:p-0">
          {children}
        </div>
      </main>

      {/* Status Bar - Fixed bottom on desktop */}
      <StatusBar />
    </div>
  );
}
