/**
 * Données de démonstration — entreprise fictive.
 */
export const BUSINESS = {
  name: 'Plomberie Martin',
  owner: 'Julien Martin',
  phone: '01 23 45 67 89',
  tel: 'tel:+33123456789',
  whatsapp: 'https://wa.me/33612345678?text=Bonjour%2C%20j%E2%80%99ai%20un%20probl%C3%A8me%20de%20plomberie',
  email: 'contact@plomberie-martin.fr',
  address: '18 allée des Tilleuls, 93340 Le Raincy',
  siren: '000 000 000',
  rating: 4.9,
  reviews: 87,
  years: 12,
  interventions: 2400,
  avgDelay: 45,
}

/** Horaires (0 = dimanche … 6 = samedi) */
export const HOURS: Record<number, { open: number; close: number } | null> = {
  1: { open: 7.5, close: 19.5 },
  2: { open: 7.5, close: 19.5 },
  3: { open: 7.5, close: 19.5 },
  4: { open: 7.5, close: 19.5 },
  5: { open: 7.5, close: 19.5 },
  6: { open: 8, close: 18 },
  0: null,
}
export const HOURS_LABEL = [
  { d: 'Lundi – Vendredi', h: '7h30 – 19h30' },
  { d: 'Samedi', h: '8h00 – 18h00' },
  { d: 'Dimanche', h: 'Urgences uniquement' },
]

export type Service = {
  id: string
  icon: 'Droplets' | 'Waves' | 'Thermometer' | 'Flame' | 'Bath' | 'Wrench'
  title: string
  from: string
  text: string
  image?: string
  big?: boolean
}

export const SERVICES: Service[] = [
  { id: 'sdb', icon: 'Bath', title: 'Salle de bain clé en main', from: 'dès 4 900 €', text: 'Douche à l’italienne, meuble vasque, carrelage, électricité : un seul interlocuteur du plan à la dernière finition.', image: '/images/sdb-apres.jpg', big: true },
  { id: 'chauffage', icon: 'Flame', title: 'Chauffage & chaudière', from: 'entretien 120 €', text: 'Entretien annuel, dépannage, remplacement de chaudière et de radiateurs. Attestation fournie.', image: '/images/chauffage.jpg', big: true },
  { id: 'fuite', icon: 'Droplets', title: 'Fuite d’eau', from: 'dès 90 €', text: 'Recherche de fuite, réparation durable, sans casser inutilement.' },
  { id: 'bouche', icon: 'Waves', title: 'Débouchage', from: 'dès 89 €', text: 'Évier, WC, colonne : furet, pompe ou hydrocurage selon le cas.' },
  { id: 'chauffe-eau', icon: 'Thermometer', title: 'Chauffe-eau', from: 'dès 150 €', text: 'Dépannage ou remplacement, ballon classique ou thermodynamique.' },
  { id: 'robinetterie', icon: 'Wrench', title: 'Robinetterie & sanitaires', from: 'dès 110 €', text: 'Mitigeur, WC, lavabo, évier : pose et remplacement, fourniture possible.' },
]

/* ── Estimateur ─────────────────────────────────────────── */
export type EstimateOption = { id: string; label: string; add: [number, number]; note?: string }
export type EstimateType = {
  id: string
  label: string
  icon: Service['icon']
  base: [number, number]
  delay: string
  includes: string[]
  options: EstimateOption[]
  surface?: boolean
}

