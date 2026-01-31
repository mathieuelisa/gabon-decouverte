'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Link from '@/components/ui/Link'
import type { TFavorite } from '@/types/common'
import ActivityExplorerItem from '../ActivityExplorer/ActivityExplorerItem'
import ActivityExplorerSkeleton from '../ActivityExplorer/ActivityExplorerSkeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

export default function FavoriteExplorer() {
	const [items, setItems] = useState<TFavorite[] | null>(null)
	const [hasFavorites, setHasFavorites] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [open, setOpen] = useState(false)

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

	useEffect(() => {
		if (items?.length === 0) {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}, [items?.length, isMounted])

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
			<section className='mt-0 sup-md:mt-14 min-h-screen px-5 sup-md:px-24 sup-xl:px-40 pb-32 sup-lg:pb-0'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100 uppercase'>
					Aucun favori pour le moment
				</h1>

				<Dialog onOpenChange={setOpen} open={open}>
					<DialogContent className='p-14 [&>button]:cursor-pointer'>
						<DialogHeader>
							<DialogTitle className='text-center font-caviarDreams-bold text-2xl text-greeny-100 uppercase'>
								Aucun favori
							</DialogTitle>
						</DialogHeader>

						<DotLottieReact
							autoplay
							loop
							src='https://lottie.host/7dde5a8d-9d2e-4d91-9781-b0750a1253cf/oAFZZeP34D.lottie'
						/>

						<p className='text-center sup-md:text-lg text-base'>
							Ajoutez des activités à vos favoris en cliquant sur le cœur
						</p>

						<div className='mt-6 flex justify-center'>
							<Link href='/activite'>
								<button
									className='cursor-pointer rounded-xs bg-greeny-100 p-2 px-7 font-caviarDreams-bold text-base text-white transition-all duration-400 ease-in-out hover:bg-greeny-50'
									type='button'
								>
									EXPLORER NOS ACTIVITÉS
								</button>
							</Link>
						</div>
					</DialogContent>
				</Dialog>
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
