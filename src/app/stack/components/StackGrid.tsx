"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  FileCode,
  Atom,
  Palette,
  Server,
  Database,
  Cloud,
  Container,
  PenTool,
  Image,
  GitBranch,
  Code,
  Send,
  Package
} from "lucide-react";
import { StackItem, StackCategory } from "@/lib/constants";

// Type-safe mapping of valid stack icon names to components
const STACK_ICONS = {
  Layers,
  FileCode,
  Atom,
  Palette,
  Server,
  Database,
  Cloud,
  Container,
  PenTool,
  Image,
  GitBranch,
  Code,
  Send,
} as const;

interface StackGroup {
  category: StackCategory;
  items: StackItem[];
}

interface StackGridProps {
  groups: StackGroup[];
}

// Animation variants - defined outside component to prevent recreation on every render
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function getBadgeVariant(proficiency: StackItem['proficiency']) {
  switch (proficiency) {
    case 'Expert':
      return 'default';
    case 'Advanced':
      return 'secondary';
    case 'Intermediate':
      return 'outline';
    default:
      return 'outline';
  }
}

interface StackCardProps {
  item: StackItem;
}

function StackCard({ item }: StackCardProps) {
  // Type-safe icon lookup with fallback
  const IconComponent = STACK_ICONS[item.icon as keyof typeof STACK_ICONS] || Package;

  return (
    <Card className="p-4 h-full">
      <CardContent className="p-0 flex flex-col gap-3">
        {/* Row 1: Icon + Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <IconComponent className="h-4 w-4 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-sm">{item.name}</h3>
        </div>

        {/* Row 2: Proficiency Badge */}
        <Badge variant={getBadgeVariant(item.proficiency)} className="w-fit">
          {item.proficiency}
        </Badge>

        {/* Row 3: Tiny description */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}

export function StackGrid({ groups }: StackGridProps) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.category} className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">{group.category}</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {group.items.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <StackCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