export const ESTIMATE_TYPES: EstimateType[] = [
  {
    id: 'fuite', label: 'Fuite d’eau', icon: 'Droplets', base: [90, 180], delay: 'Intervention sous 2 h',
    includes: ['Déplacement & diagnostic', 'Main-d’œuvre', 'Petites fournitures (joints, flexibles)'],
    options: [
      { id: 'visible', label: 'Fuite visible (robinet, siphon, flexible)', add: [0, 0] },
      { id: 'wc', label: 'Chasse d’eau / WC qui fuit', add: [20, 60] },
      { id: 'encastree', label: 'Canalisation encastrée ou fuite invisible', add: [120, 320], note: 'Recherche de fuite avec caméra ou gaz traceur' },
    ],
  },
  {
    id: 'bouche', label: 'Canalisation bouchée', icon: 'Waves', base: [89, 150], delay: 'Intervention sous 2 h',
    includes: ['Déplacement', 'Débouchage mécanique', 'Contrôle d’écoulement'],
    options: [
      { id: 'evier', label: 'Évier, lavabo ou douche', add: [0, 0] },
      { id: 'wc', label: 'WC bouché', add: [30, 60] },
      { id: 'colonne', label: 'Colonne ou regard extérieur', add: [130, 260], note: 'Hydrocurage haute pression' },
    ],
  },
  {
    id: 'chauffe-eau', label: 'Chauffe-eau', icon: 'Thermometer', base: [150, 300], delay: 'Sous 24 h · eau chaude rétablie le jour même',
    includes: ['Déplacement & diagnostic', 'Main-d’œuvre', 'Mise en service et contrôle'],
    options: [
      { id: 'panne', label: 'Panne (résistance, thermostat, groupe de sécurité)', add: [0, 0] },
      { id: '100', label: 'Remplacement ballon 100 L', add: [350, 450], note: 'Fourniture comprise' },
      { id: '200', label: 'Remplacement ballon 200 L', add: [450, 600], note: 'Fourniture comprise' },
      { id: 'thermo', label: 'Passage en thermodynamique', add: [1900, 2600], note: 'Éligible aux aides · fourniture comprise' },
    ],
  },
  {
    id: 'chaudiere', label: 'Chaudière / chauffage', icon: 'Flame', base: [120, 220], delay: 'Sous 24 h en saison de chauffe',
    includes: ['Déplacement', 'Diagnostic complet', 'Attestation d’entretien si applicable'],
    options: [
      { id: 'entretien', label: 'Entretien annuel obligatoire', add: [0, -70], note: 'Forfait 120 à 150 € · attestation fournie' },
      { id: 'panne', label: 'Panne de chaudière', add: [30, 130] },
      { id: 'radiateur', label: 'Radiateur froid ou qui fuit', add: [-30, -40] },
    ],
  },
  {
    id: 'robinetterie', label: 'Robinet / WC / sanitaire', icon: 'Wrench', base: [110, 220], delay: 'Sous 48 h',
    includes: ['Déplacement', 'Dépose de l’ancien équipement', 'Pose, raccordement et essais'],
    options: [
      { id: 'mitigeur', label: 'Mitigeur cuisine ou salle de bain', add: [0, 0], note: 'Fourniture standard comprise' },
      { id: 'wc', label: 'WC complet (cuvette + réservoir)', add: [140, 230], note: 'Fourniture comprise' },
      { id: 'lavabo', label: 'Lavabo, vasque ou évier', add: [90, 180] },
    ],
  },
  {
    id: 'sdb', label: 'Salle de bain complète', icon: 'Bath', base: [0, 0], delay: 'Démarrage sous 3 semaines · 8 à 12 jours de travaux', surface: true,
    includes: ['Plans 3D et devis détaillé', 'Plomberie, carrelage, électricité', 'Évacuation des gravats', 'Garantie décennale'],
    options: [
      { id: 'standard', label: 'Finition confort', add: [950, 1250], note: 'Prix au m² · douche, meuble vasque, carrelage 30×60' },
      { id: 'premium', label: 'Finition premium', add: [1400, 1850], note: 'Prix au m² · douche à l’italienne, robinetterie encastrée, grands formats' },
    ],
  },
]

export const URGENCIES = [
  { id: 'now', label: 'Aujourd’hui', sub: 'Urgence · majoration +30 %', mult: 1.3 },
  { id: '48h', label: 'Sous 48 h', sub: 'Tarif normal', mult: 1 },
  { id: 'plan', label: 'Je planifie', sub: 'Créneau au choix · −5 %', mult: 0.95 },
]

