import { Activity } from "lucide-react";

export function ActivityFeed() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-100">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-md bg-slate-800/50 border border-slate-700">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <div className="flex-1">
            <p className="text-sm text-slate-300">Portfolio updated</p>
            <p className="text-xs text-slate-500">2 hours ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-slate-800/50 border border-slate-700">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <div className="flex-1">
            <p className="text-sm text-slate-300">New project deployed</p>
            <p className="text-xs text-slate-500">1 day ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-slate-800/50 border border-slate-700">
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="flex-1">
            <p className="text-sm text-slate-300">Skill assessment completed</p>
            <p className="text-xs text-slate-500">3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
