'use client'

import Image from 'next/image'
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
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Removes an item from the shopping basket
	// by filtering out the entry matching the given ID
	// then updates the basket state
	// const handleRemoveFromBasket = (id: string) => {
	// 	const updateBasket = basket.filter((item) => item.id !== id)
	// 	setBasket(updateBasket)
	// }

	const handleRemoveFromBasket = (basketItemId: string) => {
		const updateBasket = basket.filter((item) => item.basketItemId !== basketItemId)
		setBasket(updateBasket)
	}

	useEffect(() => {
		if (!isMounted) return

		if (basket.length === 0) {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}, [basket.length, isMounted])

	if (!isMounted) {
		return (
			<section className='flex h-[calc(100vh-180px)] flex-col items-center justify-center px-5 sup-md:px-40'>
				<Image
					alt='logo_background'
					className='-z-1 opacity-60'
					height={100}
					priority
					src='/assets/images/logo_grey.png'
					width={200}
				/>
				<p className='font-caviarDreams text-gray-400 text-lg'>Chargement du panier...</p>
			</section>
		)
	}

	if (basket.length === 0)
		return (
			<section className='h-screen px-5 sup-md:px-40'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Aucunes activités dans votre panier</h1>

				<Dialog onOpenChange={setOpen} open={open}>
					<DialogContent className='p-6 [&>button]:cursor-pointer'>
						<DialogHeader>
							<DialogTitle className='font-caviarDreams-bold'>Votre panier est vide</DialogTitle>
						</DialogHeader>

						<p className='mt-3'>Il n'y a actuellement aucune activité dans votre panier.</p>

						<div className='mt-6 flex justify-end'>
							<Link href='/activite'>
								<button
									className='cursor-pointer rounded-md bg-greeny-100 p-2 font-caviarDreams-bold text-base text-white'
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
		<section className='min-h-screen px-5 sup-xl:px-40 pb-32 sup-lg:pb-0'>
			<h1 className='font-caviarDreams-bold text-3xl text-greeny-100'>Votre panier</h1>

			<hr className='my-6 border-gray-200 border-t' />

			<div className='my-9 grid grid-cols-1 sup-lg:grid-cols-[minmax(0,1fr)_auto] gap-6'>
				{/* Colonne 1 */}
				<div className='flex min-w-[60%] flex-col gap-4'>
					{basket.map((item) => (
						<CartItemCard item={item} key={item.basketItemId} onRemove={handleRemoveFromBasket} />
					))}
				</div>

				{/* Colonne 2 */}
				<div className='sup-lg:flex hidden flex-col gap-4'>
					<CartSummary />
					<CartBenefits />
				</div>
			</div>

			{/* Sticky footer mobile */}
			<div className='fixed right-0 bottom-0 left-0 z-50 sup-lg:hidden border-t bg-white shadow-lg'>
				<div className='mx-auto flex max-w-[1200px] flex-col gap-3 bg-greeny-100 px-5 py-3'>
					<CartSummary />
					<CartBenefits />
				</div>
			</div>
		</section>
	)
}
