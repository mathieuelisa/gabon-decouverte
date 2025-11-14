import type { Metadata } from 'next'

import FavoriteExplorer from '@/components/FavoriteExplorer'

export const metadata: Metadata = {
	alternates: {
		canonical: 'https://www.decouvertegabon.com/contact'
	},
	description: 'Contactez Gabon Decouverte pour en savoir plus sur nos activités.',
	keywords: [
		'activité nautique',
		'contact',
		'informations règles',
		'restauration',
		'voyages',
		'recrutement',
		'activites',
		'gabon',
		'prestataire',
		'organisation de voyages'
	],
	openGraph: {
		description: 'Bla bla',
		locale: 'fr_FR',
		title: 'Devenir prestataire | Decouverte Gabon',
		type: 'website',
		url: 'https://www.decouvertegabon.com/contact'
	},
	title: 'Favoris | Gabon Decouverte'
}

export default function FavoritePage() {
	return <FavoriteExplorer />
}
