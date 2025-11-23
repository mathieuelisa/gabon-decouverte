import Link from 'next/link'

import { GALLERIES } from '@/data/DestinationsGalleryData'

export default function DestinationsGallery() {
	return (
		<section className='w-full px-5 sup-md:px-40'>
			<h1 className='text-center font-caviarDreams-bold text-3xl text-greeny-100'>NOS DESTINATIONS PHARES</h1>
			<div className='mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{GALLERIES.map((item) => (
					<Link
						className='relative h-40 cursor-pointer overflow-hidden rounded-xl shadow-lg'
						href={item.link}
						key={item.id}
					>
						<img alt={item.title} className='h-full w-full object-cover' src={item.img} />
						<div className='absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ease-in-out hover:bg-black/10'>
							<h3 className='text-center font-caviarDreams-bold text-lg text-white'>{item.title}</h3>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
