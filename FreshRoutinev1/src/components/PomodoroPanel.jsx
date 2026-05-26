import { useEffect, useState } from 'react'
import Card from './Card'

const WORK_SECONDS = 25 * 60

function PomodoroPanel() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsRunning(false)
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const display = `${minutes}:${String(seconds).padStart(2, '0')}`

  const handleReset = () => {
    setIsRunning(false)
    setSecondsLeft(WORK_SECONDS)
  }

  return (
    <Card
      eyebrow="Pomodoro"
      title="Focus Cycle"
      description="Keep momentum with focused work intervals."
      variant="light"
      accentClassName="text-amber-700"
    >
      <div className="rounded-lg border border-black bg-white/30 px-3 py-2">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-700">Current Session</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{display}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setIsRunning(true)}
          disabled={isRunning || secondsLeft === 0}
          className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Start
        </button>
        <button
          type="button"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="rounded-lg border border-slate-300 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:text-slate-300"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-white"
        >
          Reset
        </button>
      </div>

      <p className="text-slate-700">
        {isRunning ? 'Focus timer is running.' : 'Ready for one focused sprint.'}
      </p>
    </Card>
  )
}

export default PomodoroPanel
