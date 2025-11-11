import type { Metadata } from 'next'

import ActivityDetails from '@/components/ActivityDetails'

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

export default function ActivityDetailsPage() {
	return <ActivityDetails />
}
