'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { TFavorite } from '@/types/common'
import ActivityExplorerItem from '../ActivityExplorer/ActivityExplorerItem'
import ActivityExplorerSkeleton from '../ActivityExplorer/ActivityExplorerSkeleton'

export default function FavoriteExplorer() {
	const [items, setItems] = useState<TFavorite[] | null>(null)

	useEffect(() => {
		try {
			const raw = localStorage.getItem('favorites') || '[]'
			// Parse the JSON string into a JavaScript object/array
			const parsed = JSON.parse(raw)
			// Normalize the data structure:
			// → If 'parsed' is an array of strings (old format),
			//    convert each string into a TFavorite object with empty fields.
			// → Otherwise, assume it's already an array of TFavorite objects.
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
			setItems(normalized)
		} catch {
			setItems([])
		}
	}, [])

	if (items === null) {
		return (
			<div className='mt-2 grid min-h-screen grid-cols-1 gap-6 px-12 sm:grid-cols-2 lg:grid-cols-4'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div className='m-4 flex justify-center' key={i}>
						<ActivityExplorerSkeleton key={i} />
					</div>
				))}
			</div>
		)
	}

	if (items.length === 0) return <div className='h-screen'>Aucun favori pour le moment.</div>

	return (
		<div className='mt-5 grid min-h-screen grid-cols-1 gap-6 px-12 sm:grid-cols-2 lg:grid-cols-4'>
			{items.map((fav) => (
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
									setItems((curr) => curr.filter((f) => f.key !== key))
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
