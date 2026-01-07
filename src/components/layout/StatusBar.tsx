"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(0);

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    };

    // Simulate render latency (realistic range: 1-5ms)
    const updateLatency = () => {
      setLatency(Math.floor(Math.random() * 5) + 1);
    };

    updateTime();
    updateLatency();

    const timeInterval = setInterval(updateTime, 1000);
    const latencyInterval = setInterval(updateLatency, 2000); // Update latency less frequently

    return () => {
      clearInterval(timeInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <footer className={cn("fixed bottom-0 left-64 right-0 z-40 h-10 bg-background border-t border-border", className)}>
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - System Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">System Status: Operational</span>
          </div>
        </div>

        {/* Right side - Time and Latency */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Local Time:</span>
            <span className="font-mono text-foreground">{currentTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Render Latency:</span>
            <span className="font-mono text-foreground">{latency}ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
