'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

export default function Quote() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  useGSAP(
    () => {
      if (!containerRef.current) return

      const mark = containerRef.current.querySelector('.quote__mark')
      const text = containerRef.current.querySelector('.quote__text')
      const attribution = containerRef.current.querySelector('.quote__attribution')

      const triggerConfig = {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      }

      gsap.set([mark, text, attribution], { opacity: 0 })
      gsap.set(mark, { y: 20 })
      gsap.set(text, { y: 24 })

      gsap.to(mark, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: triggerConfig,
      })

      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: triggerConfig,
      })

      gsap.to(attribution, {
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: triggerConfig,
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="quote" id="quote" ref={containerRef}>
      <div className="quote__inner">
        <span className="quote__mark">&ldquo;</span>
        <blockquote
          className="quote__text"
          dangerouslySetInnerHTML={{
            __html: t(
              '\u201EEine Plattform, bei der die Menschen wissen: <em>Auf wen kann ich da zukommen?</em> \u2014 und wo sie nach bestem Gewissen betreut werden.\u201C',
              '\u201CA platform where people know: <em>Who can I turn to?</em> \u2014 and where they are served with the utmost care.\u201D'
            ),
          }}
        />
        <cite className="quote__attribution">
          {t('Die Vision hinter L\u2019Elite', 'The Vision Behind L\u2019Elite')}
        </cite>
        <a href="#contact" className="quote__cta" onClick={scrollToContact}>
          {t('Sprechen Sie mit uns', 'Talk to Us')} &rarr;
        </a>
      </div>
    </section>
  )
}
