export interface ServiceField {
  key: string
  type: 'text' | 'number' | 'date' | 'select' | 'daterange'
  label: { de: string; en: string }
  placeholder?: { de: string; en: string }
  options?: { de: string; en: string; value: string }[]
  required?: boolean
}

export interface ServiceConfig {
  slug: string
  label: { de: string; en: string }
  tagline: { de: string; en: string }
  description: { de: string; en: string }
  location: { de: string; en: string }
  image: string
  highlights: { de: string; en: string }[]
  fields: ServiceField[]
}

export const services: ServiceConfig[] = [
  {
    slug: 'oktoberfest',
    label: { de: 'Oktoberfest', en: 'Oktoberfest' },
    tagline: { de: 'Das ultimative Wiesn-Erlebnis', en: 'The Ultimate Wiesn Experience' },
    description: {
      de: 'Erleben Sie das Oktoberfest auf höchstem Niveau — mit reservierten Tischen in den exklusivsten Zelten, Luxushotel in Gehweite, privatem Transfer und persönlicher Betreuung vor Ort. Kein Anstehen, kein Stress, nur pure Lebensfreude.',
      en: 'Experience Oktoberfest at the highest level — with reserved tables in the most exclusive tents, luxury hotel within walking distance, private transfer and personal on-site service. No queuing, no stress, just pure joie de vivre.',
    },
    location: { de: 'München', en: 'Munich' },
    image: '/images/services/services-oktoberfest.jpg',
    highlights: [
      { de: 'Reservierte Tische in Premium-Zelten', en: 'Reserved tables in premium tents' },
      { de: 'Luxushotel in Theresienwiesen-Nähe', en: 'Luxury hotel near Theresienwiese' },
      { de: 'Privater Limousinen-Transfer', en: 'Private limousine transfer' },
      { de: 'Persönliche Hostess & Betreuung', en: 'Personal hostess & concierge' },
      { de: 'VIP-Trachten-Shopping auf Wunsch', en: 'VIP traditional outfit shopping on request' },
      { de: 'Exklusive After-Wiesn-Events', en: 'Exclusive after-Wiesn events' },
    ],
    fields: [
      { key: 'date', type: 'daterange', label: { de: 'Gewünschter Zeitraum', en: 'Preferred Dates' }, required: true },
      { key: 'guests', type: 'number', label: { de: 'Anzahl Gäste', en: 'Number of Guests' }, placeholder: { de: 'z.B. 4', en: 'e.g. 4' }, required: true },
      {
        key: 'tent', type: 'select', label: { de: 'Wunschzelt', en: 'Preferred Tent' },
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
        key: 'hotel', type: 'select', label: { de: 'Hotelpaket', en: 'Hotel Package' },
        options: [
          { de: 'Ja, Luxushotel', en: 'Yes, Luxury Hotel', value: 'luxury' },
          { de: 'Ja, gehobenes Hotel', en: 'Yes, Upscale Hotel', value: 'upscale' },
          { de: 'Nein, nur Tischreservierung', en: 'No, Table Only', value: 'no' },
        ],
      },
      {
        key: 'transfer', type: 'select', label: { de: 'Transfer & Betreuung', en: 'Transfer & Service' },
        options: [
          { de: 'Ja, Komplettpaket', en: 'Yes, Full Package', value: 'full' },
          { de: 'Nur Transfer', en: 'Transfer Only', value: 'transfer' },
          { de: 'Nicht benötigt', en: 'Not Needed', value: 'no' },
        ],
      },
    ],
  },
  {
    slug: 'sport',
    label: { de: 'Sport & Hospitality', en: 'Sports & Hospitality' },
    tagline: { de: 'Erstklassige Plätze für unvergessliche Momente', en: 'First-Class Seats for Unforgettable Moments' },
    description: {
      de: 'Von der Champions League über die Bundesliga bis hin zu EURO und WM — wir verschaffen Ihnen Zugang zu den begehrtesten Sportevents Europas. VIP-Logen, Hospitality-Bereiche und Premium-Tribünenplätze, kombiniert mit erstklassigem Catering und persönlichem Service.',
      en: 'From the Champions League to the Bundesliga, EURO and World Cup — we provide access to Europe\'s most sought-after sporting events. VIP suites, hospitality areas and premium grandstand seats, combined with first-class catering and personal service.',
    },
    location: { de: 'Europaweit', en: 'Europe-wide' },
    image: '/images/services/services-sport.jpg',
    highlights: [
      { de: 'VIP-Logen & Skyboxen', en: 'VIP suites & skyboxes' },
      { de: 'Hospitality-Packages mit Catering', en: 'Hospitality packages with catering' },
      { de: 'Champions League & internationale Turniere', en: 'Champions League & international tournaments' },
      { de: 'Meet & Greet mit Spielern (auf Anfrage)', en: 'Meet & greet with players (on request)' },
      { de: 'Hotel & Transfer inklusive', en: 'Hotel & transfer included' },
      { de: 'Bundesliga, Serie A, Premier League', en: 'Bundesliga, Serie A, Premier League' },
    ],
    fields: [
      { key: 'event', type: 'text', label: { de: 'Event / Spiel', en: 'Event / Match' }, placeholder: { de: 'z.B. FC Bayern vs. Real Madrid', en: 'e.g. FC Bayern vs. Real Madrid' }, required: true },
      { key: 'tickets', type: 'number', label: { de: 'Anzahl Tickets', en: 'Number of Tickets' }, placeholder: { de: 'z.B. 2', en: 'e.g. 2' }, required: true },
      {
        key: 'level', type: 'select', label: { de: 'VIP-Level', en: 'VIP Level' },
        options: [
          { de: 'Loge / Skybox', en: 'Suite / Skybox', value: 'skybox' },
          { de: 'Hospitality-Bereich', en: 'Hospitality Area', value: 'hospitality' },
          { de: 'Premium-Tribüne', en: 'Premium Seats', value: 'premium' },
          { de: 'Beste verfügbare Kategorie', en: 'Best Available', value: 'best' },
        ],
      },
    ],
  },
  {
    slug: 'konzerte',
    label: { de: 'Konzerte & Live-Events', en: 'Concerts & Live Events' },
    tagline: { de: 'Backstage-Zugang zur Welt der Musik', en: 'Backstage Access to the World of Music' },
    description: {
      de: 'Ausverkauft bedeutet für uns nur der Anfang. Wir beschaffen Tickets für die begehrtesten Konzerte und Live-Events weltweit — von Stadion-Shows bis zu intimen Club-Gigs. Auf Wunsch mit Backstage-Zugang, Meet & Greet und VIP-Lounge.',
      en: 'Sold out is just the beginning for us. We source tickets for the most coveted concerts and live events worldwide — from stadium shows to intimate club gigs. With backstage access, meet & greet and VIP lounge on request.',
    },
    location: { de: 'Weltweit', en: 'Worldwide' },
    image: '/images/services/services-konzerte.jpg',
    highlights: [
      { de: 'Tickets für ausverkaufte Shows', en: 'Tickets for sold-out shows' },
      { de: 'Backstage-Zugang & Meet & Greet', en: 'Backstage access & meet & greet' },
      { de: 'VIP-Lounges & Premium-Plätze', en: 'VIP lounges & premium seats' },
      { de: 'Festival-Packages (Coachella, Tomorrowland)', en: 'Festival packages (Coachella, Tomorrowland)' },
      { de: 'Private Konzert-Events', en: 'Private concert events' },
      { de: 'Weltweites Netzwerk', en: 'Worldwide network' },
    ],
    fields: [
      { key: 'artist', type: 'text', label: { de: 'Künstler / Event', en: 'Artist / Event' }, placeholder: { de: 'z.B. Coldplay, Adele', en: 'e.g. Coldplay, Adele' }, required: true },
      { key: 'city', type: 'text', label: { de: 'Bevorzugte Stadt', en: 'Preferred City' }, placeholder: { de: 'z.B. München, London', en: 'e.g. Munich, London' } },
      { key: 'tickets', type: 'number', label: { de: 'Anzahl Tickets', en: 'Number of Tickets' }, placeholder: { de: 'z.B. 2', en: 'e.g. 2' }, required: true },
      {
        key: 'experience', type: 'select', label: { de: 'Erlebnis-Level', en: 'Experience Level' },
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
    slug: 'cannes',
    label: { de: 'Filmfestspiele Cannes', en: 'Cannes Film Festival' },
    tagline: { de: 'Roter Teppich & Côte d\'Azur', en: 'Red Carpet & Côte d\'Azur' },
    description: {
      de: 'Das Festival de Cannes ist mehr als Kino — es ist das glamouröseste Gesellschaftsereignis der Welt. Wir organisieren Akkreditierungen, Einladungen zu Gala-Events, Reservierungen in den besten Restaurants der Croisette und stilvolle Unterkünfte.',
      en: 'The Festival de Cannes is more than cinema — it\'s the world\'s most glamorous social event. We organize accreditations, invitations to gala events, reservations at the finest Croisette restaurants and stylish accommodations.',
    },
    location: { de: 'Cannes', en: 'Cannes' },
    image: '/images/services/services-cannes.jpg',
    highlights: [
      { de: 'Festival-Akkreditierungen & Screenings', en: 'Festival accreditations & screenings' },
      { de: 'Gala-Events & Afterpartys', en: 'Gala events & afterparties' },
      { de: 'Fine Dining an der Croisette', en: 'Fine dining on the Croisette' },
      { de: 'Luxushotel oder Private Villa', en: 'Luxury hotel or private villa' },
      { de: 'Yacht-Charter für die Festivalwoche', en: 'Yacht charter for festival week' },
      { de: 'Privater Chauffeur-Service', en: 'Private chauffeur service' },
    ],
    fields: [
      { key: 'date', type: 'daterange', label: { de: 'Gewünschter Zeitraum', en: 'Preferred Dates' }, required: true },
      { key: 'guests', type: 'number', label: { de: 'Anzahl Personen', en: 'Number of Guests' }, placeholder: { de: 'z.B. 2', en: 'e.g. 2' }, required: true },
      {
        key: 'interests', type: 'select', label: { de: 'Schwerpunkt', en: 'Main Interest' },
        options: [
          { de: 'Akkreditierung & Screenings', en: 'Accreditation & Screenings', value: 'screenings' },
          { de: 'Gala-Events & Partys', en: 'Gala Events & Parties', value: 'galas' },
          { de: 'Fine Dining & Restaurants', en: 'Fine Dining & Restaurants', value: 'dining' },
          { de: 'Komplettpaket', en: 'Complete Package', value: 'complete' },
        ],
      },
      {
        key: 'accommodation', type: 'select', label: { de: 'Unterkunft', en: 'Accommodation' },
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
    slug: 'monaco',
    label: { de: 'Formel 1 Monaco', en: 'Formula 1 Monaco' },
    tagline: { de: 'Wo Motorsport auf Glamour trifft', en: 'Where Motorsport Meets Glamour' },
    description: {
      de: 'Der Grand Prix von Monaco ist das Kronjuwel des Motorsports — und das exklusivste Rennwochenende der Welt. Erleben Sie die Formel 1 von einer Yacht im Hafen, einem Trackside-Apartment oder der Hospitality-Suite mit Blick auf die berühmteste Kurve der Welt.',
      en: 'The Monaco Grand Prix is the crown jewel of motorsport — and the world\'s most exclusive race weekend. Experience Formula 1 from a yacht in the harbor, a trackside apartment or the hospitality suite overlooking the most famous corner in the world.',
    },
    location: { de: 'Monaco', en: 'Monaco' },
    image: '/images/services/services-monaco.jpg',
    highlights: [
      { de: 'Yacht-Party mit Streckenblick', en: 'Yacht party with track view' },
      { de: 'Trackside-Apartments über der Rennstrecke', en: 'Trackside apartments above the circuit' },
      { de: 'Paddock Club & Hospitality-Suiten', en: 'Paddock Club & hospitality suites' },
      { de: 'Exklusive Afterpartys', en: 'Exclusive afterparties' },
      { de: 'Helikopter-Transfer', en: 'Helicopter transfer' },
      { de: 'Fine Dining in Monte Carlo', en: 'Fine dining in Monte Carlo' },
    ],
    fields: [
      { key: 'guests', type: 'number', label: { de: 'Anzahl Personen', en: 'Number of Guests' }, placeholder: { de: 'z.B. 4', en: 'e.g. 4' }, required: true },
      {
        key: 'experience', type: 'select', label: { de: 'Erlebnis-Typ', en: 'Experience Type' },
        options: [
          { de: 'Yacht-Party mit Streckenblick', en: 'Yacht Party with Track View', value: 'yacht' },
          { de: 'Trackside-Apartment', en: 'Trackside Apartment', value: 'apartment' },
          { de: 'Grandstand VIP', en: 'Grandstand VIP', value: 'grandstand' },
          { de: 'Hospitality-Suite', en: 'Hospitality Suite', value: 'hospitality' },
          { de: 'Komplettpaket', en: 'Complete Package', value: 'complete' },
        ],
      },
      {
        key: 'days', type: 'select', label: { de: 'Tage', en: 'Days' },
        options: [
          { de: 'Gesamtes Rennwochenende', en: 'Full Race Weekend', value: 'full' },
          { de: 'Nur Renntag (Sonntag)', en: 'Race Day Only (Sunday)', value: 'sunday' },
          { de: 'Qualifying + Rennen', en: 'Qualifying + Race', value: 'quali-race' },
        ],
      },
    ],
  },
  {
    slug: 'ibiza',
    label: { de: 'Ibiza', en: 'Ibiza' },
    tagline: { de: 'Privatvillen, Yachten & das beste Nachtleben', en: 'Private Villas, Yachts & the Best Nightlife' },
    description: {
      de: 'Ibiza ist mehr als eine Insel — es ist ein Lebensgefühl. Wir organisieren private Luxusvillen, garantierten VIP-Zugang zu Pacha, Hï und Ushuaïa, Yacht-Charter für Sunset-Sessions und persönliche Betreuung, die Ihren Aufenthalt unvergesslich macht.',
      en: 'Ibiza is more than an island — it\'s a lifestyle. We organize private luxury villas, guaranteed VIP access to Pacha, Hï and Ushuaïa, yacht charters for sunset sessions and personal service that makes your stay unforgettable.',
    },
    location: { de: 'Ibiza', en: 'Ibiza' },
    image: '/images/services/services-ibiza.jpg',
    highlights: [
      { de: 'Private Luxusvillen mit Pool & Staff', en: 'Private luxury villas with pool & staff' },
      { de: 'VIP-Zugang: Pacha, Hï, Ushuaïa, Amnesia', en: 'VIP access: Pacha, Hï, Ushuaïa, Amnesia' },
      { de: 'Yacht-Charter & Sunset-Experiences', en: 'Yacht charter & sunset experiences' },
      { de: 'Privatkoch & Catering', en: 'Private chef & catering' },
      { de: 'Beach Club Reservierungen', en: 'Beach club reservations' },
      { de: 'Persönlicher Concierge vor Ort', en: 'Personal on-site concierge' },
    ],
    fields: [
      { key: 'date', type: 'daterange', label: { de: 'Reisezeitraum', en: 'Travel Dates' }, required: true },
      { key: 'guests', type: 'number', label: { de: 'Anzahl Personen', en: 'Number of Guests' }, placeholder: { de: 'z.B. 6', en: 'e.g. 6' }, required: true },
      {
        key: 'accommodation', type: 'select', label: { de: 'Unterkunft', en: 'Accommodation' },
        options: [
          { de: 'Private Luxusvilla', en: 'Private Luxury Villa', value: 'villa' },
          { de: 'Boutique-Hotel', en: 'Boutique Hotel', value: 'hotel' },
          { de: 'Finca', en: 'Finca', value: 'finca' },
          { de: 'Bereits organisiert', en: 'Already Arranged', value: 'none' },
        ],
      },
      {
        key: 'clubs', type: 'select', label: { de: 'Club-Interesse', en: 'Club Interest' },
        options: [
          { de: 'Pacha', en: 'Pacha', value: 'pacha' },
          { de: 'Hï Ibiza', en: 'Hï Ibiza', value: 'hi' },
          { de: 'Ushuaïa', en: 'Ushuaïa', value: 'ushuaia' },
          { de: 'Amnesia', en: 'Amnesia', value: 'amnesia' },
          { de: 'Alle / Offen', en: 'All / Open', value: 'all' },
        ],
      },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return services.find((s) => s.slug === slug)
}
