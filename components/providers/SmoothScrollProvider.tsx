'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1.001 - Math.pow(2, -10 * t),
      smoothWheel: true,
      touchMultiplier: 0,
      syncTouch: false,
    })

    // Disable Lenis on touch devices — use native scroll
    if (isTouchDevice) {
      lenis.stop()
    }

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisContext)
}

export function scrollToSection(target: string) {
  const el = document.querySelector(target)
  if (!el) return

  const lenis = (window as any).__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.6 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
