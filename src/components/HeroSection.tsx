import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, splitWords } from '../lib/scroll'

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
const LCX = 130  // Left dev head centre-x
const RCX = 760  // Right dev head centre-x
const HCY = 75   // Both heads centre-y
const HR  = 28   // Head radius
const BW  = 166  // Bubble width
const BH  = 44   // Bubble height
const BY  = 3    // Bubble top-y
const LBX = LCX - BW / 2  // Left bubble x
const RBX = RCX - BW / 2  // Right bubble x

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headRef     = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const btnRef      = useRef<HTMLDivElement>(null)
  const svgRef      = useRef<HTMLDivElement>(null)

  /* Conversation refs */
  const leftBubbleRef  = useRef<SVGGElement>(null)
  const rightBubbleRef = useRef<SVGGElement>(null)
  const leftT1         = useRef<SVGTextElement>(null)
  const leftT2         = useRef<SVGTextElement>(null)
  const rightT1        = useRef<SVGTextElement>(null)
  const rightT2        = useRef<SVGTextElement>(null)

  /* Left dev head bob ref */
  const leftHeadRef  = useRef<SVGGElement>(null)
  const rightHeadRef = useRef<SVGGElement>(null)

  /* Data packet refs */
  const pkt1Ref = useRef<SVGCircleElement>(null)
  const pkt2Ref = useRef<SVGCircleElement>(null)

  let msgIdx = 0

  useEffect(() => {
    /* 1. Page-load animations */
    const ctx = gsap.context(() => {
      if (headRef.current) {
        const words = splitWords(headRef.current)
        gsap.to(words, { y: 0, duration: 0.9, stagger: 0.055, ease: 'expo.out', delay: 0.2 })
      }
      gsap.from(subRef.current, { y: 30, opacity: 0, duration: 0.9, delay: 0.65, ease: 'expo.out' })
      gsap.from(btnRef.current, { y: 24, opacity: 0, duration: 0.8, delay: 0.85, ease: 'expo.out' })
      gsap.from(svgRef.current, { y: 60, opacity: 0, duration: 1.3, delay: 0.4, ease: 'expo.out' })

      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top top', end: '+=400', scrub: 1.2,
        onUpdate: (self) => {
          if (headRef.current) gsap.set(headRef.current, { y: -self.progress * 60, opacity: 1 - self.progress * 1.2 })
          if (subRef.current) gsap.set(subRef.current, { y: -self.progress * 40, opacity: 1 - self.progress * 2 })
        },
      })
    }, sectionRef)

    /* 2. Conversation timeline — runs after intro */
    setTimeout(() => buildConversation(), 1500)

    function buildConversation() {
      /* Set initial hidden state */
      gsap.set([leftBubbleRef.current, rightBubbleRef.current], {
        opacity: 0, scale: 0.7, transformOrigin: 'center bottom',
      })
      gsap.set([pkt1Ref.current, pkt2Ref.current], { opacity: 0 })

      gsap.timeline({ repeat: -1, onRepeat: nextMsg })
        /* ── LEFT BUBBLE IN ── */
        .to(leftHeadRef.current, { y: -4, duration: 0.25, ease: 'power2.out' })
        .to(leftBubbleRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, '<0.05')
        .to(leftHeadRef.current, { y: 0, duration: 0.25 }, '<0.2')
        
        /* 1s GAP before transmission */
        .to({}, { duration: 1 })
        
        /* ── TRANSMIT 1: Client -> Server ── */
        .fromTo(pkt1Ref.current,
          { x: LCX + 30, y: HCY + 40, opacity: 0, scale: 0.5 },
          { x: 310, y: 126, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' }
        )
        .to(pkt1Ref.current, { opacity: 0, scale: 1.5, duration: 0.2 }, '+=0.1')
        
        /* ── TRANSMIT 2: Server -> Agent ── */
        .fromTo(pkt2Ref.current,
          { x: 560, y: 126, opacity: 0, scale: 0.5 },
          { x: RCX - 40, y: HCY + 40, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' },
          '-=0.2'
        )
        .to(pkt2Ref.current, { opacity: 0, scale: 1.5, duration: 0.2 }, '+=0.1')

        /* 1s GAP before Agent responds */
        .to({}, { duration: 1 })
        
        /* ── RIGHT BUBBLE IN ── */
        .to(rightHeadRef.current, { y: -4, duration: 0.25, ease: 'power2.out' })
        .to(rightBubbleRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, '<0.05')
        .to(rightHeadRef.current, { y: 0, duration: 0.25 }, '<0.2')
        
        /* Hold Both Bubbles */
        .to({}, { duration: 2.2 })
        
        /* ── BOTH BUBBLES OUT ── */
        .to([leftBubbleRef.current, rightBubbleRef.current], { opacity: 0, scale: 0.75, y: -8, duration: 0.35, ease: 'power2.in' })
        .set([leftBubbleRef.current, rightBubbleRef.current], { y: 0 })

        /* 1.5s Cooldown before next loop */
        .to({}, { duration: 1.5 })
    }

    function nextMsg() {
      msgIdx = (msgIdx + 1) % LEFT_MSGS.length
      if (leftT1.current)  leftT1.current.textContent  = LEFT_MSGS[msgIdx][0]
      if (leftT2.current)  leftT2.current.textContent  = LEFT_MSGS[msgIdx][1]
      if (rightT1.current) rightT1.current.textContent = RIGHT_MSGS[msgIdx][0]
      if (rightT2.current) rightT2.current.textContent = RIGHT_MSGS[msgIdx][1]
    }

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 'calc(var(--nav-height) + 3rem) 2rem 2rem',
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
        More than developers — we are dream builders. Web, Mobile & AI under one roof,
        with reliable, scalable, fast execution for teams that refuse to compromise.
      </p>

      <div ref={btnRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#contact" className="btn-primary">Start a project →</a>
        <a href="#services" className="btn-outline">What we build</a>
      </div>

      {/* ───────────────── ILLUSTRATION ───────────────── */}
      <div ref={svgRef} style={{ marginTop: '3.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg
          viewBox="0 -20 900 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 880, color: 'var(--black)', display: 'block', overflow: 'visible' }}
          strokeLinecap="round" strokeLinejoin="round"
          stroke="currentColor" strokeWidth="2"
        >
          {/* Ground */}
          <line x1="0" y1="230" x2="900" y2="230" strokeOpacity="0.12" />

          {/* ════════ LEFT DEVELOPER ════════ */}
          <g ref={leftHeadRef}>
            <circle cx={LCX} cy={HCY} r={HR} />
            <circle cx={LCX - 9} cy={HCY - 5} r="4.5" fill="currentColor" />
            <circle cx={LCX + 9} cy={HCY - 5} r="4.5" fill="currentColor" />
            <path d={`M ${LCX-12} ${HCY+11} Q ${LCX} ${HCY+21} ${LCX+12} ${HCY+11}`} fill="none" />
          </g>
          {/* Body */}
          <rect x={LCX-28} y="105" width="56" height="66" rx="12" fill="currentColor" fillOpacity="0.05" />
          <line x1={LCX-28} y1="122" x2={LCX-64} y2="140" />
          <line x1={LCX+28} y1="122" x2={LCX+90} y2="100" />
          <line x1={LCX-14} y1="171" x2={LCX-18} y2="230" />
          <line x1={LCX+14} y1="171" x2={LCX+18} y2="230" />

        {/* ── ALIGNMENT/UI FIX ── */}

          {/* ── LEFT SPEECH BUBBLE ── */}
          <g
            ref={leftBubbleRef}
            style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' } as React.CSSProperties}
          >
            {/* Bubble body — centred on LCX */}
            <rect x={LBX} y={BY} width={BW} height={BH} rx="12"
              fill="var(--bg)" stroke="currentColor" strokeWidth="2" />
            {/* Tail — points straight down from bubble centre to head top */}
            <path
              d={`M ${LCX-10},${BY+BH} L ${LCX},${BY+BH+14} L ${LCX+10},${BY+BH}`}
              fill="var(--bg)" stroke="currentColor" strokeWidth="1.8"
            />
            {/* Erase bubble bottom behind tail */}
            <line
              x1={LCX-9} y1={BY+BH} x2={LCX+9} y2={BY+BH}
              stroke="var(--bg)" strokeWidth="2.5"
            />
            {/* Text */}
            <text ref={leftT1}
              x={LCX} y={BY+16}
              textAnchor="middle" fontFamily="'Space Mono',monospace"
              fontSize="9.5" fontWeight="700" fill="currentColor" stroke="none"
            >
              {LEFT_MSGS[0][0]}
            </text>
            <text ref={leftT2}
              x={LCX} y={BY+33}
              textAnchor="middle" fontFamily="'Space Mono',monospace"
              fontSize="9.5" fill="currentColor" stroke="none"
            >
              {LEFT_MSGS[0][1]}
            </text>
          </g>

          {/* ════════ MONITOR ════════ */}
          <rect x="310" y="45" width="250" height="162" rx="12" fill="currentColor" fillOpacity="0.03" />
          <rect x="310" y="45" width="250" height="24" rx="10" fill="currentColor" fillOpacity="0.07" />
          <circle cx="328" cy="57" r="4.5" fill="currentColor" fillOpacity="0.25" />
          <circle cx="345" cy="57" r="4.5" fill="currentColor" fillOpacity="0.25" />
          <circle cx="362" cy="57" r="4.5" fill="currentColor" fillOpacity="0.25" />
          <line x1="328" y1="86"  x2="400" y2="86"  strokeWidth="2.5" strokeOpacity="0.65" />
          <line x1="328" y1="101" x2="425" y2="101" strokeOpacity="0.4" />
          <line x1="340" y1="116" x2="408" y2="116" strokeOpacity="0.5" />
          <line x1="340" y1="131" x2="445" y2="131" strokeOpacity="0.38" />
          <line x1="328" y1="146" x2="395" y2="146" strokeOpacity="0.55" />
          <line x1="340" y1="161" x2="418" y2="161" strokeOpacity="0.38" />
          <line x1="328" y1="176" x2="375" y2="176" strokeOpacity="0.45" />
          <line x1="435" y1="207" x2="435" y2="230" />
          <line x1="400" y1="230" x2="470" y2="230" />

          {/* ════════ RIGHT DEVELOPER ════════ */}
          <g ref={rightHeadRef}>
            <circle cx={RCX} cy={HCY} r={HR} />
            <circle cx={RCX-9} cy={HCY-5} r="4.5" fill="currentColor" />
            <circle cx={RCX+9} cy={HCY-5} r="4.5" fill="currentColor" />
            <path d={`M ${RCX-12} ${HCY+11} Q ${RCX} ${HCY+21} ${RCX+12} ${HCY+11}`} fill="none" />
            {/* Headphones */}
            <path d={`M ${RCX-26} ${HCY} Q ${RCX-26} ${HCY-31} ${RCX} ${HCY-31} Q ${RCX+26} ${HCY-31} ${RCX+26} ${HCY}`} fill="none" strokeWidth="2.5" />
            <rect x={RCX-33} y={HCY-4} width="9" height="14" rx="4" fill="currentColor" fillOpacity="0.18" />
            <rect x={RCX+24} y={HCY-4} width="9" height="14" rx="4" fill="currentColor" fillOpacity="0.18" />
          </g>
          {/* Body */}
          <rect x={RCX-28} y="105" width="56" height="66" rx="12" fill="currentColor" fillOpacity="0.05" />
          <line x1={RCX-28} y1="122" x2={RCX-90} y2="100" />
          <line x1={RCX+28} y1="122" x2={RCX+62} y2="140" />
          <line x1={RCX-14} y1="171" x2={RCX-18} y2="230" />
          <line x1={RCX+14} y1="171" x2={RCX+18} y2="230" />

        {/* ── ALIGNMENT/UI FIX ── */}

          {/* ── RIGHT SPEECH BUBBLE ── */}
          <g
            ref={rightBubbleRef}
            style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' } as React.CSSProperties}
          >
            <rect x={RBX} y={BY} width={BW} height={BH} rx="12"
              fill="var(--bg)" stroke="currentColor" strokeWidth="2" />
            <path
              d={`M ${RCX-10},${BY+BH} L ${RCX},${BY+BH+14} L ${RCX+10},${BY+BH}`}
              fill="var(--bg)" stroke="currentColor" strokeWidth="1.8"
            />
            <line
              x1={RCX-9} y1={BY+BH} x2={RCX+9} y2={BY+BH}
              stroke="var(--bg)" strokeWidth="2.5"
            />
            <text ref={rightT1}
              x={RCX} y={BY+16}
              textAnchor="middle" fontFamily="'Space Mono',monospace"
              fontSize="9.5" fontWeight="700" fill="currentColor" stroke="none"
            >
              {RIGHT_MSGS[0][0]}
            </text>
            <text ref={rightT2}
              x={RCX} y={BY+33}
              textAnchor="middle" fontFamily="'Space Mono',monospace"
              fontSize="9.5" fill="currentColor" stroke="none"
            >
              {RIGHT_MSGS[0][1]}
            </text>
          </g>

          {/* ── DATA PARTICLES ── */}
          <circle ref={pkt1Ref} r="4" fill="var(--black)" />
          <circle ref={pkt2Ref} r="4" fill="var(--black)" />

          {/* Ground captions */}
          <text x={LCX} y="252" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" fill="currentColor" fillOpacity="0.28" stroke="none">// visionary client</text>
          <text x="435"  y="252" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" fill="currentColor" fillOpacity="0.28" stroke="none">// seamless execution</text>
          <text x={RCX} y="252" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" fill="currentColor" fillOpacity="0.28" stroke="none">// zipsar agent</text>
        </svg>
      </div>
    </section>
  )
}
