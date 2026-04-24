import Card from './Card'

const hourSlots = Array.from({ length: 14 }, (_, i) => 8 + i)

const pillStyles = {
    green: 'border-green-500 bg-green-100 text-green-900',
    blue: 'border-blue-500 bg-blue-100 text-blue-900',
    yellow: 'border-yellow-500 bg-yellow-100 text-yellow-900',
}

const formatHourLabel = (hour24) => {
    const suffix = hour24 >= 12 ? 'PM' : 'AM'
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
    return `${hour12} ${suffix}`
}

const formatDateTitle = (date) => {
    if (!date) return 'No date selected'
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    }).format(date)
}

const formatTimeRange = (start, end) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    })
    return `${formatter.format(start)}-${formatter.format(end)}`
}

function DayAgendaCard({ date, tasks = [], onAddEvent }) {
    // We normalize the start and end times to ensure they are valid Date objects.
    // Finally, we sort them chronologically so they appear in sequential order throughout the day.
    const normalizedTasks = tasks
        .map((task) => ({
            ...task,
            start: task.start instanceof Date ? task.start : new Date(task.start),
            end: task.end instanceof Date ? task.end : new Date(task.end),
        }))
        .sort((a, b) => a.start - b.start)


    return (
        <Card
            eyebrow="Day Agenda"
            title={formatDateTitle(date)}
            variant="light"
            accentClassName="text-green-700"
            className="flex flex-col min-h-0"
        >
            <div className="flex-1 overflow-y-auto space-y-1 pr-2">
                {/* Dynamically generate hour blocks. For each hour slot, we filter the normalized 
                    tasks to see if any fall within that specific start hour. */}
                {hourSlots.map((hour) => {
                    const slotTasks = normalizedTasks.filter((task) => task.start.getHours() === hour)

                    return (
                        <div key={hour} className="grid grid-cols-[64px_1fr] items-start py-1">
                            <p className="pt-1 text-sm text-slate-400">{formatHourLabel(hour)}</p>
                            <div className="space-y-1 border-t border-slate-200 pt-1">
                                {slotTasks.length ? (
                                    /* If there are tasks in this hour slot, render them inside the grid. Conditional rendering with the ternary operator (?) is common in React. */
                                    slotTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`flex items-center justify-between rounded-lg border-l-4 px-3 py-2 text-sm font-semibold ${pillStyles[task.color] ?? pillStyles.green
                                                }`}
                                        >
                                            <span className="truncate pr-3">{task.title}</span>
                                            <span className="text-xs font-medium text-slate-600">
                                                {formatTimeRange(task.start, task.end)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-3 py-2 text-slate-300">-</div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                type="button"
                // `onAddEvent` is passed down as a prop from a parent component.
                // Clicking this calls the parent's handler, illustrating standard "data down, actions up" flow in React.
                onClick={onAddEvent}
                className="mt-3 rounded-xl border border-slate-200 bg-white/60 py-3 text-sm font-semibold text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
            >
                + Add event
            </button>
        </Card>
    )
}

export default DayAgendaCard
