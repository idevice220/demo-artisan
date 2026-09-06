/**
 * Données de démonstration (entreprise fictive). Réinjectées à chaque remise à zéro de la démo.
 */
import type { HoursConfigRow } from './hours'

/** À incrémenter quand les données ci-dessous changent : la version d'origine est alors recréée au déploiement. */
export const SEED_VERSION = '2026-09-06.1'

export const DEFAULT_HOURS: HoursConfigRow[] = [
  { day: 1, closed: false, open: '07:30', close: '19:30' },
  { day: 2, closed: false, open: '07:30', close: '19:30' },
  { day: 3, closed: false, open: '07:30', close: '19:30' },
  { day: 4, closed: false, open: '07:30', close: '19:30' },
  { day: 5, closed: false, open: '07:30', close: '19:30' },
  { day: 6, closed: false, open: '08:00', close: '18:00' },
  { day: 0, closed: true, open: '08:00', close: '18:00', note: 'Urgences uniquement' },
]

export const DEFAULT_SETTINGS: Record<string, string> = {
  name: 'Plomberie Martin',
  owner: 'Julien Martin',
  tagline: 'Plombier chauffagiste · Lyon',
  phone: '04 65 71 23 45',
  whatsapp: '06 39 98 56 78',
  email: 'contact@plomberie-martin.fr',
  address: '18 rue Paul Bert, 69003 Lyon',
  rating: '4.9',
  reviews_count: '87',
  rating_split: '92,6,1,1,0',
  years: '12',
  interventions: '2400',
  avg_delay: '45',
  urgent_bar: 'Urgence plomberie 24h/24 · 7j/7 —',
  urgent_bar_strong: 'intervention en 45 min en moyenne',
  urgent_bar_on: 'true',
  hero_eyebrow: 'Plombier chauffagiste · Lyon & métropole',
  hero_title: 'Une fuite ?',
  hero_title_2: 'Un artisan chez vous',
  hero_accent: 'en 45 min.',
  hero_text: 'Dépannage, chauffage, salle de bain. Le prix est annoncé avant que je vienne, écrit sur un devis, et il ne bouge pas.',
  hero_image: '/images/hero.jpg',
  hero_points: 'Garantie décennale\nDevis ferme avant intervention\nDéplacement offert si devis accepté',
  spotlight_title: 'Douche à l’italienne, meuble suspendu, carrelage 60×120',
  spotlight_text: 'Une salle de bain de 6 m² datant des années 80, transformée en 9 jours ouvrés : dépose complète, reprise de l’étanchéité, douche à l’italienne avec paroi fixe, meuble double vasque et sèche-serviettes.',
  spotlight_surface: '6 m²',
  spotlight_days: '9 jours',
  spotlight_budget: '8 900 €',
  spotlight_after: '/images/sdb-apres.jpg',
  spotlight_caption: 'Salle de bain refaite à neuf',
  spotlight_place: 'Lyon 3e · 9 jours',
  tarifs_points: 'Devis écrit et signé avant intervention\nPas de supplément pour le diagnostic\nPaiement en 3 fois sans frais dès 600 €\nFacture conforme pour votre assurance',
  tarifs_title: 'Grille tarifaire 2026',
  footer_text: 'Artisan indépendant, assuré et garanti décennale. Dépannage, chauffage et rénovation de salle de bain dans toute la métropole de Lyon.',
  hours: JSON.stringify(DEFAULT_HOURS),
  hours_suffix: 'urgences 24h/24',
}

export const SERVICES = [
  { icon: 'Bath', title: 'Salle de bain clé en main', from: 'dès 4 900 €', text: 'Douche à l’italienne, meuble vasque, carrelage, électricité : un seul interlocuteur du plan à la dernière finition.', image: '/images/sdb-apres.jpg', big: true },
  { icon: 'Flame', title: 'Chauffage & chaudière', from: 'entretien 120 €', text: 'Entretien annuel, dépannage, remplacement de chaudière et de radiateurs. Attestation fournie.', image: '/images/chauffage.jpg', big: true },
  { icon: 'Droplets', title: 'Fuite d’eau', from: 'dès 90 €', text: 'Recherche de fuite, réparation durable, sans casser inutilement.', image: null, big: false },
  { icon: 'Waves', title: 'Débouchage', from: 'dès 89 €', text: 'Évier, WC, colonne : furet, pompe ou hydrocurage selon le cas.', image: null, big: false },
  { icon: 'Thermometer', title: 'Chauffe-eau', from: 'dès 150 €', text: 'Dépannage ou remplacement, ballon classique ou thermodynamique.', image: null, big: false },
  { icon: 'Wrench', title: 'Robinetterie & sanitaires', from: 'dès 110 €', text: 'Mitigeur, WC, lavabo, évier : pose et remplacement, fourniture possible.', image: null, big: false },
]

