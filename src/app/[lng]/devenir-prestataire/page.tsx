import type { Metadata } from 'next'

import BecomePartner from '@/components/BecomePartner'

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
	title: 'Devenir prestataire | Gabon Decouverte'
}

export default function BecomePartnerPage() {
	return <BecomePartner />
}
