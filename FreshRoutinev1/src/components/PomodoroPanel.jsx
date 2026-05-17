import Card from './Card'

const [secondLeft, setSecondsLeft] = useState(25 * 60)
const [isRunning, setIsRunning] = useState(false)
const [mode, setMode] = useState('work')

useEffect(() => {
  if (!isRunning) return

  const intervalId = setInterval (() => {
    setSecondsLeft((currentSeconds) => currentSeconds - 1 )
  }, 1000)

  return () => clearInterval(intervalId)
}, [isRunning])


const minuters = Math.floor(setSecondsLeft / 60)
const seconds = setSecondsLeft % 60

const display = `${minutes}:{String(seconds).padStart(2, '0')}`

// controls: 
function startAndStop() {
return (
<div className="button-container">
<button onClick={() => setIsRunning(true)}>Start</button>
<button onClick={() => setIsRunning(false)}>Stop</button>
<button onClick={() => {
  setIsRunning(false)
  setSecondsLeft(25 * 60)
}}>Reset</button>
</div>
);
}


// PomodoroPanel is a purely presentational (or "stateless") component. 
// It currently has no `useState` or `useEffect`, focusing fully on UI structure.
function PomodoroPanel() {
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
        <p className="mt-1 text-2xl font-semibold text-slate-900">25:00</p>
      </div>
      <p className="text-slate-700">Next break in one focused sprint.</p>
    </Card>
  )
}

export default PomodoroPanel