export const ESTIMATE_TYPES = [
  { label: 'Fuite d’eau', icon: 'Droplets', baseMin: 90, baseMax: 180, delay: 'Intervention sous 2 h', surface: false, includes: ['Déplacement & diagnostic', 'Main-d’œuvre', 'Petites fournitures (joints, flexibles)'], options: [
    { label: 'Fuite visible (robinet, siphon, flexible)', addMin: 0, addMax: 0, note: null },
    { label: 'Chasse d’eau / WC qui fuit', addMin: 20, addMax: 60, note: null },
    { label: 'Canalisation encastrée ou fuite invisible', addMin: 120, addMax: 320, note: 'Recherche de fuite avec caméra ou gaz traceur' },
  ] },
  { label: 'Canalisation bouchée', icon: 'Waves', baseMin: 89, baseMax: 150, delay: 'Intervention sous 2 h', surface: false, includes: ['Déplacement', 'Débouchage mécanique', 'Contrôle d’écoulement'], options: [
    { label: 'Évier, lavabo ou douche', addMin: 0, addMax: 0, note: null },
    { label: 'WC bouché', addMin: 30, addMax: 60, note: null },
    { label: 'Colonne ou regard extérieur', addMin: 130, addMax: 260, note: 'Hydrocurage haute pression' },
  ] },
  { label: 'Chauffe-eau', icon: 'Thermometer', baseMin: 150, baseMax: 300, delay: 'Sous 24 h · eau chaude rétablie le jour même', surface: false, includes: ['Déplacement & diagnostic', 'Main-d’œuvre', 'Mise en service et contrôle'], options: [
    { label: 'Panne (résistance, thermostat, groupe de sécurité)', addMin: 0, addMax: 0, note: null },
    { label: 'Remplacement ballon 100 L', addMin: 350, addMax: 450, note: 'Fourniture comprise' },
    { label: 'Remplacement ballon 200 L', addMin: 450, addMax: 600, note: 'Fourniture comprise' },
    { label: 'Passage en thermodynamique', addMin: 1900, addMax: 2600, note: 'Éligible aux aides · fourniture comprise' },
  ] },
  { label: 'Chaudière / chauffage', icon: 'Flame', baseMin: 120, baseMax: 220, delay: 'Sous 24 h en saison de chauffe', surface: false, includes: ['Déplacement', 'Diagnostic complet', 'Attestation d’entretien si applicable'], options: [
    { label: 'Entretien annuel obligatoire', addMin: 0, addMax: -70, note: 'Forfait 120 à 150 € · attestation fournie' },
    { label: 'Panne de chaudière', addMin: 30, addMax: 130, note: null },
    { label: 'Radiateur froid ou qui fuit', addMin: -30, addMax: -40, note: null },
  ] },
  { label: 'Robinet / WC / sanitaire', icon: 'Wrench', baseMin: 110, baseMax: 220, delay: 'Sous 48 h', surface: false, includes: ['Déplacement', 'Dépose de l’ancien équipement', 'Pose, raccordement et essais'], options: [
    { label: 'Mitigeur cuisine ou salle de bain', addMin: 0, addMax: 0, note: 'Fourniture standard comprise' },
    { label: 'WC complet (cuvette + réservoir)', addMin: 140, addMax: 230, note: 'Fourniture comprise' },
    { label: 'Lavabo, vasque ou évier', addMin: 90, addMax: 180, note: null },
  ] },
  { label: 'Salle de bain complète', icon: 'Bath', baseMin: 0, baseMax: 0, delay: 'Démarrage sous 3 semaines · 8 à 12 jours de travaux', surface: true, includes: ['Plans 3D et devis détaillé', 'Plomberie, carrelage, électricité', 'Évacuation des gravats', 'Garantie décennale'], options: [
    { label: 'Finition confort', addMin: 950, addMax: 1250, note: 'Prix au m² · douche, meuble vasque, carrelage 30×60' },
    { label: 'Finition premium', addMin: 1400, addMax: 1850, note: 'Prix au m² · douche à l’italienne, robinetterie encastrée, grands formats' },
  ] },
]

