import { useState } from 'react'

function AddEventModal({ isOpen, onClose, onSave, selectedDate }) {
  // CONCEPT 2: Controlled Components
  // We hijack these inputs so React remembers exactly what is typed.
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [color, setColor] = useState('green')

  // CONCEPT 1: Conditional Rendering
  // If the switch is false, draw absolutely nothing!
  if (!isOpen) return null

  // CONCEPT 3: Event Handlers
  // This runs when the user hits "Save Event"
  const handleSubmit = (e) => {
    e.preventDefault() // Stops the browser from refreshing the page!

    // Convert the HTML '09:00' strings back into real Javascript Date objects
    const [startH, startM] = startTime.split(':').map(Number)
    const start = new Date(selectedDate)
    start.setHours(startH, startM, 0, 0)

    const [endH, endM] = endTime.split(':').map(Number)
    const end = new Date(selectedDate)
    end.setHours(endH, endM, 0, 0)

    // Build the final object
    const newTask = {
      id: Date.now(), // Generate unique ID
      title,
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
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-slate-800 mb-5">Add New Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Event Title</label>
            <input 
              required
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-200 p-3 text-slate-700 focus:border-green-500 focus:outline-none transition-colors"
              placeholder="E.g., Read a book"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Start Time</label>
              <input 
                required
                type="time" 
                value={startTime} 
                onChange={e => setStartTime(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-200 p-3 text-slate-700 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">End Time</label>
              <input 
                required
                type="time" 
                value={endTime} 
                onChange={e => setEndTime(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-200 p-3 text-slate-700 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Color Marker</label>
            <select 
              value={color} 
              onChange={e => setColor(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-200 p-3 text-slate-700 focus:border-green-500 focus:outline-none transition-colors font-medium"
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-5 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md"
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
