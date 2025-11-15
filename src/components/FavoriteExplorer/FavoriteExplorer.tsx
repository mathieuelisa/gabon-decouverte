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
							rating: '',
							slug: '',
							title: t
						}))
					: (parsed ?? [])

			// 👉 on détermine d'abord s'il y a des favoris
			if (normalized.length === 0) {
				setHasFavorites(false)
				setItems([]) // pas de skeleton dans ce cas
			} else {
				setHasFavorites(true)
				// 🔥 ici tu peux décider d'afficher un skeleton avant d'afficher les vraies cartes
				// Si tu veux que le skeleton soit visible un minimum, tu peux simuler un "chargement"
				setItems(null)
				// Exemple : petit délai pour que le skeleton soit visible (optionnel)
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
			<div className='mt-2 grid min-h-[calc(100vh-180px)] grid-cols-1 gap-6 px-12 sm:grid-cols-2 lg:grid-cols-4'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div className='m-4 flex justify-center' key={i}>
						<ActivityExplorerSkeleton />
					</div>
				))}
			</div>
		)
	}

	if (items && items.length === 0) {
		return (
			<section className='h-screen px-5 sup-md:px-40'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Aucun favori pour le moment</h1>
			</section>
		)
	}

	return (
		<div className='mt-5 grid min-h-[calc(100vh-180px)] grid-cols-1 gap-6 px-12 sm:grid-cols-2 lg:grid-cols-4'>
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
							rating={fav.rating}
							slug={fav.slug}
							title={fav.title}
						/>
					</Link>
				</motion.div>
			))}
		</div>
	)
}
