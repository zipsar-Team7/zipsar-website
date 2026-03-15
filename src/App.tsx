import { useEffect, useState } from 'react'
import { initSmoothScroll, destroySmoothScroll } from './lib/scroll'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
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
  const [loading, setLoading] = useState(true)

  // Lock body scroll while loading screen is visible
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loading])

  useEffect(() => {
    if (loading) return
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [loading])

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
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
