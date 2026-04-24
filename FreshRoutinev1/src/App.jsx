import './App.css'
import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import TodoPanel from './components/TodoPanel'
import CalendarPanel from './components/CalendarPanel'
import PomodoroPanel from './components/PomodoroPanel'
import DayAgendaCard from './components/DayAgendaCard'

function App() {
  // `useState` initializes `selectedDate` to the current date and time upon component mount.
  // Passing a callback `() => new Date()` ensures that `new Date()` is only evaluated once during the initial render layer, improving performance.
  const [selectedDate, setSelectedDate] = useState(() => new Date())

  // `useMemo` caches the `dayTasks` array so it is only recalculated when `selectedDate` changes.
  // This prevents unnecessary re-creations (and potentially re-renders of child components) on every App render.
  const dayTasks = useMemo(() => {
    const y = selectedDate.getFullYear()
    const m = selectedDate.getMonth()
    const d = selectedDate.getDate()

    return [
      { id: 1, title: 'Skin Care and bath', start: new Date(y, m, d, 8, 0), end: new Date(y, m, d, 8, 45), color: 'green' },
      { id: 2, title: 'Eat breakfast', start: new Date(y, m, d, 9, 0), end: new Date(y, m, d, 9, 30), color: 'blue' },
      { id: 3, title: 'Go to work', start: new Date(y, m, d, 10, 0), end: new Date(y, m, d, 18, 0), color: 'yellow' },
    ]
  }, [selectedDate])

  return (
    <div className="h-screen bg-[#dedede] p-2 flex flex-col gap-4">
      <Navbar />
      <div className="grid flex-1 min-h-0 gap-4 grid-cols-[350px_1fr_380px]">

        <TodoPanel />

        <div className="grid min-h-0 gap-4 grid-rows-[auto_1fr]">
          {/* CalendarPanel and DayAgendaCard share the `selectedDate` state. 
              This is called "lifting state up", ensuring sibling components stay perfectly in sync. */}
          <CalendarPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <DayAgendaCard date={selectedDate} tasks={dayTasks} />
        </div>

        <PomodoroPanel />
      </div>
    </div>
  )
}

export default App
