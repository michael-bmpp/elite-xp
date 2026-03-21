# L'Elite — Website-Briefing & Arbeitsanweisung

**Projekt:** L'Elite Exclusive Concierge — Landingpage
**Version:** 2.0 — Stand 21. März 2026 (Redesign: Old Money Light)
**Erstellt für:** Entwicklung, Design, Content

---

## 1. Projektübersicht

L'Elite ist ein Luxury-Concierge-Service mit Fokus auf VIP-Tickets, Hospitality-Packages und Private Event Access in europäischen Hotspots (München, Monaco, Ibiza, London, Mailand, Paris, Kitzbühel, St. Moritz). Die Website ist eine Single-Page Landingpage, die als digitale Visitenkarte und Lead-Generierungs-Tool dient. Zielmarkt ist der deutschsprachige Raum (DACH) mit optionalem englischen Sprachswitch.

### Kernziel der Website

Die Seite verfolgt ein einziges konkretes Conversion-Ziel: qualifizierte Anfragen über das Kontaktformular generieren. Jede Designentscheidung, jede Animation und jeder Textblock dient dazu, den Besucher auf dieses Ziel hinzuführen — ohne Druck, aber mit spürbarer Exklusivität.

### Zielgruppe

Wohlhabende Privatpersonen (25–55), die bereit sind, für kuratierte Erlebnisse einen Premium-Preis zu zahlen. Sie erwarten eine Website, die sich anfühlt wie der Service selbst: diskret, hochwertig, mühelos. Keine lauten CTAs, keine Pop-ups, kein "Jetzt buchen"-Druck. Stattdessen: eine Einladung.

---

## 2. Design-Sprache & Ästhetik

### Designphilosophie

Die Designsprache folgt dem Konzept **"Old Money Light"** — eine helle, warme Ästhetik die an klassische europäische Couture-Häuser, editorialen Magazin-Journalismus und die gediegene Atmosphäre eines Privatclubs erinnert. Der Grundton ist: **Italienische Riviera trifft Schweizer Privatbank trifft Condé Nast Editorial**. Üppiges Whitespace, warme Ivory-Töne, klassische Serif-Typografie und gedecktes Messing/Brass als einziger Akzent. Die Hero-Section bleibt als dramatischer, dunkler Einstieg — danach öffnet sich die Seite in helle, luftige Sektionen.

### Farbpalette

| Token | Hex / Wert | Einsatz |
|-------|------------|---------|
| `--ivory` | `#FAFAF5` | Haupthintergrund — kaum wahrnehmbares Warmweiß |
| `--linen` | `#F2EDE3` | Sekundärer Hintergrund für alternierende Sektionen |
| `--parchment` | `#E8E0D4` | Tertiär — Card-Hintergründe, Hover-States |
| `--espresso` | `#1C1814` | Primäre Textfarbe — warmes Near-Black |
| `--walnut` | `#4A3F35` | Sekundäre Text-/Headingfarbe |
| `--stone` | `#9C9488` | Gedämpfte Texte, Eyebrows, Labels |
| `--brass` | `#A08C6A` | Akzentfarbe — gealtertes Messing, NICHT flashy |
| `--brass-light` | `rgba(160,140,106,0.10)` | Subtile Brass-Hintergründe, Hover-Tints |
| `--border` | `rgba(28,23,20,0.10)` | Haarfeine Trennlinien |
| `--border-dark` | `rgba(28,23,20,0.20)` | Stärkere Trennlinien, Card-Borders |
| `--hero-overlay` | Warm-Brown-Gradient | Spezialfarbe nur für Hero-Image-Overlay |

**Wichtig:** Brass wird extrem sparsam eingesetzt — für `<em>`-Worte in Headlines, Hover-States, Step-Nummern und den Rotator. NIE als Flächenfarbe. Der Gesamteindruck bleibt hell, ruhig, klassisch. Die Hero-Section ist die einzige "dunkle" Sektion — sie erzeugt den dramatischen Einstieg, bevor die Seite in die helle Old-Money-Welt übergeht.

### Sektions-Hintergründe

Statt eines durchgehenden Dark-Gradients alternieren Sektionen zwischen `--ivory` und `--linen`. Dies erzeugt einen subtilen Rhythmus ohne harten Kontrast. Übergänge sind weich — keine scharfen Farbkanten.

