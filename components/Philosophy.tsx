'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const image = imageRef.current
      const content = contentRef.current
      const counter = counterRef.current

      if (!image || !content || !counter) return

      // Image clip-path reveal
      gsap.fromTo(
        image,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0 0 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: image,
            start: 'top 82%',
          },
        }
      )

      // Image parallax
      gsap.to(image, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Text elements staggered reveal
      const textElements = content.querySelectorAll(
        '.eyebrow, .philosophy__heading, .philosophy__body, .philosophy__stats'
      )

      gsap.fromTo(
        textElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 82%',
          },
        }
      )

      // Counter animation
      const obj = { value: 0 }
      gsap.to(obj, {
        value: 100,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          counter.innerHTML = `${Math.round(obj.value)}%`
        },
        scrollTrigger: {
          trigger: counter,
          start: 'top 87%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section className="philosophy" id="philosophy" ref={sectionRef}>
      <div className="philosophy__grid">
        <div className="philosophy__image-wrap">
          <div
            className="philosophy__image"
            ref={imageRef}
            style={{
              background:
                'url(/images/philosophy/philosophy.jpg)',
            }}
          />
        </div>

        <div className="philosophy__content" ref={contentRef}>
          <span className="eyebrow">
            {t('Unsere Philosophie', 'Our Philosophy')}
          </span>

          <h2
            className="philosophy__heading section-heading"
            dangerouslySetInnerHTML={{
              __html: t(
                'Mehr als ein <em>Service</em> — ein Versprechen',
                'More than a <em>Service</em> — a Promise'
              ),
            }}
          />

          <p className="philosophy__body">
            {t(
              'L\'Elite steht für kompromisslose Exzellenz und persönliche Betreuung auf höchstem Niveau. Wir kuratieren unvergessliche Erlebnisse, die Ihren Ansprüchen gerecht werden — diskret, individuell und mit einem Netzwerk, das seinesgleichen sucht.',
              'L\'Elite stands for uncompromising excellence and personal service at the highest level. We curate unforgettable experiences that meet your standards — discreet, individual, and with an unrivalled network.'
            )}
          </p>

          <div className="philosophy__stats">
            <div className="philosophy__stat">
              <span className="philosophy__stat-number" ref={counterRef}>
                0%
              </span>
              <span className="philosophy__stat-label">
                {t('Maßgeschneidert', 'Bespoke')}
              </span>
            </div>

            <div className="philosophy__stat-divider" />

            <div className="philosophy__stat">
              <span className="philosophy__stat-number">24/7</span>
              <span className="philosophy__stat-label">
                {t('Erreichbar', 'Available')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
