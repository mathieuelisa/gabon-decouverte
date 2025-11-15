'use client'

import { useBasketAtom } from '@/stores/useBasket.atom'
import CartBenefits from './CartBenefits'
import CartItemCard from './CartItemCard'
import CartSummary from './CartSummary'

export default function Cart() {
	const [basket] = useBasketAtom()

	if (basket.length === 0)
		return (
			<section className='h-screen px-5 sup-md:px-40'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Aucunes activites dans votre panier</h1>
			</section>
		)

	return (
		<section className='px-5 sup-xl:px-40'>
			<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Votre panier</h1>

			<hr className='my-6 border-gray-200 border-t' />

			<div className='my-9 grid grid-cols-1 sup-lg:grid-cols-[minmax(0,1fr)_auto] gap-6'>
				{/* Colonne 1 */}
				<div className='flex min-w-[60%] flex-col gap-4'>
					{basket.map((item) => (
						<CartItemCard item={item} key={item.id} />
					))}
				</div>
				{/* Colonne 2 : Sous-total + avantages */}
				<div className='flex flex-col gap-4'>
					<CartSummary />
					<CartBenefits />
				</div>
			</div>
		</section>
	)
}