| Sektion | Hintergrund |
|---------|-------------|
| Preloader | `--ivory` |
| Hero | Dunkles Bild + Warm-Brown-Overlay |
| Destinations Strip | `--espresso` (dunkles Band als Akzent) |
| Philosophy | `--ivory` |
| Services (Horizontal Scroll) | `--linen` |
| Process | `--ivory` |
| Quote | `--linen` |
| Contact | `--ivory` |
| Footer | `--espresso` |

### Typografie

| Font | Typ | Einsatz |
|------|-----|---------|
| **Cormorant Garamond** (300–700, + Italic) | Display/Headline | Alle Headlines, Rotator, Zitate, Logo, Card-Titles. Klassische Serif mit italienischem Charakter — die typografische Seele des Old-Money-Looks. |
| **Plus Jakarta Sans** (300–600) | Body/UI | Fließtext, Navigation, Buttons, Formular, Labels. Warme geometrische Sans-Serif — modern, hochlesbar, perfekter Kontrast zur Serif. |

**Typografische Regeln:**

- Headlines: Cormorant Garamond, Weight 600–700, leicht negatives Letter-Spacing (`-0.02em`), Line-Height 1.0–1.1. Italic für Akzent-Worte.
- Body: Plus Jakarta Sans, Weight 400, Letter-Spacing `-0.01em`, Line-Height 1.75–1.85, Farbe `--walnut` oder `--stone`.
- Eyebrows/Labels: Plus Jakarta Sans, ~0.65rem, Uppercase, Letter-Spacing `0.3em`, Farbe `--stone`, Weight 500.
- Italics in Headlines (`<em>`) werden in `--brass` gesetzt.
- Logo: Cormorant Garamond, Italic, Letter-Spacing `0.05em` — kein Uppercase für das Logo, stattdessen elegante Mixed-Case-Schreibung.

**Fluid Type Scale:** Alle Schriftgrößen nutzen `clamp()` für nahtlose Skalierung. Keine harten Breakpoint-Sprünge für Typografie.

### Grain-Textur-Overlay

Die gesamte Seite hat ein subtiles Papier-/Film-Grain-Overlay (Opacity ~2.5%), erzeugt via SVG `feTurbulence` Filter. Dies verleiht der hellen Oberfläche eine taktile, analoge Qualität — wie hochwertiges Büttenpapier. Das Overlay ist `position: fixed`, `pointer-events: none` und liegt auf höchstem z-index.

---

## 3. Seitenstruktur & Sektionen

Die Seite besteht aus 8 klar definierten Sektionen, die in einer linearen Scroll-Narrative angeordnet sind:

### 3.1 Preloader

**Zweck:** Markenmoment beim Erstbesuch, gibt GSAP/Lenis Zeit zum Initialisieren.

**Aufbau:** Fullscreen-Overlay auf `--bg`-Schwarz. Zentriert: Wortmarke "L'Elite" (Syne, 600, Uppercase, 0.3em Tracking). Darunter: schmale Fortschrittsleiste (140px breit, 1px hoch).

