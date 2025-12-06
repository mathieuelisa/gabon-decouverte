import type { Metadata } from 'next'
import { Suspense } from 'react'

import ActivityExplorer from '@/components/ActivityExplorer'

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
		'activites',
		'gabon',
		'organisation de voyages'
	],
	openGraph: {
		description: 'Bla bla',
		locale: 'fr_FR',
		title: 'Contact | Decouverte Gabon',
		type: 'website',
		url: 'https://www.decouvertegabon.com/contact'
	},
	title: "Contactez-nous pour plus d'information | Gabon Decouverte"
}

export default function ActivityPage() {
	return (
		<Suspense fallback={<div>Chargement des activités...</div>}>
			<ActivityExplorer />
		</Suspense>
	)
}
