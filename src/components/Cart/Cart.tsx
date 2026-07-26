'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Link from '@/components/ui/Link'
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
			<section className='mt-0 sup-md:mt-14 min-h-screen px-5 sup-md:px-24 sup-xl:px-40 pb-32 sup-lg:pb-0'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100 uppercase'>
					Aucunes activités dans votre panier
				</h1>

				<Dialog onOpenChange={setOpen} open={open}>
					<DialogContent className='p-14 [&>button]:cursor-pointer'>
						<DialogHeader>
							<DialogTitle className='text-center font-caviarDreams-bold text-2xl text-greeny-100 uppercase'>
								Votre panier est vide
							</DialogTitle>
						</DialogHeader>

						<DotLottieReact
							autoplay
							loop
							src='https://lottie.host/bc7f03c5-658b-41a9-b054-7631b12ea378/61sf3kW147.lottie'
						/>

						<p className='text-center sup-md:text-lg text-base'>
							Il n'y a actuellement aucune activité dans votre panier
						</p>

						<div className='mt-6 flex justify-center'>
							<Link href='/activite'>
								<button
									className='cursor-pointer rounded-xs bg-greeny-100 p-2 px-7 font-caviarDreams-bold text-base text-white transition-all duration-400 ease-in-out hover:bg-greeny-50'
									type='button'
								>
									EXPLORER NOS ACTIVITÉS
								</button>
							</Link>
						</div>
					</DialogContent>
				</Dialog>
			</section>
		)

	return (
		<section className='mt-0 sup-md:mt-14 min-h-screen px-5 sup-xl:px-40 pb-28 sup-lg:pb-0'>
			<div className='flex items-baseline justify-between gap-3'>
				<h1 className='font-caviarDreams-bold text-3xl text-greeny-100 uppercase'>Votre panier</h1>
				<p className='font-caviarDreams text-shark-400 text-sm'>
					{basket.length} {basket.length > 1 ? 'activités' : 'activité'}
				</p>
			</div>

			<hr className='my-6 border-shark-100 border-t' />

			<div className='my-9 grid grid-cols-1 sup-lg:grid-cols-[minmax(0,1fr)_320px] items-start gap-6'>
				{/* Colonne 1 */}
				<div className='flex min-w-0 flex-col gap-4'>
					{basket.map((item) => (
						<CartItemCard item={item} key={item.basketItemId} onRemove={handleRemoveFromBasket} />
					))}

					{/* Avantages affichés une fois dans le flux, en dessous de la liste (mobile) */}
					<div className='sup-lg:hidden'>
						<CartBenefits />
					</div>
				</div>

				{/* Colonne 2 (desktop) - reste visible au scroll */}
				<div className='sup-lg:sticky sup-lg:top-[156px] sup-lg:flex hidden flex-col gap-4'>
					<CartSummary />
					<CartBenefits />
				</div>
			</div>

			{/* Sticky footer mobile : total + CTA uniquement */}
			<div className='sticky inset-x-0 bottom-0 z-40 sup-lg:hidden border-shark-100 border-t bg-white/95 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md'>
				<div className='mx-auto max-w-[1200px] px-5 py-3'>
					<CartSummary compact />
				</div>
			</div>
		</section>
	)
}
