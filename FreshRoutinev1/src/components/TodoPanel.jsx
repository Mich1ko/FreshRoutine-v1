import { useState, useEffect } from 'react'
import Card from './Card'
import todoSvg from '../assets/morningroutine.svg'
import todoSvg2 from '../assets/task.png'
import fadeAbstract from '../assets/abstractfadeblue.png'


/**
 * Task data structure:
 * {
 *   id: string,
 *   title: string,
 *   completed: boolean,
 *   createdAt: string
 * }
 */
const initialTasks = []

function TodoPanel() {
  // The `useState` hook allows us to add state to this functional component.
  // `tasks` holds the current state array, and `setTasks` is the function used to update it.
  // We initialize it using a function to check `localStorage` first, falling back to `initialTasks`.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks')
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks)
      } catch (e) {
        console.error('Failed to parse tasks from local storage', e)
      }
    }
    return initialTasks
  })

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks))
  }, [tasks])

  // Maintains the current value of the input field for adding a new task.
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleToggleTask = (taskId) => {
    // When updating state based on the previous state, it's best practice to pass an updater function
    // to `setTasks` to ensure we are working with the most current state value, avoiding race conditions.
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        // Using the spread operator (`...task`) copies the task object to maintain immutability,
        // which React requires to detect changes and trigger a re-render.
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId) => {
    // The `filter` method naturally creates a new array, preserving state immutability.
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  const handleSubmit = (event) => {
    // `event.preventDefault()` stops the browser's default form submission behavior,
    // which would otherwise cause the page to reload and lose local component state.
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
      accentClassName="text-indigo-600"
      className='relative overflow-hidden'
    >
      {/* Watermark SVG Graphic */}
      <img
        src={todoSvg}
        alt=""
        className="absolute -bottom-6 -right-15 w-45 h-320 opacity-[0.3] pointer-events-none select-none z-0 rotate-10"
      />



      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-lg border border-slate-200 bg-white/60 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="rounded-lg border border-indigo-600/20 bg-indigo-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-600 shadow-sm"
        >
          Add
        </button>
      </form>

      <img
        src={todoSvg2}
        alt=""
        className="absolute w-48 h-48 right-20 bottom-60 opacity-[0.6]"
      />

      <img
        src={fadeAbstract}
        alt=""
        className="absolute -bottom-20 -left-15 w-48 h-48 opacity-[0.6]"
      />



      <ul className="space-y-2">
        {/* We use `.map()` to render a dynamically sized list of task items.
            React requires a unique `key` prop for each item in a list so it can efficiently
            track which elements have changed, been added, or been removed. */}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-slate-900 transition-colors hover:bg-slate-100/50 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800/80"
          >
            <button
              type="button"
              onClick={() => handleToggleTask(task.id)}
              className="flex min-w-0 flex-1 items-center gap-2 text-left"
              aria-pressed={task.completed}
            >
              <span
                className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${task.completed
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-950'
                  }`}
              >
                {task.completed ? '✓' : ''}
              </span>
              <span
                className={
                  task.completed
                    ? 'truncate text-slate-400 line-through'
                    : 'truncate text-slate-800 dark:text-slate-100'
                }
              >
                {task.title}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleDeleteTask(task.id)}
              className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-rose-500 transition hover:bg-rose-100"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TodoPanel
