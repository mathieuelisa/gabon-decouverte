import Image from 'next/image'
import Link from 'next/link'

import { FOOTER_DESTINATION_CONTENT } from './Footer.data'

export default function Footer() {
	return (
		<section className='h-[500px] bg-greeny-100'>
			<div className='flex w-full flex-col items-center pt-10'>
				<Image
					alt='logo_background'
					className='opacity-50'
					height={100}
					priority
					src='/assets/images/logo_grey.png'
					width={100}
				/>
				<h2 className='font-display text-white'>GABON DECOUVERTE</h2>
			</div>

			<section className='sup-md:mt-14 sup-md:px-40'>
				<h3 className='mb-3 font-bold text-lg text-white'> {FOOTER_DESTINATION_CONTENT.title}</h3>
				<ul>
					{FOOTER_DESTINATION_CONTENT.links.map((element) => (
						<li className='mb-2' key={element.title}>
							<Link className='text-white' href={element.href}>
								{element.title}
							</Link>
						</li>
					))}
				</ul>
			</section>

			<small className='mt-14 block text-center text-white text-xs'>
				Site créé par{' '}
				<Link
					className='decoration font-medium transition hover:decoration-from-font focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
					href='mailto:mathieu.elisa@gmail.com?subject=Demande de renseignements'
				>
					Mathieu ELISA{' '}
				</Link>
				- Tous Droits réservés
				<br />
				Copyright © 2025
			</small>
		</section>
	)
}
