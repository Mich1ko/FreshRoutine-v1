import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function AuthField({ id, label, type = 'text', placeholder, autoComplete, value, onChange }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <input
        id={id}
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/10"
      />
    </label>
  )
}

function nameFromEmail(email) {
  return email.split('@')[0].replace(/[._-]+/g, ' ').trim() || 'Fresh Routine User'
}

function AuthForm({ mode = 'login', onAuthenticate }) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const title = isSignup ? 'Create a local profile' : 'Continue to your workspace'
  const subtitle = 'Your profile and routine data stay in this browser. No account is sent to a server.'

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanEmail = email.trim()
    const cleanName = isSignup ? name.trim() : nameFromEmail(cleanEmail)
    if (!cleanEmail || !cleanName) return

    onAuthenticate({ name: cleanName, email: cleanEmail })
    navigate('/', { replace: true })
  }

  return (
    <div className="grid min-h-[calc(100vh-7rem)] place-items-center px-3 py-8">
      <section className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-md transition-colors dark:border-slate-700/70 dark:bg-slate-950/85 dark:shadow-slate-950/50 sm:p-8">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
            FreshRoutine
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup ? (
            <AuthField
              id="name"
              label="Name"
              placeholder="Your full name"
              autoComplete="name"
              value={name}
              onChange={setName}
            />
          ) : null}

          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/20 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:focus:ring-indigo-300/20"
          >
            {isSignup ? 'Create local profile' : 'Continue'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {isSignup ? 'Already set up here? ' : 'Want to add your name? '}
          <Link
            to={isSignup ? '/login' : '/signup'}
            className="font-bold text-slate-950 transition hover:text-indigo-600 dark:text-slate-50 dark:hover:text-indigo-300"
          >
            {isSignup ? 'Continue' : 'Create a profile'}
          </Link>
        </p>
      </section>
    </div>
  )
}

export default AuthForm
