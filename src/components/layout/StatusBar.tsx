"use client";

import { useState, useEffect } from "react";
import { PROFILE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const [hawaiiTime, setHawaiiTime] = useState<string>("");

  useEffect(() => {
    // Barry's local time, so visitors on the mainland know when to expect a reply
    const updateTime = () => {
      setHawaiiTime(new Date().toLocaleTimeString("en-US", {
        timeZone: PROFILE.timeZone,
        hour: "numeric",
        minute: "2-digit",
      }));
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 30_000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer className={cn("fixed bottom-0 left-64 right-0 z-40 hidden h-10 bg-background border-t border-border md:block print:hidden", className)}>
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></div>
          <span className="text-sm text-muted-foreground">Status: {PROFILE.availability}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>{PROFILE.location}:</span>
          <span className="font-mono text-foreground">{hawaiiTime || "--:--"}</span>
          <span>HST</span>
        </div>
      </div>
    </footer>
  );
}
