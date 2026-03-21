'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { getServiceBySlug, type ServiceField } from '@/lib/services'
import { useLanguage } from '@/components/providers/LanguageProvider'

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const service = getServiceBySlug(slug)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dynamicValues, setDynamicValues] = useState<Record<string, string>>({})
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  if (!service) return null

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
      setDynamicValues({})
      setDateFrom('')
      setDateTo('')
      setMessage('')
    }, 3200)
  }

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
    <>
      {/* Hero */}
      <section className="service-detail__hero">
        <div
          className="service-detail__hero-bg"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="service-detail__hero-overlay" />
        <div className="service-detail__hero-content">
          <div className="service-detail__breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#services">{t('Services', 'Services')}</Link>
            <span>/</span>
            {t(service.label.de, service.label.en)}
          </div>
          <p className="service-detail__location">
            {t(service.location.de, service.location.en)}
          </p>
          <h1 className="service-detail__title">
            {t(service.label.de, service.label.en)}
          </h1>
          <p className="service-detail__tagline">
            {t(service.tagline.de, service.tagline.en)}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="service-detail__body">
        <Link href="/#services" className="service-detail__back">
          &larr; {t('Zurück zur Übersicht', 'Back to Overview')}
        </Link>

        <div className="service-detail__grid">
          {/* Left: Info */}
          <div className="service-detail__info">
            <p className="service-detail__desc">
              {t(service.description.de, service.description.en)}
            </p>
            <ul className="service-detail__highlights">
              {service.highlights.map((h, i) => (
                <li key={i} className="service-detail__highlight">
                  {t(h.de, h.en)}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Inline Form */}
          <form className="contact__form is-revealed" onSubmit={handleSubmit}>
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

            <input
              type="email"
              className="contact__input"
              placeholder={t('E-Mail-Adresse', 'Email Address')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Service-specific fields */}
            {service.fields.length > 0 && (
              <div className="contact__dynamic-fields">
                <div className="contact__dynamic-header">
                  <span className="contact__dynamic-label">
                    {t(
                      `Details zu ${service.label.de}`,
                      `Details for ${service.label.en}`
                    )}
                  </span>
                </div>
                {service.fields.map(renderField)}
              </div>
            )}

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

            <button
              className={`contact__submit${sent ? ' is-sent' : ''}`}
              type="submit"
              disabled={sent}
            >
              <span>
                {sent ? t('Gesendet \u2713', 'Sent \u2713') : t('Anfrage senden', 'Send Inquiry')}
              </span>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
