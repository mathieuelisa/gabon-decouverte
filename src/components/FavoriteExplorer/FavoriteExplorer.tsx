'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { TFavorite } from '@/types/common'
import ActivityExplorerItem from '../ActivityExplorer/ActivityExplorerItem'

export default function FavoriteExplorer() {
	const [items, setItems] = useState<TFavorite[]>([])

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
					? parsed.map((t: string) => ({ description: '', imgSrc: '', key: t, rating: '', title: t }))
					: (parsed ?? [])
			setItems(normalized)
		} catch {
			setItems([])
		}
	}, [])

	if (items.length === 0) return <div>Aucun favori pour le moment.</div>

	return (
		<div className='mt-5 grid min-h-screen grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
			{items.map((fav) => (
				<motion.div
					className='transform-gpu will-change-transform'
					key={fav.key}
					transition={{ duration: 0.25, type: 'tween' }}
					whileHover={{ y: -8 }}
				>
					<Link className='flex justify-center' href={`/activity/${fav.slug}`}>
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
