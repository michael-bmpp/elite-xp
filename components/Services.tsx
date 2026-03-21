'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    location: 'München',
    locationEn: 'Munich',
    title: 'Oktoberfest',
    titleEn: 'Oktoberfest',
    desc: 'Exklusive Zeltplätze, Luxushotel, Transfer & persönliche Betreuung',
    descEn: 'Exclusive tent reservations, luxury hotel, transfer & personal service',
    bg: 'linear-gradient(135deg, #5C3D2E 0%, #8B6914 100%)',
  },
  {
    location: 'Europaweit',
    locationEn: 'Europe-wide',
    title: 'Sport & Hospitality',
    titleEn: 'Sports & Hospitality',
    desc: 'Champions League, Bundesliga, EURO, WM — VIP-Tickets & Logen',
    descEn: 'Champions League, Bundesliga, EURO, World Cup — VIP tickets & suites',
    bg: 'linear-gradient(135deg, #1A3C2A 0%, #2E5E3E 100%)',
  },
  {
    location: 'Weltweit',
    locationEn: 'Worldwide',
    title: 'Konzerte & Live-Events',
    titleEn: 'Concerts & Live Events',
    desc: 'Ausverkaufte Tickets, Backstage-Zugang, VIP-Experiences',
    descEn: 'Sold-out tickets, backstage access, VIP experiences',
    bg: 'linear-gradient(135deg, #2D1F3D 0%, #4A2D6B 100%)',
  },
  {
    location: 'Cannes',
    locationEn: 'Cannes',
    title: 'Filmfestspiele',
    titleEn: 'Film Festival',
    desc: 'Akkreditierungen, Gala-Events & Fine Dining Reservierungen',
    descEn: 'Accreditations, gala events & fine dining reservations',
    bg: 'linear-gradient(135deg, #3D2B1F 0%, #6B4E3D 100%)',
  },
  {
    location: 'Monaco',
    locationEn: 'Monaco',
    title: 'Formel 1 & Yachts',
    titleEn: 'Formula 1 & Yachts',
    desc: 'Grandstand, Trackside-Apartments & exklusive Yacht-Parties',
    descEn: 'Grandstand, trackside apartments & exclusive yacht parties',
    bg: 'linear-gradient(135deg, #1A2744 0%, #2B4570 100%)',
  },
  {
    location: 'Ibiza',
    locationEn: 'Ibiza',
    title: 'Villen & Clubs',
    titleEn: 'Villas & Clubs',
    desc: 'Private Villen, Pacha, Hï, Ushuaïa — VIP-Zugang garantiert',
    descEn: 'Private villas, Pacha, Hï, Ushuaïa — guaranteed VIP access',
    bg: 'linear-gradient(135deg, #1B4B6C 0%, #2980B9 100%)',
  },
]

export default function Services() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!gridRef.current) return

      const cards = gridRef.current.querySelectorAll('.services__card')
      const cardImages = gridRef.current.querySelectorAll('.services__card-img')

      // Cards batch reveal with clip-path
      gsap.fromTo(
        cards,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0 0 0 0)',
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
          },
        }
      )

      // Card images parallax
      cardImages.forEach((img) => {
        gsap.to(img, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services__header">
        <span className="eyebrow">
          {t('Unsere Services', 'Our Services')}
        </span>

        <h2
          className="section-heading"
          dangerouslySetInnerHTML={{
            __html: t(
              'Kuratierte <em>Erlebnisse</em> auf höchstem Niveau',
              'Curated <em>Experiences</em> at the Highest Level'
            ),
          }}
        />

        <p className="services__body">
          {t(
            'Von exklusiven Sportevents über legendäre Festivals bis hin zu privaten Villen — wir öffnen Türen, die anderen verschlossen bleiben.',
            'From exclusive sporting events to legendary festivals and private villas — we open doors that remain closed to others.'
          )}
        </p>
      </div>

      <div className="services__grid" ref={gridRef}>
        {services.map((service) => (
          <div className="services__card" key={service.title}>
            <div
              className="services__card-img"
              style={{ background: service.bg }}
            />
            <div className="services__card-overlay" />
            <div className="services__card-content">
              <span className="services__card-location">
                {t(service.location, service.locationEn)}
              </span>
              <h3 className="services__card-title">
                {t(service.title, service.titleEn)}
              </h3>
              <p className="services__card-desc">
                {t(service.desc, service.descEn)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
