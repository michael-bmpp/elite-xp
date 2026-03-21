'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Anfrage stellen', titleEn: 'Submit Inquiry', desc: 'Beschreiben Sie Ihr Wunscherlebnis — kein Formular-Dschungel, nur Ihre Vision.', descEn: 'Describe your dream experience — no form maze, just your vision.' },
  { num: '02', title: 'Persönliches Angebot', titleEn: 'Personal Proposal', desc: 'Sie erhalten ein maßgeschneidertes Package — alles aus einer Hand.', descEn: 'Receive a bespoke package — everything from a single source.' },
  { num: '03', title: 'Bestätigung', titleEn: 'Confirmation', desc: 'Nach Ihrer Freigabe übernehmen wir die komplette Koordination.', descEn: 'Once approved, we handle all coordination.' },
  { num: '04', title: 'Ihr Erlebnis', titleEn: 'Your Experience', desc: 'Genießen Sie — betreut, exklusiv und vollkommen unbeschwert.', descEn: 'Enjoy — attended, exclusive, and completely carefree.' },
] as const

export default function Process() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const stepEls = containerRef.current.querySelectorAll('.process__step')

      gsap.set(stepEls, { y: 36, opacity: 0 })

      gsap.to(stepEls, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.14,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="process" id="process" ref={containerRef}>
      <div className="process__header">
        <span className="section-eyebrow">
          {t('So funktioniert\u2019s', 'How It Works')}
        </span>
        <h2
          className="section-heading"
          dangerouslySetInnerHTML={{
            __html: t(
              'Vier Schritte zu Ihrem <em>Erlebnis</em>',
              'Four Steps to Your <em>Experience</em>'
            ),
          }}
        />
      </div>

      <div className="process__steps">
        {steps.map((step) => (
          <div className="process__step" key={step.num}>
            <span className="process__step-number">{step.num}</span>
            <div className="process__step-line" />
            <h3 className="process__step-title">
              {t(step.title, step.titleEn)}
            </h3>
            <p className="process__step-desc">
              {t(step.desc, step.descEn)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
