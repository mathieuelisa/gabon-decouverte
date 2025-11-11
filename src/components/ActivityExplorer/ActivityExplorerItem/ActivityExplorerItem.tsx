import Image from 'next/image'
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

	const notify = (text: string) =>
		toast.success(text, {
			autoClose: 7000,
			position: 'bottom-left'
		})

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

	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		const favs = readFavorites()
		const wasFav = favs.some((f) => f.key === key) // ← ici "étaitFavori"

		if (wasFav) {
			const next = favs.filter((f) => f.key !== key)
			localStorage.setItem('favorites', JSON.stringify(next))
			setIsFav(false)
			notify('Retiré de vos favoris 💔')
			onToggleFav?.(key, false)
		} else {
			const fav: TFavorite = { description, imgSrc, key, rating, slug, title }
			const next = [...favs, fav]
			localStorage.setItem('favorites', JSON.stringify(next))
			setIsFav(true)
			notify('Ajouté à vos favoris ❤️')
			onToggleFav?.(key, true)
		}
	}

	return (
		<section className='relative min-h-[420px] min-w-[200px] max-w-[300px] cursor-pointer rounded-lg'>
			<Image alt='Balade sur le lac Oguemoué' className='rounded-t-md' height={300} src={imgSrc} width={400} />

			<button
				aria-label='Ajouter aux favoris'
				className='absolute top-5 right-5 z-20 cursor-pointer'
				onClick={toggleFavorite}
				type='button'
			>
				{isFav ? (
					<IoMdHeart className='h-6 w-6 text-red-700 transition-all hover:h-7 hover:w-7' />
				) : (
					<IoMdHeartEmpty className='h-6 w-6 fill-black/50 text-white transition-all hover:h-7 hover:w-7' />
				)}
			</button>

			<div className='mt-2 flex items-center justify-between'>
				<h2 className='font-caviarDreams-bold'>{title}</h2>
				<div className='flex items-center gap-1'>
					<MdOutlineStar />
					<p>{rating}</p>
				</div>
			</div>

			<p className='my-3'>{description}</p>
		</section>
	)
}