/* ── Réalisations ───────────────────────────────────────── */
export type Realisation = { title: string; place: string; cat: 'Salle de bain' | 'Chauffage' | 'Dépannage'; duration: string; image: string }
export const REALISATIONS: Realisation[] = [
  { title: 'Douche à l’italienne et vasque suspendue', place: 'Le Raincy', cat: 'Salle de bain', duration: '9 jours', image: '/images/real-1.jpg' },
  { title: 'Salle de bain familiale, carrelage grand format', place: 'Villemomble', cat: 'Salle de bain', duration: '11 jours', image: '/images/real-2.jpg' },
  { title: 'Évier et mitigeur, cuisine rénovée', place: 'Gagny', cat: 'Dépannage', duration: '½ journée', image: '/images/real-3.jpg' },
  { title: 'Remplacement de chaudière à condensation', place: 'Livry-Gargan', cat: 'Chauffage', duration: '1 journée', image: '/images/real-4.jpg' },
  { title: 'Radiateurs et thermostat connecté', place: 'Montfermeil', cat: 'Chauffage', duration: '2 jours', image: '/images/real-5.jpg' },
  { title: 'Meuble vasque double et robinetterie', place: 'Clichy-sous-Bois', cat: 'Salle de bain', duration: '3 jours', image: '/images/real-6.jpg' },
]

/* ── Zone d'intervention (km approximatifs depuis Le Raincy) ── */
export type Zone = { name: string; x: number; y: number; min: number }
export const ZONES: Zone[] = [
  { name: 'Le Raincy', x: 0, y: 0, min: 10 },
  { name: 'Villemomble', x: -2, y: 1.5, min: 15 },
  { name: 'Gagny', x: 2.5, y: 1, min: 15 },
  { name: 'Clichy-sous-Bois', x: 3, y: -1.5, min: 15 },
  { name: 'Les Pavillons-sous-Bois', x: -1.5, y: -2, min: 15 },
  { name: 'Livry-Gargan', x: 1, y: -3, min: 20 },
  { name: 'Montfermeil', x: 4.5, y: 0, min: 20 },
  { name: 'Bondy', x: -3.5, y: -0.5, min: 20 },
  { name: 'Neuilly-Plaisance', x: -1, y: 3.5, min: 20 },
  { name: 'Rosny-sous-Bois', x: -4, y: 2.5, min: 25 },
  { name: 'Aulnay-sous-Bois', x: -1, y: -5.5, min: 25 },
  { name: 'Sevran', x: 3.5, y: -6, min: 30 },
  { name: 'Noisy-le-Grand', x: 1.5, y: 5.5, min: 30 },
  { name: 'Chelles', x: 7, y: 2, min: 35 },
  { name: 'Montreuil', x: -7.5, y: 3.5, min: 40 },
  { name: 'Noisy-le-Sec', x: -5.5, y: 0.5, min: 30 },
  { name: 'Coubron', x: 5, y: -3, min: 25 },
  { name: 'Vaujours', x: 4, y: -4.5, min: 30 },
]

