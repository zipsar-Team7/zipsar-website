const STACK = ['React', 'Node.js', 'Django', 'LangChain', 'LLMs', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker', 'AWS']
const STACK2 = ['Next.js', 'GraphQL', 'Celery', 'Vector DBs', 'HuggingFace', 'Tailwind', 'Vite', 'Prisma', 'Socket.io', 'OpenAI', 'Figma', 'CI/CD']

const sep = <span style={{ margin: '0 1.2rem', opacity: 0.25, fontSize: 'inherit' }}>✦</span>

const Row = ({ items, dir }: { items: string[], dir: 'l' | 'r' | 'l2' }) => {
  const trackClass = dir === 'l' ? 'marquee-track-l' : dir === 'r' ? 'marquee-track-r' : 'marquee-track-l2'
  const doubled = [...items, ...items]
  return (
    <div className="marquee-row" style={{ lineHeight: 1 }}>
      <div className={trackClass} style={{ display: 'flex', alignItems: 'center' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span>{t}</span>{sep}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  const sizes = ['clamp(2rem, 5vw, 5rem)', 'clamp(2.8rem, 7vw, 7.5rem)', 'clamp(1.8rem, 4vw, 4rem)']
  const weights = [700, 800, 600]
  const opacities = [0.9, 1, 0.65]

  return (
    <section style={{
      padding: '5rem 0', background: 'var(--bg)', overflow: 'hidden',
      borderTop: '1px solid rgba(17,17,17,0.08)', borderBottom: '1px solid rgba(17,17,17,0.08)',
      position: 'relative',
    }}>
      <p style={{
        textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        letterSpacing: '0.2em', color: 'var(--grey)', marginBottom: '3rem', textTransform: 'uppercase',
      }}>// our technology stack</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            fontFamily: 'var(--font-display)', fontWeight: weights[i],
            fontSize: sizes[i], letterSpacing: '-0.02em', color: 'var(--black)',
            opacity: opacities[i], lineHeight: 1.05,
          }}>
            <Row items={i % 2 === 0 ? STACK : STACK2} dir={i === 0 ? 'l' : i === 1 ? 'r' : 'l2'} />
          </div>
        ))}
      </div>
    </section>
  )
}
