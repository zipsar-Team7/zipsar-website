import client1 from '../assets/logos/client-1.jpg'
import client2 from '../assets/logos/client-2.jpg'
import client3 from '../assets/logos/client-3.jpg'
import client4 from '../assets/logos/client-4.jpg'
import client5 from '../assets/logos/client-5.jpg'
import client6 from '../assets/logos/client-6.jpg'
import client7 from '../assets/logos/client-7.jpg'

const logos = [
  { src: client1, name: 'Client 1' },
  { src: client2, name: 'Client 2' },
  { src: client3, name: 'Client 3' },
  { src: client4, name: 'Client 4' },
  { src: client5, name: 'Client 5' },
  { src: client6, name: 'Client 6' },
  { src: client7, name: 'Client 7' },
]

// Duplicate for seamless infinite scroll
const doubled = [...logos, ...logos]

export default function ClientLogos() {
  return (
    <section id="clients" style={{
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
        border: '1px solid rgba(255,255,255,0.05)',
        background: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