/* ── Avis ──────────────────────────────────────────────── */
export const AVIS = [
  { name: 'Marie D.', place: 'Le Raincy', date: 'il y a 2 semaines', text: 'Fuite sous l’évier réparée le jour même, tarif annoncé au téléphone respecté au centime. Travail propre, explications claires.', tag: 'Fuite d’eau' },
  { name: 'Karim B.', place: 'Gagny', date: 'il y a 1 mois', text: 'Salle de bain entièrement refaite en 10 jours comme prévu. Le rendu 3D correspondait exactement au résultat. Je recommande à 100 %.', tag: 'Salle de bain' },
  { name: 'Sophie L.', place: 'Villemomble', date: 'il y a 1 mois', text: 'Ponctuel, souriant et de très bon conseil. Il m’a évité de changer le chauffe-eau alors qu’un autre plombier me l’avait conseillé.', tag: 'Chauffe-eau' },
  { name: 'Thomas R.', place: 'Livry-Gargan', date: 'il y a 2 mois', text: 'Chaudière en panne un dimanche soir en plein hiver : rappelé en 10 minutes, dépanné le lendemain matin à 8 h. Merci !', tag: 'Chauffage' },
  { name: 'Nadia K.', place: 'Montfermeil', date: 'il y a 3 mois', text: 'WC bouché, intervention en moins d’une heure. Prix honnête, aucune surprise. Enfin un artisan de confiance.', tag: 'Débouchage' },
  { name: 'Patrick M.', place: 'Clichy-sous-Bois', date: 'il y a 4 mois', text: 'Entretien annuel de la chaudière effectué avec sérieux, attestation envoyée par mail le soir même. Efficace.', tag: 'Entretien' },
]
export const RATING_SPLIT = [92, 6, 1, 1, 0]

export const PROCESS = [
  { n: '01', title: 'Vous appelez', text: 'Ou vous m’envoyez une photo par WhatsApp. Je vous rappelle en moins de 15 minutes en journée.', time: '15 min' },
  { n: '02', title: 'Je diagnostique', text: 'Au téléphone dans la plupart des cas. Vous savez avant que je vienne ce que ça va coûter.', time: '30 min' },
  { n: '03', title: 'Devis ferme', text: 'Prix fixe, écrit, validé avant de toucher à quoi que ce soit. Pas de supplément surprise.', time: 'sous 24 h' },
  { n: '04', title: 'J’interviens', text: 'Intervention propre, protection des sols, nettoyage en fin de chantier. Facture et garantie.', time: 'à l’heure dite' },
]

export const TARIFS = [
  { label: 'Déplacement + diagnostic', price: '39 €', note: 'Offert si vous acceptez le devis' },
  { label: 'Main-d’œuvre', price: '55 € / h', note: 'Décomptée à la demi-heure' },
  { label: 'Débouchage évier, lavabo, douche', price: '89 €', note: 'Forfait, déplacement compris' },
  { label: 'Remplacement mitigeur', price: '120 €', note: 'Fourniture standard comprise' },
  { label: 'Entretien chaudière gaz', price: '120 €', note: 'Attestation fournie' },
  { label: 'Chauffe-eau 200 L posé', price: '690 €', note: 'Fourniture + pose + évacuation de l’ancien' },
  { label: 'Soir après 19h30, week-end, jours fériés', price: '+30 %', note: 'Sur la main-d’œuvre uniquement' },
]

export const FAQ = [
  { q: 'Vous intervenez vraiment dans l’heure ?', a: 'Pour une urgence (fuite importante, plus d’eau chaude, WC bouché) en journée dans ma zone, oui : je suis en général chez vous en 45 minutes en moyenne. Le soir et le week-end, je vous rappelle et on convient de l’heure.' },
  { q: 'Combien coûte le déplacement ?', a: '39 € diagnostic compris, et il est offert si vous acceptez le devis. Vous ne payez jamais pour un simple avis.' },
  { q: 'Le prix annoncé peut-il changer ?', a: 'Non. Le devis est ferme et signé avant intervention. Si je découvre un problème caché, je vous en parle et rien ne se fait sans votre accord.' },
  { q: 'Faites-vous les salles de bain de A à Z ?', a: 'Oui : plomberie, carrelage, électricité, faux plafond et peinture avec mes partenaires habituels. Vous avez un seul interlocuteur et un seul devis.' },
  { q: 'Êtes-vous assuré ?', a: 'Assurance responsabilité civile professionnelle et garantie décennale. Les attestations sont jointes à chaque devis.' },
  { q: 'Quels moyens de paiement ?', a: 'Carte bancaire sur place, virement ou chèque. Pour les rénovations, paiement en 3 fois sans frais.' },
]
