import { useMemo } from 'react'
import Card from './Card'

export default function AnalyticsPanel() {
  // Read actual tasks from localStorage to display real stats!
  const todoStats = useMemo(() => {
    try {
      const savedTasks = localStorage.getItem('todoTasks')
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks)
        const total = tasks.length
        const completed = tasks.filter(t => t.completed).length
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0
        return { total, completed, rate }
      }
    } catch (e) {
      console.error('Failed to parse todo tasks for analytics', e)
    }
    return { total: 0, completed: 0, rate: 0 }
  }, [])

  // Read focus sessions or use high-quality defaults
  const focusStats = useMemo(() => {
    try {
      const savedFocus = localStorage.getItem('freshroute-focus-stats')
      if (savedFocus) {
        return JSON.parse(savedFocus)
      }
    } catch (e) {
      // Ignore
    }
    // High-quality starter stats
    return {
      totalHours: 2.5,
      completedSessions: 6,
      weeklyData: [
        { day: 'Mon', hours: 1.5 },
        { day: 'Tue', hours: 2.0 },
        { day: 'Wed', hours: 1.0 },
        { day: 'Thu', hours: 2.5 },
        { day: 'Fri', hours: 3.0 },
        { day: 'Sat', hours: 0.5 },
        { day: 'Sun', hours: 1.2 },
      ]
    }
  }, [])

  // Calculate circular progress path values
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (todoStats.rate / 100) * circumference

  return (
    <Card
      eyebrow="Analytics"
      title="Productivity Insights"
      description="Understand your daily routines and focus trends."
      variant="light"
      accentClassName="text-indigo-600"
      className="relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col gap-5 h-full min-h-0">
        
        {/* Core KPI Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200/60 bg-white/60 p-3 shadow-sm dark:border-slate-700/60 dark:bg-slate-950/40">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Focus Time</p>
            <p className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-50">{focusStats.totalHours}h</p>
          </div>
          <div className="rounded-xl border border-slate-200/60 bg-white/60 p-3 shadow-sm dark:border-slate-700/60 dark:bg-slate-950/40">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Tasks Completed</p>
            <p className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-50">
              {todoStats.completed}/{todoStats.total}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/60 bg-white/60 p-3 shadow-sm dark:border-slate-700/60 dark:bg-slate-950/40">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Sessions</p>
            <p className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-50">{focusStats.completedSessions}</p>
          </div>
        </div>

        {/* Circular Progress & Routine consistency */}
        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-slate-200/60 bg-white/60 p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-950/40">
          <div className="relative flex items-center justify-center w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-indigo-500 transition-all duration-500"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-sm font-bold text-slate-800 dark:text-slate-100">{todoStats.rate}%</span>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-200">Routine Consistency</h4>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {todoStats.total === 0 
                ? "No tasks active today. Create some priorities in your Todo Panel to track consistency!" 
                : `You've checked off ${todoStats.completed} out of ${todoStats.total} priorities for today. Keep it up!`}
            </p>
          </div>
        </div>

        {/* Focus Hours Bar Chart */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-950/40 flex-1 min-h-0 justify-center">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-200">Weekly Focus Hours</h4>
          
          <div className="flex items-end justify-between gap-2 h-28 pt-2">
            {focusStats.weeklyData.map((d, index) => {
              const maxHours = Math.max(...focusStats.weeklyData.map(w => w.hours), 1)
              const percentage = (d.hours / maxHours) * 100
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -translate-y-8 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow dark:bg-slate-800">
                    {d.hours}h
                  </div>
                  
                  {/* Bar wrapper */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-md h-20 flex items-end overflow-hidden">
                    <div 
                      style={{ height: `${percentage}%` }} 
                      className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-md group-hover:from-indigo-600 group-hover:to-indigo-500 transition-all duration-300"
                    />
                  </div>
                  <span className="mt-1.5 text-[9px] font-semibold text-slate-400 dark:text-slate-500">{d.day}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </Card>
  )
}
