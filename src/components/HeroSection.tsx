import { useEffect, useRef } from 'react'
import { gsap, splitWords } from '../lib/scroll'

/* ── Conversation pairs that cycle ── */
const LEFT_MSGS = [
  ['We need a product fast.', 'But built to scale.'],
  ['Can you integrate', 'smart LLM agents?'],
  ['Web, Mobile & AI.', 'Too many teams...'],
]
const RIGHT_MSGS = [
  ['Full-stack ready.', 'Shipped in weeks. 🚀'],
  ['Already done.', 'Zero overhead. ✦'],
  ['One team. One roof.', 'That is Zipsar. →'],
]

/* SVG coordinate constants */
const LCX = 130
const RCX = 760
const HCY = 75
const HR  = 28
const BW  = 166
const BH  = 44
const BY  = 3
const LBX = LCX - BW / 2
const RBX = RCX - BW / 2

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const btnRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        const words = splitWords(headRef.current)
        gsap.to(words, { y: 0, duration: 0.9, stagger: 0.055, ease: 'expo.out', delay: 0.2 })
      }
      gsap.from(subRef.current, { y: 30, opacity: 0, duration: 0.9, delay: 0.65, ease: 'expo.out' })
      gsap.from(btnRef.current, { y: 24, opacity: 0, duration: 0.8, delay: 0.85, ease: 'expo.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 'calc(var(--nav-height) + 3rem) 2rem 6rem',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', color: 'var(--grey)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
        Premium Builder's for Startups &nbsp;·&nbsp; SMBs &nbsp;·&nbsp; Enterprises
      </p>

      <h1 ref={headRef} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', maxWidth: 900, fontSize: 'clamp(2.8rem, 8.5vw, 8.5rem)' }}>
        Building what matters.
      </h1>

      <p ref={subRef} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.82rem, 1.4vw, 1.05rem)', color: 'var(--grey)', maxWidth: 560, margin: '2rem auto 2.5rem', lineHeight: 1.9 }}>
        More than developers — we are dream builders. Web, Mobile &amp; AI under one roof,
        with reliable, scalable, fast execution for teams that refuse to compromise.
      </p>

      <div ref={btnRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#contact" className="btn-primary">Start a project →</a>
        <a href="#services" className="btn-outline">What we build</a>
      </div>
    </section>
  )
}

/* Re-export constants so AISection can import them */
export { LEFT_MSGS, RIGHT_MSGS, LCX, RCX, HCY, HR, BW, BH, BY, LBX, RBX }
