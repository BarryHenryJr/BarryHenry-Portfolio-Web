import { Activity } from "lucide-react";

export function ActivityFeed() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <div className="flex-1">
            <p className="text-sm text-card-foreground">Portfolio updated</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <div className="flex-1">
            <p className="text-sm text-card-foreground">New project deployed</p>
            <p className="text-xs text-muted-foreground">1 day ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border">
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="flex-1">
            <p className="text-sm text-card-foreground">Skill assessment completed</p>
            <p className="text-xs text-muted-foreground">3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
