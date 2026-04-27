import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TodoPanel from './components/TodoPanel'
import CalendarPanel from './components/CalendarPanel'
import PomodoroPanel from './components/PomodoroPanel'
import DayAgendaCard from './components/DayAgendaCard'
import AddEventModal from './components/AddEventModal'

function App() {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 1. Upgrade to useState so we can push new events into it!
  const [allTasks, setAllTasks] = useState(() => {
    const saved = localStorage.getItem('freshroute-tasks')
    if (saved) {
      return JSON.parse(saved).map(t => ({
        ...t,
        start: new Date(t.start),
        end: new Date(t.end)
      }))
    }

    // Start with a completely clean slate if nothing is saved!
    return []
  })

  // 2. Auto-save to localStorage every time 'allTasks' changes
  useEffect(() => {
    localStorage.setItem('freshroute-tasks', JSON.stringify(allTasks))
  }, [allTasks])

  // 3. Filter down to ONLY the tasks for the currently clicked calendar day
  const dayTasks = allTasks.filter((task) => {
    return (
      task.start.getFullYear() === selectedDate.getFullYear() &&
      task.start.getMonth() === selectedDate.getMonth() &&
      task.start.getDate() === selectedDate.getDate()
    )
  })

  // 4. This is the "Elevator" function we pass to the Modal to receive the new event
  const handleSaveNewEvent = (newTask) => {
    setAllTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <div className="h-screen bg-[#dedede] p-2 flex flex-col gap-4">
      <Navbar />
      <div className="grid flex-1 min-h-0 gap-4 grid-cols-[350px_1fr_380px]">

        <TodoPanel />

        <div className="grid min-h-0 gap-4 grid-rows-[auto_1fr]">
          <CalendarPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <DayAgendaCard
            date={selectedDate}
            tasks={dayTasks}
            onAddEvent={() => setIsModalOpen(true)}
          />
        </div>

        <PomodoroPanel />
      </div>

      {/* 5. Render the Modal on top of everything! */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewEvent}
        selectedDate={selectedDate}
      />
    </div>
  )
}

export default App
