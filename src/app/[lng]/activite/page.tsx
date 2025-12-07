import type { Metadata } from 'next'
import Image from 'next/image'
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
		<Suspense
			fallback={
				<section className='flex h-[calc(100vh-180px)] flex-col items-center justify-center px-5 sup-md:px-40'>
					<Image
						alt='logo_background'
						className='-z-1 opacity-60'
						height={100}
						priority
						src='/assets/images/logo_grey.png'
						width={200}
					/>
					<p className='font-caviarDreams text-gray-400 text-lg'>Chargement des activités...</p>
				</section>
			}
		>
			<ActivityExplorer />
		</Suspense>
	)
}
