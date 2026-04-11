import './App.css'
import TodoPanel from './components/TodoPanel'
import CalendarPanel from './components/CalendarPanel'
import PomodoroPanel from './components/PomodoroPanel'

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f13] p-4 flex flex-col gap-4">
      <header className="h-14 rounded-2xl border-b border-white/10 bg-amber-50 px-4 flex items-center justify-between">
        <div className="font-semibold tracking-wide bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          FreshRoutine
        </div>
        <div className="text-sm text-white/70">April 5, 2026</div>
      </header>
      <div className="grid flex-1 min-h-0 gap-4 grid-cols-[350px_1fr_380px]">
        <TodoPanel />
        <CalendarPanel />
        <PomodoroPanel />
      </div>
    </div>
  )
}

export default App
