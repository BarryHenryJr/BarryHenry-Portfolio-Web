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
  x: number; // coordinates (x: -65 to 70, y: -60 to 70) for optimal visual distribution
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
/**
 * Ring configuration with CSS custom properties for chart colors.
 * Requires theme definition of --chart-1 through --chart-4 variables.
 * Falls back to semantic colors if variables are undefined.
 */
const RINGS = [
  { key: 'adopt' as const, radius: 30, color: 'var(--chart-1, hsl(221.2 83.2% 53.3%))', label: 'Adopt' },
  { key: 'trial' as const, radius: 55, color: 'var(--chart-2, hsl(142.1 76.2% 36.3%))', label: 'Trial' },
  { key: 'assess' as const, radius: 80, color: 'var(--chart-3, hsl(47.9 95.8% 53.1%))', label: 'Assess' },
  { key: 'hold' as const, radius: 100, color: 'var(--chart-4, hsl(0 84.2% 60.2%))', label: 'Hold' },
] as const;

// Lookup map for rings to avoid repeated array searches
const RINGS_MAP = Object.fromEntries(RINGS.map(r => [r.key, r])) as Record<Ring, typeof RINGS[number]>;

// SVG Layout Constants
const VIEW_BOX_SIZE = 300;
const CENTER = VIEW_BOX_SIZE / 2;
const SCALE_FACTOR = 1.4; // Unified scale factor for both rings and item positioning
const QUADRANT_PADDING = 10;
const LABEL_PADDING = 20;
const BOTTOM_LABEL_OFFSET = 30;

// Helper to map radar coordinates to SVG pixels
const mapToSvg = (x: number, y: number) => ({
  cx: CENTER + (x * SCALE_FACTOR),
  cy: CENTER + (y * SCALE_FACTOR)
});

