function LightDarkToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`relative inline-flex h-8 w-14 shrink-0 items-center overflow-hidden rounded-full border p-1 transition-colors duration-500 ease-out ${
        isDark
          ? 'border-indigo-400/25 bg-slate-800'
          : 'border-white/15 bg-slate-700/80'
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(165, 180, 252, 0.22), transparent 55%)',
        }}
        aria-hidden="true"
      />

      <span
        className={`relative z-10 grid h-6 w-6 place-items-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? 'translate-x-6 bg-indigo-500 text-white shadow-indigo-500/30'
            : 'translate-x-0 bg-white text-amber-500 shadow-slate-900/20'
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`col-start-1 row-start-1 h-3.5 w-3.5 transition-all duration-500 ease-out ${
            isDark
              ? 'scale-50 rotate-90 opacity-0'
              : 'scale-100 rotate-0 opacity-100'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`col-start-1 row-start-1 h-3.5 w-3.5 transition-all duration-500 ease-out ${
            isDark
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-50 -rotate-90 opacity-0'
          }`}
          fill="currentColor"
        >
          <path d="M21 14.8A8.5 8.5 0 0 1 9.2 3a7 7 0 1 0 11.8 11.8Z" />
        </svg>
      </span>
    </button>
  )
}

export default LightDarkToggle
