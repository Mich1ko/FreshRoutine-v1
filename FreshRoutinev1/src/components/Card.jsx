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
  const isLight = variant === 'light'

  const accentDefault = isLight ? 'text-violet-700' : 'text-violet-300'
  // Slightly more translucent light background for a subtle glass effect
  const bg = bgClass ?? (isLight ? 'bg-white/40' : 'bg-white/5')
  const border = isLight ? 'border-slate-200/30' : 'border-white/10'

  const titleClass = isLight
    ? 'text-xl font-semibold text-slate-900'
    : 'text-xl font-semibold text-white'
  const descClass = isLight ? 'text-sm text-slate-700' : 'text-sm text-white/65'
  const childrenClass = isLight ? 'space-y-3 text-sm text-slate-800' : 'space-y-3 text-sm text-white/85'

  const cardClassName = [
    'h-full rounded-2xl',
    border,
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

      <div className={childrenClass}>{children}</div>
    </section>
  )
}

export default Card