export const REALISATIONS = [
  { title: 'Douche à l’italienne et vasque suspendue', place: 'Lyon 3e', cat: 'Salle de bain', duration: '9 jours', image: '/images/real-1.jpg' },
  { title: 'Salle de bain familiale, carrelage grand format', place: 'Villeurbanne', cat: 'Salle de bain', duration: '11 jours', image: '/images/real-2.jpg' },
  { title: 'Évier et mitigeur, cuisine rénovée', place: 'Bron', cat: 'Dépannage', duration: '½ journée', image: '/images/real-3.jpg' },
  { title: 'Remplacement de chaudière à condensation', place: 'Caluire-et-Cuire', cat: 'Chauffage', duration: '1 journée', image: '/images/real-4.jpg' },
  { title: 'Radiateurs et thermostat connecté', place: 'Vénissieux', cat: 'Chauffage', duration: '2 jours', image: '/images/real-5.jpg' },
  { title: 'Meuble vasque double et robinetterie', place: 'Écully', cat: 'Salle de bain', duration: '3 jours', image: '/images/real-6.jpg' },
]

export const ZONES = [
  { name: 'Lyon 3e', x: 0, y: 0, min: 10 },
  { name: 'Villeurbanne', x: 2.5, y: 1.5, min: 15 },
  { name: 'Lyon 6e', x: -0.5, y: 2, min: 15 },
  { name: 'Lyon 7e', x: -1.5, y: -2.5, min: 15 },
  { name: 'Lyon 8e', x: 1.5, y: -3, min: 15 },
  { name: 'Bron', x: 4.5, y: -2, min: 20 },
  { name: 'Vaulx-en-Velin', x: 5, y: 3, min: 20 },
  { name: 'Caluire-et-Cuire', x: -1, y: 4, min: 20 },
  { name: 'Vénissieux', x: 2, y: -5, min: 25 },
  { name: 'Oullins', x: -4, y: -4, min: 25 },
  { name: 'Écully', x: -6, y: 3, min: 25 },
  { name: 'Sainte-Foy-lès-Lyon', x: -4.5, y: -2.5, min: 25 },
  { name: 'Tassin-la-Demi-Lune', x: -6.5, y: 0.5, min: 30 },
  { name: 'Rillieux-la-Pape', x: 2, y: 5.5, min: 30 },
  { name: 'Décines-Charpieu', x: 6, y: 2, min: 30 },
  { name: 'Saint-Priest', x: 6.5, y: -5, min: 30 },
  { name: 'Saint-Fons', x: 0.5, y: -6, min: 30 },
  { name: 'Meyzieu', x: 7, y: 0, min: 35 },
]

export const REVIEWS = [
  { name: 'Marie D.', place: 'Lyon 3e', date: 'il y a 2 semaines', text: 'Fuite sous l’évier réparée le jour même, tarif annoncé au téléphone respecté au centime. Travail propre, explications claires.', tag: 'Fuite d’eau' },
  { name: 'Karim B.', place: 'Bron', date: 'il y a 1 mois', text: 'Salle de bain entièrement refaite en 10 jours comme prévu. Le rendu 3D correspondait exactement au résultat. Je recommande à 100 %.', tag: 'Salle de bain' },
  { name: 'Sophie L.', place: 'Villeurbanne', date: 'il y a 1 mois', text: 'Ponctuel, souriant et de très bon conseil. Il m’a évité de changer le chauffe-eau alors qu’un autre plombier me l’avait conseillé.', tag: 'Chauffe-eau' },
  { name: 'Thomas R.', place: 'Caluire-et-Cuire', date: 'il y a 2 mois', text: 'Chaudière en panne un dimanche soir en plein hiver : rappelé en 10 minutes, dépanné le lendemain matin à 8 h. Merci !', tag: 'Chauffage' },
  { name: 'Nadia K.', place: 'Vénissieux', date: 'il y a 3 mois', text: 'WC bouché, intervention en moins d’une heure. Prix honnête, aucune surprise. Enfin un artisan de confiance.', tag: 'Débouchage' },
  { name: 'Patrick M.', place: 'Écully', date: 'il y a 4 mois', text: 'Entretien annuel de la chaudière effectué avec sérieux, attestation envoyée par mail le soir même. Efficace.', tag: 'Entretien' },
]

export const PROCESS = [
  { n: '01', title: 'Vous appelez', text: 'Ou vous m’envoyez une photo par WhatsApp. Je vous rappelle en moins de 15 minutes en journée.', time: '15 min' },
  { n: '02', title: 'Je diagnostique', text: 'Au téléphone dans la plupart des cas. Vous savez avant que je vienne ce que ça va coûter.', time: '30 min' },
  { n: '03', title: 'Devis ferme', text: 'Prix fixe, écrit, validé avant de toucher à quoi que ce soit. Pas de supplément surprise.', time: 'sous 24 h' },
  { n: '04', title: 'J’interviens', text: 'Intervention propre, protection des sols, nettoyage en fin de chantier. Facture et garantie.', time: 'à l’heure dite' },
]

