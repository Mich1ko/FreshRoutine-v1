import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import todoSvg from '../assets/morningroutine.svg'

/**
 * Task data structure:
 * {
 *   id: string,
 *   title: string,
 *   completed: boolean,
 *   createdAt: string
 * }
 */
const formatDateTitle = (date) => {
  if (!date) return 'Selected Day'

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function TodoPanel({ selectedDate, tasks = [], onTasksChange }) {
  // Maintains the current value of the input field for adding a new task.
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [addedTaskId, setAddedTaskId] = useState(null)
  const [checkedTaskId, setCheckedTaskId] = useState(null)
  const [closingTaskIds, setClosingTaskIds] = useState([])
  const tasksRef = useRef(tasks)
  const timeoutsRef = useRef([])

  useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
    }
  }, [])

  const queueTimeout = (callback, delay) => {
    const timeoutId = window.setTimeout(() => {
      callback()
      timeoutsRef.current = timeoutsRef.current.filter((id) => id !== timeoutId)
    }, delay)

    timeoutsRef.current = [...timeoutsRef.current, timeoutId]
  }

  const handleToggleTask = (taskId) => {
    const toggledTask = tasks.find((task) => task.id === taskId)

    if (toggledTask && !toggledTask.completed) {
      setCheckedTaskId(taskId)
      queueTimeout(() => setCheckedTaskId(null), 520)
    }

    // The parent owns the array for the selected date, so this component sends the next array upward.
    onTasksChange(
      tasks.map((task) =>
        // Using the spread operator (`...task`) copies the task object to maintain immutability,
        // which React requires to detect changes and trigger a re-render.
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId) => {
    if (closingTaskIds.includes(taskId)) return

    setClosingTaskIds((currentIds) => [...currentIds, taskId])
    queueTimeout(() => {
      // The `filter` method naturally creates a new array, preserving state immutability.
      onTasksChange(tasksRef.current.filter((task) => task.id !== taskId))
      setClosingTaskIds((currentIds) => currentIds.filter((id) => id !== taskId))
    }, 320)
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

    onTasksChange([nextTask, ...tasks])
    setAddedTaskId(nextTask.id)
    setNewTaskTitle('')
    queueTimeout(() => setAddedTaskId(null), 620)
  }

  return (
    <Card
      eyebrow="Todo List"
      title={formatDateTitle(selectedDate)}
      borderClassName="border-blue-500/60"
      description="Track the most important tasks for this selected day."
      variant="light"
      accentClassName="text-indigo-600"
      className="relative overflow-hidden"
    >
      {/* Watermark SVG Graphic */}
      <img
        src={todoSvg}
        alt=""
        className="absolute -bottom-6 -right-15 w-45 h-320 opacity-[0.3] pointer-events-none select-none z-0 rotate-10"
      />

      <form
        className="todo-add-gloss relative z-10 flex gap-2 rounded-2xl border border-white/70 bg-white/70 p-1.5 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-200/50 backdrop-blur-xl transition duration-300 focus-within:border-indigo-300 focus-within:shadow-indigo-500/20 dark:border-white/10 dark:bg-slate-950/55 dark:ring-indigo-400/20 dark:shadow-indigo-950/30"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Add a task..."
          className="min-w-0 flex-1 rounded-xl border border-transparent bg-white/45 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-inner shadow-white/70 transition focus:bg-white/80 focus:outline-none dark:bg-slate-900/45 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-black/20 dark:focus:bg-slate-900/80"
        />
        <button
          type="submit"
          className="rounded-xl border border-white/25 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-md shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/35 active:translate-y-0 active:scale-95"
        >
          Add
        </button>
      </form>

      <ul className="relative z-10 space-y-2">
        {/* We use `.map()` to render a dynamically sized list of task items.
            React requires a unique `key` prop for each item in a list so it can efficiently
            track which elements have changed, been added, or been removed. */}
        {tasks.length ? tasks.map((task) => {
          const isCheckedBurst = checkedTaskId === task.id
          const isClosing = closingTaskIds.includes(task.id)

          return (
            <li
              key={task.id}
              className={`task-row-gloss relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border px-3 py-2 text-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 dark:text-slate-100 ${task.completed
                ? 'border-emerald-200/80 bg-emerald-50/75 shadow-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-500/10'
                : 'border-white/80 bg-white/70 shadow-slate-200/70 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/10 dark:hover:bg-slate-800/80'
              } ${addedTaskId === task.id ? 'task-add-pop' : ''} ${isCheckedBurst ? 'task-check-glow' : ''} ${isClosing ? 'task-close-shake pointer-events-none' : ''}`}
            >
              <button
                type="button"
                onClick={() => handleToggleTask(task.id)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
                aria-pressed={task.completed}
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${task.completed
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-300 to-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : 'border-slate-300 bg-white/80 shadow-inner shadow-white dark:border-slate-600 dark:bg-slate-950/80 dark:shadow-black/20'
                  }`}
                >
                  {task.completed ? (
                    <svg
                      className={`h-3.5 w-3.5 ${isCheckedBurst ? 'task-check-pop' : ''}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4.5 10.5 8 14l7.5-8" />
                    </svg>
                  ) : null}
                </span>
                <span
                  className={
                    task.completed
                      ? 'truncate font-medium text-slate-400 line-through decoration-emerald-400/70 decoration-2 dark:text-slate-500'
                      : 'truncate font-medium text-slate-800 dark:text-slate-100'
                  }
                >
                  {task.title}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                disabled={isClosing}
                aria-label={`Close ${task.title}`}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-rose-200/70 bg-rose-50/80 text-xs font-bold text-rose-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-100 hover:text-rose-600 active:scale-95 disabled:opacity-70 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300"
              >
                X
              </button>
            </li>
          )
        }) : (
          <li className="rounded-lg border border-dashed border-slate-200 bg-white/50 px-3 py-4 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-950/30 dark:text-slate-500">
            No tasks yet for this date.
          </li>
        )}
      </ul>
    </Card>
  )
}

export default TodoPanel
