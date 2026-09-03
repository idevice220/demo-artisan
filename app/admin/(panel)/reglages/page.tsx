import { getSettings } from '@/lib/settings'
import { requireSession } from '@/lib/auth'
import { SettingsForm, type SettingsGroup } from '@/components/admin/SettingsForm'
import { PageHeader } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

const GROUPS: SettingsGroup[] = [
  {
    title: 'Identité & contact',
    description: 'Ces informations apparaissent dans l’en-tête, le pied de page, la section contact et les boutons d’appel.',
    fields: [
      { key: 'name', label: 'Nom de l’entreprise', type: 'text', required: true, half: true },
      { key: 'owner', label: 'Votre nom', type: 'text', required: true, half: true },
      { key: 'tagline', label: 'Sous-titre (en-tête)', type: 'text', placeholder: 'Plombier chauffagiste · Le Raincy' },
      { key: 'phone', label: 'Téléphone', type: 'text', required: true, half: true },
      { key: 'whatsapp', label: 'Numéro WhatsApp', type: 'text', half: true, help: 'Le bouton WhatsApp ouvre une conversation pré-remplie.' },
      { key: 'email', label: 'E-mail', type: 'text', half: true },
      { key: 'address', label: 'Adresse', type: 'text', half: true },
    ],
  },
  {
    title: 'Chiffres affichés',
    description: 'La note, le nombre d’avis et les compteurs animés de la page d’accueil.',
    fields: [
      { key: 'rating', label: 'Note Google', type: 'text', half: true, placeholder: '4.9' },
      { key: 'reviews_count', label: 'Nombre d’avis', type: 'number', half: true },
      { key: 'rating_split', label: 'Répartition des notes (5★ → 1★, en %)', type: 'text', placeholder: '92,6,1,1,0', help: 'Cinq nombres séparés par des virgules.' },
      { key: 'years', label: 'Années d’expérience', type: 'number', half: true },
      { key: 'interventions', label: 'Interventions réalisées', type: 'number', half: true },
      { key: 'avg_delay', label: 'Délai moyen (minutes)', type: 'number', half: true },
    ],
  },
  {
    title: 'Bandeau d’urgence',
    description: 'La barre noire tout en haut du site. Pratique pour annoncer une fermeture ou une disponibilité.',
    fields: [
      { key: 'urgent_bar_on', label: 'Afficher le bandeau', type: 'toggle' },
      { key: 'urgent_bar', label: 'Texte', type: 'text', half: true },
      { key: 'urgent_bar_strong', label: 'Texte en gras', type: 'text', half: true },
    ],
  },
  {
    title: 'Page d’accueil',
    description: 'Le grand titre et la photo de fond que voient vos visiteurs en arrivant.',
    fields: [
      { key: 'hero_eyebrow', label: 'Petite ligne au-dessus du titre', type: 'text' },
      { key: 'hero_title', label: 'Titre, ligne 1', type: 'text', half: true, placeholder: 'Une fuite ?' },
      { key: 'hero_title_2', label: 'Titre, ligne 2', type: 'text', half: true, placeholder: 'Un artisan chez vous' },
      { key: 'hero_accent', label: 'Fin du titre (en couleur)', type: 'text', placeholder: 'en 45 min.' },
      { key: 'hero_text', label: 'Texte d’accroche', type: 'textarea', rows: 3 },
      { key: 'hero_points', label: 'Trois arguments (une ligne chacun)', type: 'lines', rows: 3 },
      { key: 'hero_image', label: 'Photo de fond', type: 'image' },
    ],
  },
  {
    title: 'Chantier du mois',
    description: 'Le comparateur avant/après et l’encart qui l’accompagne dans la section Réalisations.',
    fields: [
      { key: 'spotlight_title', label: 'Titre', type: 'text' },
      { key: 'spotlight_text', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'spotlight_surface', label: 'Surface', type: 'text', half: true, placeholder: '6 m²' },
      { key: 'spotlight_days', label: 'Durée', type: 'text', half: true, placeholder: '9 jours' },
      { key: 'spotlight_budget', label: 'Budget TTC', type: 'text', half: true, placeholder: '8 900 €' },
      { key: 'spotlight_place', label: 'Légende (commune · durée)', type: 'text', half: true },
      { key: 'spotlight_caption', label: 'Nom du chantier (sous la photo)', type: 'text' },
      { key: 'spotlight_after', label: 'Photo « après »', type: 'image' },
    ],
  },
  {
    title: 'Tarifs & pied de page',
    fields: [
      { key: 'tarifs_title', label: 'Titre de la grille tarifaire', type: 'text', placeholder: 'Grille tarifaire 2026' },
      { key: 'tarifs_points', label: 'Engagements (une ligne chacun)', type: 'lines', rows: 4 },
      { key: 'hours_suffix', label: 'Mention après « Fermé »', type: 'text', placeholder: 'urgences 24h/24' },
      { key: 'footer_text', label: 'Texte du pied de page', type: 'textarea', rows: 2 },
    ],
  },
]

export default async function ReglagesPage() {
  const { tenant } = await requireSession()
  const settings = await getSettings(tenant)
  return (
    <div>
      <PageHeader title="Réglages & textes" description="Coordonnées, chiffres, titres : tout ce qui n’est pas une liste se modifie ici." />
      <SettingsForm groups={GROUPS} initial={settings} />
    </div>
  )
}
