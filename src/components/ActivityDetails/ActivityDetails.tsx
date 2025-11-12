'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { LuMapPin } from 'react-icons/lu'

import { ACTVITY_MOCK_DATA } from '@/mocks/Activity'

export default function ActivityDetails() {
	const { id } = useParams()

	const ACTIVITY_ID = ACTVITY_MOCK_DATA.find((element) => element.slug === id)

	const photos = [
		'/assets/images/activites/parc-aquatique.avif',
		'/assets/images/activites/parc-aquatique.avif',
		'/assets/images/activites/parc-aquatique.avif'
	]

	return (
		<section className='mx-auto my-14 max-w-7xl px-5 sup-md:px-40'>
			<h1 className='mb-3 font-caviarDreams-bold text-2xl text-greeny-100'>{ACTIVITY_ID?.title}</h1>
			{/* Main grid: 1 mobile column */}
			<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				{/* Large pictures (left column, covering 2/3 of the width)*/}
				<div className='relative overflow-hidden rounded-2xl md:col-span-2'>
					<div className='relative aspect-4/3 h-full w-full'>
						<Image alt='Photo principale' className='object-cover' fill priority src={photos[0]} />
					</div>
				</div>

				{/* 4 small pictures on the right */}
				<div className='grid grid-cols-1 grid-rows-2 gap-4'>
					{photos.slice(1).map((photo, index) => (
						<div className='relative overflow-hidden rounded-2xl' key={index}>
							<div className='relative aspect-square'>
								<Image alt={`Photo ${index + 2}`} className='object-cover' fill src={photo} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Location part */}
			<div className='mt-5 flex items-center gap-3'>
				<LuMapPin className='h-6 w-6' />
				<p className='text-lg'>{ACTIVITY_ID?.city}</p>
			</div>

			<hr className='my-6 border-gray-200 border-t' />
		</section>
	)
}
