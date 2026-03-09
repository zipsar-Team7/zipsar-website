import { useEffect, useRef } from 'react'
import { gsap, splitWords } from '../lib/scroll'

const RobotSVG = () => (
  <svg viewBox="0 0 260 340" fill="none" xmlns="http://www.w3.org/2000/svg"
    stroke="rgba(255,255,255,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: 220, height: 'auto' }}>
    {/* Antenna */}
    <line x1="130" y1="36" x2="130" y2="16" />
    <circle cx="130" cy="10" r="7" fill="rgba(255,255,255,0.15)" />
    <circle cx="130" cy="10" r="3" fill="white" stroke="none" />
    {/* Head */}
    <rect x="72" y="36" width="116" height="90" rx="18" fill="rgba(255,255,255,0.04)" />
    {/* Eye sockets */}
    <circle cx="106" cy="72" r="18" fill="rgba(255,255,255,0.06)" />
    <circle cx="154" cy="72" r="18" fill="rgba(255,255,255,0.06)" />
    {/* Pupils */}
    <circle cx="106" cy="72" r="8" fill="rgba(255,255,255,0.2)" />
    <circle cx="154" cy="72" r="8" fill="rgba(255,255,255,0.2)" />
    {/* Eye shine */}
    <circle cx="109" cy="69" r="3" fill="white" stroke="none" />
    <circle cx="157" cy="69" r="3" fill="white" stroke="none" />
    {/* Mouth */}
    <path d="M 100 106 Q 108 114 130 114 Q 152 114 160 106" strokeWidth="2" />
    {/* Neck */}
    <rect x="118" y="126" width="24" height="16" rx="4" fill="rgba(255,255,255,0.06)" />
    {/* Body */}
    <rect x="58" y="142" width="144" height="116" rx="16" fill="rgba(255,255,255,0.04)" />
    {/* Chest panels */}
    <rect x="76" y="160" width="48" height="38" rx="8" fill="rgba(255,255,255,0.07)" />
    <rect x="136" y="160" width="48" height="38" rx="8" fill="rgba(255,255,255,0.07)" />
    {/* Panel lines */}
    <line x1="84" y1="174" x2="116" y2="174" strokeOpacity="0.6" />
    <line x1="84" y1="183" x2="108" y2="183" strokeOpacity="0.6" />
    <line x1="84" y1="192" x2="116" y2="192" strokeOpacity="0.6" />
    {/* Center indicator */}
    <circle cx="130" cy="214" r="10" fill="rgba(255,255,255,0.08)" />
    <circle cx="130" cy="214" r="4" fill="rgba(255,255,255,0.3)" stroke="none" />
    {/* Arms */}
    <rect x="14" y="148" width="44" height="24" rx="10" fill="rgba(255,255,255,0.05)" />
    <line x1="58" y1="160" x2="58" y2="160" />
    <path d="M 58 158 L 36 158" strokeWidth="1.5" />
    <rect x="202" y="148" width="44" height="24" rx="10" fill="rgba(255,255,255,0.05)" />
    <path d="M 202 158 L 224 158" strokeWidth="1.5" />
    {/* Hand dots */}
    <circle cx="18" cy="158" r="4" fill="rgba(255,255,255,0.2)" stroke="none" />
    <circle cx="242" cy="158" r="4" fill="rgba(255,255,255,0.2)" stroke="none" />
    {/* Legs */}
    <rect x="86" y="262" width="36" height="60" rx="12" fill="rgba(255,255,255,0.04)" />
    <rect x="138" y="262" width="36" height="60" rx="12" fill="rgba(255,255,255,0.04)" />
    {/* Feet */}
    <rect x="78" y="310" width="52" height="20" rx="8" fill="rgba(255,255,255,0.07)" />
    <rect x="130" y="310" width="52" height="20" rx="8" fill="rgba(255,255,255,0.07)" />
  </svg>
)

const leftChips = [
  { label: 'LangChain', icon: '⛓️', desc: 'Orchestration' },
  { label: 'RAG Pipelines', icon: '🔍', desc: 'Retrieval AI' },
  { label: 'LLM Agents', icon: '🤖', desc: 'Autonomous logic' },
]

const rightChips = [
  { label: 'OpenAI / Gemini', icon: '✦', desc: 'Foundation models' },
  { label: 'Workflow Automation', icon: '⚡', desc: 'Process intelligence' },
  { label: 'Vector Databases', icon: '🗄️', desc: 'Semantic search' },
]

