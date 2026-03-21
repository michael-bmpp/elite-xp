'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <span className="footer__logo">L&rsquo;Elite</span>

      <span className="footer__copy">
        &copy; 2026 L&rsquo;Elite. All rights reserved.
      </span>

      <div className="footer__links">
        <a className="footer__link" href="#">
          {t('Datenschutz', 'Privacy Policy')}
        </a>
        <a className="footer__link" href="#">
          {t('Impressum', 'Legal Notice')}
        </a>
        <a className="footer__link" href="#">
          {t('AGB', 'Terms')}
        </a>
      </div>
    </footer>
  )
}
