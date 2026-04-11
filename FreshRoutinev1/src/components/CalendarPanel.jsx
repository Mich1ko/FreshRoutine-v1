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
