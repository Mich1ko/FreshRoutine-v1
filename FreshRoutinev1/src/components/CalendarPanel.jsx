import Card from './Card'

function CalendarPanel() {
  return (
    <Card
      eyebrow="Calendar"
      title="Upcoming Schedule"
      description="A quick view of the next events in your routine."
      accentClassName="text-pink-300"
    >
      <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
        <p className="font-medium text-white">7:30 AM - Morning Workout</p>
        <p className="text-xs text-white/60">Start with 10 minutes of mobility</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
        <p className="font-medium text-white">9:00 PM - Plan Tomorrow</p>
        <p className="text-xs text-white/60">Set top 3 priorities before sleep</p>
      </div>
    </Card>
  )
}

export default CalendarPanel
