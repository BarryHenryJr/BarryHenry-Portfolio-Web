import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TechRadar } from "@/components/dashboard/TechRadar";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your personal portfolio dashboard. Monitor your projects, skills, and professional activity.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>

        {/* Technology Radar */}
        <div className="lg:col-span-1">
          <TechRadar />
        </div>
      </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
              <p className="text-2xl font-bold text-card-foreground">12</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">12</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Skills Mastered</p>
              <p className="text-2xl font-bold text-card-foreground">28</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400 font-semibold">28</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Years Experience</p>
              <p className="text-2xl font-bold text-card-foreground">5+</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <span className="text-indigo-400 font-semibold">5+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
