"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExperienceItem } from "@/lib/constants";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

// Animation variants - defined outside component to prevent recreation on every render
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-8 pb-10"
    >
      {/* Vertical timeline line - positioned at 32px from left on mobile, 48px on desktop */}
      <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="relative pl-8 md:pl-12"
        >
          {/* Commit node (dot) - centered on the timeline line */}
          <div className="absolute -left-1 top-6 h-3 w-3 rounded-full bg-muted-foreground ring-4 ring-background z-10" aria-hidden="true" />

          <Card className="bg-card text-card-foreground">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary" className="font-mono text-xs">
                  {item.version}
                </Badge>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{item.company}</h3>
                  <p className="font-semibold text-muted-foreground">{item.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{item.period}</p>
            </CardHeader>

            <CardContent className="pb-4">
              <ul className="list-disc list-inside space-y-1">
                {item.description.map((desc, descIndex) => (
                  <li key={`${item.id}-desc-${descIndex}`} className="text-sm text-muted-foreground">
                    {desc}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4">
              <div className="flex flex-wrap gap-1">
                {item.tech.map((tech, index) => (
                  <Badge key={`${tech}-${index}`} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