export const TARIFS = [
  { label: 'Déplacement + diagnostic', price: '39 €', note: 'Offert si vous acceptez le devis' },
  { label: 'Main-d’œuvre', price: '55 € / h', note: 'Décomptée à la demi-heure' },
  { label: 'Débouchage évier, lavabo, douche', price: '89 €', note: 'Forfait, déplacement compris' },
  { label: 'Remplacement mitigeur', price: '120 €', note: 'Fourniture standard comprise' },
  { label: 'Entretien chaudière gaz', price: '120 €', note: 'Attestation fournie' },
  { label: 'Chauffe-eau 200 L posé', price: '690 €', note: 'Fourniture + pose + évacuation de l’ancien' },
  { label: 'Soir après 19h30, week-end, jours fériés', price: '+30 %', note: 'Sur la main-d’œuvre uniquement' },
]

export const FAQ = [
  { q: 'Vous intervenez vraiment dans l’heure ?', a: 'Pour une urgence (fuite importante, plus d’eau chaude, WC bouché) en journée dans ma zone, oui : je suis en général chez vous en 45 minutes en moyenne. Le soir et le week-end, je vous rappelle et on convient de l’heure.' },
  { q: 'Combien coûte le déplacement ?', a: '39 € diagnostic compris, et il est offert si vous acceptez le devis. Vous ne payez jamais pour un simple avis.' },
  { q: 'Le prix annoncé peut-il changer ?', a: 'Non. Le devis est ferme et signé avant intervention. Si je découvre un problème caché, je vous en parle et rien ne se fait sans votre accord.' },
  { q: 'Faites-vous les salles de bain de A à Z ?', a: 'Oui : plomberie, carrelage, électricité, faux plafond et peinture avec mes partenaires habituels. Vous avez un seul interlocuteur et un seul devis.' },
  { q: 'Êtes-vous assuré ?', a: 'Assurance responsabilité civile professionnelle et garantie décennale. Les attestations sont jointes à chaque devis.' },
  { q: 'Quels moyens de paiement ?', a: 'Carte bancaire sur place, virement ou chèque. Pour les rénovations, paiement en 3 fois sans frais.' },
]

const ago = (h: number) => new Date(Date.now() - h * 3_600_000)

/** Demandes déjà « reçues » pour que la boîte de réception ne soit pas vide. */
export const LEADS = [
  { kind: 'contact', name: 'Camille Robert', phone: '06 39 98 78 90', city: 'Villeurbanne', type: 'Fuite d’eau', message: 'Fuite sous l’évier de la cuisine depuis ce matin, j’ai coupé l’arrivée d’eau. Est-ce possible aujourd’hui ?', slot: 'Urgent', status: 'new', createdAt: ago(0.4) },
  { kind: 'estimation', name: 'Yanis', phone: '06 39 98 45 66', city: null, type: 'Chauffe-eau', message: null, slot: 'Sous 48 h', estimateMin: 500, estimateMax: 750, status: 'new', createdAt: ago(3) },
  { kind: 'contact', name: 'Hélène Marchand', phone: '06 39 98 14 37', city: 'Bron', type: 'Salle de bain complète', message: 'Nous voulons refaire la salle de bain (environ 7 m²) avant l’hiver. Douche à l’italienne. Pouvez-vous passer pour un devis ?', slot: 'Après-midi', status: 'new', createdAt: ago(26) },
  { kind: 'estimation', name: 'Marc', phone: '06 39 98 43 21', city: null, type: 'Canalisation bouchée', message: null, slot: 'Aujourd’hui', estimateMin: 155, estimateMax: 275, status: 'done', createdAt: ago(50) },
  { kind: 'contact', name: 'Farida Benali', phone: '06 39 98 12 09', city: 'Lyon 3e', type: 'Chaudière / chauffage', message: 'Entretien annuel de la chaudière gaz, de préférence un matin.', slot: 'Matin', status: 'done', createdAt: ago(120) },
  { kind: 'contact', name: 'Antoine Petit', phone: '06 39 98 87 65', city: 'Vénissieux', type: 'Robinet / WC / sanitaire', message: 'Mitigeur de douche qui goutte en permanence.', slot: 'Après-midi', status: 'done', createdAt: ago(200) },
]
