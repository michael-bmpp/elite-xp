'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'

const cities = [
  { city: 'München', country: 'Deutschland', bg: 'url(/images/destinations/muenchen.jpg)' },
  { city: 'Monaco', country: 'Monaco', bg: 'url(/images/destinations/monaco.jpg)' },
  { city: 'Ibiza', country: 'Spanien', bg: 'url(/images/destinations/ibiza.jpg)' },
  { city: 'London', country: 'England', bg: 'url(/images/destinations/london.jpg)' },
  { city: 'Mailand', country: 'Italien', bg: 'url(/images/destinations/mailand.jpg)' },
  { city: 'Paris', country: 'Frankreich', bg: 'url(/images/destinations/paris.jpg)' },
  { city: 'Kitzbühel', country: 'Österreich', bg: 'url(/images/destinations/kitzbuehel.jpg)' },
  { city: 'St. Moritz', country: 'Schweiz', bg: 'url(/images/destinations/stmoritz.jpg)' },
]

export default function DestinationsStrip() {
  const { t } = useLanguage()

  const duplicated = [...cities, ...cities]

  return (
    <section className="destinations">
      <div className="destinations__track">
        {duplicated.map((item, i) => (
          <div className="destinations__card" key={`${item.city}-${i}`}>
            <div
              className="destinations__card-img"
              style={{ backgroundImage: item.bg }}
            />
            <div className="destinations__card-overlay" />
            <div className="destinations__card-label">
              <span className="destinations__card-country">
                {item.country}
              </span>
              <span className="destinations__card-city">
                {item.city}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
