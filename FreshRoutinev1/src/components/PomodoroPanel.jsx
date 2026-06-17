import { useEffect, useState } from 'react'
import Card from './Card'
import MusicPlayer from './MusicPlayer'
import Abstract from '../assets/orangeabstract.png'
import Headphones from '../assets/headphones.png'
import MusicNote from '../assets/musicnote1.png'
import MusicNote2 from '../assets/musicnote2.png'

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
      className="relative overflow-hidden"
    >
      {/* Watermark Graphics */}
      <img
        src={Abstract}
        alt=""
        className="absolute -top-15 -right-10 w-42 h-42 opacity-[0.5] pointer-events-none select-none z-0"
      />

      <img
        src={Abstract}
        alt=""
        className="absolute top-40 -left-14 w-42 h-42 opacity-[0.3] pointer-events-none select-none z-0"
      />

      <img
        src={Headphones}
        alt=""
        className="absolute bottom-5 left-10 w-42 h-42 opacity-[0.65] pointer-events-none select-none z-0"
      />

      <img
        src={MusicNote}
        alt=""
        className="absolute bottom-37 left-35 w-20 h-20 opacity-[0.45] pointer-events-none select-none z-0"
      />

      <img
        src={MusicNote2}
        alt=""
        className="absolute bottom-25 left-45 w-15 h-15 opacity-[0.45] pointer-events-none select-none z-0"
      />

      {/* Interactive Content Layer */}
      <div className="relative z-10 flex flex-col gap-3 h-full min-h-0">
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
      </div>
    </Card>
  )
}

export default PomodoroPanel
