'use client'

import Image from 'next/image'
import { BsTrash3 } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { TbClockHour7 } from 'react-icons/tb'

import type { TBasketItem } from '@/types/common'

type TcartItemCard = {
	item: TBasketItem
	onRemove?: (id: string) => void
}

export default function CartItemCard({ item, onRemove }: TcartItemCard) {
	return (
		<section
			className='flex min-w-[60%] sup-md:flex-row flex-col gap-2 rounded-md border border-gray-200 p-3'
			key={item.id}
		>
			{item.img ? <Image alt='img' className='w-full' height={300} src={item.img} width={300} /> : null}

			<div className='flex w-full flex-col justify-between'>
				<section className='flex justify-between'>
					<div className='ml-3 flex flex-col'>
						<h2 className='font-caviarDreams-bold text-xl'>{item?.title}</h2>
						<p className='mt-3 max-w-[300px] text-sm'>{item?.short_description}</p>
						{/* Participant */}
						<div className='mt-8 flex items-center gap-2'>
							<FiUsers className='h-5 w-5' />
							<p>{item?.participate} participants</p>
						</div>
						{/* Duration */}
						<div className='mt-4 flex items-center gap-2'>
							<TbClockHour7 className='h-5 w-5' />
							<p>{item?.duration}</p>
						</div>
					</div>
					{/* Price */}
					<div className='flex flex-col items-end'>
						<p className='font-caviarDreams-bold text-lg'>{item.total_eur} € </p>
						<p className='text-gray-600 text-sm'>{item.total_cfa} CFA</p>
					</div>
				</section>

				<section className='flex justify-end'>
					<button
						className='group flex cursor-pointer items-center gap-2'
						onClick={() => onRemove(item.id)}
						type='button'
					>
						<BsTrash3 className='h-4 w-4' />
						<p className='text-sm group-hover:underline'>Supprimer</p>
					</button>
				</section>
			</div>
		</section>
	)
}
