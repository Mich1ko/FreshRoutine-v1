import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import TodoPanel from './components/TodoPanel'
import CalendarPanel from './components/CalendarPanel'
import PomodoroPanel from './components/PomodoroPanel'


function App() {
  return (
    <div className="min-h-screen bg-[#60609e] p-2 flex flex-col gap-4">
      <Navbar />
      <div className="grid flex-1 min-h-0 gap-4 grid-cols-[350px_1fr_380px]">

        <TodoPanel />
        <CalendarPanel />
        <PomodoroPanel />
      </div>
    </div>
  )
}

export default App
