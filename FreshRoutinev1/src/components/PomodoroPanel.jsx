import { useEffect, useState } from 'react'
import Card from './Card'
import MusicPlayer from './MusicPlayer'
import { recordFocusSession } from '../utils/analytics'

const PRESETS = [5, 15, 25, 45, 60]

function PomodoroPanel({ musicPlayer }) {
  const { setIsPlaying } = musicPlayer
  const [workMinutes, setWorkMinutes] = useState(25)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [customInput, setCustomInput] = useState('25')

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsRunning(false)
          setIsPlaying(false)
          recordFocusSession(workMinutes)
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning, setIsPlaying, workMinutes])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const display = `${minutes}:${String(seconds).padStart(2, '0')}`

  const handleSelectMinutes = (newMins) => {
    const validMins = Math.max(1, Math.min(180, Number(newMins) || 1))
    setWorkMinutes(validMins)
    setCustomInput(String(validMins))
    if (!isRunning) {
      setSecondsLeft(validMins * 60)
    }
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    const validMins = Math.max(1, Math.min(180, Number(customInput) || 1))
    setWorkMinutes(validMins)
    setCustomInput(String(validMins))
    if (!isRunning) {
      setSecondsLeft(validMins * 60)
    }
    setIsEditing(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsPlaying(false)
    setSecondsLeft(workMinutes * 60)
  }

  return (
    <Card
      eyebrow="Pomodoro"
      title="Focus Cycle"
      description="Keep momentum with focused work intervals."
      variant="light"
      accentClassName="text-amber-500"
      borderClassName="border-orange-500/60"
      className="relative overflow-hidden"
    >
      {/* Interactive Content Layer */}
      <div className="relative z-10 flex flex-col gap-3 h-full min-h-0">
        <div className="rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/40">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">Current Session</p>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              disabled={isRunning}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Set custom focus duration"
            >
              {isEditing ? 'Done' : 'Set Time'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleCustomSubmit} className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="180"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-20 rounded-lg border border-amber-300 bg-white px-2 py-1 text-sm font-semibold text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Mins"
                autoFocus
              />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">mins</span>
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-600 transition"
              >
                Save
              </button>
            </form>
          ) : (
            <p className="mt-0.5 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-50">{display}</p>
          )}

          {/* Quick preset selector */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mr-0.5">Presets:</span>
            {PRESETS.map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => {
                  handleSelectMinutes(pm)
                  setIsEditing(false)
                }}
                disabled={isRunning}
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold transition ${
                  workMinutes === pm && !isEditing
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {pm}m
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false)
              setIsRunning(true)
            }}
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
          {isRunning ? `Focus timer running (${workMinutes}m session).` : `Ready for a ${workMinutes}m focus sprint.`}
        </p>

        {/* Music player lives at the bottom of the Pomodoro card */}
        <MusicPlayer player={musicPlayer} />
      </div>
    </Card>
  )
}

export default PomodoroPanel
