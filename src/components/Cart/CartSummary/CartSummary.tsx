'use client'

import { IoArrowForward } from 'react-icons/io5'

import { useBasketAtom } from '@/stores/useBasket.atom'

type TCartSummaryProps = {
	compact?: boolean
}

export default function CartSummary({ compact = false }: TCartSummaryProps) {
	const [basket] = useBasketAtom()

	const totalEur = basket.reduce((acc, item) => acc + item.total_eur, 0)
	const totalCfa = basket.reduce((acc, item) => acc + item.total_cfa, 0)
	const articleLabel = basket.length > 1 ? 'articles' : 'article'

	const handleCheckout = () => alert('DIRECTION PAYPAL')

	if (compact) {
		return (
			<div className='flex items-center justify-between gap-4'>
				<div>
					<p className='font-caviarDreams text-shark-400 text-xs'>
						Total ({basket.length} {articleLabel})
					</p>
					<p className='font-caviarDreams-bold text-greeny-100 text-xl'>{totalEur} €</p>
				</div>

				<button
					className='group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-greeny-100 px-5 py-3 font-caviarDreams-bold text-sm text-white transition-all duration-300 ease-in-out hover:bg-greeny-50 active:scale-[0.98]'
					onClick={handleCheckout}
					type='button'
				>
					COMMANDER
					<IoArrowForward className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
				</button>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4 rounded-2xl border border-shark-100 bg-white p-5 shadow-sm'>
			<div className='flex items-center justify-between'>
				<p className='font-caviarDreams-bold text-base'>Résumé de la commande</p>
				<span className='rounded-full bg-shark-50 px-2.5 py-1 font-caviarDreams text-shark-900 text-xs'>
					{basket.length} {articleLabel}
				</span>
			</div>

			<hr className='border-shark-100 border-t' />

			<div className='flex items-end justify-between'>
				<span className='font-caviarDreams text-shark-900 text-sm'>Total</span>
				<div className='text-end'>
					<p className='font-caviarDreams-bold text-2xl text-greeny-100'>{totalEur} €</p>
					<p className='font-caviarDreams text-shark-400 text-xs'>{totalCfa.toLocaleString('fr-FR')} CFA</p>
				</div>
			</div>

			<button
				className='group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-greeny-100 py-3 font-caviarDreams-bold text-white transition-all duration-300 ease-in-out hover:bg-greeny-50 active:scale-[0.98]'
				onClick={handleCheckout}
				type='button'
			>
				PASSER LA COMMANDE
				<IoArrowForward className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
			</button>
		</div>
	)
}
