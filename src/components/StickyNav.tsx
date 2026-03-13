import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/scroll'

const NAV = [
  { label: 'HOME', id: 'home' },
  { label: 'WHAT WE BUILD', id: 'services' },
  { label: 'OUR DESIGN PROCESS', id: 'work' },
  { label: 'AI INTEGRATIONS', id: 'ai' },
  { label: 'COLLABORATIONS', id: 'clients' },
  { label: 'CONTACT US', id: 'contact' },
]

export default function StickyNav() {
  const [active, setActive] = useState(-1)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers = NAV.map(({ id }, i) => {
      const el = document.getElementById(id)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    })
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      triggers.forEach(t => t?.kill())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!overlayRef.current) return
    if (open) {
      gsap.fromTo(overlayRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'expo.inOut' }
      )
      gsap.fromTo('.menu-link',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      )
    }
  }, [open])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: 'var(--nav-height)',
        background: scrolled ? 'rgba(240,240,238,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(17,17,17,0.06)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700,
          letterSpacing: '0.05em', background: 'none', border: 'none',
          color: open ? 'var(--white)' : 'var(--black)', cursor: 'pointer',
          zIndex: 1001, transition: 'color 0.3s',
        }}>ZIPSAR /&gt;</button>

        <nav style={{
          display: 'flex', gap: 2,
          background: 'rgba(17,17,17,0.07)', borderRadius: 100, padding: 4,
        }}>
          {NAV.map(({ label, id }, i) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.67rem', fontWeight: 700,
              letterSpacing: '0.1em', padding: '6px 16px', borderRadius: 100,
              border: 'none', cursor: 'pointer',
              background: active === i ? 'var(--black)' : 'transparent',
              color: active === i ? 'var(--white)' : 'var(--grey)',
              transition: 'all 0.3s ease',
            }}>{label}</button>
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '0.1em', background: 'none', border: 'none',
          color: open ? 'var(--white)' : 'var(--black)', cursor: 'pointer',
          zIndex: 1001, transition: 'color 0.3s',
        }}>{open ? '✕ CLOSE' : '≡ MENU'}</button>
      </header>

      {/* Fullscreen overlay */}
      <div ref={overlayRef} style={{
        position: 'fixed', inset: 0, background: 'var(--black)',
        zIndex: 999, display: open ? 'flex' : 'none',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '1.25rem', clipPath: 'inset(0% 0% 100% 0%)',
      }}>
        {NAV.map(({ label, id }) => (
          <button key={id} className="menu-link" onClick={() => scrollTo(id)} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 800, color: 'var(--white)', background: 'none',
            border: 'none', cursor: 'pointer', letterSpacing: '-0.025em', lineHeight: 1,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.4'; (e.currentTarget as HTMLElement).style.transform = 'translateX(18px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)' }}
          >{label}</button>
        ))}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', marginTop: '2rem' }}>
          hello@zipsar.dev
        </p>
      </div>
    </>
  )
}
