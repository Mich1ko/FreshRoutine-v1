import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TodoPanel from './components/TodoPanel'
import CalendarPanel from './components/CalendarPanel'
import PomodoroPanel from './components/PomodoroPanel'
import DayAgendaCard from './components/DayAgendaCard'
import AddEventModal from './components/AddEventModal'
import AnalyticsPanel from './components/AnalyticsPanel'
import AuthForm from './components/AuthForm'
import {
  getDateKey,
  readTodoTasksByDate,
  saveTodoTasksByDate,
} from './utils/analytics'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('freshroute-theme') ?? 'light'
  })
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [todoTasksByDate, setTodoTasksByDate] = useState(() => readTodoTasksByDate())

  // 1. Upgrade to useState so we can push new events into it!
  const [allTasks, setAllTasks] = useState(() => {
    const saved = localStorage.getItem('freshroute-tasks')
    if (saved) {
      try {
        return JSON.parse(saved).map(t => ({
          ...t,
          start: new Date(t.start),
          end: new Date(t.end)
        }))
      } catch (error) {
        console.error('Failed to parse saved calendar tasks', error)
      }
    }

    // Start with a completely clean slate if nothing is saved!
    return []
  })

  // 2. Auto-save to localStorage every time 'allTasks' changes
  useEffect(() => {
    localStorage.setItem('freshroute-tasks', JSON.stringify(allTasks))
  }, [allTasks])

  useEffect(() => {
    saveTodoTasksByDate(todoTasksByDate)
  }, [todoTasksByDate])

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    localStorage.setItem('freshroute-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
  }

  // 3. Filter down to ONLY the tasks for the currently clicked calendar day
  const dayTasks = allTasks.filter((task) => {
    return (
      task.start.getFullYear() === selectedDate.getFullYear() &&
      task.start.getMonth() === selectedDate.getMonth() &&
      task.start.getDate() === selectedDate.getDate()
    )
  })
  const selectedDateKey = getDateKey(selectedDate)
  const selectedTodoTasks = todoTasksByDate[selectedDateKey] ?? []

  // 4. This is the "Elevator" function we pass to the Modal to receive the new event
  const handleSaveNewEvent = (newTask) => {
    setAllTasks(prevTasks => [...prevTasks, newTask])
  }

  const handleTodoTasksChange = (nextTasks) => {
    setTodoTasksByDate((currentTasksByDate) => ({
      ...currentTasksByDate,
      [selectedDateKey]: nextTasks,
    }))
  }


  return (
    <div className="min-h-screen lg:h-screen bg-transparent p-3 lg:p-4 flex flex-col gap-4 text-slate-700 transition-colors duration-500 dark:text-slate-200 overflow-y-auto lg:overflow-hidden">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      
      <div className="flex-1 min-h-0 w-full max-w-7xl mx-auto flex flex-col justify-start">
        <Routes>
          <Route path="/" element={
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] xl:grid-cols-[350px_1fr_380px] gap-4 w-full h-full min-h-0">
              
              {/* Todo List Panel */}
              <div className="order-2 lg:order-1 h-[500px] lg:h-full">
                <TodoPanel
                  selectedDate={selectedDate}
                  tasks={selectedTodoTasks}
                  onTasksChange={handleTodoTasksChange}
                />
              </div>
              
              {/* Calendar & Agenda Column */}
              <div className="order-1 lg:order-2 grid min-h-0 gap-4 grid-rows-[auto_1fr] h-[650px] lg:h-full">
                <CalendarPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                <DayAgendaCard
                  date={selectedDate}
                  tasks={dayTasks}
                  onAddEvent={() => setIsModalOpen(true)}
                />
              </div>

              {/* Pomodoro Focus Panel */}
              <div className="order-3 lg:h-full h-[550px]">
                <PomodoroPanel />
              </div>

            </div>
          } />

          <Route path="/focus" element={
            <div className="flex items-center justify-center w-full h-full min-h-[500px] p-2">
              <div className="w-full max-w-lg h-[550px]">
                <PomodoroPanel />
              </div>
            </div>
          } />

          <Route path="/analytics" element={
            <div className="flex items-center justify-center w-full h-full min-h-[500px] p-2">
              <div className="w-full max-w-2xl h-[550px]">
                <AnalyticsPanel />
              </div>
            </div>
          } />

          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />
        </Routes>
      </div>

      {/* Render the Modal on top of everything */}
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
