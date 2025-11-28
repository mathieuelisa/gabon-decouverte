'use client'

import { useBasketAtom } from '@/stores/useBasket.atom'

export default function CartSummary() {
	const [basket] = useBasketAtom()

	return (
		<div className='flex flex-col gap-2 rounded-lg border border-gray-100 bg-white p-3'>
			<div className='flex items-center justify-between'>
				<p className='font-caviarDreams-bold'>Sous-total</p>
				<span className='text-gray-600 text-sm'>
					({basket.length} {basket.length > 1 ? 'articles' : 'article'})
				</span>
			</div>

			<div className='flex flex-col'>
				<span className='font-caviarDreams-bold text-lg'>
					{basket.reduce((acc, item) => acc + item.total_eur, 0)} €
				</span>
				<span className='text-gray-600 text-sm'>
					{basket.reduce((acc, item) => acc + item.total_cfa, 0)} CFA
				</span>
			</div>

			<button
				className='cursor-pointer rounded-md bg-greeny-50 py-2 font-caviarDreams-bold text-white uppercase transition-all duration-300 ease-in-out hover:bg-greeny-100'
				onClick={() => alert('DIRECTION PAYPAL')}
				type='button'
			>
				Passer la commande
			</button>
		</div>
	)
}
