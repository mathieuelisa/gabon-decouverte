'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Banner() {
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY

			const maxScroll = 300
			const clamped = Math.min(Math.max(scrollY, 0), maxScroll)

			const minScale = 1
			const maxScale = 1.1
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

			{/* degraded white → transparent */}
			<div className='absolute inset-0 bg-linear-to-b from-white via-white/30 to-transparent'></div>

			{/* Animated text */}
			<motion.h1
				animate={{ color: '#000000', opacity: 0.7, y: 0 }}
				className='-translate-x-1/2 absolute bottom-[480px] left-1/2 font-bold text-6xl tracking-wide'
				initial={{ color: '#ffffff', opacity: 0, y: 340 }}
				transition={{ duration: 2.2, ease: 'easeOut' }}
			>
				GABON DÉCOUVERTE
			</motion.h1>
		</section>
	)
}
