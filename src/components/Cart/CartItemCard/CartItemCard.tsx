'use client'

import Image from 'next/image'
import { BsTrash3 } from 'react-icons/bs'
import { FiUser, FiUsers } from 'react-icons/fi'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { TbClockHour7 } from 'react-icons/tb'

import type { TBasketItem } from '@/types/common'

type TcartItemCard = {
	item: TBasketItem
	onRemove?: (id: string) => void
}

export default function CartItemCard({ item, onRemove }: TcartItemCard) {
	const iseDate = item?.date
	const date = new Date(iseDate)
	const formatted = date.toLocaleDateString('fr-FR')

	return (
		<section className='flex sup-md:flex-row flex-col gap-4 rounded-2xl border border-shark-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md'>
			<div className='relative h-44 sup-md:h-auto sup-md:w-44 w-full shrink-0 overflow-hidden rounded-xl'>
				{item.img ? (
					<Image
						alt={item?.title ?? 'Activité'}
						className='object-cover'
						fill
						sizes='(max-width: 768px) 100vw, 176px'
						src={item.img}
					/>
				) : null}
			</div>

			<div className='flex w-full flex-col justify-between gap-3'>
				<div className='flex items-start justify-between gap-3'>
					<div>
						<h2 className='font-caviarDreams-bold sup-md:text-xl text-greeny-100 text-lg'>{item?.title}</h2>
						<p className='mt-1 line-clamp-2 font-caviarDreams text-shark-900 text-sm'>
							{item?.short_description}
						</p>
					</div>

					<button
						aria-label='Supprimer du panier'
						className='flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-shark-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600'
						onClick={() => onRemove(item.basketItemId)}
						type='button'
					>
						<BsTrash3 className='h-4 w-4' />
					</button>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					<span className='flex items-center gap-1.5 rounded-full bg-shark-50 px-3 py-1 font-caviarDreams text-shark-900 text-xs'>
						{item?.participate === 1 ? (
							<FiUser className='h-3.5 w-3.5' />
						) : (
							<FiUsers className='h-3.5 w-3.5' />
						)}
						{item?.participate} participant{item?.participate > 1 ? 's' : ''}
					</span>

					<span className='flex items-center gap-1.5 rounded-full bg-shark-50 px-3 py-1 font-caviarDreams text-shark-900 text-xs'>
						<TbClockHour7 className='h-3.5 w-3.5' />
						{item?.duration}
					</span>

					<span className='flex items-center gap-1.5 rounded-full bg-shark-50 px-3 py-1 font-caviarDreams text-shark-900 text-xs'>
						<IoCalendarNumberOutline className='h-3.5 w-3.5' />
						le {formatted}
					</span>
				</div>

				<div className='flex items-end justify-between gap-3 border-shark-100 border-t pt-3'>
					<span className='font-caviarDreams text-shark-400 text-xs'>Prix total</span>
					<div className='text-end'>
						<p className='font-caviarDreams-bold text-greeny-100 text-lg'>{item.total_eur} €</p>
						<p className='font-caviarDreams text-shark-400 text-xs'>
							{item.total_cfa.toLocaleString('fr-FR')} CFA
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
