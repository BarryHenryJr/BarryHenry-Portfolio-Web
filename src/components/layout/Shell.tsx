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
    <div className={cn("min-h-screen bg-slate-950", className)}>
      {/* Sidebar - Fixed left */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-64 mb-10 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Status Bar - Fixed bottom */}
      <StatusBar />
    </div>
  );
}
