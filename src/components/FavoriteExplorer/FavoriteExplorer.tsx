'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { TFavorite } from '@/types/common'
import ActivityExplorerItem from '../ActivityExplorer/ActivityExplorerItem'
import ActivityExplorerSkeleton from '../ActivityExplorer/ActivityExplorerSkeleton'

export default function FavoriteExplorer() {
	const [items, setItems] = useState<TFavorite[] | null>(null)
	const [hasFavorites, setHasFavorites] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (!isMounted) return

		try {
			const raw = localStorage.getItem('favorites') || '[]'
			const parsed = JSON.parse(raw)

			const normalized: TFavorite[] =
				Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string'
					? parsed.map((t: string) => ({
							description: '',
							imgSrc: '',
							key: t,
							price: '',
							rating: '',
							slug: '',
							title: t
						}))
					: (parsed ?? [])

			// 👉 first determine whether there are favorites.
			if (normalized.length === 0) {
				setHasFavorites(false)
				setItems([]) // no skeleton in this case
			} else {
				setHasFavorites(true)
				// 🔥 here you can decide to display a skeleton before showing the actual cards
				// If you want the skeleton to remain visible for a minimum amount of time, you can simulate a “loading”
				setItems(null)
				// Example: small delay so the skeleton is visible (optional)
				setTimeout(() => {
					setItems(normalized)
				}, 300)
			}
		} catch {
			setHasFavorites(false)
			setItems([])
		}
	}, [isMounted])

	if (!isMounted) {
		return (
			<section className='flex h-[calc(100vh-180px)] flex-col items-center justify-center px-5 sup-md:px-40'>
				<Image
					alt='logo_background'
					className='-z-1 opacity-60'
					height={100}
					priority
					src='/assets/images/logo_grey.png'
					width={200}
				/>
				<p className='font-caviarDreams text-gray-400 text-lg'>Chargement de vos favoris...</p>
			</section>
		)
	}

	if (hasFavorites && items === null) {
		return (
			<section className='mt-0 sup-md:mt-14 min-h-screen px-5 sup-xl:px-40 pb-32 sup-lg:pb-0'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>VOS FAVORIS</h1>

				<hr className='my-6 border-gray-100 border-t' />

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{Array.from({ length: 4 }).map((_, i) => (
						<div className='flex justify-center' key={i}>
							<ActivityExplorerSkeleton />
						</div>
					))}
				</div>
			</section>
		)
	}

	if (items && items.length === 0) {
		return (
			<section className='mt-14 h-screen px-16 sup-md:px-24'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100 uppercase'>
					Aucun favori pour le moment
				</h1>
			</section>
		)
	}

	return (
		<section className='mt-0 sup-md:mt-14 min-h-screen px-5 sup-xl:px-40 pb-32 sup-lg:pb-0'>
			<h1 className='font-caviarDreams-bold text-3xl text-greeny-100 uppercase'>Vos favoris</h1>

			<hr className='my-6 border-gray-100 border-t' />

			{/* Grid des favoris */}
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				{items?.map((fav) => (
					<motion.div
						className='transform-gpu will-change-transform'
						key={fav.key}
						transition={{ duration: 0.25, type: 'tween' }}
						whileHover={{ y: -8 }}
					>
						<Link className='flex justify-center' href={`/activite/${fav.slug}`}>
							<ActivityExplorerItem
								description={fav.description}
								imgSrc={fav.imgSrc}
								onToggleFav={(key, nowFav) => {
									if (!nowFav) {
										setItems((curr) => curr?.filter((f) => f.key !== key) ?? [])
									}
								}}
								price={fav.price}
								rating={fav.rating}
								slug={fav.slug}
								title={fav.title}
							/>
						</Link>
					</motion.div>
				))}
			</div>
		</section>
	)
}
