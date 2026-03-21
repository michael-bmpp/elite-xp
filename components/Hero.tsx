'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  preloaderDone: boolean
}

const heroImages = [
  'url(/images/hero/oktoberfest.jpg)',
  'url(/images/hero/f1monaco.jpg)',
  'url(/images/hero/fcbayern.jpg)',
  'url(/images/hero/konzerte.jpg)',
]

const rotatorPhrases = [
  { de: 'Premium Oktoberfest Packages', en: 'Premium Oktoberfest Packages' },
  { de: 'F1 Hospitality Packages', en: 'F1 Hospitality Packages' },
  { de: 'Bayern München Hospitality', en: 'Bayern München Hospitality' },
  { de: 'Zugang zu ausverkauften Venues', en: 'Access to Sold-Out Venues' },
] as const

export default function Hero({ preloaderDone }: HeroProps) {
  const { t } = useLanguage()

  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bgNextRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [exitingIndex, setExitingIndex] = useState<number | null>(null)

  // Rotator cycling
  useEffect(() => {
    if (!preloaderDone) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        setExitingIndex(prev)
        const next = (prev + 1) % rotatorPhrases.length
        return next
      })
    }, 2800)

    return () => clearInterval(interval)
  }, [preloaderDone])

  // Clear exiting class after animation completes
  useEffect(() => {
    if (exitingIndex === null) return

    const timeout = setTimeout(() => {
      setExitingIndex(null)
    }, 600)

    return () => clearTimeout(timeout)
  }, [exitingIndex])

  // Background crossfade on rotator change
  useEffect(() => {
    if (!bgRef.current || !bgNextRef.current) return

    bgNextRef.current.style.backgroundImage = heroImages[activeIndex]
    gsap.fromTo(
      bgNextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          if (bgRef.current) {
            bgRef.current.style.backgroundImage = heroImages[activeIndex]
          }
          if (bgNextRef.current) {
            bgNextRef.current.style.opacity = '0'
          }
        },
      }
    )
  }, [activeIndex])

  // Entrance animation after preloader
  useGSAP(
    () => {
      if (!preloaderDone) return

      const tl = gsap.timeline()

      // 1. Eyebrow clip-path reveal
      tl.fromTo(
        eyebrowRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.85, ease: 'power4.out' }
      )

      // 2. H1 title fade in with translateY
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '<0.1'
      )

      // 3. Body text clip-path reveal
      tl.fromTo(
        bodyRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.85, ease: 'power4.out' },
        '<0.58'
      )

      // 4. CTA clip-path reveal
      tl.fromTo(
        ctaRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power4.out' },
        '<0.78'
      )

      // 5. Scroll indicator fade in
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.out' },
        '<0.2'
      )
    },
    { scope: heroRef, dependencies: [preloaderDone] }
  )

  // Parallax on scroll
  useGSAP(
    () => {
      if (!bgRef.current) return

      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: heroRef }
  )

  return (
    <div className="hero" id="hero" ref={heroRef}>
      {/* Background layers */}
      <div
        className="hero__bg"
        ref={bgRef}
        style={{ backgroundImage: heroImages[0] }}
      />
      <div
        className="hero__bg-next"
        ref={bgNextRef}
        style={{ opacity: 0 }}
      />

      {/* Vignette */}
      <div className="hero__vignette" />

      {/* Content */}
      <div className="hero__content">
        <div
          className="hero__eyebrow"
          ref={eyebrowRef}
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          VIP Tickets &middot; Luxury Hospitality &middot; Private Event Access
        </div>

        <h1
          className="hero__title"
          ref={titleRef}
          style={{ opacity: 0 }}
        >
          {t('Ihr Zugang zu', 'Your Access to')}
        </h1>

        <div className="hero__rotator-wrap">
          {rotatorPhrases.map((phrase, i) => {
            let className = 'hero__rotator-phrase'
            if (i === activeIndex) className += ' is-active'
            if (i === exitingIndex) className += ' is-exiting'

            return (
              <span key={i} className={className}>
                {t(phrase.de, phrase.en)}
              </span>
            )
          })}
        </div>
      </div>

      <div
        className="hero__body-text"
        ref={bodyRef}
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        {t(
          'Exklusiver Zugang zu den begehrtesten Events und Erlebnissen. Persönlich kuratiert, diskret organisiert.',
          'Exclusive access to the most coveted events and experiences. Personally curated, discreetly organized.'
        )}
      </div>

      <a
        className="hero__cta"
        href="#contact"
        ref={ctaRef}
        style={{ clipPath: 'inset(100% 0 0 0)' }}
        onClick={(e) => {
          e.preventDefault()
          const el = document.getElementById('contact')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      >
        {t('Anfrage stellen', 'Make an Inquiry')}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <div
        className="hero__scroll"
        ref={scrollIndicatorRef}
        style={{ opacity: 0 }}
      >
        <span className="hero__scroll-text">SCROLL</span>
        <span className="hero__scroll-line" />
      </div>
    </div>
  )
}
