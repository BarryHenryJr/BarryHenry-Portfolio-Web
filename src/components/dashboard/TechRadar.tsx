"use client";

import { useState, useRef, useEffect } from "react";
import { Radar } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Types ---
type Quadrant = 'techniques' | 'tools' | 'platforms' | 'languages';
type Ring = 'adopt' | 'trial' | 'assess' | 'hold';

type TechItem = {
  id: string;
  name: string;
  quadrant: Quadrant;
  ring: Ring;
  x: number; // percentage coordinates (-100 to 100)
  y: number;
  description?: string;
};

// --- Data Configuration ---
// Note: Coordinates are manually tuned to avoid overlap in the static view
const TECH_ITEMS: TechItem[] = [
  // Languages (Top-Right)
  { id: 'ts', name: 'TypeScript', quadrant: 'languages', ring: 'adopt', x: 40, y: -40, description: "Primary language for all new projects." },
  { id: 'react', name: 'React', quadrant: 'languages', ring: 'adopt', x: 70, y: -20, description: "Standard UI library." },
  { id: 'next', name: 'Next.js', quadrant: 'languages', ring: 'adopt', x: 25, y: -60, description: "App Router framework of choice." },

  // Platforms (Top-Left)
  { id: 'vercel', name: 'Vercel', quadrant: 'platforms', ring: 'adopt', x: -30, y: -50, description: "Preferred deployment target." },
  { id: 'nodejs', name: 'Node.js', quadrant: 'platforms', ring: 'adopt', x: -65, y: -25, description: "Backend runtime environment." },

  // Tools (Bottom-Left)
  { id: 'tailwind', name: 'Tailwind', quadrant: 'tools', ring: 'adopt', x: -35, y: 35, description: "Utility-first styling." },
  { id: 'git', name: 'Git', quadrant: 'tools', ring: 'adopt', x: -60, y: 60, description: "Version control standard." },

  // Techniques (Bottom-Right)
  { id: 'zod', name: 'Zod', quadrant: 'techniques', ring: 'adopt', x: 30, y: 40, description: "Schema validation everywhere." },
  { id: 'rsc', name: 'RSC', quadrant: 'techniques', ring: 'trial', x: 60, y: 70, description: "React Server Components." },
];

// --- Visual Helpers ---
const RINGS = [
  { key: 'adopt' as const, radius: 30, color: 'var(--chart-1)', label: 'Adopt' },
  { key: 'trial' as const, radius: 55, color: 'var(--chart-2)', label: 'Trial' },
  { key: 'assess' as const, radius: 80, color: 'var(--chart-3)', label: 'Assess' },
  { key: 'hold' as const, radius: 100, color: 'var(--chart-4)', label: 'Hold' },
] as const;

export function TechRadar() {
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Helper to map radar coordinates to SVG pixels
  // Center is 150,150 in a 300x300 viewBox
  const mapToSvg = (x: number, y: number) => ({
    cx: 150 + (x * 1.2), // 1.2 scale factor to spread them out
    cy: 150 + (y * 1.2)
  });

  // Handle outside clicks to close active item
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveItem(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const shownItem = hoveredItem ?? activeItem;

  return (
    <Card className="h-full flex flex-col overflow-visible">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Tech Radar</CardTitle>
          </div>
          {/* Legend/Key */}
          <div className="flex gap-2 text-[10px]">
            {RINGS.map(ring => (
              <div key={ring.key} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ring.color }}
                />
                <span className="text-muted-foreground uppercase">{ring.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex items-center justify-center p-6 relative min-h-[350px]" ref={containerRef}>
        {/* Interactive Tooltip Overlay */}
        <AnimatePresence>
          {shownItem && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute z-20 top-4 left-4 right-4 pointer-events-none"
            >
              <div className="bg-popover/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-popover-foreground">{shownItem.name}</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 uppercase">
                      {shownItem.quadrant}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{shownItem.description}</p>
                </div>
                <Badge
                  className="capitalize"
                  style={{
                    backgroundColor: RINGS.find(r => r.key === shownItem.ring)?.color,
                    color: 'white'
                  }}
                >
                  {shownItem.ring}
                </Badge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Radar SVG */}
        <svg viewBox="0 0 300 300" className="w-full h-full max-w-[350px]">
          <title>Technology Radar: Interactive visualization of technology adoption across languages, platforms, tools, and techniques</title>

          {/* 1. Concentric Rings (Background) */}
          <g className="opacity-20 dark:opacity-30">
            {RINGS.map((ring) => (
              <circle
                key={ring.key}
                cx="150"
                cy="150"
                r={ring.radius * 1.4} // Scale visual radius
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-muted-foreground"
                strokeDasharray="4 4"
              />
            ))}
          </g>

          {/* 2. Quadrant Dividers */}
          <g className="text-border opacity-50">
            <line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* 3. Quadrant Labels */}
          <g className="text-[10px] font-mono font-semibold fill-muted-foreground uppercase tracking-wider opacity-60">
            <text x="280" y="140" textAnchor="end">Languages</text>
            <text x="20" y="140" textAnchor="start">Platforms</text>
            <text x="20" y="170" textAnchor="start">Tools</text>
            <text x="280" y="170" textAnchor="end">Techniques</text>
          </g>

          {/* 4. Tech Blips (Interactive) */}
          {TECH_ITEMS.map((item) => {
            const { cx, cy } = mapToSvg(item.x, item.y);
            const ringColor = RINGS.find(r => r.key === item.ring)?.color;
            const isHovered = hoveredItem?.id === item.id;
            const isActive = activeItem?.id === item.id;
            const isDimmed = shownItem && !isHovered && !isActive;

            return (
              <motion.g
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                animate={shouldReduceMotion ? { opacity: isDimmed ? 0.3 : 1 } : {
                  opacity: isDimmed ? 0.3 : 1,
                  scale: isHovered || isActive ? 1.2 : 1,
                  y: shouldReduceMotion ? 0 : (isHovered || isActive ? -2 : 0)
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3, ease: "easeOut" },
                  y: { duration: 0.3, ease: "easeOut" }
                }}
                onPointerEnter={() => setHoveredItem(item)}
                onPointerLeave={() => setHoveredItem(null)}
                onClick={() => setActiveItem(activeItem?.id === item.id ? null : item)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${item.name}: ${item.description || item.ring} adoption level`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveItem(activeItem?.id === item.id ? null : item);
                  }
                }}
              >
                {/* Ping Animation for Adopted Tech */}
                {item.ring === 'adopt' && !shouldReduceMotion && (
                  <circle cx={cx} cy={cy} r="8">
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.3"
                      to="0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Main Blip */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isHovered || isActive ? 6 : 4}
                  fill={ringColor}
                  stroke="var(--background)"
                  strokeWidth="2"
                  animate={{
                    scale: isHovered || isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />

                {/* Label (Dimmed by default) */}
                <motion.text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  className={`text-[8px] font-medium fill-foreground ${
                    isHovered || isActive ? 'font-bold text-[10px] fill-primary' : 'opacity-40'
                  }`}
                  style={{ textShadow: '0 1px 4px rgb(0 0 0 / 0.5)' }}
                  animate={{
                    opacity: isHovered || isActive ? 1 : 0.4,
                    scale: isHovered || isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {item.name}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}
