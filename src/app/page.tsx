import type { Metadata } from 'next'

import Banner from '@/components/Banner'
import HightLights from '@/components/HighLights'

export const metadata: Metadata = {
	alternates: {
		canonical: 'https://www.decouvertegabon.com/'
	},
	description:
		'Découverte Gabon vous aide à trouver les meilleures activités, excursions et expériences au Gabon : nature, aventure, culture et détente. Explorez le pays autrement !',
	keywords: [
		'Découverte Gabon',
		'Activités Gabon',
		'Tourisme Gabon',
		'Voyage Gabon',
		'Excursions Gabon',
		'Visites guidées Gabon',
		'Nature Gabon',
		'Loisirs Gabon',
		'Aventure au Gabon'
	],
	openGraph: {
		description:
			'Découvrez les plus belles activités du Gabon : safaris, randonnées, plages, parcs nationaux et rencontres culturelles. Vivez une expérience unique avec Découverte Gabon.',
		images: [
			// {
			//   url: "https://www.decouvertegabon.com/assets/images/home/cover-gabon.jpg",
			//   width: 1200,
			//   height: 630,
			//   alt: "Découverte Gabon - Activités et tourisme au Gabon",
			// },
		],
		locale: 'fr_FR',
		siteName: 'Découverte Gabon',
		title: 'Découverte Gabon | Explorez les trésors du Gabon',
		type: 'website',
		url: 'https://www.decouvertegabon.com/'
	},
	title: 'Découverte Gabon | Activités et expériences inoubliables au Gabon'
}

export default function Home() {
	return (
		<section className='h-[600px] bg-white'>
			<Banner />
			<HightLights />
			<p>coucou</p>
		</section>
	)
}
