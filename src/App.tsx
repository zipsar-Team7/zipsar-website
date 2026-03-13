import { useEffect } from 'react'
import { initSmoothScroll, destroySmoothScroll } from './lib/scroll'
import StickyNav from './components/StickyNav'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import ServicesSection from './components/ServicesSection'
import AISection from './components/AISection'
import ProcessSection from './components/ProcessSection'
import ClientLogos from './components/ClientLogos'
import CTASection, { Footer } from './components/CTASection'
import './App.css'

function App() {
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <ProcessSection />
        <AISection />
        <ClientLogos />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default App
