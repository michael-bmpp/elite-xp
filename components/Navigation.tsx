'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface NavigationProps {
  preloaderDone: boolean
}

const navItems = [
  { id: 'philosophy', de: 'Philosophie', en: 'Philosophy' },
  { id: 'services', de: 'Services', en: 'Services' },
  { id: 'process', de: 'Ablauf', en: 'Process' },
  { id: 'contact', de: 'Anfrage', en: 'Inquiry' },
] as const

export default function Navigation({ preloaderDone }: NavigationProps) {
  const { lang, setLang, t } = useLanguage()
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll listener for compact nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  // Fade-in animation after preloader completes
  useGSAP(
    () => {
      if (!preloaderDone || !navRef.current) return

      gsap.fromTo(
        navRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    },
    { scope: navRef, dependencies: [preloaderDone] }
  )

  const navClassName = [
    'nav',
    isScrolled ? 'is-scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const linksClassName = [
    'nav__links',
    menuOpen ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav
      className={navClassName}
      ref={navRef}
      style={{ opacity: preloaderDone ? undefined : 0 }}
    >
      <div className="nav__logo" onClick={() => scrollTo('hero')}>
        L&rsquo;Elite
      </div>

      <ul className={linksClassName}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className="nav__link"
              onClick={() => scrollTo(item.id)}
            >
              {t(item.de, item.en)}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav__right">
        <div className="nav__lang">
          <button
            className={`nav__lang-btn${lang === 'de' ? ' is-active' : ''}`}
            onClick={() => setLang('de')}
          >
            DE
          </button>
          <span className="nav__lang-divider">|</span>
          <button
            className={`nav__lang-btn${lang === 'en' ? ' is-active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>

        <button
          className="nav__cta"
          onClick={() => scrollTo('contact')}
        >
          {t('Anfrage', 'Inquiry')}
        </button>

        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={t('Menü öffnen', 'Open menu')}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
