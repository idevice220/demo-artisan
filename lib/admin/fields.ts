/**
 * Description des formulaires de l'espace propriétaire (sans dépendance serveur :
 * importable par les composants client).
 */
export type FieldType = 'text' | 'textarea' | 'number' | 'toggle' | 'select' | 'image' | 'lines'
export type Option = { value: string | number; label: string }
export type Field = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  help?: string
  placeholder?: string
  options?: Option[]
  half?: boolean
  min?: number
  max?: number
  step?: number
  rows?: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any> & { id: number }

export type CollectionUI = {
  title: string
  singular: string
  description: string
  fields: Field[]
  titleKey: string
  subtitleKeys?: string[]
  imageKey?: string
  badgeKey?: string
  toggleKey?: string
  groupBy?: string
  addLabel?: string
}

export const ICONS: Option[] = [
  { value: 'Droplets', label: 'Goutte (fuite)' },
  { value: 'Waves', label: 'Vagues (débouchage)' },
  { value: 'Thermometer', label: 'Thermomètre (chauffe-eau)' },
  { value: 'Flame', label: 'Flamme (chauffage)' },
  { value: 'Bath', label: 'Baignoire (salle de bain)' },
  { value: 'Wrench', label: 'Clé (robinetterie)' },
]

export const CATS: Option[] = [
  { value: 'Salle de bain', label: 'Salle de bain' },
  { value: 'Chauffage', label: 'Chauffage' },
  { value: 'Dépannage', label: 'Dépannage' },
]

