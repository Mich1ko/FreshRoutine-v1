import { Link } from 'react-router-dom'

function GoogleLogo() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-slate-900">
      G
    </span>
  )
}

function AuthField({ id, label, type = 'text', placeholder, autoComplete }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/10"
      />
    </label>
  )
}

function AuthForm({ mode = 'login' }) {
  const isSignup = mode === 'signup'
  const title = isSignup ? 'Create your account' : 'Welcome back'
  const subtitle = isSignup
    ? 'Start planning fresh routines with a clean daily workspace.'
    : 'Sign in to continue your routines, focus sessions, and calendar tasks.'

  const handleSubmit = (event) => {
    event.preventDefault()
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

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          <GoogleLogo />
          Continue with Google
        </button>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          <span className="h-px bg-slate-200 dark:bg-slate-800" />
          <span>Email</span>
          <span className="h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup ? (
            <AuthField
              id="name"
              label="Name"
              placeholder="Your full name"
              autoComplete="name"
            />
          ) : null}

          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />

          <AuthField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/20 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:focus:ring-indigo-300/20"
          >
            {isSignup ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <Link
            to={isSignup ? '/login' : '/signup'}
            className="font-bold text-slate-950 transition hover:text-indigo-600 dark:text-slate-50 dark:hover:text-indigo-300"
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
      </section>
    </div>
  )
}

export default AuthForm
