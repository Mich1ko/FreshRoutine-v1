import Card from './Card'

function PomodoroPanel() {
  return (
    <Card
      eyebrow="Pomodoro"
      title="Focus Cycle"
      description="Keep momentum with focused work intervals."
      accentClassName="text-amber-300"
    >
      <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
        <p className="text-xs uppercase tracking-[0.16em] text-white/60">Current Session</p>
        <p className="mt-1 text-2xl font-semibold text-white">25:00</p>
      </div>
      <p className="text-white/70">Next break in one focused sprint.</p>
    </Card>
  )
}

export default PomodoroPanel
