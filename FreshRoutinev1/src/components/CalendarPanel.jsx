import { useMemo, useState } from 'react'
import Card from './Card'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isSameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function CalendarPanel() {
  const today = useMemo(() => new Date(), [])
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState(null)

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDayColumn = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = 0; i < 42; i += 1) {
    const dayNum = i - firstDayColumn + 1

    if (dayNum <= 0) {
      cells.push({
        date: new Date(year, month - 1, daysInPrevMonth + dayNum),
        inCurrentMonth: false,
      })
    } else if (dayNum > daysInMonth) {
      cells.push({
        date: new Date(year, month + 1, dayNum - daysInMonth),
        inCurrentMonth: false,
      })
    } else {
      cells.push({
        date: new Date(year, month, dayNum),
        inCurrentMonth: true,
      })
    }
  }

  function goPrevMonth() {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  function goNextMonth() {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  return (
    <Card
      eyebrow="Calendar"
      title={`${MONTHS[month]} ${year}`}
      variant="light"
      accentClassName="text-green-700"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          className="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
          aria-label="Previous month"
        >
          Prev
        </button>
        <span className="text-sm font-medium text-slate-700">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={goNextMonth}
          className="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
          aria-label="Next month"
        >
          Next
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-xs font-semibold text-slate-400">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map(({ date, inCurrentMonth }, idx) => {
          const isToday = isSameDay(date, today)
          const isSelected = isSameDay(date, selectedDate)

          return (
            <button
              key={`${date.toISOString()}-${idx}`}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={[
                'rounded py-1 text-center text-xs transition-colors',
                inCurrentMonth ? 'text-slate-800' : 'text-slate-300',
                isToday && !isSelected ? 'font-bold text-green-700' : '',
                isSelected ? 'bg-green-600 font-bold text-white' : 'hover:bg-slate-100',
              ].join(' ')}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      {selectedDate ? (
        <p className="mt-3 text-center text-xs text-slate-500">
          Selected: {selectedDate.toLocaleDateString()}
        </p>
      ) : null}
    </Card>
  )
}

export default CalendarPanel
