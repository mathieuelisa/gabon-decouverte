'use client'

import { GrValidate } from 'react-icons/gr'

import { CART_BENEFITS_DATA } from './CartBenefitsMock.data'

export default function CartBenefits() {
	return (
		<div className='flex flex-col gap-3 rounded-2xl border border-shark-100 bg-white p-5 shadow-sm'>
			{CART_BENEFITS_DATA.map((item) => (
				<section className='flex items-center gap-3' key={item.id}>
					<span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-greeny-100/10 text-greeny-100'>
						<GrValidate className='h-3.5 w-3.5' />
					</span>
					<p className='font-caviarDreams text-shark-900 text-sm'>{item.title}</p>
				</section>
			))}
		</div>
	)
}
