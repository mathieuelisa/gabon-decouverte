import type { Metadata } from 'next'

import DiscoverDetails from '@/components/DiscoverDetails'

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
	title: 'Decouverte | Gabon Decouverte'
}

export default function DiscoverDetailsPage() {
	return <DiscoverDetails />
}
