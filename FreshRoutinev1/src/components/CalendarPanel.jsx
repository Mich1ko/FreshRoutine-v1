import Card from './Card'

function CalendarPanel() {
  return (
    <Card
      eyebrow="Calendar"
      title="Calendar"
      description="Upcoming events and schedule overview."
      variant="light"
      accentClassName="text-green-700"
    >
      <p className="text-sm text-slate-800">No events scheduled for today.</p>
    </Card>
  )
}

export default CalendarPanel

import { useMemo, useState } from 'react'
import Card from './Card'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',]

function CalendarPanel() {
  const today = useMemo(() => new Date(), [])
  const { viewMonth, setViewMonth } = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1))

  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <Card
      title="Month Grid"
      variant="light"
    >

    </Card>
  )
}

const year = viewMonth.getFullYear()
const month = viewMonth.getMonth()

const firstDayofMonth = new Date(year, month, 1).getDate()
const lastDayofMonth = new Date(year, month + 1, 0).getDate()
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


