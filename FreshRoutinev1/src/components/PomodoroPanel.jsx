import { useEffect, useState } from 'react'
import Card from './Card'
import MusicPlayer from './MusicPlayer'
import { recordFocusSession } from '../utils/analytics'

const WORK_SECONDS = 25 * 60
const WORK_MINUTES = WORK_SECONDS / 60

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
          recordFocusSession(WORK_MINUTES)
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
    setIsPlaying(false)
    setSecondsLeft(WORK_SECONDS)
  }

  return (
    <Card
      eyebrow="Pomodoro"
      title="Focus Cycle"
      description="Keep momentum with focused work intervals."
      variant="light"
      accentClassName="text-amber-500"
      className="relative overflow-hidden"
    >


      {/* Interactive Content Layer */}
      <div className="relative z-10 flex flex-col gap-3 h-full min-h-0">
        <div className="rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/40">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">Current Session</p>
          <p className="mt-0.5 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-50">{display}</p>
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
            className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-800 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-100 dark:disabled:border-slate-800 dark:disabled:text-slate-600"
          >
            Pause
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-800 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-100"
          >
            Reset
          </button>
        </div>

        <p className="mt-1 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
          {isRunning ? 'Focus timer is running.' : 'Ready for one focused sprint.'}
        </p>

        {/* Music player lives at the bottom of the Pomodoro card */}
        <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </Card>
  )
}

export default PomodoroPanel
