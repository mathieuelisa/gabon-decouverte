'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { MdOutlineStar } from 'react-icons/md'
import { toast } from 'react-toastify'

import Link from '@/components/ui/Link'
import type { TFavorite } from '@/types/common'

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
	const [isFav, setIsFav] = useState(false)

	const readFavorites = (): TFavorite[] => {
		const raw = localStorage.getItem('favorites') || '[]'

		const parsed = JSON.parse(raw)
		if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
			return parsed.map((t: string) => ({
				description: '',
				imgSrc: '',
				key: t,
				price: 0,
				rating: '',
				slug: '',
				title: t
			})) as TFavorite[]
		}
		return (parsed ?? []) as TFavorite[]
	}

	useEffect(() => {
		const favs = readFavorites()
		setIsFav(favs.some((f) => f.key === key))
	}, [key])

	const notifyMessage = () => {
		toast.success(
			<section
				className='group relative h-[90px] overflow-hidden rounded-md bg-greeny-100'
				style={{
					backgroundImage: `url(${imgSrc})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover'
				}}
			>
				<div className='absolute inset-0 bg-black/50 transition-all duration-400 ease-in-out group-hover:bg-black/40' />

				<Link className='relative z-10 flex h-full flex-col justify-between p-3 text-white' href='/favoris'>
					<p className='font-caviarDreams-bold'>{title} a été ajouté à vos favoris ❤️</p>

					<p className='mt-2 text-end font-caviarDreams-bold text-[10px] text-white uppercase'>
						Voir vos favoris
					</p>
				</Link>
			</section>,
			{
				autoClose: 3000,
				closeButton: false,
				hideProgressBar: true,
				icon: false,
				position: 'bottom-left',
				style: {
					padding: '3px'
				}
			}
		)
	}

	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		const favs = readFavorites()
		const wasFav = favs.some((f) => f.key === key)

		if (wasFav) {
			const next = favs.filter((f) => f.key !== key)
			localStorage.setItem('favorites', JSON.stringify(next))

			setIsFav(false)
			onToggleFav?.(key, false)
		} else {
			const fav: TFavorite = { description, imgSrc, key, price, rating, slug, title }
			const next = [...favs, fav]
			localStorage.setItem('favorites', JSON.stringify(next))

			setIsFav(true)
			notifyMessage()
			onToggleFav?.(key, true)
		}
	}

	return (
		<section className='group hover:-translate-y-1 focus-within:-translate-y-1 relative min-h-[420px] min-w-[200px] max-w-[400px] cursor-pointer rounded-lg border border-gray-100 p-3 transition-all duration-300 ease-out focus-within:shadow-lg hover:border-greeny-100/30 hover:shadow-lg'>
			{/* Image wrapper */}
			<div className='relative h-[200px] overflow-hidden rounded-t-sm'>
				<Image
					alt={title}
					className='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]'
					height={300}
					src={imgSrc}
					width={400}
				/>
				{/* optional small sail for better “differentiation” when hovering */}
				<div className='pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10' />
			</div>

			<button
				aria-label='Ajouter aux favoris'
				className='absolute top-5 right-5 z-20 cursor-pointer'
				onClick={toggleFavorite}
				type='button'
			>
				{isFav ? (
					<IoMdHeart className='h-6 w-6 stroke-1 stroke-white text-red-700 transition-all hover:h-7 hover:w-7' />
				) : (
					<div className='relative h-7 w-7'>
						<IoMdHeart className='absolute inset-0 h-7 w-7 text-black/50' />
						<IoMdHeartEmpty className='absolute inset-0 h-7 w-7 text-white drop-shadow-[0_0_2px_white]' />
					</div>
				)}
			</button>

			<div className='mt-2 flex justify-between'>
				<h2 className='font-caviarDreams-bold sup-md:text-lg text-base text-greeny-100'>{title}</h2>
				<div className='flex items-start gap-1'>
					<MdOutlineStar className='text-greeny-100' />
					<p className='font-caviarDreams-bold text-greeny-100 text-sm'>{rating}</p>
				</div>
			</div>

			<p className='my-3 min-h-[175px] text-justify font-caviarDreams text-base'>{description}</p>
			<p className='my-3 text-end font-caviarDreams text-base text-greeny-100'>{price} € / par personne</p>
		</section>
	)
}
