import { Radar } from "lucide-react";

export function TechRadar() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Radar className="h-5 w-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-100">Technology Radar</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-md bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">React</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Adopt</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
            </div>
          </div>

          <div className="p-3 rounded-md bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">TypeScript</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Adopt</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-5/6"></div>
            </div>
          </div>

          <div className="p-3 rounded-md bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">Trial</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
            </div>
          </div>

          <div className="p-3 rounded-md bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Tailwind</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Adopt</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
