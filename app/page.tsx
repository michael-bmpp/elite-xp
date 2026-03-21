'use client'

import { useState } from 'react'
import Preloader from '@/components/Preloader'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import DestinationsStrip from '@/components/DestinationsStrip'
import Philosophy from '@/components/Philosophy'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Quote from '@/components/Quote'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <Navigation preloaderDone={preloaderDone} />
      <main>
        <Hero preloaderDone={preloaderDone} />
        <DestinationsStrip />
        <Philosophy />
        <Services />
        <Process />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