**Animation:** Die Wortmarke wird per Clip-Path von unten eingeblendet (staggered, L' → Elite). Parallel füllt sich die Leiste von links nach rechts. Nach kurzer Pause fährt die Wortmarke nach oben weg, dann wipet das gesamte Overlay per Clip-Path nach unten ab — dahinter erscheint die Hero-Section. Lenis-Scroll wird erst nach Abschluss des Preloaders freigegeben.

**Timing:** Gesamtdauer ~3.5s. Barfill 1.5s, Wortmarke-Reveal 0.85s (stagger 0.11s), Pause 0.45s, Exit 0.85s.

### 3.2 Navigation

**Zweck:** Persistent, fixed, transparent — wird beim Scrollen kompakt.

**Aufbau:** Flexbox-Layout mit drei Bereichen: Logo (links), Nav-Links (Mitte), Language-Switcher + CTA (rechts).

**Links:** Philosophie, Services, Ablauf, Anfrage — alle als Anchor-Links mit Lenis Smooth Scroll (Offset -80px, Duration 1.6s).

**Language-Switcher:** DE | EN Toggle. Setzt `currentLang` und updated alle Elemente mit `data-de`/`data-en` Attributen (innerHTML, Placeholder, Select-Options).

**Scroll-Verhalten:** Initial: transparenter Hintergrund, großzügiges Padding (36px). Nach 80px Scroll: Klasse `is-scrolled` → kompakteres Padding (20px), `backdrop-filter: blur(24px) saturate(1.6)`, halbtransparenter schwarzer Hintergrund.

**CTA-Button:** Ghost-Button (1px Border, Cream) mit Hover → leichter Background-Fill.

### 3.3 Hero Section

**Zweck:** Emotionaler Einstieg, sofortige Vermittlung des Leistungsversprechens.

**Layout:** Fullscreen (100vh), 2×2 CSS-Grid über dem Hero-Bild.

- **Row 1, Col 1 (Top-Left):** Eyebrow ("VIP Tickets · Luxury Hospitality · Private Event Access") + Hauptheadline ("Ihr Zugang zu")
- **Row 1, Col 2 (Top-Right):** Body-Text — rechts ausgerichtet, max 280px breit
- **Row 2, Full Width:** Rotator mit wechselnden Phrasen (Gold, Italic, Syne 700)
- **Absolut positioniert, Center-Bottom:** Pill-CTA-Button
- **Absolut positioniert, Bottom-Center:** Scroll-Indicator

**Hero-Bild-System:** Zwei Layer (`hero-img` als Base, `hero-img-next` als Crossfade-Layer). Das aktive Bild wechselt synchron mit dem Rotator. GSAP managed den Crossfade: `hero-img-next` faded ein (1.2s), dann wird das Bild auf `hero-img` übernommen und `hero-img-next` zurückgesetzt. Beide Layer haben `inset: -15%` für Parallax-Headroom.

**Rotator:** 4 Phrasen die alle ~2.8s wechseln. Clip-Path-Animation: aktiv = `inset(0 0 0% 0)`, exit = `inset(100% 0 0% 0)`. Jede Phrase referenziert ein Background-Image via `data-bg`.

- "Premium Oktoberfest Packages" → oktoberfest.jpeg
- "F1 Hospitality Packages" → f1monaco.jpeg
- "Bayern München Hospitality" → fcbayern.jpeg
- "Zugang zu ausverkauften Venues" → konzerte.jpeg

**Vignette:** Radial-Gradient + Linear-Gradient-Overlay auf dem Hero-Bild. Sorgt dafür, dass Text immer lesbar bleibt, unabhängig vom Hintergrundbild. Unten stark abgedunkelt (96% Opacity).

**Pill-CTA:** Cream-Hintergrund, schwarzer Text, runder schwarzer Icon-Circle mit Pfeil. Hover: Background wird Gold, Pfeil rotiert -40° und verschiebt sich leicht.

**Scroll-Indicator:** "SCROLL" Text (0.5rem, 0.38em Tracking) + vertikale Linie mit Puls-Animation (2.4s Loop, scaleY 0→1 + translateY).

**Hero-Entrance-Animation:** Wird erst nach Preloader-Exit getriggert. Staggered Sequence: Eyebrow (Clip-Path reveal, 0.85s) → H1 Chars (SplitType, char-by-char reveal, stagger 0.028s) → Body-Text (0.85s, delayed 0.58s) → CTA (0.8s, delayed 0.78s) → Scroll-Indicator (Fade-In, 1.4s).

**Parallax:** Hero-Bild bewegt sich mit `yPercent: 24` über die Scroll-Distanz der Hero-Section (scrub: true).

### 3.4 Destinations Strip (Marquee)

**Zweck:** Visueller Separator, vermittelt internationale Reichweite.

**Aufbau:** Horizontaler Marquee-Slider mit 8 City-Cards (München, Monaco, Ibiza, London, Mailand, Paris, Kitzbühel, St. Moritz). Karten sind dupliziert für Seamless-Loop.

**Cards:** Jede Card: 340px breit, Vollbild-Hintergrund (Unsplash), Dark-Gradient-Overlay von unten, Label mit Country (Uppercase, Taupe) + City-Name (Syne Italic, Cream).

**Animation:** CSS `@keyframes marqueeTrack` — `translateX(0)` → `translateX(-50%)`, 42s linear infinite. Pause on Hover (animation-play-state: paused). Card-Images zoomen leicht bei Hover (scale 1.06, 0.9s ease).

**Höhe:** 270px fest. Borders oben/unten: 1px `rgba(255,248,237,0.05)`.

### 3.5 Philosophy Section

**Zweck:** Positionierung — "Mehr als ein Service".

**Layout:** 2-Spalten-Grid (1fr 1fr, Gap 100px). Links: Bild (Aspect-Ratio 4:5). Rechts: Eyebrow + Headline + Body + Stats.

**Bild:** Clip-Path-Reveal von unten (`inset(100% 0 0 0)` → `inset(0% 0 0 0)`, 1.4s, power4.inOut). Inneres Parallax (`yPercent: -22`, scrub 1.5).

**Stats:** Zwei Kennzahlen nebeneinander mit Divider-Linie:
- "100%" (animierter Counter, 1.8s) + "Maßgeschneidert"
- "24/7" (statisch) + "Erreichbar"

**Text-Animationen:** Eyebrow und Body per `js-line-reveal` (Clip-Path von unten). Headline per `js-split-lines` (SplitType, Line-by-Line reveal mit Overflow-Hidden-Wrapper).

### 3.6 Services Section

**Zweck:** Leistungsportfolio — was L'Elite bietet.

**Header:** Zentriert — Eyebrow + Headline + Body.

**Grid:** 3 Spalten, 6 Cards, 1px Gap (erzeugt haarfeine Cream-Linien zwischen den Cards durch Background-Color auf dem Grid-Container).

**Service-Cards:**

| # | Location | Titel | Beschreibung |
|---|----------|-------|--------------|
| 1 | München | Oktoberfest | Zeltplätze, Luxushotel, Transfer, Hostess |
| 2 | Europaweit | Sport & Hospitality | CL, Bundesliga, EURO, WM — VIP-Tickets |
| 3 | Weltweit | Konzerte & Live-Events | Ausverkaufte Tickets, Backstage |
| 4 | Cannes | Filmfestspiele & Restaurants | Akkreditierungen, Gala, Fine Dining |
| 5 | Monaco | Formel 1 & Yacht-Events | Grandstand, Trackside-Apartments, Yacht-Parties |
| 6 | Ibiza | Villen & Clubs | Private Villen, Pacha/Hï/Ushuaïa VIP |

**Card-Aufbau:** Aspect-Ratio 3:4, Vollbild-Hintergrund, Dark-Gradient-Overlay von unten (96% unten), Content absolut unten positioniert (Location, Titel, Beschreibung).

**Animationen:**
- Cards: Batch-Clip-Path-Reveal (`inset(100% 0 0 0)` → `inset(0% 0 0 0)`, stagger 0.1s, 1.2s)
- Card-Images: Parallax (`yPercent: -18`, scrub 1.2)
- Hover: Image scale 1.06 (1s ease)

### 3.7 Process Section ("How It Works")

**Zweck:** Transparenz schaffen — 4 einfache Schritte.

**Layout:** Zentrierter Header + horizontale Step-Leiste (4 Steps).

**Steps:**

| # | Titel | Beschreibung |
|---|-------|--------------|
| 01 | Anfrage stellen | Wunschvorstellung beschreiben — kein Formular-Dschungel |
| 02 | Ihr persönliches Angebot | Maßgeschneidertes Package aus einer Hand |
| 03 | Bestätigung & Koordination | Komplette Koordination nach Freigabe |
| 04 | Ihr Erlebnis | Genießen — betreut, exklusiv, unbeschwert |

**Step-Aufbau:** Nummer (große Syne-Zahl) + vertikale Linie + Titel + Beschreibung.

**Animationen:**
- Steps: Batch-Entrance (translateY 36px → 0, opacity 0 → 1, stagger 0.14s)
- Hover: Step-Nummer wechselt von Cream zu Gold (0.3s)

### 3.8 Quote Section

**Zweck:** Emotionaler Akzent — die Vision hinter L'Elite.

**Aufbau:** Großes Anführungszeichen + Blockquote + Attribution. Zentriert.

**Zitat:** "Eine Plattform, bei der die Menschen wissen: *Auf wen kann ich da zukommen?* – und wo sie nach bestem Gewissen betreut werden."

**Attribution:** "Die Vision hinter L'Elite"

### 3.9 Contact Section

**Zweck:** Conversion — das Anfrage-Formular.

**Layout:** 2-Spalten-Grid. Links: Info-Text + Kontaktdaten (E-Mail, Telefon). Rechts: Formular.

**Formular-Felder:**
1. Vorname + Nachname (2-spaltig)
2. E-Mail-Adresse
3. Destination/Service-Dropdown (München–Oktoberfest, Sportevents, Konzerte, Cannes, Monaco–F1, Ibiza, Sonstiges)
4. Freitext-Textarea (Wunscherlebnis)
5. Submit-Button

**Form-Styling:** Keine Labels — nur Underline-Inputs (1px Bottom-Border). Minimalistisch, kein visueller Lärm.

**Form-Animation:** Horizontaler Clip-Path-Wipe (`inset(0 100% 0 0)` → `inset(0 0% 0 0)`, 1.4s).

**Submit-Feedback:** Button-Text wechselt zu "Gesendet ✓", kurzer Scale-Bounce, Reset nach 3.2s. **Hinweis:** Aktuell kein Backend-Submit — `e.preventDefault()` verhindert den Abschick. Muss noch mit tatsächlichem Endpoint verbunden werden.

### 3.10 Footer

**Aufbau:** Logo + Copyright + Links (Datenschutz, Impressum, AGB). Minimalistisch.

---

## 4. Animation & Motion Design

### Tech-Stack für Animationen

| Library | Version | Zweck |
|---------|---------|-------|
| **GSAP** | 3.12.5 | Kern-Animation-Engine (Timeline, Tweens) |
| **ScrollTrigger** | (GSAP Plugin) | Scroll-basierte Trigger & Scrub-Animationen |
| **Lenis** | 1.1.14 | Smooth Scroll (ersetzt nativen Scroll) |
| **SplitType** | 0.3.4 | Text-Splitting für char/line-basierte Animationen |

### Animations-Philosophie

Die Animations-Sprache folgt drei Prinzipien:

1. **Clip-Path als primäres Reveal-Tool:** Fast alle Einblendungen nutzen `clip-path: inset()` statt Opacity-Fades. Das erzeugt einen scharfen, editorialen "Wipe"-Effekt — charakteristisch für High-End-Websites.

2. **Staggered Sequences:** Elemente erscheinen nie gleichzeitig. Alles ist gestaffelt — Chars, Lines, Cards, Steps. Stagger-Werte liegen typisch zwischen 0.028s (Chars) und 0.14s (Steps).

3. **Once-Trigger:** Die meisten Scroll-Animationen feuern nur einmal (`once: true` bzw. `toggleActions: 'play none none none'`). Kein Rückwärts-Reverse beim Hochscrollen. Das ist bewusst — die Seite "baut sich auf" während der Besucher scrollt.

### Übersicht aller Animationen

| Element | Typ | Trigger | Effekt | Dauer |
|---------|-----|---------|--------|-------|
| Preloader Wortmarke | Timeline | Page Load | Clip-Path reveal von unten, staggered | 0.85s |
| Preloader Exit | Timeline | Nach Barfill | Clip-Path wipe nach unten | 0.85s |
| Hero Eyebrow | Timeline | Post-Preloader | Clip-Path reveal + translateY | 0.85s |
| Hero H1 | Timeline | Post-Preloader | Char-by-char Clip-Path reveal | 1.0s (stagger 0.028s) |
| Hero Body | Timeline | Post-Preloader | Clip-Path reveal + translateY | 0.85s |
| Hero CTA | Timeline | Post-Preloader | Clip-Path reveal + translateY | 0.8s |
| Hero Scroll Indicator | Timeline | Post-Preloader | Opacity fade-in | 1.4s |
| Hero-Bild Parallax | Scrub | Scroll (Hero) | yPercent: 24 | Kontinuierlich |
| Rotator Text | Interval | 2.8s Loop | Clip-Path swap (active/exiting) | 0.75s |
| Rotator Background | GSAP Tween | Sync mit Text | Crossfade opacity 0→1→swap | 1.2s |
| Nav Scroll-State | ScrollTrigger | 80px Scroll | CSS-Klasse toggle | CSS Transition |
| Line Reveals | ScrollTrigger | top 88% | Clip-Path reveal + translateY 16px | 1.0s |
| Split Lines (Headlines) | ScrollTrigger | top 84% | Line-by-line translateY 110% → 0 | 1.1s (stagger 0.1s) |
| Philosophy Image | ScrollTrigger | top 82% | Clip-Path reveal von unten | 1.4s |
| Philosophy Image Parallax | Scrub | Scroll | yPercent: -22 | Kontinuierlich |
| Service Cards | Batch | top 90% | Clip-Path reveal, staggered | 1.2s |
| Service Card Parallax | Scrub | Scroll | yPercent: -18 | Kontinuierlich |
| Process Steps | Batch | top 88% | translateY + opacity | 1.0s (stagger 0.14s) |
| Step Hover | Mouse | Hover | Nummer-Farbe → Gold | 0.3s |
| Contact Form | ScrollTrigger | top 82% | Horizontaler Clip-Path wipe | 1.4s |
| Counter (100%) | ScrollTrigger | top 87% | Zählt von 0 auf 100 | 1.8s |
| Marquee | CSS | Immer | translateX linear loop | 42s |

### Easing-Referenz

| Token | Wert | Einsatz |
|-------|------|---------|
| `power4.out` | GSAP built-in | Standard-Reveals, Entrances |
| `power4.inOut` | GSAP built-in | Clip-Path wipes, Image reveals |
| `power2.inOut` | GSAP built-in | Background crossfade, Barfill |
| `power3.in` | GSAP built-in | Preloader wordmark exit |
| `--ease-expo` | `cubic-bezier(0.19,1,0.22,1)` | CSS Transitions (Hover, Scale) |
| `--ease-quint` | `cubic-bezier(0.22,1,0.36,1)` | CSS Transitions (alternativ) |

---

## 5. Interaktivität & UX-Details

### Smooth Scroll (Lenis)

- Duration: 1.2s
- Easing: Custom exponential (`1.001 - 2^(-10t)`)
- Touch: Deaktiviert (`smoothTouch: false`) — Mobile nutzt nativen Scroll
- Anchor-Navigation: Lenis `.scrollTo()` mit offset -80px und duration 1.6s
- Integration: GSAP Ticker synct Lenis mit ScrollTrigger

### Language Switcher (DE/EN)

Vollständige Zweisprachigkeit über Data-Attribute. Jedes sichtbare Textelement hat `data-de` und `data-en` Attribute. Der Switcher updated:
- `innerHTML` für normale Elemente
- `placeholder` für Inputs/Textareas (via `data-placeholder-de`/`data-placeholder-en`)
- `option.text` für Select-Elemente

Aktuell rein clientseitig — kein URL-basiertes Routing (kein `/en/`-Pfad). Default: Deutsch.

### Hover-States

- **Nav-Links:** Opacity 0.42 → 1.0 (Cream)
- **Nav-CTA:** Border wird heller + leichter Background-Fill
- **Pill-CTA:** Background Cream → Gold, Pfeil-Icon rotiert und verschiebt sich
- **Primary Buttons:** Pseudo-Element `::before` skaliert von links, Text invertiert
- **Service Cards:** Image scale 1.06
- **City Cards:** Image scale 1.06
- **Process Steps:** Nummer-Farbe Cream → Gold

### Formular

- Underline-Style (kein Box-Styling)
- Custom Select mit eigenem Arrow-Indicator
- Submit: Visuelles Feedback ("Gesendet ✓"), 3.2s Reset
- Kein Backend-Handler implementiert — aktuell `preventDefault()`

---

## 6. Technische Architektur

### Dateistruktur

```
/
├── lelite-landing.html    # Markup — Sektionen, Formulare, Data-Attribute
├── lelite-style.css       # Alle Styles — Custom Properties, Grid, Animationen
├── lelite-script.js       # Lenis, GSAP, ScrollTrigger, Rotator, Language
├── oktoberfest.jpeg       # Hero-Rotator-Bild
├── f1monaco.jpeg          # Hero-Rotator-Bild
├── fcbayern.jpeg          # Hero-Rotator-Bild
└── konzerte.jpeg          # Hero-Rotator-Bild
```

### Externe Dependencies (CDN)

| Ressource | CDN | Lademethode |
|-----------|-----|-------------|
| Syne + Space Grotesk | Google Fonts | `<link>` mit preconnect |
| GSAP 3.12.5 | cdnjs | `<script defer>` |
| ScrollTrigger | cdnjs | `<script defer>` |
| Lenis 1.1.14 | jsDelivr | `<script defer>` |
| SplitType 0.3.4 | jsDelivr | `<script defer>` |

### Bilder

- **Hero-Rotator:** 4 lokale JPEGs (müssen bereitgestellt werden)
- **Destination-Cards + Service-Cards + Philosophy:** Unsplash-URLs (direkt im CSS) — müssen für Produktion durch eigene Assets ersetzt werden
- **Parallax-Headroom:** Alle Fullscreen-Bilder haben `inset: -10%` bis `-15%` für Parallax-Spielraum

### CSS-Architektur

- Keine Preprocessor-Dependency (kein Sass/LESS)
- Custom Properties für alles: Farben, Typografie, Easing, Shadows
- Fluid Typography via `clamp()` — keine Breakpoint-Media-Queries für Font-Sizes
- Grid-basierte Layouts (CSS Grid, kein Float/Flexbox-Hack)
- Clip-Path als primäres Animation-Tool (Hardware-beschleunigt)
- `will-change: transform` auf allen parallax-fähigen Elementen

### JavaScript-Architektur

- Vanilla JS — kein Framework, kein Build-System
- Alles in `window.addEventListener('load', ...)` gekapselt
- GSAP als einzige Animation-Dependency
- Lenis als Scroll-Engine (ersetzt Browser-Scroll)
- SplitType für Text-Decomposition
- Language-Switcher als globale Funktion (`window.setLang`)

---

## 7. Offene Punkte & Nächste Schritte

### Must-Do (Produktion)

1. **Backend für Kontaktformular:** Aktuell kein Submit-Handler. Benötigt API-Endpoint (z.B. HubSpot Forms API, Netlify Forms, oder Custom-Backend).
2. **Eigene Bilder:** Alle Unsplash-URLs durch lizenzierte, markenspezifische Fotos ersetzen. Hero-Rotator-Bilder (oktoberfest.jpeg etc.) müssen bereitgestellt werden.
3. **Impressum/Datenschutz/AGB:** Links verweisen auf `#` — echte Unterseiten oder Modals benötigt.
4. **Copyright-Jahr:** Steht aktuell auf "2025" — auf 2026 aktualisieren bzw. dynamisch generieren.
5. **Mobile Responsive:** CSS enthält aktuell keine expliziten Mobile-Breakpoints. Navigation braucht Hamburger-Menü, Grid-Layouts müssen auf 1-Spalte collabieren, Touch-Interaktionen testen.
6. **Performance-Optimierung:** Bilder als WebP/AVIF, Lazy Loading für Below-the-Fold-Bilder, Font-Display: swap (ist via Google Fonts bereits gesetzt).
7. **SEO/Meta:** Kein `<meta description>`, keine Open-Graph-Tags, keine Structured Data.

### Nice-to-Have

- Favicon + Apple Touch Icon im L'Elite-Branding
- Cookie-Banner (DSGVO)
- Analytics-Integration (z.B. Google Tag Manager)
- Micro-Interactions: Cursor-Customization, Magnetic Buttons
- Testimonials-Section oder Social Proof
- Instagram-/Social-Feed-Integration
- Video-Background-Option für Hero (statt statischer Bilder)
- Scroll-Progress-Indicator

---

## 8. Zusammenfassung der Design-Regeln

1. **Farbe:** Monochromatisch warm-dunkel. Gold nur als Akzent auf Text-Ebene.
2. **Typografie:** Syne für Impact, Space Grotesk für Lesbarkeit. Fluid Sizing. Immer.
3. **Animation:** Clip-Path > Opacity. Staggered > Simultan. Once > Repeat.
4. **Whitespace:** Lieber zu viel als zu wenig. `padding: 120px 64px` als Section-Standard.
5. **Bilder:** Immer Overlay/Vignette. Nie unbehandelt. Parallax wo möglich.
6. **CTAs:** Einladend, nie drängend. Maximal 2 sichtbare CTAs gleichzeitig.
7. **Sprache:** Deutsch als Default, Englisch als Switch. Kein Denglisch im Copy.
8. **Performance:** Defer alles. Smooth Scroll nur Desktop. `will-change` sparsam.