export function TechRadar() {
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const [focusedItem, setFocusedItem] = useState<TechItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle outside clicks to close active item
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && activeItem) {
        setActiveItem(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeItem]);

  // Prioritizes hovered items over active items for tooltip display
  const tooltipItem = hoveredItem ?? activeItem;

  // Determine tooltip position based on item location to avoid overlapping
  // Items with y > 0 are in bottom quadrants (tools/techniques), so position tooltip above
  // Items with y <= 0 are in top quadrants (languages/platforms), so position tooltip below
  const isItemInBottomHalf = tooltipItem ? tooltipItem.y > 0 : false;
  const tooltipPositionClasses = isItemInBottomHalf
    ? "absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md" // Position above radar
    : "absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md"; // Position below radar

  /**
   * Note: This component uses overflow-visible to allow the technology details
   * tooltip panel to extend beyond the card boundaries for better UX. Parent
   * containers should account for ~16px of bottom overflow when this component
   * is used in layouts with strict overflow handling.
   */
  return (
    <Card className="h-full flex flex-col overflow-visible">
      {/* overflow-visible required for tooltip panel that extends below card boundaries */}
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

      <CardContent className="flex-1 flex items-center justify-center relative min-h-[350px]" ref={containerRef}>
        {/* Radar SVG */}
        <svg viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`} className="w-full h-full max-w-[350px]">
          <title>Technology Radar</title>
          <desc>
            Interactive radar chart showing technology adoption levels across four categories: languages, platforms, tools, and techniques.
            Technologies are positioned in concentric rings representing adoption phases from center outward: Adopt, Trial, Assess, Hold.
            Click or tap on technology points to view details, or use keyboard navigation with Tab and Enter keys.
          </desc>

          {/* 1. Concentric Rings (Background) */}
          <g className="opacity-20 dark:opacity-30">
            {RINGS.map((ring) => (
              <circle
                key={ring.key}
                cx={CENTER}
                cy={CENTER}
                r={ring.radius * SCALE_FACTOR}
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
            <line
              x1={CENTER}
              y1={QUADRANT_PADDING}
              x2={CENTER}
              y2={VIEW_BOX_SIZE - QUADRANT_PADDING}
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1={QUADRANT_PADDING}
              y1={CENTER}
              x2={VIEW_BOX_SIZE - QUADRANT_PADDING}
              y2={CENTER}
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>

          {/* 3. Quadrant Labels */}
          <g className="text-[10px] font-mono font-semibold fill-muted-foreground uppercase tracking-wider opacity-60">
            <text x={VIEW_BOX_SIZE - LABEL_PADDING} y={CENTER - BOTTOM_LABEL_OFFSET} textAnchor="end">Languages</text>
            <text x={LABEL_PADDING} y={CENTER - BOTTOM_LABEL_OFFSET} textAnchor="start">Platforms</text>
            <text x={LABEL_PADDING} y={CENTER + BOTTOM_LABEL_OFFSET} textAnchor="start">Tools</text>
            <text x={VIEW_BOX_SIZE - LABEL_PADDING} y={CENTER + BOTTOM_LABEL_OFFSET} textAnchor="end">Techniques</text>
          </g>

          {/* 4. Tech Blips (Interactive) */}
          {TECH_ITEMS.map((item) => {
            const { cx, cy } = mapToSvg(item.x, item.y);
            const ringColor = RINGS_MAP[item.ring]?.color;
            const isHovered = hoveredItem?.id === item.id;
            const isActive = activeItem?.id === item.id;
            const isDimmed = tooltipItem && !isHovered && !isActive;
            const isFocused = focusedItem?.id === item.id;

            return (
              <motion.g
                key={item.id}
                // No initial entrance animation - items appear immediately on mount to avoid jarring entrance effects
                // Only animate on user interactions (hover/active states) for better UX
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
              >
                {/* Invisible focusable area for keyboard navigation */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="10"
                  fill="transparent"
                  stroke="none"
                  onFocus={() => setFocusedItem(item)}
                  onBlur={() => setFocusedItem(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveItem(activeItem?.id === item.id ? null : item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.name}: ${item.description || item.ring} adoption level`}
                />
                {/* Ping Animation for Adopted Tech */}
                {item.ring === 'adopt' && !shouldReduceMotion && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill={ringColor}
                    opacity={0.3}
                    animate={{
                      r: [3, 12, 3],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Main Blip */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill={ringColor}
                  stroke="var(--background)"
                  strokeWidth="2"
                  onPointerEnter={() => setHoveredItem(item)}
                  onPointerLeave={() => setHoveredItem(null)}
                  onClick={() => setActiveItem(activeItem?.id === item.id ? null : item)}
                  className="cursor-pointer"
                />

                {/* Focus Ring */}
                {isFocused && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="none"
                    stroke="var(--ring)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Label (Dimmed by default) */}
                <motion.text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  className="text-[8px] font-medium fill-foreground"
                  style={{
                    // Layered text shadow for readability - using rgba for cross-browser compatibility
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.5)'
                  }}
                  animate={{
                    opacity: isHovered || isActive ? 1 : 0.4,
                    scale: isHovered || isActive ? 1.25 : 1,
                    // Note: fill color animation removed due to CSS variable interpolation issues with Framer Motion
                    // Text color is handled by CSS class 'fill-foreground' for consistent theming
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {item.name}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>

        {/* Technology Details Panel */}
        <AnimatePresence>
          {tooltipItem && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : {
                opacity: 0,
                y: isItemInBottomHalf ? -10 : 10,
                scale: 0.95
              }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : {
                opacity: 0,
                y: isItemInBottomHalf ? -10 : 10,
                scale: 0.95
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={tooltipPositionClasses}
            >
              <div className="bg-popover/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl flex items-center justify-between">
                {/* backdrop-blur provides visual clarity for tooltip readability */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-popover-foreground">{tooltipItem.name}</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 uppercase">
                      {tooltipItem.quadrant}
                    </Badge>
          </div>
                  {tooltipItem.description && (
                    <p className="text-xs text-muted-foreground">{tooltipItem.description}</p>
                  )}
          </div>
                <Badge
                  className="capitalize text-white" // White text for high contrast against dynamic ring colors
                  style={{
                    backgroundColor: RINGS_MAP[tooltipItem.ring]?.color
                  }}
                >
                  {tooltipItem.ring}
                </Badge>
          </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
