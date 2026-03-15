import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a small solid dot + a lagging ring.
 * - Both use var(--black) for the default theme.
 * - The ring lerps toward the real pointer position each frame for a fluid trailing feel.
 * - Expands + inverts on hover over interactive elements.
 * - Hidden on touch devices.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide on touch-primary devices
    if (window.matchMedia('(hover: none)').matches) return

    let mouse  = { x: -200, y: -200 }
    let ringXY = { x: -200, y: -200 }
    let hovered = false
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (
        t.matches('a, button, [role="button"], label, input, textarea, select, [data-cursor-hover]') ||
        t.closest('a, button, [role="button"], label, input, textarea, select, [data-cursor-hover]')
      ) {
        hovered = true
        ring.classList.add('cursor-ring--hover')
      }
    }

    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.matches('a, button, [role="button"]') && !t.closest('a, button, [role="button"]')) {
        hovered = false
        ring.classList.remove('cursor-ring--hover')
      }
    }

    const frame = () => {
      // Dot snaps instantly
      dot.style.transform  = `translate(${mouse.x}px, ${mouse.y}px)`

      // Ring lerps with a nice lag
      const ease = hovered ? 0.16 : 0.12
      ringXY.x += (mouse.x - ringXY.x) * ease
      ringXY.y += (mouse.y - ringXY.y) * ease
      ring.style.transform = `translate(${ringXY.x}px, ${ringXY.y}px)`

      raf = requestAnimationFrame(frame)
    }

    // Hide native cursor globally
    document.documentElement.classList.add('custom-cursor-active')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout',  onLeave)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout',  onLeave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
