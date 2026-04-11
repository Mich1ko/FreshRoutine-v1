import Card from './Card'

function PomodoroPanel() {
  return (
    <Card
      eyebrow="Pomodoro"
      title="Focus Cycle"
      description="Keep momentum with focused work intervals."
      variant="light"
      accentClassName="text-amber-700"
    >
      <div className="rounded-lg border border-slate-200/30 bg-white/30 px-3 py-2">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-700">Current Session</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">25:00</p>
      </div>
      <p className="text-slate-700">Next break in one focused sprint.</p>
    </Card>
  )
}

export default PomodoroPanel
