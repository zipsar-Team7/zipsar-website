import { useEffect, useRef } from 'react'
import { gsap, splitWords } from '../lib/scroll'

const usps = [
  { icon: '⚡', title: 'End-to-End Expertise', desc: 'Web, Mobile & AI under one roof — no handoffs, no gaps.' },
  { icon: '📈', title: 'Service-First Stability', desc: 'Proven revenue model means we\'re here for the long haul.' },
  { icon: '🛡️', title: 'Proven Track Record', desc: 'Versatile client portfolio across industries and team sizes.' },
  { icon: '🔭', title: 'Product Vision', desc: 'SaaS tools & proprietary IP on the roadmap — we think ahead.' },
]

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        const words = splitWords(headRef.current)
        gsap.to(words, {
          y: 0, duration: 1, stagger: 0.07, ease: 'expo.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        })
      }
      gsap.from('.cta-sub', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.cta-sub', start: 'top 85%' } })
      gsap.from('.cta-form', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.cta-form', start: 'top 85%' } })
      gsap.from('.usp-card', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.usp-grid', start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])


  return (
    <section ref={sectionRef} id="contact" style={{ padding: '8rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>

      {/* CTA */}
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.22em', color: 'var(--grey)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
          // let's build together
        </p>

        <h2 ref={headRef} style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2.5rem, 8vw, 8rem)', letterSpacing: '-0.035em', lineHeight: 1.0,
          marginBottom: '2rem',
        }}>
          Ready to build something remarkable?
        </h2>

        <p className="cta-sub" style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
          color: 'var(--grey)', maxWidth: 480, margin: '0 auto 3.5rem', lineHeight: 1.9,
        }}>
          Tell us about your project. We respond within 24 hours with a clear plan and transparent pricing.
        </p>

        <div className="cta-form" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <a href="https://calendly.com/zipsar-official/meet-us" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
            Let's talk →
          </a>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap',
          borderTop: '1px solid rgba(17,17,17,0.1)', paddingTop: '3rem',
        }}>
          {[
            { label: 'EMAIL', val: 'team@zipsar.com' },
            { label: 'RESPONSE TIME', val: '< 24 hours' },
            { label: 'CLIENTS SERVED', val: '10+ brands' },
          ].map(({ label, val }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--grey)', marginBottom: '0.4rem' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(17,17,17,0.1)',
      padding: '2rem 2.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>ZIPSAR /&gt;</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--grey)' }}>Building what matters.</span>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--grey)' }}>
        © 2025 Zipsar. &nbsp;·&nbsp; team@zipsar.com
      </p>
    </footer>
  )
}
