'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Banner() {
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY

			const maxScroll = 300
			const clamped = Math.min(Math.max(scrollY, 0), maxScroll)

			const minScale = 1 // taille normale
			const maxScale = 1.1 // zoom max
			const ratio = clamped / maxScroll

			const newScale = minScale + (maxScale - minScale) * ratio

			setScale(newScale)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section className='relative'>
			<div className='relative h-[722px]'>
				<Image
					alt='savane africaine'
					fill={true}
					priority
					src='/assets/images/savane_africa.avif'
					style={{
						transform: `scale(${scale})`,
						transition: 'transform 0.15s ease-out'
					}}
				/>
			</div>
			<div className='absolute inset-0 bg-linear-to-b from-0% from-white via-30% via-white to-80% to-transparent'></div>
		</section>
	)
}
