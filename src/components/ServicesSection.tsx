import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

const services = [
  {
    num: '01',
    title: 'Premium Web & App Development',
    desc: 'High-quality digital products built for performance and longevity. From offline-first desktop tools to full SaaS platforms — we ship production-ready software that scales.',
    tags: ['React', 'Next.js', 'Node.js', 'Django', 'PostgreSQL'],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 64, height: 64 }}>
        <rect x="8" y="14" width="64" height="42" rx="6" />
        <line x1="40" y1="56" x2="40" y2="66" /><line x1="24" y1="66" x2="56" y2="66" />
        <line x1="18" y1="28" x2="34" y2="28" /><line x1="18" y1="36" x2="40" y2="36" /><line x1="18" y1="44" x2="30" y2="44" />
        <polyline points="46,32 52,38 46,44" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'AI Integrations for Business',
    desc: 'Intelligent automation that reduces manual overhead. LangChain pipelines, LLM-powered agents, grievance detection, RAG systems — built to reason, decide, and act.',
    tags: ['LangChain', 'LLMs', 'Python', 'FastAPI', 'OpenAI'],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 64, height: 64 }}>
        <circle cx="40" cy="28" r="14" />
        <circle cx="40" cy="28" r="5" fill="currentColor" fillOpacity="0.12" />
        <line x1="40" y1="14" x2="40" y2="8" /><circle cx="40" cy="6" r="3" />
        <line x1="40" y1="42" x2="40" y2="52" />
        <line x1="26" y1="21" x2="15" y2="15" /><circle cx="13" cy="13" r="3" />
        <line x1="54" y1="21" x2="65" y2="15" /><circle cx="67" cy="13" r="3" />
        <line x1="26" y1="35" x2="15" y2="41" /><circle cx="13" cy="43" r="3" />
        <line x1="54" y1="35" x2="65" y2="41" /><circle cx="67" cy="43" r="3" />
        <path d="M 28 56 Q 40 48 52 56 Q 52 70 40 72 Q 28 70 28 56Z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Brand, Identity & Digital Marketing',
    desc: "Beyond code — Zipsar helps businesses establish their complete visual presence and reach. Logos, comprehensive brand guidelines, SEO, performance marketing, and design systems that communicate authority and trust.",
    tags: ['Logo Design', 'Brand Systems', 'Figma', 'UI/UX', 'SEO', 'Performance Marketing'],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 64, height: 64 }}>
        <rect x="10" y="20" width="44" height="44" rx="4" />
        <path d="M 10 34 L 54 34" /><line x1="26" y1="20" x2="26" y2="64" />
        <circle cx="62" cy="18" r="8" />
        <line x1="67" y1="24" x2="76" y2="34" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="44" r="6" fill="currentColor" fillOpacity="0.1" />
        <line x1="14" y1="24" x2="22" y2="24" /><line x1="14" y1="28" x2="22" y2="28" />
      </svg>
    ),
  },
]

const pillars = [
  { title: 'Deep Domain Expertise', desc: 'Battle-tested across industries from e-commerce to enterprise.' },
  { title: 'Result-Oriented', desc: 'User-centric outcomes measured by real-world impact, not just deliverables.' },
  { title: 'Agile Partnerships', desc: 'Flexible for early teams, structured enough for enterprise-grade delivery.' },
  { title: 'Innovation & Impact', desc: 'We build with a product mindset — always eyeing the next milestone.' },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      })
      const cards = cardsRef.current?.querySelectorAll('.service-card') ?? []
      gsap.from(cards, {
        y: 80, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 78%' },
      })
      const pillars = pillarsRef.current?.querySelectorAll('.pillar-item') ?? []
      gsap.from(pillars, {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: pillarsRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" style={{ padding: '8rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: '4rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--grey)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          // what we build
        </p>
        <h2 ref={titleRef} style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 640,
        }}>
          Three pillars.<br />One seamless team.
        </h2>
      </div>

      <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}>
        {services.map((s) => (
          <div key={s.num} className="service-card">
            <div style={{ marginBottom: '2rem', color: 'var(--black)' }}>{s.icon}</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--grey)', marginBottom: '0.6rem' }}>{s.num}</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.2 }}>
              {s.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--grey)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
              {s.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {s.tags.map(t => <span key={t} className="pill">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Core Pillars */}
      <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)', paddingTop: '4rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--grey)', marginBottom: '2.5rem', textTransform: 'uppercase' }}>
          // our positioning
        </p>
        <div ref={pillarsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {pillars.map((p, i) => (
            <div key={i} className="pillar-item">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--grey)', marginBottom: '0.6rem' }}>
                0{i + 1}
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.6rem' }}>
                {p.title}
              </h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--grey)', lineHeight: 1.85 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
