'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useBasketAtom } from '@/stores/useBasket.atom'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import CartBenefits from './CartBenefits'
import CartItemCard from './CartItemCard'
import CartSummary from './CartSummary'

export default function Cart() {
	const [basket, setBasket] = useBasketAtom()
	const [open, setOpen] = useState(false)

	// Removes an item from the shopping basket
	// by filtering out the entry matching the given ID
	// then updates the basket state.
	const handleRemoveFromBasket = (id: string) => {
		const updateBasket = basket.filter((item) => item.id !== id)
		setBasket(updateBasket)
	}

	useEffect(() => {
		if (basket.length === 0) {
			setOpen(true)
		}
	}, [basket.length])

	if (basket.length === 0)
		return (
			<section className='h-screen px-5 sup-md:px-40'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Aucunes activites dans votre panier</h1>

				<Dialog onOpenChange={setOpen} open={open}>
					<DialogContent className='p-6'>
						<DialogHeader>
							<DialogTitle>Votre panier est vide</DialogTitle>
						</DialogHeader>

						<p className='mt-3'>Il n'y a actuellement aucune activité dans votre panier.</p>

						<div className='mt-6 flex justify-end'>
							<Link href='/activite'>
								<button
									className='cursor-pointer rounded-md bg-greeny-100 p-2 font-caviarDreams-bold text-white'
									type='button'
								>
									EXPLORER LES ACTIVITES
								</button>
							</Link>
						</div>
					</DialogContent>
				</Dialog>
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
						<CartItemCard item={item} key={item.id} onRemove={handleRemoveFromBasket} />
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
