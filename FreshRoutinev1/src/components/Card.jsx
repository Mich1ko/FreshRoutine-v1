/* Object destructuring is used here to extract properties from the `props` object immediately.
   We can also set default values directly, like `variant = 'dark'` and `className = ''`. */
function Card({
  eyebrow,
  title,
  description,
  accentClassName,
  className = '',
  children,
  variant = 'dark', // 'dark' (default) or 'light'
  bgClass, // optional override for background
}) {
  // Derived State: We compute `isLight` and subsequent class names directly during render.
  // This avoids unnecessarily adding `useState` and `useEffect`.
  const isLight = variant === 'light'

  const accentDefault = isLight ? 'text-violet-700' : 'text-violet-300'
  // Slightly more translucent light background for a subtle glass effect
  const bg = bgClass ?? (isLight ? 'bg-white/40' : 'bg-white/5')
  

  const titleClass = isLight
    ? 'text-xl font-semibold text-slate-900'
    : 'text-xl font-semibold text-white'
  const descClass = isLight ? 'text-sm text-slate-700' : 'text-sm text-white/65'
  const childrenClass = [
    isLight ? 'text-slate-800' : 'text-white/85',
    'text-sm space-y-3 flex-1 min-h-0 flex flex-col'
  ].join(' ')

  const cardClassName = [
    'h-full rounded-2xl border-4',
    ' border-slate-900',
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
