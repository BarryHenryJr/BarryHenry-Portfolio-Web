import { Radar } from "lucide-react";

type TechItem = {
  name: string;
  quadrant: 'techniques' | 'tools' | 'platforms' | 'languages';
  ring: 'adopt' | 'trial' | 'assess' | 'hold';
  x: number; // percentage from center (0-100)
  y: number; // percentage from center (0-100)
};

const techItems: TechItem[] = [
  // Languages & Frameworks (Top-Right)
  { name: 'TypeScript', quadrant: 'languages', ring: 'adopt', x: 65, y: -35 },
  { name: 'React', quadrant: 'languages', ring: 'adopt', x: 75, y: -25 },
  { name: 'Next.js', quadrant: 'languages', ring: 'trial', x: 45, y: -45 },

  // Platforms (Top-Left)
  { name: 'Vercel', quadrant: 'platforms', ring: 'adopt', x: -60, y: -40 },
  { name: 'Node.js', quadrant: 'platforms', ring: 'adopt', x: -70, y: -30 },

  // Tools (Bottom-Left)
  { name: 'Tailwind', quadrant: 'tools', ring: 'adopt', x: -55, y: 55 },
  { name: 'Git', quadrant: 'tools', ring: 'adopt', x: -65, y: 45 },

  // Techniques (Bottom-Right)
  { name: 'Type Safety', quadrant: 'techniques', ring: 'adopt', x: 70, y: 40 },
  { name: 'SSR', quadrant: 'techniques', ring: 'trial', x: 50, y: 60 },
];

const getRingColor = (ring: TechItem['ring']) => {
  switch (ring) {
    case 'adopt': return 'hsl(var(--chart-1))';
    case 'trial': return 'hsl(var(--chart-2))';
    case 'assess': return 'hsl(var(--chart-3))';
    case 'hold': return 'hsl(var(--chart-4))';
  }
};

const getRingRadius = (ring: TechItem['ring']) => {
  switch (ring) {
    case 'adopt': return 25;
    case 'trial': return 50;
    case 'assess': return 75;
    case 'hold': return 90;
  }
};

export function TechRadar() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Radar className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-card-foreground">Technology Radar</h3>
      </div>

      <div className="relative w-full aspect-square max-w-md mx-auto">
        {/* Radar Grid */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(51, 65, 85, 0.3))' }}
          role="img"
          aria-label="Technology radar visualization showing technology adoption status across languages, platforms, tools, and techniques categories"
        >
          <title>Technology Radar: Interactive visualization of technology adoption across languages, platforms, tools, and techniques</title>
          {/* Background */}
          <rect width="200" height="200" fill="transparent" />

          {/* Concentric rings */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />

          {/* Quadrant lines */}
          <line x1="100" y1="10" x2="100" y2="190" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />

          {/* Ring labels */}
          <text x="100" y="35" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontWeight="500">ADOPT</text>
          <text x="100" y="60" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontWeight="500">TRIAL</text>
          <text x="100" y="85" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontWeight="500">ASSESS</text>
          <text x="100" y="105" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12" fontWeight="500">HOLD</text>

          {/* Quadrant labels */}
          <text x="150" y="45" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">LANGUAGES</text>
          <text x="50" y="45" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">PLATFORMS</text>
          <text x="50" y="155" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">TOOLS</text>
          <text x="150" y="155" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">TECHNIQUES</text>

          {/* Technology items */}
          {techItems.map((item) => {
            const radius = getRingRadius(item.ring);
            const angle = Math.atan2(item.y, item.x);
            const distance = Math.sqrt(item.x * item.x + item.y * item.y);
            const normalizedDistance = Math.min(distance / 90, 1) * radius;
            const x = 100 + Math.cos(angle) * normalizedDistance;
            const y = 100 + Math.sin(angle) * normalizedDistance;

            const ringLabel = item.ring.charAt(0).toUpperCase() + item.ring.slice(1);
            const ariaLabel = `${item.name}: ${ringLabel} - ${item.quadrant.charAt(0).toUpperCase() + item.quadrant.slice(1)} quadrant`;

            return (
              <g key={item.name}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={getRingColor(item.ring)}
                  style={{ filter: `drop-shadow(0 0 4px ${getRingColor(item.ring)})` }}
                  tabIndex={0}
                  role="img"
                  aria-label={ariaLabel}
                  title={`${item.name} (${ringLabel})`}
                />
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="12"
                  fontWeight="500"
                  style={{ pointerEvents: 'none' }}
                >
                  {item.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-400"></div>
            <span className="text-muted-foreground">Adopt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-400"></div>
            <span className="text-muted-foreground">Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-400"></div>
            <span className="text-muted-foreground">Assess</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-400"></div>
            <span className="text-muted-foreground">Hold</span>
          </div>
        </div>
      </div>
    </div>
  );
}
