import { useState } from 'react'

function AddEventModal({ isOpen, onClose, onSave, selectedDate }) {
  // CONCEPT 2: Controlled Components
  // We hijack these inputs so React remembers exactly what is typed.
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [color, setColor] = useState('green')
  const [error, setError] = useState('')

  // CONCEPT 1: Conditional Rendering
  // If the switch is false, draw absolutely nothing!
  if (!isOpen) return null

  const handleClose = () => {
    setError('')
    onClose()
  }

  // CONCEPT 3: Event Handlers
  // This runs when the user hits "Save Event"
  const handleSubmit = (e) => {
    e.preventDefault() // Stops the browser from refreshing the page!

    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setError('Give this event a title.')
      return
    }

    // Convert the HTML '09:00' strings back into real Javascript Date objects
    const [startH, startM] = startTime.split(':').map(Number)
    const start = new Date(selectedDate)
    start.setHours(startH, startM, 0, 0)

    const [endH, endM] = endTime.split(':').map(Number)
    const end = new Date(selectedDate)
    end.setHours(endH, endM, 0, 0)

    if (end <= start) {
      setError('End time must be later than start time.')
      return
    }

    // Build the final object
    const newTask = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      title: cleanTitle,
      start,
      end,
      color,
    }

    // CONCEPT 4: Lifting State Up
    // Send the finished task up to App.jsx!
    onSave(newTask)
    
    // Reset the form so it's clean for the next time it opens
    setTitle('')
    setStartTime('09:00')
    setEndTime('10:00')
    setColor('green')
    
    // Close the modal
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="add-event-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
        <h2 id="add-event-title" className="mb-5 text-xl font-bold text-slate-800 dark:text-slate-100">Add New Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="event-title" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Event Title</label>
            <input 
              id="event-title"
              required
              type="text" 
              value={title} 
              onChange={e => {
                setTitle(e.target.value)
                setError('')
              }}
              className="w-full rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="E.g., Read a book"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="event-start" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Start Time</label>
              <input 
                id="event-start"
                required
                type="time" 
                value={startTime} 
                onChange={e => {
                  setStartTime(e.target.value)
                  setError('')
                }}
                className="w-full rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="event-end" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">End Time</label>
              <input 
                id="event-end"
                required
                type="time" 
                value={endTime} 
                onChange={e => {
                  setEndTime(e.target.value)
                  setError('')
                }}
                className="w-full rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-color" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Color Marker</label>
            <select 
              id="event-color"
              value={color} 
              onChange={e => setColor(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 text-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none transition-colors font-medium"
            >
              <option value="green" className="dark:bg-slate-900">Green (Emerald)</option>
              <option value="blue" className="dark:bg-slate-900">Blue (Indigo)</option>
              <option value="yellow" className="dark:bg-slate-900">Yellow (Amber)</option>
            </select>
          </div>

          {error ? (
            <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300">
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex justify-end gap-3 pt-5 border-t border-slate-100 dark:border-slate-850">
            <button 
              type="button" 
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 shadow-md shadow-indigo-500/20"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEventModal
