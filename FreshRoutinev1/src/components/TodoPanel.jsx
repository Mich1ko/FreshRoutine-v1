import { useState } from 'react'
import Card from './Card'

/**
 * Task data structure:
 * {
 *   id: string,
 *   title: string,
 *   completed: boolean,
 *   createdAt: string
 * }
 */
const initialTasks = [
  {
    id: 'task-1',
    title: 'Draft reusable card layout',
    completed: false,
    createdAt: '2026-04-09T08:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Refactor all panels to use shared component',
    completed: false,
    createdAt: '2026-04-09T09:00:00.000Z',
  },
]

function TodoPanel() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = newTaskTitle.trim()

    if (!trimmedTitle) {
      return
    }

    const nextTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [nextTask, ...currentTasks])
    setNewTaskTitle('')
  }

  return (
    <Card
      eyebrow="Todo List"
      title="Today's Priorities"
      description="Track the most important tasks for this session."
      accentClassName="text-blue-300"
    >
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-purple-300 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg border border-purple-300/40 bg-purple-300/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-purple-100 transition hover:bg-purple-300/30"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            {task.title}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TodoPanel
