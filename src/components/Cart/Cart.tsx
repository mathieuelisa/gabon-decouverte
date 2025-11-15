'use client'

import Image from 'next/image'
import { BsTrash3 } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { GoBook } from 'react-icons/go'
import { TbClockHour7 } from 'react-icons/tb'

import { useBasketAtom } from '@/stores/useBasket.atom'

export default function Cart() {
	const [basket] = useBasketAtom()

	// console.log('basket', basket)

	if (basket.length === 0)
		return (
			<section className='h-screen px-5 sup-md:px-40'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Aucunes activites dans votre panier</h1>
			</section>
		)

	return (
		<section className='h-screen px-5 sup-xl:px-40'>
			<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Votre panier</h1>

			<hr className='my-6 border-gray-200 border-t' />

			<div className='mt-9 grid grid-cols-1 sup-lg:grid-cols-[minmax(0,1fr)_auto] gap-6'>
				{/* Colonne 1 */}
				<div className='flex min-w-[60%] flex-col gap-4'>
					{basket.map((item) => (
						<section
							className='flex min-w-[60%] sup-md:flex-row flex-col gap-2 rounded-md border p-3'
							key={item.id}
						>
							{item.img ? (
								<Image alt='img' className='w-full' height={300} src={item.img} width={300} />
							) : null}

							<div className='flex w-full flex-col justify-between'>
								<section className='flex justify-between'>
									<div className='ml-3 flex flex-col'>
										<h2 className='font-caviarDreams-bold text-xl'>{item?.title}</h2>
										{/* Participant */}
										<div className='mt-4 flex items-center gap-2'>
											<FiUsers className='h-5 w-5' />
											<p>{item?.participate} participants</p>
										</div>

										{/* Short description */}
										<div className='mt-4 flex items-center gap-2'>
											<GoBook className='h-5 w-5' />
											<p className='max-w-[490px] text-sm'>{item?.short_description}</p>
										</div>

										{/* Duration */}
										<div className='mt-4 flex items-center gap-2'>
											<TbClockHour7 className='h-5 w-5' />
											<p>{item?.duration}</p>
										</div>
									</div>

									{/* Price */}
									<div>
										<p className='font-caviarDreams-bold'>
											{item.price_eur} EUR{' '}
											<span className='text-xs'>soit {item.price_cfa} CFA</span>
										</p>
									</div>
								</section>

								<section className='flex justify-end'>
									<button className='group flex cursor-pointer items-center gap-2' type='button'>
										<BsTrash3 className='h-4 w-4' />
										<p className='text-sm group-hover:underline'>Supprimer</p>
									</button>
								</section>
							</div>
						</section>
					))}
				</div>

				{/* Colonne 2 : Sous-total + avantages */}
				{/* TODO: virer le w-72 */}
				<div className='flex flex-col gap-4'>
					<div className='h-11 w-72 rounded-lg border p-2'>sous total</div>
					<div className='h-11 w-72 rounded-lg border p-2'>nos avantage</div>
				</div>
			</div>
		</section>
	)
}
