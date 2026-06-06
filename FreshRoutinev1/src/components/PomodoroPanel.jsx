import { useEffect, useState } from 'react'
import Card from './Card'
import MusicPlayer from './MusicPlayer'

const WORK_SECONDS = 25 * 60

function PomodoroPanel() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsRunning(false)
          setIsPlaying(false)
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
      accentClassName="text-amber-500"
    >
      <div className="rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Current Session</p>
        <p className="mt-0.5 text-3xl font-semibold text-slate-800 tracking-tight">{display}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setIsRunning(true)}
          disabled={isRunning || secondsLeft === 0}
          className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 shadow-sm shadow-amber-500/10"
        >
          Start
        </button>
        <button
          type="button"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-slate-800 hover:border-slate-300 transition hover:bg-white disabled:cursor-not-allowed disabled:text-slate-300 disabled:border-slate-100"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-slate-800 hover:border-slate-300 transition hover:bg-white"
        >
          Reset
        </button>
      </div>

      <p className="text-slate-500 text-xs mt-1 text-center font-medium">
        {isRunning ? 'Focus timer is running.' : 'Ready for one focused sprint.'}
      </p>

      {/* Music player lives at the bottom of the Pomodoro card */}
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </Card>
  )
}

export default PomodoroPanel