const features = [
  { num: '01', title: 'Grievance Detection', desc: 'NLP systems that auto-classify and route customer issues with precision.' },
  { num: '02', title: 'Workflow Automation', desc: 'LLM reasoning at every decision gate — cut manual overhead drastically.' },
  { num: '03', title: 'Intelligent Agents', desc: 'Autonomous agents that retrieve, reason, and respond using RAG architectures.' },
  { num: '04', title: 'LLM Integration', desc: 'OpenAI, Gemini, and open-source models integrated into your existing stack.' },
]

function AIChip({ label, icon, desc, side }: { label: string; icon: string; desc: string; side: 'left' | 'right' }) {
  return (
    <div className="ai-chip-card" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 14,
      padding: '0.9rem 1.2rem',
      transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
      cursor: 'default',
      flexDirection: side === 'right' ? 'row-reverse' : 'row',
      textAlign: side === 'right' ? 'right' : 'left',
      position: 'relative',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement
      el.style.background = 'rgba(255,255,255,0.09)'
      el.style.borderColor = 'rgba(255,255,255,0.22)'
      el.style.transform = side === 'left' ? 'translateX(-4px)' : 'translateX(4px)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement
      el.style.background = 'rgba(255,255,255,0.05)'
      el.style.borderColor = 'rgba(255,255,255,0.1)'
      el.style.transform = 'translateX(0)'
    }}
    >
      {/* Connector dot */}
      <div style={{
        position: 'absolute',
        [side === 'left' ? 'right' : 'left']: -1,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 8, height: 8, borderRadius: '50%',
        background: 'rgba(255,255,255,0.4)',
        boxShadow: '0 0 8px rgba(255,255,255,0.3)',
      }} />
      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--white)', lineHeight: 1.2 }}>
          {label}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: 2, letterSpacing: '0.05em' }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function AISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        const words = splitWords(headRef.current)
        gsap.to(words, {
          y: 0, duration: 1, stagger: 0.06, ease: 'expo.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 75%' },
        })
      }
      gsap.from(subRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: subRef.current, start: 'top 80%' },
      })
      gsap.from('.ai-robot-wrap', {
        y: 40, opacity: 0, scale: 0.92, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.ai-diagram', start: 'top 68%' },
      })
      gsap.from('.ai-chip-card', {
        x: (i) => i < 3 ? -40 : 40,
        opacity: 0, stagger: 0.12, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: '.ai-diagram', start: 'top 65%' },
      })
      gsap.from('.ai-feat', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.ai-features-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="ai" style={{
      background: 'var(--black)', color: 'var(--white)',
      padding: '8rem 2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Radial glow center */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.28)', marginBottom: '1.5rem', textTransform: 'uppercase',
          }}>
            // ai integrations for business
          </p>
          <h2 ref={headRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 7vw, 7rem)', letterSpacing: '-0.035em', lineHeight: 1.0,
            maxWidth: 820, margin: '0 auto',
          }}>
            Automation that thinks for itself.
          </h2>
          <p ref={subRef} style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
            color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '2rem auto 0', lineHeight: 1.9,
          }}>
            We implement intelligent systems that reduce manual overhead for clients —
            from LangChain-powered agents to complete LLM-driven workflow automation.
          </p>
        </div>

        {/* 3-column diagram: chips | robot | chips */}
        <div className="ai-diagram" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '2rem',
          alignItems: 'center',
          maxWidth: 900,
          margin: '0 auto 6rem',
        }}>
          {/* Left chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {leftChips.map((c) => (
              <AIChip key={c.label} label={c.label} icon={c.icon} desc={c.desc} side="left" />
            ))}
          </div>

          {/* Center robot */}
          <div className="ai-robot-wrap" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
            padding: '2rem 1.5rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            boxShadow: '0 0 60px rgba(255,255,255,0.04)',
            animation: 'float 5s ease-in-out infinite',
          }}>
            <RobotSVG />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 100, padding: '6px 16px',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                display: 'inline-block',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>
                AI Engine · Active
              </span>
            </div>
          </div>

          {/* Right chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rightChips.map((c) => (
              <AIChip key={c.label} label={c.label} icon={c.icon} desc={c.desc} side="right" />
            ))}
          </div>
        </div>

        {/* Features 4-column grid */}
        <div className="ai-features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {features.map((f, i) => (
            <div key={f.title} className="ai-feat" style={{
              padding: '2rem 1.5rem',
              borderRight: i < features.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem',
              }}>{f.num}</p>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem',
                marginBottom: '0.6rem', color: 'var(--white)', lineHeight: 1.3,
              }}>
                {f.title}
              </h4>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.77rem',
                color: 'rgba(255,255,255,0.38)', lineHeight: 1.85,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
