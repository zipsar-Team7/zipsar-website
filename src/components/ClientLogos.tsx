import senthuron from '../assets/logos/senthuron.jpeg'
import forzic from '../assets/logos/forzic.jpeg'
import flippedturtle from '../assets/logos/flippedturtle.jpeg'
import valar from '../assets/logos/valar.jpeg'
import geeaar from '../assets/logos/geeaar.jpeg'
import sociopotents from '../assets/logos/sociopotents.jpeg'
import startupculture from '../assets/logos/startupculture.jpeg'

const logos = [
  { src: senthuron, name: 'Senthuron Tech' },
  { src: forzic, name: 'Forzic Digital' },
  { src: valar, name: 'Valar Digital Commerce' },
  { src: geeaar, name: 'Geeaar Consumer Solutions' },
  { src: sociopotents, name: 'Socio Potents' },
  { src: startupculture, name: 'Startup Culture' },
  { src: flippedturtle, name: 'Flippedturtle' },
]

// Duplicate for seamless infinite scroll
const doubled = [...logos, ...logos]

export default function ClientLogos() {
  return (
    <section style={{
      padding: '5rem 0',
      background: 'var(--black)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          // collaborations that matter
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          letterSpacing: '-0.03em',
          color: 'var(--white)',
          lineHeight: 1.1,
        }}>
          Trusted by builders & brands.
        </h2>
      </div>

      {/* Scrolling logo strip */}
      <div style={{ position: 'relative' }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to right, var(--black), transparent)',
          pointerEvents: 'none',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to left, var(--black), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Row 1 — scroll left */}
        <div style={{ display: 'flex', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            gap: '1.25rem',
            animation: 'marqueeLeft 28s linear infinite',
            flexShrink: 0,
          }}>
            {doubled.map((logo, i) => (
              <LogoCard key={i} logo={logo} />
            ))}
          </div>
        </div>

        {/* Row 2 — scroll right */}
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            gap: '1.25rem',
            animation: 'marqueeRight 24s linear infinite',
            flexShrink: 0,
          }}>
            {[...doubled].reverse().map((logo, i) => (
              <LogoCard key={i} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'rgba(255,255,255,0.2)',
        marginTop: '3rem',
        letterSpacing: '0.08em',
      }}>
        + ValarCommerce · GK Events · Schrodinger's Cat & more
      </p>
    </section>
  )
}

function LogoCard({ logo }: { logo: { src: string; name: string } }) {
  return (
    <div
      title={logo.name}
      style={{
        flexShrink: 0,
        width: 220,
        height: 120,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.35s ease, border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'rgba(255,255,255,0.09)'
        el.style.borderColor = 'rgba(255,255,255,0.22)'
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.6)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.borderColor = 'rgba(255,255,255,0.1)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      <img
        src={logo.src}
        alt={logo.name}
        style={{
          width: '85%',
          height: '85%',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
