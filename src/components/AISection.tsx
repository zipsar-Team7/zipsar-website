import { useEffect, useRef } from 'react'
import { gsap, splitWords } from '../lib/scroll'
import { LEFT_MSGS, RIGHT_MSGS, LCX, RCX, HCY, HR, BW, BH, BY, LBX, RBX } from './HeroSection'

const features = [
  { num: '01', title: 'Grievance Detection', desc: 'NLP systems that auto-classify and route customer issues with precision.' },
  { num: '02', title: 'Workflow Automation', desc: 'LLM reasoning at every decision gate — cut manual overhead drastically.' },
  { num: '03', title: 'Intelligent Agents', desc: 'Autonomous agents that retrieve, reason, and respond using RAG architectures.' },
  { num: '04', title: 'LLM Integration', desc: 'OpenAI, Gemini, and open-source models integrated into your existing stack.' },
]

export default function AISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const svgWrapRef = useRef<HTMLDivElement>(null)

  /* Illustration refs */
  const leftBubbleRef  = useRef<SVGGElement>(null)
  const rightBubbleRef = useRef<SVGGElement>(null)
  const leftT1         = useRef<SVGTextElement>(null)
  const leftT2         = useRef<SVGTextElement>(null)
  const rightT1        = useRef<SVGTextElement>(null)
  const rightT2        = useRef<SVGTextElement>(null)
  const leftHeadRef    = useRef<SVGGElement>(null)
  const rightHeadRef   = useRef<SVGGElement>(null)
  const pkt1Ref        = useRef<SVGCircleElement>(null)
  const pkt2Ref        = useRef<SVGCircleElement>(null)

  let msgIdx = 0

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
      /* Illustration entrance */
      gsap.from(svgWrapRef.current, {
        y: 50, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: svgWrapRef.current, start: 'top 70%' },
      })
      gsap.from('.ai-feat', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.ai-features-grid', start: 'top 80%' },
      })
    }, sectionRef)

    /* Start conversation animation after section enters view */
    let convStarted = false
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !convStarted) {
        convStarted = true
        setTimeout(() => buildConversation(), 600)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    if (sectionRef.current) observer.observe(sectionRef.current)

    function buildConversation() {
      gsap.set([leftBubbleRef.current, rightBubbleRef.current], {
        opacity: 0, scale: 0.7, transformOrigin: 'center bottom',
      })
      gsap.set([pkt1Ref.current, pkt2Ref.current], { opacity: 0 })

      gsap.timeline({ repeat: -1, onRepeat: nextMsg })
        .to(leftHeadRef.current, { y: -4, duration: 0.25, ease: 'power2.out' })
        .to(leftBubbleRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, '<0.05')
        .to(leftHeadRef.current, { y: 0, duration: 0.25 }, '<0.2')
        .to({}, { duration: 1 })
        .fromTo(pkt1Ref.current,
          { x: LCX + 30, y: HCY + 40, opacity: 0, scale: 0.5 },
          { x: 310, y: 126, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' }
        )
        .to(pkt1Ref.current, { opacity: 0, scale: 1.5, duration: 0.2 }, '+=0.1')
        .fromTo(pkt2Ref.current,
          { x: 560, y: 126, opacity: 0, scale: 0.5 },
          { x: RCX - 40, y: HCY + 40, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' },
          '-=0.2'
        )
        .to(pkt2Ref.current, { opacity: 0, scale: 1.5, duration: 0.2 }, '+=0.1')
        .to({}, { duration: 1 })
        .to(rightHeadRef.current, { y: -4, duration: 0.25, ease: 'power2.out' })
        .to(rightBubbleRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, '<0.05')
        .to(rightHeadRef.current, { y: 0, duration: 0.25 }, '<0.2')
        .to({}, { duration: 2.2 })
        .to([leftBubbleRef.current, rightBubbleRef.current], { opacity: 0, scale: 0.75, y: -8, duration: 0.35, ease: 'power2.in' })
        .set([leftBubbleRef.current, rightBubbleRef.current], { y: 0 })
        .to({}, { duration: 1.5 })
    }

    function nextMsg() {
      msgIdx = (msgIdx + 1) % LEFT_MSGS.length
      if (leftT1.current)  leftT1.current.textContent  = LEFT_MSGS[msgIdx][0]
      if (leftT2.current)  leftT2.current.textContent  = LEFT_MSGS[msgIdx][1]
      if (rightT1.current) rightT1.current.textContent = RIGHT_MSGS[msgIdx][0]
      if (rightT2.current) rightT2.current.textContent = RIGHT_MSGS[msgIdx][1]
    }

    return () => {
      ctx.revert()
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="ai" className="ai-section" style={{
      background: 'var(--black)', color: 'var(--white)',
      padding: '8rem 2rem 4rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
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

        {/* ── ILLUSTRATION (Replaced Robot Diagram) ── */}
        <div ref={svgWrapRef} style={{ width: '100%', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
          <svg
            viewBox="0 -20 900 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', maxWidth: 880, display: 'block', overflow: 'visible' }}
            strokeLinecap="round" strokeLinejoin="round"
            stroke="rgba(255,255,255,0.55)" strokeWidth="2"
          >
            {/* Ground */}
            <line x1="0" y1="230" x2="900" y2="230" strokeOpacity="0.1" />

            {/* ════ LEFT DEVELOPER ════ */}
            <g ref={leftHeadRef}>
              <circle cx={LCX} cy={HCY} r={HR} />
              <circle cx={LCX - 9} cy={HCY - 5} r="4.5" fill="rgba(255,255,255,0.7)" />
              <circle cx={LCX + 9} cy={HCY - 5} r="4.5" fill="rgba(255,255,255,0.7)" />
              <path d={`M ${LCX-12} ${HCY+11} Q ${LCX} ${HCY+21} ${LCX+12} ${HCY+11}`} fill="none" />
            </g>
            <rect x={LCX-28} y="105" width="56" height="66" rx="12" fill="rgba(255,255,255,0.05)" />
            <line x1={LCX-28} y1="122" x2={LCX-64} y2="140" />
            <line x1={LCX+28} y1="122" x2={LCX+90} y2="100" />
            <line x1={LCX-14} y1="171" x2={LCX-18} y2="230" />
            <line x1={LCX+14} y1="171" x2={LCX+18} y2="230" />

            {/* ── LEFT SPEECH BUBBLE ── */}
            <g
              ref={leftBubbleRef}
              style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' } as React.CSSProperties}
            >
              <rect x={LBX} y={BY} width={BW} height={BH} rx="12"
                fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
              <path
                d={`M ${LCX-10},${BY+BH} L ${LCX},${BY+BH+14} L ${LCX+10},${BY+BH}`}
                fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8"
              />
              <line
                x1={LCX-9} y1={BY+BH} x2={LCX+9} y2={BY+BH}
                stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"
              />
              <text ref={leftT1}
                x={LCX} y={BY+16}
                textAnchor="middle" fontFamily="'Space Mono',monospace"
                fontSize="9.5" fontWeight="700" fill="rgba(255,255,255,0.9)" stroke="none"
              >
                {LEFT_MSGS[0][0]}
              </text>
              <text ref={leftT2}
                x={LCX} y={BY+33}
                textAnchor="middle" fontFamily="'Space Mono',monospace"
                fontSize="9.5" fill="rgba(255,255,255,0.65)" stroke="none"
              >
                {LEFT_MSGS[0][1]}
              </text>
            </g>

            {/* ════ MONITOR ════ */}
            <rect x="310" y="45" width="250" height="162" rx="12" fill="rgba(255,255,255,0.03)" />
            <rect x="310" y="45" width="250" height="24" rx="10" fill="rgba(255,255,255,0.06)" />
            <circle cx="328" cy="57" r="4.5" fill="rgba(255,255,255,0.2)" />
            <circle cx="345" cy="57" r="4.5" fill="rgba(255,255,255,0.2)" />
            <circle cx="362" cy="57" r="4.5" fill="rgba(255,255,255,0.2)" />
            <line x1="328" y1="86"  x2="400" y2="86"  strokeWidth="2.5" strokeOpacity="0.5" />
            <line x1="328" y1="101" x2="425" y2="101" strokeOpacity="0.3" />
            <line x1="340" y1="116" x2="408" y2="116" strokeOpacity="0.35" />
            <line x1="340" y1="131" x2="445" y2="131" strokeOpacity="0.28" />
            <line x1="328" y1="146" x2="395" y2="146" strokeOpacity="0.4" />
            <line x1="340" y1="161" x2="418" y2="161" strokeOpacity="0.28" />
            <line x1="328" y1="176" x2="375" y2="176" strokeOpacity="0.33" />
            <line x1="435" y1="207" x2="435" y2="230" />
            <line x1="400" y1="230" x2="470" y2="230" />

            {/* ════ RIGHT DEVELOPER ════ */}
            <g ref={rightHeadRef}>
              <circle cx={RCX} cy={HCY} r={HR} />
              <circle cx={RCX-9} cy={HCY-5} r="4.5" fill="rgba(255,255,255,0.7)" />
              <circle cx={RCX+9} cy={HCY-5} r="4.5" fill="rgba(255,255,255,0.7)" />
              <path d={`M ${RCX-12} ${HCY+11} Q ${RCX} ${HCY+21} ${RCX+12} ${HCY+11}`} fill="none" />
              <path d={`M ${RCX-26} ${HCY} Q ${RCX-26} ${HCY-31} ${RCX} ${HCY-31} Q ${RCX+26} ${HCY-31} ${RCX+26} ${HCY}`} fill="none" strokeWidth="2.5" />
              <rect x={RCX-33} y={HCY-4} width="9" height="14" rx="4" fill="rgba(255,255,255,0.18)" />
              <rect x={RCX+24} y={HCY-4} width="9" height="14" rx="4" fill="rgba(255,255,255,0.18)" />
            </g>
            <rect x={RCX-28} y="105" width="56" height="66" rx="12" fill="rgba(255,255,255,0.05)" />
            <line x1={RCX-28} y1="122" x2={RCX-90} y2="100" />
            <line x1={RCX+28} y1="122" x2={RCX+62} y2="140" />
            <line x1={RCX-14} y1="171" x2={RCX-18} y2="230" />
            <line x1={RCX+14} y1="171" x2={RCX+18} y2="230" />

            {/* ── RIGHT SPEECH BUBBLE ── */}
            <g
              ref={rightBubbleRef}
              style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' } as React.CSSProperties}
            >
              <rect x={RBX} y={BY} width={BW} height={BH} rx="12"
                fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
              <path
                d={`M ${RCX-10},${BY+BH} L ${RCX},${BY+BH+14} L ${RCX+10},${BY+BH}`}
                fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8"
              />
              <line
                x1={RCX-9} y1={BY+BH} x2={RCX+9} y2={BY+BH}
                stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"
              />
              <text ref={rightT1}
                x={RCX} y={BY+16}
                textAnchor="middle" fontFamily="'Space Mono',monospace"
                fontSize="9.5" fontWeight="700" fill="rgba(255,255,255,0.9)" stroke="none"
              >
                {RIGHT_MSGS[0][0]}
              </text>
              <text ref={rightT2}
                x={RCX} y={BY+33}
                textAnchor="middle" fontFamily="'Space Mono',monospace"
                fontSize="9.5" fill="rgba(255,255,255,0.65)" stroke="none"
              >
                {RIGHT_MSGS[0][1]}
              </text>
            </g>

            {/* ── DATA PARTICLES ── */}
            <circle ref={pkt1Ref} r="4" fill="rgba(255,255,255,0.9)" />
            <circle ref={pkt2Ref} r="4" fill="rgba(255,255,255,0.9)" />

            {/* Ground captions */}
            <text x={LCX} y="252" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" fill="rgba(255,255,255,0.22)" stroke="none">// visionary client</text>
            <text x="435"  y="252" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" fill="rgba(255,255,255,0.22)" stroke="none">// seamless execution</text>
            <text x={RCX} y="252" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" fill="rgba(255,255,255,0.22)" stroke="none">// zipsar agent</text>
          </svg>
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
