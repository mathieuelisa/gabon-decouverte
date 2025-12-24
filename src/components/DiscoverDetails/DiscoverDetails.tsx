'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Link from '@/components/ui/Link'
import { ACTVITY_MOCK_DATA } from '@/mocks/Activity'
import { DISCOVER_MOCK_DATA } from '@/mocks/Discover'
import ActivityExplorerItem from '../ActivityExplorer/ActivityExplorerItem'
import DiscoverInformations from './DiscoverInformations'

export default function DiscoverDetails() {
	const { id } = useParams()

	const [scale, setScale] = useState(1)

	const discoverItem = DISCOVER_MOCK_DATA.find((element) => element.slug === id)

	const suggestions = ACTVITY_MOCK_DATA.filter((element) => element.city_activity === id)

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY

			const maxScroll = 300
			const clamped = Math.min(Math.max(scrollY, 0), maxScroll)

			const minScale = 1 // normal size
			const maxScale = 1.2 // zoom max
			const ratio = clamped / maxScroll

			// 👉 Here: the further down you scroll, the more it zooms in (zoom in as you scroll down).
			const newScale = minScale + (maxScale - minScale) * ratio

			setScale(newScale)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section className='px-5 sup-md:px-40'>
			<div className='relative mx-auto h-[250px] sup-md:h-[400px] w-full overflow-hidden'>
				<Image
					alt='Photo principale'
					className='rounded-xs object-cover'
					fill
					priority
					quality={10}
					src={discoverItem?.img}
					style={{
						transform: `scale(${scale})`,
						transition: 'transform 0.15s ease-out'
					}}
				/>
			</div>

			<section className='flex flex-col justify-center'>
				<motion.h1
					animate={{ opacity: 1 }}
					className='mt-10 mb-6 text-center font-caviarDreams text-3xl text-greeny-100 uppercase'
					initial={{ opacity: 0 }}
					transition={{
						delay: 0.4,
						duration: 0.8
					}}
				>
					{discoverItem?.title}
				</motion.h1>
				<div className='my-7 flex flex-col gap-9 lg:flex-row lg:items-center'>
					{/* Image part */}
					<section className='relative h-[220px] w-full lg:h-[200px] lg:w-[30%]'>
						<Image
							alt='Second photo'
							className='rounded-xs object-cover'
							fill
							priority
							quality={10}
							src={discoverItem?.second_img}
						/>
					</section>

					{/* Information part */}
					<DiscoverInformations discoverItem={discoverItem} />
				</div>
			</section>
			{/* Activite part */}
			<section className='my-11 flex flex-col items-center justify-center'>
				<h3 className='mb-6 text-center font-caviarDreams-bold text-greeny-100 text-xl'>
					Explorez les activités présentes sur {discoverItem?.city || 'cette ville'}
				</h3>

				<div className='grid grid-cols-1 sup-lg:grid-cols-3 sup-sm:grid-cols-2 sup-xl:grid-cols-3 gap-6'>
					{suggestions.map((element) => (
						<Link className='flex justify-center' href={`/activite/${element.slug}`} key={element.id}>
							<ActivityExplorerItem
								description={element.short_description}
								imgSrc={element.img}
								price={element.price_eur}
								rating={element.rating}
								slug={element.slug}
								title={element.title}
							/>
						</Link>
					))}
				</div>
			</section>
		</section>
	)
}
