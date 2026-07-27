'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { IoArrowForward } from 'react-icons/io5'
import { MdOutlineStar } from 'react-icons/md'
import { toast } from 'react-toastify'

import Link from '@/components/ui/Link'
import { useFavoritesAtom } from '@/stores/useFavorites.atom'
import type { TFavorite } from '@/types/common'

// Confetti-style burst played once when the heart is filled
const HEART_BURST_COLORS = ['#ef4444', '#f43f5e', '#fb7185', '#f59e0b']
const HEART_PARTICLES = Array.from({ length: 8 }, (_, i) => {
	const angle = (i / 8) * Math.PI * 2
	return {
		color: HEART_BURST_COLORS[i % HEART_BURST_COLORS.length],
		x: Math.cos(angle) * 20,
		y: Math.sin(angle) * 20
	}
})

const HEART_POP_SCALE = [0.5, 1.35, 0.9, 1]
const HEART_POP_ROTATE = [0, -18, 12, 0]
const HEART_HOVER_SCALE = [1, 1.22, 0.98, 1.1, 1]
const HEART_HOVER_ROTATE = [0, -12, 10, -6, 0]

type TActivityExplorerItemProps = {
	description: string
	imgSrc: string
	rating: number | string
	slug?: string
	title: string
	price?: number
	onToggleFav?: (key: string, nowFav: boolean) => void
}

export default function ActivityExplorerItem({
	title,
	description,
	imgSrc,
	rating,
	slug,
	price,
	onToggleFav
}: TActivityExplorerItemProps) {
	const key = title
	const [favorites, setFavorites] = useFavoritesAtom()
	const [isFav, setIsFav] = useState(false)
	const [justLiked, setJustLiked] = useState(false)

	// Synced after mount (and whenever the shared favorites change) to avoid a hydration
	// mismatch between the server render and the client's localStorage-backed state.
	useEffect(() => {
		setIsFav(favorites.some((f) => f.key === key))
	}, [favorites, key])

	const notifyMessage = () => {
		toast.success(
			<section className='group'>
				<Link className='flex items-center gap-3' href='/favoris'>
					<div className='relative h-12 w-12 shrink-0'>
						<div className='absolute inset-0 overflow-hidden rounded-lg'>
							<Image alt={title} className='object-cover' fill sizes='48px' src={imgSrc} />
						</div>

						<span className='-right-1 -bottom-1 absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 ring-2 ring-white'>
							<IoMdHeart className='h-2.5 w-2.5 text-white' />
						</span>
					</div>

					<div className='flex min-w-0 flex-1 flex-col'>
						<p className='truncate font-caviarDreams-bold text-sm'>{title}</p>
						<p className='font-caviarDreams text-shark-400 text-xs'>Ajouté à vos favoris</p>
					</div>
				</Link>
			</section>,
			{
				autoClose: 3000,
				closeButton: false,
				hideProgressBar: true,
				icon: false,
				position: 'bottom-left'
			}
		)
	}

	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		const wasFav = favorites.some((f) => f.key === key)

		if (wasFav) {
			setFavorites(favorites.filter((f) => f.key !== key))

			setIsFav(false)
			onToggleFav?.(key, false)
		} else {
			const fav: TFavorite = { description, imgSrc, key, price, rating, slug, title }
			setFavorites([...favorites, fav])

			setIsFav(true)
			setJustLiked(true)
			setTimeout(() => setJustLiked(false), 650)
			notifyMessage()
			onToggleFav?.(key, true)
		}
	}

	return (
		<section className='group focus-within:-translate-y-1 relative aspect-3/4 w-full min-w-[220px] max-w-[380px] cursor-pointer overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 transition-all duration-300 ease-out focus-within:shadow-xl hover:shadow-xl'>
			<Image
				alt={title}
				className='object-cover transition-transform duration-700 ease-out group-hover:scale-110'
				fill
				sizes='(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 320px'
				src={imgSrc}
			/>

			{/* Scrim so the favorite icon stays legible on any image */}
			<div className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/50 to-transparent' />

			<button
				aria-label='Ajouter aux favoris'
				className='absolute top-4 right-4 z-20 cursor-pointer'
				onClick={toggleFavorite}
				type='button'
			>
				<div className='relative flex h-6 w-6 items-center justify-center'>
					<AnimatePresence>
						{justLiked &&
							HEART_PARTICLES.map((p, i) => (
								<motion.span
									animate={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
									className='-mt-[3px] -ml-[3px] absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full'
									initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
									key={`${key}-particle-${i}`}
									style={{ backgroundColor: p.color }}
									transition={{ delay: i * 0.015, duration: 0.55, ease: 'easeOut' }}
								/>
							))}
					</AnimatePresence>

					{isFav ? (
						<motion.div
							animate={{ rotate: HEART_POP_ROTATE, scale: HEART_POP_SCALE }}
							key='fav-filled'
							transition={{ duration: 0.5, ease: 'easeOut' }}
							whileHover={{ scale: 1.12 }}
						>
							<IoMdHeart className='h-6 w-6 text-red-600 drop-shadow-md' />
						</motion.div>
					) : (
						<motion.div
							animate={{ rotate: 0, scale: 1 }}
							className='relative h-6 w-6'
							key='fav-empty'
							transition={{ duration: 0.3 }}
							whileHover={{ rotate: HEART_HOVER_ROTATE, scale: HEART_HOVER_SCALE }}
						>
							<IoMdHeart className='absolute inset-0 h-6 w-6 text-black/40' />
							<IoMdHeartEmpty className='absolute inset-0 h-6 w-6 text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.6)]' />
						</motion.div>
					)}
				</div>
			</button>

			{/* Frosted glass panel carrying title, rating, description, price & CTA */}
			<div className='absolute inset-x-0 bottom-0 px-4 pt-10 pb-4'>
				{/* Blur fades out towards the top so the photo stays crisp above the panel.
				    Mask lives on this wrapper and the blur on its own child — Safari fails to
				    render backdrop-filter when mask-image sits on the same element. */}
				<div className='mask-[linear-gradient(to_top,black,transparent)] pointer-events-none absolute inset-0 overflow-hidden [-webkit-mask-image:linear-gradient(to_top,black,transparent)]'>
					<div className='absolute inset-0 backdrop-blur-xl backdrop-saturate-150' />
				</div>
				<div className='pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent' />

				<div className='relative'>
					<div className='flex items-start justify-between gap-2'>
						<h2 className='min-w-0 truncate font-caviarDreams-bold text-lg text-white'>{title}</h2>
						<div className='flex shrink-0 items-center gap-1 pt-0.5'>
							<MdOutlineStar className='h-4 w-4 text-yellow-400' />
							<span className='font-caviarDreams-bold text-sm text-white'>{rating}</span>
						</div>
					</div>

					<p className='mt-1.5 line-clamp-2 font-caviarDreams-bold text-sm text-white/75'>{description}</p>

					<div className='mt-3 flex items-center justify-between rounded-full bg-white/15 px-4 py-2.5 ring-1 ring-white/20 transition-colors duration-300 group-hover:bg-white/45'>
						<span className='font-caviarDreams-bold text-sm text-white'>
							{price} € <span className='font-caviarDreams text-white/70 text-xs'>/ pers.</span>
						</span>
						<span className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-greeny-100 transition-transform duration-300 group-hover:translate-x-0.5'>
							<IoArrowForward className='h-3.5 w-3.5' />
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}
