'use client'

import { useRef, useState, useEffect, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { services, type ServiceField } from '@/lib/services'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  preselectedService?: string
}

export default function Contact({ preselectedService }: ContactProps) {
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

  // Pre-select service on mount if prop provided
  useEffect(() => {
    if (preselectedService) {
      const match = services.find((s) => s.slug === preselectedService)
      if (match) {
        setSelectedService(match.slug)
      }
    }
  }, [preselectedService])

  const activeConfig = services.find((s) => s.slug === selectedService)

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

  const handleServiceChange = (slug: string) => {
    setSelectedService(slug)
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
            <span className="contact__date-separator">&mdash;</span>
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
          {/* ── Step 01: Personal Data ── */}
          <div className="contact__step">
            <div className="contact__step-label">
              <span className="contact__step-number">01</span>
              <span className="contact__step-divider" />
              <span className="contact__step-text">
                {t('Persönliche Daten', 'Personal Details')}
              </span>
            </div>

            <div className="contact__form-row">
              <div className="contact__input-group">
                <label className="contact__field-label">
                  {t('Vorname', 'First Name')}
                </label>
                <input
                  type="text"
                  className="contact__input"
                  placeholder={t('Vorname', 'First Name')}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="contact__input-group">
                <label className="contact__field-label">
                  {t('Nachname', 'Last Name')}
                </label>
                <input
                  type="text"
                  className="contact__input"
                  placeholder={t('Nachname', 'Last Name')}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="contact__form-row">
              <div className="contact__input-group">
                <label className="contact__field-label">
                  {t('E-Mail-Adresse', 'Email Address')}
                </label>
                <input
                  type="email"
                  className="contact__input"
                  placeholder={t('E-Mail-Adresse', 'Email Address')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="contact__input-group">
                <label className="contact__field-label">
                  {t('Telefon (optional)', 'Phone (optional)')}
                </label>
                <input
                  type="tel"
                  className="contact__input"
                  placeholder={t('Telefon (optional)', 'Phone (optional)')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ── Step 02: Experience / Service Selector ── */}
          <div className="contact__step">
            <div className="contact__step-label">
              <span className="contact__step-number">02</span>
              <span className="contact__step-divider" />
              <span className="contact__step-text">
                {t('Ihr Erlebnis', 'Your Experience')}
              </span>
            </div>

            <div className="contact__service-cards">
              {services.map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  className={`contact__service-card${selectedService === service.slug ? ' is-active' : ''}`}
                  onClick={() => handleServiceChange(service.slug)}
                >
                  <span className="contact__service-card-location">
                    {t(service.location.de, service.location.en)}
                  </span>
                  <span className="contact__service-card-name">
                    {t(service.label.de, service.label.en)}
                  </span>
                </button>
              ))}
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
          </div>

          {/* ── Step 03: Message ── */}
          <div className="contact__step">
            <div className="contact__step-label">
              <span className="contact__step-number">03</span>
              <span className="contact__step-divider" />
              <span className="contact__step-text">
                {t('Nachricht', 'Message')}
              </span>
            </div>

            <div className="contact__message-wrap">
              <label className="contact__field-label">
                {t('Ihre Nachricht', 'Your Message')}
              </label>
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
