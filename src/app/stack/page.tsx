import React from "react";
import { STACK, StackCategory, StackItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StackGrid } from "./components/StackGrid";

// Define category order for consistent rendering
const CATEGORY_ORDER: StackCategory[] = ["Languages", "Frontend", "Backend", "Infrastructure", "Integrations", "Banking & Security"];

// Pre-compute grouped stack data at module level since STACK and CATEGORY_ORDER are constants
const groupedStack = STACK.reduce<Partial<Record<StackCategory, StackItem[]>>>((acc, item) => {
  (acc[item.category] = acc[item.category] || []).push(item);
  return acc;
}, {});

const stackGroups = CATEGORY_ORDER
  .filter(category => groupedStack[category] && groupedStack[category]!.length > 0)
  .map(category => ({
    category,
    items: groupedStack[category]!
  }));

export default function StackPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Stack</h1>
        <p className="text-muted-foreground">
          Every tool here is backed by a role or project. The badge shows whether I used it at work, in my own projects, or both.
        </p>
      </div>

      {/* Stack Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>System Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <StackGrid groups={stackGroups} />
        </CardContent>
      </Card>
    </div>
  );
}
