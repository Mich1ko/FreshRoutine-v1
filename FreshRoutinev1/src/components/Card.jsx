function Card({
  eyebrow,
  title,
  description,
  accentClassName = 'text-violet-300',
  className = '',
  children,
}) {
  const cardClassName = [
    'h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={cardClassName}>
      <header className="mb-4 space-y-1">
        {eyebrow ? (
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${accentClassName}`}
          >
            {eyebrow}
          </p>
        ) : null}
        {title ? <h2 className="text-xl font-semibold text-white">{title}</h2> : null}
        {description ? <p className="text-sm text-white/65">{description}</p> : null}
      </header>

      <div className="space-y-3 text-sm text-white/85">{children}</div>
    </section>
  )
}

export default Card
