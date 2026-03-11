import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

let lenisInstance: Lenis | null = null

export function initSmoothScroll(): Lenis {
  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  lenisInstance.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
  return lenisInstance
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
  ScrollTrigger.getAll().forEach(t => t.kill())
}

export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || ''
  const words = text.trim().split(/\s+/)
  el.innerHTML = ''
  return words.map((word) => {
    const wrap = document.createElement('span')
    wrap.className = 'word'
    wrap.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;'
    const inner = document.createElement('span')
    inner.className = 'word-inner'
    inner.style.cssText = 'display:inline-block;'
    inner.textContent = word
    wrap.appendChild(inner)
    el.appendChild(wrap)
    el.appendChild(document.createTextNode('\u00A0'))
    return inner
  })
}
