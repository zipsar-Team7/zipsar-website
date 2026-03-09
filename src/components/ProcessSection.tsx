import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

const steps = [
  { num: '01', title: 'Discover', desc: 'Understand your vision, goals & challenges. We listen before we build.' },
  { num: '02', title: 'Define', desc: 'Shape requirements into clear, achievable scope — no ambiguity, no surprises.' },
  { num: '03', title: 'Design', desc: 'Create UI/UX flows, wireframes & prototypes that users actually want to use.' },
  { num: '04', title: 'Develop', desc: 'Build scalable applications using a modern, battle-tested tech stack.' },
  { num: '05', title: 'Test', desc: 'Rigorous QA across devices, scenarios, and edge cases. We ship confident.' },
  { num: '06', title: 'Deploy & Support', desc: "Continuous improvement and guided scaling — we're partners, not just vendors." },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-head', {
        y: 50, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.process-head', start: 'top 82%' },
      })
      gsap.from('.process-step', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.process-grid', start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" style={{ padding: '8rem 2rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em',
          color: 'var(--grey)', marginBottom: '1rem', textTransform: 'uppercase',
        }}>
          // how we work
        </p>

        <h2 className="process-head" style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.1,
          maxWidth: 580, marginBottom: '4rem',
        }}>
          Our design process.
        </h2>

        <div className="process-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}>
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="process-step"
              style={{
                padding: '2.5rem 2rem',
                borderTop: '1px solid rgba(17,17,17,0.1)',
                borderRight: (i % 3 !== 2) ? '1px solid rgba(17,17,17,0.08)' : 'none',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(17,17,17,0.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.15em', color: 'var(--grey)', marginBottom: '1rem',
              }}>
                {s.num}
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: '0.75rem',
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--grey)', lineHeight: 1.85,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
