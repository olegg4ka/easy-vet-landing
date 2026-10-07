import { MotionConfig } from 'motion/react'
import { ScrollProgress } from './components/motion'
import { Header, MobileCta } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { WeekCalendar } from './components/WeekCalendar'
import { Herd } from './components/Herd'
import { Faq, Footer, PilotForm, Steps } from './components/Rest'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <a href="#main" className="absolute -top-16 left-4 z-[70] rounded-md bg-ink px-3.5 py-2.5 text-white focus:top-3">
        Перейти до змісту
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Features />
        <WeekCalendar />
        <Herd />
        <Steps />
        <Faq />
        <PilotForm />
      </main>
      <Footer />
      <MobileCta />
    </MotionConfig>
  )
}