export const COLLECTIONS: Record<string, CollectionUI> = {
  services: {
    title: 'Services', singular: 'un service', description: 'Les prestations affichées sur la page d’accueil. Les deux premières « grandes » cartes ont une photo.',
    titleKey: 'title', subtitleKeys: ['from'], imageKey: 'image', toggleKey: 'visible',
    fields: [
      { key: 'title', label: 'Intitulé', type: 'text', required: true, placeholder: 'Fuite d’eau' },
      { key: 'from', label: 'Prix de départ', type: 'text', required: true, placeholder: 'dès 90 €', half: true },
      { key: 'icon', label: 'Icône', type: 'select', options: ICONS, half: true },
      { key: 'text', label: 'Description', type: 'textarea', required: true, rows: 3 },
      { key: 'big', label: 'Grande carte avec photo', type: 'toggle', help: 'Affichée en haut, en grand, avec la photo ci-dessous.' },
      { key: 'image', label: 'Photo (grande carte)', type: 'image' },
    ],
  },
  'estimate-types': {
    title: 'Types de problème', singular: 'un type de problème', description: 'Les grandes familles proposées à l’étape 1 de l’estimateur, avec leur fourchette de base.',
    titleKey: 'label', subtitleKeys: ['delay'], badgeKey: 'baseRange', toggleKey: 'visible',
    fields: [
      { key: 'label', label: 'Intitulé', type: 'text', required: true },
      { key: 'icon', label: 'Icône', type: 'select', options: ICONS },
      { key: 'baseMin', label: 'Prix de base minimum (€)', type: 'number', half: true, step: 5 },
      { key: 'baseMax', label: 'Prix de base maximum (€)', type: 'number', half: true, step: 5 },
      { key: 'delay', label: 'Délai annoncé', type: 'text', required: true, placeholder: 'Intervention sous 2 h' },
      { key: 'includes', label: 'Ce qui est compris (une ligne par élément)', type: 'lines', rows: 4 },
      { key: 'surface', label: 'Prix au m² (salle de bain)', type: 'toggle', help: 'Le client choisit une surface ; les options donnent un prix au m².' },
    ],
  },
  'estimate-options': {
    title: 'Précisions (étape 2)', singular: 'une précision', description: 'Pour chaque type de problème, les cas possibles et leur supplément.',
    titleKey: 'label', subtitleKeys: ['note'], badgeKey: 'addRange', toggleKey: 'visible', groupBy: 'typeId',
    fields: [
      { key: 'typeId', label: 'Type de problème', type: 'select', required: true },
      { key: 'label', label: 'Intitulé', type: 'text', required: true },
      { key: 'addMin', label: 'Supplément minimum (€)', type: 'number', half: true, step: 5, help: 'Peut être négatif.' },
      { key: 'addMax', label: 'Supplément maximum (€)', type: 'number', half: true, step: 5 },
      { key: 'note', label: 'Précision affichée', type: 'text', placeholder: 'Fourniture comprise' },
    ],
  },
  realisations: {
    title: 'Réalisations', singular: 'une réalisation', description: 'Vos chantiers en photo. Ils apparaissent dans la galerie filtrable.',
    titleKey: 'title', subtitleKeys: ['place', 'duration'], imageKey: 'image', badgeKey: 'cat', toggleKey: 'visible',
    fields: [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'place', label: 'Commune', type: 'text', required: true, half: true },
      { key: 'duration', label: 'Durée', type: 'text', required: true, half: true, placeholder: '9 jours' },
      { key: 'cat', label: 'Catégorie', type: 'select', options: CATS },
      { key: 'image', label: 'Photo', type: 'image', required: true },
    ],
  },
  zones: {
    title: 'Communes couvertes', singular: 'une commune', description: 'La zone d’intervention et le délai moyen annoncé pour chaque commune.',
    titleKey: 'name', badgeKey: 'minLabel', toggleKey: 'visible',
    fields: [
      { key: 'name', label: 'Commune', type: 'text', required: true },
      { key: 'min', label: 'Délai moyen (min)', type: 'number', required: true, min: 5, step: 5 },
      { key: 'x', label: 'Position est-ouest (km)', type: 'number', half: true, step: 0.5, help: 'Négatif = à l’ouest du Raincy.' },
      { key: 'y', label: 'Position nord-sud (km)', type: 'number', half: true, step: 0.5, help: 'Négatif = au nord.' },
    ],
  },
  reviews: {
    title: 'Avis clients', singular: 'un avis', description: 'Les témoignages affichés. Copiez vos avis Google ici, ou masquez ceux que vous ne voulez pas montrer.',
    titleKey: 'name', subtitleKeys: ['place', 'date'], badgeKey: 'tag', toggleKey: 'visible',
    fields: [
      { key: 'name', label: 'Nom', type: 'text', required: true, half: true, placeholder: 'Marie D.' },
      { key: 'place', label: 'Commune', type: 'text', required: true, half: true },
      { key: 'date', label: 'Quand', type: 'text', required: true, half: true, placeholder: 'il y a 2 semaines' },
      { key: 'tag', label: 'Prestation', type: 'text', required: true, half: true, placeholder: 'Fuite d’eau' },
      { key: 'rating', label: 'Note (1 à 5)', type: 'number', min: 1, max: 5 },
      { key: 'text', label: 'Texte de l’avis', type: 'textarea', required: true, rows: 4 },
    ],
  },
  'process-steps': {
    title: 'Comment ça se passe', singular: 'une étape', description: 'Les quatre étapes affichées dans la section « Comment ça se passe ».',
    titleKey: 'title', subtitleKeys: ['time'], badgeKey: 'n',
    fields: [
      { key: 'n', label: 'Numéro', type: 'text', required: true, half: true, placeholder: '01' },
      { key: 'time', label: 'Délai', type: 'text', required: true, half: true, placeholder: '15 min' },
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'text', label: 'Texte', type: 'textarea', required: true, rows: 3 },
    ],
  },
  tarifs: {
    title: 'Grille tarifaire', singular: 'une ligne', description: 'Les prix affichés sur le site. Changez un montant : il est en ligne immédiatement.',
    titleKey: 'label', subtitleKeys: ['note'], badgeKey: 'price', toggleKey: 'visible',
    fields: [
      { key: 'label', label: 'Prestation', type: 'text', required: true },
      { key: 'price', label: 'Prix', type: 'text', required: true, half: true, placeholder: '89 €' },
      { key: 'note', label: 'Précision', type: 'text', half: true, placeholder: 'Forfait, déplacement compris' },
    ],
  },
  faq: {
    title: 'Questions fréquentes', singular: 'une question', description: 'Les questions/réponses affichées en bas de page.',
    titleKey: 'q', subtitleKeys: ['a'], toggleKey: 'visible',
    fields: [
      { key: 'q', label: 'Question', type: 'text', required: true },
      { key: 'a', label: 'Réponse', type: 'textarea', required: true, rows: 4 },
    ],
  },
}

/** Libellés dérivés pour les badges de liste. */
export function badgeOf(resource: string, row: Row): string | null {
  const ui = COLLECTIONS[resource]
  if (!ui?.badgeKey) return null
  switch (ui.badgeKey) {
    case 'baseRange': return row.surface ? 'au m²' : `${row.baseMin} – ${row.baseMax} €`
    case 'addRange': return row.addMin === 0 && row.addMax === 0 ? 'inclus' : `${row.addMin >= 0 ? '+' : ''}${row.addMin} à ${row.addMax >= 0 ? '+' : ''}${row.addMax} €`
    case 'minLabel': return `${row.min} min`
    default: return row[ui.badgeKey] ? String(row[ui.badgeKey]) : null
  }
}
