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

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

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
      variant="light"
      accentClassName="text-blue-700"
    >
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-lg border border-slate-200/30 bg-white/30 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-300 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg border border-blue-600/20 bg-blue-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200/30 bg-white/30 px-3 py-2 text-slate-900"
          >
            <button
              type="button"
              onClick={() => handleToggleTask(task.id)}
              className="flex min-w-0 flex-1 items-center gap-2 text-left"
              aria-pressed={task.completed}
            >
              <span
                className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  task.completed
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-400 bg-white'
                }`}
              >
                {task.completed ? '✓' : ''}
              </span>
              <span
                className={
                  task.completed
                    ? 'truncate text-slate-500 line-through'
                    : 'truncate text-slate-900'
                }
              >
                {task.title}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleDeleteTask(task.id)}
              className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-red-700 transition hover:bg-red-100"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TodoPanel
