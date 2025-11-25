'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { MdOutlineStar } from 'react-icons/md'
import { toast } from 'react-toastify'

import type { TFavorite } from '@/types/common'

type TActivityExplorerItemProps = {
	description: string
	imgSrc: string
	rating: number | string
	slug?: string
	title: string
	onToggleFav?: (key: string, nowFav: boolean) => void
}

export default function ActivityExplorerItem({
	title,
	description,
	imgSrc,
	rating,
	slug,
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
			<div className='flex items-center gap-3'>
				<Image alt={title} className='rounded-md object-cover' height={60} src={imgSrc} width={60} />
				<Link className='flex flex-col' href='/favoris'>
					<p className='font-caviarDreams-bold'>Ajouté à vos favoris ❤️</p>
					<p className='mt-2 text-end font-caviarDreams-bold text-greeny-100 text-xs'>Voir vos favoris</p>
				</Link>
			</div>,
			{
				autoClose: 4000,
				hideProgressBar: true,
				icon: false,
				position: 'bottom-left'
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
			const fav: TFavorite = { description, imgSrc, key, rating, slug, title }
			const next = [...favs, fav]
			localStorage.setItem('favorites', JSON.stringify(next))

			setIsFav(true)
			notifyMessage()
			onToggleFav?.(key, true)
		}
	}

	return (
		<section className='relative min-h-[420px] min-w-[200px] max-w-[300px] cursor-pointer rounded-lg'>
			<Image
				alt='Balade sur le lac Oguemoué'
				className='h-[200px] rounded-t-md object-cover'
				height={300}
				src={imgSrc}
				width={400}
			/>

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

			<div className='mt-2 flex items-center justify-between'>
				<h2 className='font-caviarDreams-bold text-greeny-100'>{title}</h2>
				<div className='flex items-center gap-1'>
					<MdOutlineStar className='text-greeny-100' />
					<p className='font-caviarDreams-bold text-greeny-100 text-sm'>{rating}</p>
				</div>
			</div>

			<p className='my-3'>{description}</p>
		</section>
	)
}
