export const TODO_TASKS_KEY = 'todoTasks'
export const FOCUS_STATS_KEY = 'freshroute-focus-stats'
export const ANALYTICS_CHANGED_EVENT = 'freshroute-analytics-changed'

const defaultWeeklyData = [
  { day: 'Mon', hours: 0 },
  { day: 'Tue', hours: 0 },
  { day: 'Wed', hours: 0 },
  { day: 'Thu', hours: 0 },
  { day: 'Fri', hours: 0 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
]

export const defaultFocusStats = {
  totalHours: 0,
  completedSessions: 0,
  weeklyData: defaultWeeklyData,
}

export function getDateKey(date = new Date()) {
  const normalizedDate = date instanceof Date ? date : new Date(date)
  const year = normalizedDate.getFullYear()
  const month = String(normalizedDate.getMonth() + 1).padStart(2, '0')
  const day = String(normalizedDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function readTodoTasksByDate(storage = localStorage) {
  try {
    const savedTasks = storage.getItem(TODO_TASKS_KEY)
    if (!savedTasks) return {}

    const parsed = JSON.parse(savedTasks)

    if (Array.isArray(parsed)) {
      return {
        [getDateKey()]: parsed,
      }
    }

    if (parsed && typeof parsed === 'object') {
      return parsed
    }

    return {}
  } catch (error) {
    console.error('Failed to parse todo tasks from local storage', error)
    return {}
  }
}

export function readTodoTasksForDate(date = new Date(), storage = localStorage) {
  const tasksByDate = readTodoTasksByDate(storage)

  return tasksByDate[getDateKey(date)] ?? []
}

export function readTodoStats(date = new Date(), storage = localStorage) {
  try {
    const tasks = readTodoTasksForDate(date, storage)
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, rate }
  } catch (error) {
    console.error('Failed to parse todo tasks for analytics', error)
    return { total: 0, completed: 0, rate: 0 }
  }
}

export function readFocusStats(storage = localStorage) {
  try {
    const savedFocus = storage.getItem(FOCUS_STATS_KEY)
    if (!savedFocus) return defaultFocusStats

    const parsed = JSON.parse(savedFocus)

    return {
      totalHours: Number(parsed.totalHours) || 0,
      completedSessions: Number(parsed.completedSessions) || 0,
      weeklyData: mergeWeeklyData(parsed.weeklyData),
    }
  } catch (error) {
    console.error('Failed to parse focus stats for analytics', error)
    return defaultFocusStats
  }
}

export function saveTodoTasksByDate(tasksByDate, storage = localStorage) {
  storage.setItem(TODO_TASKS_KEY, JSON.stringify(tasksByDate))
  notifyAnalyticsChanged()
}

export function recordFocusSession(minutes, date = new Date(), storage = localStorage) {
  const currentStats = readFocusStats(storage)
  const addedHours = roundHours(minutes / 60)
  const dayIndex = (date.getDay() + 6) % 7

  const nextStats = {
    totalHours: roundHours(currentStats.totalHours + addedHours),
    completedSessions: currentStats.completedSessions + 1,
    weeklyData: currentStats.weeklyData.map((entry, index) => (
      index === dayIndex
        ? { ...entry, hours: roundHours(entry.hours + addedHours) }
        : entry
    )),
  }

  storage.setItem(FOCUS_STATS_KEY, JSON.stringify(nextStats))
  notifyAnalyticsChanged()

  return nextStats
}

export function subscribeToAnalyticsChanges(callback) {
  const handleStorage = (event) => {
    if (event.key === TODO_TASKS_KEY || event.key === FOCUS_STATS_KEY) {
      callback()
    }
  }

  window.addEventListener(ANALYTICS_CHANGED_EVENT, callback)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(ANALYTICS_CHANGED_EVENT, callback)
    window.removeEventListener('storage', handleStorage)
  }
}

function notifyAnalyticsChanged() {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new Event(ANALYTICS_CHANGED_EVENT))
}

function mergeWeeklyData(weeklyData) {
  if (!Array.isArray(weeklyData)) return defaultWeeklyData

  return defaultWeeklyData.map((defaultEntry, index) => ({
    day: defaultEntry.day,
    hours: Number(weeklyData[index]?.hours) || 0,
  }))
}

function roundHours(hours) {
  return Math.round(hours * 100) / 100
}
