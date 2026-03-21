'use client'

import { useRef, useState, useEffect, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Service definitions with contextual fields ─── */

interface ServiceField {
  key: string
  type: 'text' | 'number' | 'date' | 'select' | 'daterange'
  label: { de: string; en: string }
  placeholder?: { de: string; en: string }
  options?: { de: string; en: string; value: string }[]
  required?: boolean
}

interface ServiceConfig {
  id: string
  label: { de: string; en: string }
  fields: ServiceField[]
}

const serviceConfigs: ServiceConfig[] = [
  {
    id: 'oktoberfest',
    label: { de: 'München — Oktoberfest', en: 'Munich — Oktoberfest' },
    fields: [
      {
        key: 'date',
        type: 'daterange',
        label: { de: 'Gewünschter Zeitraum', en: 'Preferred Dates' },
        required: true,
      },
      {
        key: 'guests',
        type: 'number',
        label: { de: 'Anzahl Gäste', en: 'Number of Guests' },
        placeholder: { de: 'z.B. 4', en: 'e.g. 4' },
        required: true,
      },
      {
        key: 'tent',
        type: 'select',
        label: { de: 'Wunschzelt', en: 'Preferred Tent' },
        options: [
          { de: 'Keine Präferenz', en: 'No Preference', value: 'none' },
          { de: 'Schottenhamel', en: 'Schottenhamel', value: 'schottenhamel' },
          { de: 'Käfer Wiesn-Schänke', en: 'Käfer Wiesn-Schänke', value: 'kaefer' },
          { de: 'Marstall', en: 'Marstall', value: 'marstall' },
          { de: 'Hippodrom', en: 'Hippodrom', value: 'hippodrom' },
          { de: 'Weinzelt', en: 'Wine Tent', value: 'weinzelt' },
          { de: 'Anderes Zelt', en: 'Other Tent', value: 'other' },
        ],
      },
      {
        key: 'hotel',
        type: 'select',
        label: { de: 'Hotelpaket gewünscht?', en: 'Hotel Package?' },
        options: [
          { de: 'Ja, mit Luxushotel', en: 'Yes, with Luxury Hotel', value: 'luxury' },
          { de: 'Ja, gutes Mittelklassehotel', en: 'Yes, Upscale Hotel', value: 'upscale' },
          { de: 'Nein, nur Tischreservierung', en: 'No, Table Only', value: 'no' },
        ],
      },
      {
        key: 'transfer',
        type: 'select',
        label: { de: 'Transfer & Betreuung', en: 'Transfer & Service' },
        options: [
          { de: 'Ja, Komplettpaket', en: 'Yes, Full Package', value: 'full' },
          { de: 'Nur Transfer', en: 'Transfer Only', value: 'transfer' },
          { de: 'Nicht benötigt', en: 'Not Needed', value: 'no' },
        ],
      },
    ],
  },
  {
    id: 'sports',
    label: { de: 'Sport & Hospitality', en: 'Sports & Hospitality' },
    fields: [
      {
        key: 'event',
        type: 'text',
        label: { de: 'Event / Spiel', en: 'Event / Match' },
        placeholder: { de: 'z.B. FC Bayern vs. Real Madrid, EURO 2026', en: 'e.g. FC Bayern vs. Real Madrid, EURO 2026' },
        required: true,
      },
      {
        key: 'tickets',
        type: 'number',
        label: { de: 'Anzahl Tickets', en: 'Number of Tickets' },
        placeholder: { de: 'z.B. 2', en: 'e.g. 2' },
        required: true,
      },
      {
        key: 'level',
        type: 'select',
        label: { de: 'VIP-Level', en: 'VIP Level' },
        options: [
          { de: 'Loge / Skybox', en: 'Suite / Skybox', value: 'skybox' },
          { de: 'Hospitality-Bereich', en: 'Hospitality Area', value: 'hospitality' },
          { de: 'Premium-Tribüne', en: 'Premium Seats', value: 'premium' },
          { de: 'Beste verfügbare Kategorie', en: 'Best Available', value: 'best' },
        ],
      },
      {
        key: 'hotel',
        type: 'select',
        label: { de: 'Hotel gewünscht?', en: 'Hotel Required?' },
        options: [
          { de: 'Ja, in Stadionnähe', en: 'Yes, Near Stadium', value: 'near' },
          { de: 'Ja, Stadthotel', en: 'Yes, City Hotel', value: 'city' },
          { de: 'Nein', en: 'No', value: 'no' },
        ],
      },
    ],
  },
  {
    id: 'concerts',
    label: { de: 'Konzerte & Live-Events', en: 'Concerts & Live Events' },
    fields: [
      {
        key: 'artist',
        type: 'text',
        label: { de: 'Künstler / Event', en: 'Artist / Event' },
        placeholder: { de: 'z.B. Coldplay, Adele', en: 'e.g. Coldplay, Adele' },
        required: true,
      },
      {
        key: 'city',
        type: 'text',
        label: { de: 'Bevorzugte Stadt / Venue', en: 'Preferred City / Venue' },
        placeholder: { de: 'z.B. München, London Wembley', en: 'e.g. Munich, London Wembley' },
      },
      {
        key: 'tickets',
        type: 'number',
        label: { de: 'Anzahl Tickets', en: 'Number of Tickets' },
        placeholder: { de: 'z.B. 2', en: 'e.g. 2' },
        required: true,
      },
      {
        key: 'experience',
        type: 'select',
        label: { de: 'Erlebnis-Level', en: 'Experience Level' },
        options: [
          { de: 'Backstage / Meet & Greet', en: 'Backstage / Meet & Greet', value: 'backstage' },
          { de: 'VIP-Bereich / Lounge', en: 'VIP Area / Lounge', value: 'vip' },
          { de: 'Beste Plätze', en: 'Best Seats', value: 'best' },
          { de: 'Offen für Vorschläge', en: 'Open to Suggestions', value: 'open' },
        ],
      },
    ],
  },
  {
    id: 'cannes',
    label: { de: 'Cannes — Filmfestspiele', en: 'Cannes — Film Festival' },
    fields: [
      {
        key: 'date',
        type: 'daterange',
        label: { de: 'Gewünschter Zeitraum', en: 'Preferred Dates' },
        required: true,
      },
      {
        key: 'guests',
        type: 'number',
        label: { de: 'Anzahl Personen', en: 'Number of Guests' },
        placeholder: { de: 'z.B. 2', en: 'e.g. 2' },
        required: true,
      },
      {
        key: 'interests',
        type: 'select',
        label: { de: 'Schwerpunkt', en: 'Main Interest' },
        options: [
          { de: 'Akkreditierung & Screenings', en: 'Accreditation & Screenings', value: 'screenings' },
          { de: 'Gala-Events & Partys', en: 'Gala Events & Parties', value: 'galas' },
          { de: 'Fine Dining & Restaurants', en: 'Fine Dining & Restaurants', value: 'dining' },
          { de: 'Komplettpaket', en: 'Complete Package', value: 'complete' },
        ],
      },
      {
        key: 'accommodation',
        type: 'select',
        label: { de: 'Unterkunft', en: 'Accommodation' },
        options: [
          { de: 'Luxushotel (Croisette)', en: 'Luxury Hotel (Croisette)', value: 'luxury' },
          { de: 'Private Villa', en: 'Private Villa', value: 'villa' },
          { de: 'Yacht-Charter', en: 'Yacht Charter', value: 'yacht' },
          { de: 'Bereits organisiert', en: 'Already Arranged', value: 'none' },
        ],
      },
    ],
  },
  {
    id: 'monaco',
    label: { de: 'Monaco — Formel 1', en: 'Monaco — Formula 1' },
    fields: [
      {
        key: 'guests',
        type: 'number',
        label: { de: 'Anzahl Personen', en: 'Number of Guests' },
        placeholder: { de: 'z.B. 4', en: 'e.g. 4' },
        required: true,
      },
      {
        key: 'experience',
        type: 'select',
        label: { de: 'Erlebnis-Typ', en: 'Experience Type' },
        options: [
          { de: 'Yacht-Party mit Streckenblick', en: 'Yacht Party with Track View', value: 'yacht' },
          { de: 'Trackside-Apartment', en: 'Trackside Apartment', value: 'apartment' },
          { de: 'Grandstand VIP', en: 'Grandstand VIP', value: 'grandstand' },
          { de: 'Hospitality-Suite', en: 'Hospitality Suite', value: 'hospitality' },
          { de: 'Komplettpaket', en: 'Complete Package', value: 'complete' },
        ],
      },
      {
        key: 'days',
        type: 'select',
        label: { de: 'Tage', en: 'Days' },
        options: [
          { de: 'Gesamtes Rennwochenende', en: 'Full Race Weekend', value: 'full' },
          { de: 'Nur Renntag (Sonntag)', en: 'Race Day Only (Sunday)', value: 'sunday' },
          { de: 'Qualifying + Rennen', en: 'Qualifying + Race', value: 'quali-race' },
        ],
      },
      {
        key: 'extras',
        type: 'select',
        label: { de: 'Zusätzliche Wünsche', en: 'Additional Requests' },
        options: [
          { de: 'Afterparty-Zugang', en: 'Afterparty Access', value: 'afterparty' },
          { de: 'Helikopter-Transfer', en: 'Helicopter Transfer', value: 'heli' },
          { de: 'Fine Dining Reservierungen', en: 'Fine Dining Reservations', value: 'dining' },
          { de: 'Keine weiteren', en: 'None', value: 'none' },
        ],
      },
    ],
  },
  {
    id: 'ibiza',
    label: { de: 'Ibiza', en: 'Ibiza' },
    fields: [
      {
        key: 'date',
        type: 'daterange',
        label: { de: 'Reisezeitraum', en: 'Travel Dates' },
        required: true,
      },
      {
        key: 'guests',
        type: 'number',
        label: { de: 'Anzahl Personen', en: 'Number of Guests' },
        placeholder: { de: 'z.B. 6', en: 'e.g. 6' },
        required: true,
      },
      {
        key: 'accommodation',
        type: 'select',
        label: { de: 'Unterkunft', en: 'Accommodation' },
        options: [
          { de: 'Private Luxusvilla', en: 'Private Luxury Villa', value: 'villa' },
          { de: 'Boutique-Hotel', en: 'Boutique Hotel', value: 'hotel' },
          { de: 'Finca', en: 'Finca', value: 'finca' },
          { de: 'Bereits organisiert', en: 'Already Arranged', value: 'none' },
        ],
      },
      {
        key: 'clubs',
        type: 'select',
        label: { de: 'Club-Interesse', en: 'Club Interest' },
        options: [
          { de: 'Pacha', en: 'Pacha', value: 'pacha' },
          { de: 'Hï Ibiza', en: 'Hï Ibiza', value: 'hi' },
          { de: 'Ushuaïa', en: 'Ushuaïa', value: 'ushuaia' },
          { de: 'Amnesia', en: 'Amnesia', value: 'amnesia' },
          { de: 'Alle / Offen', en: 'All / Open', value: 'all' },
        ],
      },
      {
        key: 'extras',
        type: 'select',
        label: { de: 'Extras', en: 'Extras' },
        options: [
          { de: 'Yacht-Charter', en: 'Yacht Charter', value: 'yacht' },
          { de: 'Privatkoch', en: 'Private Chef', value: 'chef' },
          { de: 'Sunset-Experience', en: 'Sunset Experience', value: 'sunset' },
          { de: 'Keine weiteren', en: 'None', value: 'none' },
        ],
      },
    ],
  },
  {
    id: 'other',
    label: { de: 'Sonstiges', en: 'Other' },
    fields: [],
  },
]

export default function Contact() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const dynamicFieldsRef = useRef<HTMLDivElement>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [dynamicValues, setDynamicValues] = useState<Record<string, string>>({})
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const activeConfig = serviceConfigs.find((s) => s.id === selectedService)

  // Animate dynamic fields when they appear
  useEffect(() => {
    if (!dynamicFieldsRef.current || !activeConfig?.fields.length) return

    const fields = dynamicFieldsRef.current.querySelectorAll('.contact__dynamic-field')
    if (!fields.length) return

    gsap.fromTo(
      fields,
      { y: 16, opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 },
      {
        y: 0,
        opacity: 1,
        height: 'auto',
        paddingTop: 20,
        paddingBottom: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'height',
      }
    )
  }, [selectedService, activeConfig?.fields.length])

  const handleServiceChange = (id: string) => {
    setSelectedService(id)
    setDynamicValues({})
    setDateFrom('')
    setDateTo('')
  }

  const setDynamicValue = (key: string, value: string) => {
    setDynamicValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setSelectedService('')
      setDynamicValues({})
      setDateFrom('')
      setDateTo('')
      setMessage('')
    }, 3200)
  }

  useGSAP(
    () => {
      if (!containerRef.current) return

      const infoEls = containerRef.current.querySelectorAll(
        '.contact__info .eyebrow, .contact__info .contact__heading, .contact__info .section-body, .contact__info .contact__details'
      )

      gsap.set(infoEls, { y: 20, opacity: 0 })

      gsap.to(infoEls, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      })

      if (formRef.current) {
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            formRef.current?.classList.add('is-revealed')
          },
        })
      }
    },
    { scope: containerRef }
  )

  const renderField = (field: ServiceField) => {
    if (field.type === 'daterange') {
      return (
        <div key={field.key} className="contact__dynamic-field">
          <label className="contact__field-label">{t(field.label.de, field.label.en)}</label>
          <div className="contact__date-range">
            <div className="contact__date-input-wrap">
              <span className="contact__date-label">{t('Von', 'From')}</span>
              <input
                type="date"
                className="contact__input"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                required={field.required}
              />
            </div>
            <span className="contact__date-separator">—</span>
            <div className="contact__date-input-wrap">
              <span className="contact__date-label">{t('Bis', 'To')}</span>
              <input
                type="date"
                className="contact__input"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                required={field.required}
              />
            </div>
          </div>
        </div>
      )
    }

    if (field.type === 'select' && field.options) {
      return (
        <div key={field.key} className="contact__dynamic-field">
          <label className="contact__field-label">{t(field.label.de, field.label.en)}</label>
          <select
            className="contact__select"
            value={dynamicValues[field.key] || ''}
            onChange={(e) => setDynamicValue(field.key, e.target.value)}
            required={field.required}
          >
            <option value="" disabled>
              {t('Bitte wählen', 'Please select')}
            </option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.de, opt.en)}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <div key={field.key} className="contact__dynamic-field">
        <label className="contact__field-label">{t(field.label.de, field.label.en)}</label>
        <input
          type={field.type}
          className="contact__input"
          placeholder={field.placeholder ? t(field.placeholder.de, field.placeholder.en) : ''}
          value={dynamicValues[field.key] || ''}
          onChange={(e) => setDynamicValue(field.key, e.target.value)}
          required={field.required}
          min={field.type === 'number' ? 1 : undefined}
        />
      </div>
    )
  }

  return (
    <section className="contact" id="contact" ref={containerRef}>
      <div className="contact__grid">
        <div className="contact__info">
          <span className="eyebrow">{t('Kontakt', 'Contact')}</span>
          <h2
            className="contact__heading section-heading"
            dangerouslySetInnerHTML={{
              __html: t(
                'Lassen Sie uns Ihr <em>Erlebnis</em> gestalten',
                'Let Us Create Your <em>Experience</em>'
              ),
            }}
          />
          <p className="section-body">
            {t(
              'Beschreiben Sie Ihren Wunsch — wir kümmern uns um jedes Detail. Unser Concierge-Team meldet sich innerhalb von 24 Stunden mit einem maßgeschneiderten Vorschlag.',
              'Describe your vision — we take care of every detail. Our concierge team will respond within 24 hours with a bespoke proposal.'
            )}
          </p>
          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-label">{t('E-Mail', 'Email')}</span>
              <span className="contact__detail-value">
                <a href="mailto:concierge@lelite.com">concierge@lelite.com</a>
              </span>
            </div>
          </div>
        </div>

        <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
          {/* Base fields */}
          <div className="contact__form-row">
            <input
              type="text"
              className="contact__input"
              placeholder={t('Vorname', 'First Name')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="contact__input"
              placeholder={t('Nachname', 'Last Name')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="contact__form-row">
            <input
              type="email"
              className="contact__input"
              placeholder={t('E-Mail-Adresse', 'Email Address')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              className="contact__input"
              placeholder={t('Telefon (optional)', 'Phone (optional)')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Service selector */}
          <div className="contact__service-selector">
            <label className="contact__field-label">
              {t('Welches Erlebnis interessiert Sie?', 'Which experience interests you?')}
            </label>
            <div className="contact__service-grid">
              {serviceConfigs.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={`contact__service-pill${selectedService === service.id ? ' is-active' : ''}`}
                  onClick={() => handleServiceChange(service.id)}
                >
                  {t(service.label.de, service.label.en)}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic fields based on selected service */}
          {activeConfig && activeConfig.fields.length > 0 && (
            <div className="contact__dynamic-fields" ref={dynamicFieldsRef} key={selectedService}>
              <div className="contact__dynamic-header">
                <span className="contact__dynamic-label">
                  {t(
                    `Details zu ${activeConfig.label.de}`,
                    `Details for ${activeConfig.label.en}`
                  )}
                </span>
              </div>
              {activeConfig.fields.map(renderField)}
            </div>
          )}

          {/* Message */}
          <div className="contact__message-wrap">
            <textarea
              className="contact__textarea"
              placeholder={t(
                'Erzählen Sie uns von Ihrem Wunscherlebnis — jedes Detail hilft uns, das perfekte Package zu schnüren.',
                'Tell us about your dream experience — every detail helps us craft the perfect package.'
              )}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            className={`contact__submit${sent ? ' is-sent' : ''}`}
            type="submit"
            disabled={sent}
          >
            <span>
              {sent ? t('Gesendet ✓', 'Sent ✓') : t('Anfrage senden', 'Send Inquiry')}
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}
