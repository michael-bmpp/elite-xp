'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'

const cities = [
  { city: 'München', country: 'Deutschland', bg: 'linear-gradient(135deg, #3D2B1F 0%, #5C3D2E 100%)' },
  { city: 'Monaco', country: 'Monaco', bg: 'linear-gradient(135deg, #1A2744 0%, #2B4570 100%)' },
  { city: 'Ibiza', country: 'Spanien', bg: 'linear-gradient(135deg, #1B4B6C 0%, #2980B9 100%)' },
  { city: 'London', country: 'England', bg: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' },
  { city: 'Mailand', country: 'Italien', bg: 'linear-gradient(135deg, #4A3728 0%, #6B4E3D 100%)' },
  { city: 'Paris', country: 'Frankreich', bg: 'linear-gradient(135deg, #2C2C54 0%, #474787 100%)' },
  { city: 'Kitzbühel', country: 'Österreich', bg: 'linear-gradient(135deg, #1E3A2F 0%, #2D5A47 100%)' },
  { city: 'St. Moritz', country: 'Schweiz', bg: 'linear-gradient(135deg, #34495E 0%, #5D6D7E 100%)' },
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
              style={{ background: item.bg }}
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
