/* Object destructuring is used here to extract properties from the `props` object immediately.
   We can also set default values directly, like `variant = 'dark'` and `className = ''`. */
function Card({
  eyebrow,
  title,
  description,
  accentClassName,
  className = 'relative overflow-hidden',
  children,
  variant = 'dark', // 'dark' (default) or 'light'
  bgClass, // optional override for background
}) {
  const isLight = variant === 'light'

  const accentDefault = isLight ? 'text-indigo-600' : 'text-indigo-300'
  const bg = bgClass ?? (isLight
    ? 'bg-white/80 dark:bg-slate-950/80'
    : 'bg-slate-900/50 dark:bg-slate-950/80')


  const titleClass = isLight
    ? 'text-xl font-semibold text-slate-900 dark:text-slate-50'
    : 'text-xl font-semibold text-white'
  const descClass = isLight
    ? 'text-sm text-slate-500 dark:text-slate-400'
    : 'text-sm text-slate-400'
  const childrenClass = [
    isLight ? 'text-slate-700 dark:text-slate-200' : 'text-slate-200',
    'text-sm space-y-3 flex-1 min-h-0 flex flex-col'
  ].join(' ')

  const cardClassName = [
    'h-full rounded-2xl border transition-all duration-200 shadow-sm',
    isLight
      ? 'border-slate-200/80 shadow-slate-200/60 dark:border-slate-700/70 dark:shadow-slate-950/50'
      : 'border-slate-800/80',
    bg,
    'p-5 backdrop-blur-md',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const accent = accentClassName ?? accentDefault

  return (
    <section className={cardClassName}>
      <header className="mb-4 space-y-1">
        {eyebrow ? (
          <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${accent}`}>
            {eyebrow}
          </p>
        ) : null}

        {title ? <h2 className={titleClass}>{title}</h2> : null}
        {description ? <p className={descClass}>{description}</p> : null}
      </header>

      {/* `children` is a special prop representing elements nested inside <Card>...</Card> 
          when this component is used in parent components (like TodoPanel or DayAgendaCard).
          This enables strong layout abstraction and composition. */}
      <div className={childrenClass}>{children}</div>
    </section>
  )
}

export default Card
