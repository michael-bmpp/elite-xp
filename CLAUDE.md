# CLAUDE.md — Elite XP (L'Elite Concierge Website)

## Project Overview

Luxury VIP concierge landing page for L'Elite, targeting the DACH market. Animation-first, bilingual (German/English) single-page website with service detail pages. Built with Next.js App Router, TypeScript strict mode, and GSAP animations. "Old Money Light" aesthetic — warm, muted, editorial.

**No backend exists yet.** Forms use `preventDefault()` with no submission handler. Services data is static TypeScript config.

## Tech Stack

- **Next.js** 16.x (App Router, React 19)
- **TypeScript** 5.x (strict mode)
- **GSAP** 3.x + ScrollTrigger (animations)
- **Lenis** (smooth scrolling, synced with GSAP ticker)
- **SplitType** (text decomposition for character/line animations)
- **Pure CSS** — no Tailwind, no Sass. All styles in `app/globals.css` (~2000 lines)

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm start        # Production server
```

No linting, formatting, or test scripts are configured.

## Project Structure

```
app/
  layout.tsx                  # Root layout (fonts, providers)
  page.tsx                    # Home page (assembles all sections)
  globals.css                 # Full design system & component styles
  services/[slug]/page.tsx    # Dynamic service detail pages

components/
  providers/
    LanguageProvider.tsx       # i18n context (DE/EN toggle)
    SmoothScrollProvider.tsx   # Lenis + GSAP scroll sync
  Hero.tsx                    # Hero with image rotator
  Navigation.tsx              # Sticky nav with scroll state
  Preloader.tsx               # Fullscreen splash animation
  DestinationsStrip.tsx       # City marquee carousel
  Philosophy.tsx              # Brand positioning + stats
  Services.tsx                # 3x2 service card grid
  Process.tsx                 # 4-step workflow
  Quote.tsx                   # Testimonial section
  Contact.tsx                 # Contact form
  ServiceDetailPage.tsx       # Service-specific detail + form
  GrainOverlay.tsx            # SVG film grain texture overlay
  Footer.tsx                  # Footer

lib/
  services.ts                 # Service data config (6 services)

public/images/
  hero/                       # Hero rotator images
  services/                   # Service card images
  destinations/               # City marquee images
  philosophy/                 # Philosophy section image
```

## Key Conventions

### Naming
- Components: **PascalCase** (`Hero.tsx`, `ServiceDetailPage.tsx`)
- Functions/variables: **camelCase** (`getServiceBySlug`, `setLanguage`)
- CSS classes: **BEM-style kebab-case** (`.contact__form`, `.hero__eyebrow`)
- CSS custom properties: **kebab-case** (`--ivory`, `--text-lg`, `--ease-expo`)

### Components
- All interactive components use `'use client'` directive
- Props typed with TypeScript interfaces
- GSAP animations use `useGSAP()` hook from `@gsap/react`
- ScrollTrigger with `once: true` — animations fire once, no reverse

### Internationalization
- Custom `LanguageProvider` context — no external i18n library
- Helper: `t(germanString, englishString)` returns current language
- Data attributes: `data-de` / `data-en` on elements
- Default language: **German**
- No URL-based language routing

### Styling
- All styles in `app/globals.css` using CSS custom properties
- Fluid typography via `clamp()` (e.g., `--text-lg: clamp(...)`)
- CSS Grid layouts, no utility classes
- Section backgrounds alternate: ivory → espresso → ivory → linen → ivory → linen → ivory → espresso

## Design System (CSS Variables)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--ivory` | #FAFAF5 | Main background |
| `--linen` | #F2EDE3 | Alternate section background |
| `--parchment` | #E8E0D4 | Cards, hover states |
| `--espresso` | #1C1814 | Primary text |
| `--walnut` | #4A3F35 | Secondary text/headings |
| `--stone` | #9C9488 | Muted text, labels |
| `--brass` | #A08C6A | Accent only (sparingly) |

### Fonts
- **Cormorant Garamond** — serif, for display headings
- **Plus Jakarta Sans** — sans-serif, for body/UI text

### Animation Rules
1. Prefer **clip-path reveals** over opacity fades
2. Always **stagger** sequential elements (never animate simultaneously)
3. Scroll animations fire **once** (`once: true`)
4. GSAP easing: `power4.out` for reveals, `power4.inOut` for wipes
5. Hardware-accelerate with `will-change: transform`

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — full landing page with all sections |
| `/services/[slug]` | Service detail page (6 slugs: oktoberfest, sport, concerts, cannes, monaco, ibiza) |

## Architecture Notes

- **No database** — service data is static in `lib/services.ts`
- **No API routes** — form submission not yet implemented
- **No authentication** — entirely public
- **No environment variables** needed currently
- **No ESLint/Prettier** configured — follow existing code style
- Image optimization via Next.js `<Image>` with AVIF/WebP formats

## When Making Changes

- Read `LELITE-WEBSITE-BRIEFING.md` for full design specifications and brand guidelines
- Maintain the warm, muted color palette — never introduce bright/saturated colors
- Use brass (`--brass`) sparingly — accent text, hovers, step numbers only
- Keep the grain overlay (`GrainOverlay.tsx`) on all pages
- Test both German and English language states
- Ensure animations use GSAP (not CSS transitions) for consistency
- All new sections should follow the established ScrollTrigger pattern
- Mobile responsiveness is in progress — test on mobile viewports
