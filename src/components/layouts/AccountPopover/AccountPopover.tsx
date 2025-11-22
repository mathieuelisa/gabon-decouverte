'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { BsFlag } from 'react-icons/bs'
import { IoMdHeartEmpty } from 'react-icons/io'
import { LiaHandshake } from 'react-icons/lia'
import { SlBasket, SlUser } from 'react-icons/sl'

type AccountPopoverProps = {
	isOpen: boolean
	language: string
	onToggleLanguage: () => void
	onClose: () => void
	onNavClick: () => void
	basketLength: number
	isMounted: boolean
}

export default function AccountPopover({
	isOpen,
	language,
	onToggleLanguage,
	onClose,
	onNavClick,
	basketLength,
	isMounted
}: AccountPopoverProps) {
	const handleLinkClick = () => {
		onClose()
		onNavClick()
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					aria-modal='false'
					className='absolute top-12 right-4 z-100 w-[180px] rounded-md border border-gray-200 bg-white p-4 shadow-lg'
					exit={{ opacity: 0, y: -8 }}
					initial={{ opacity: 0, y: -8 }}
					role='dialog'
					transition={{ duration: 0.2 }}
				>
					<div className='mb-4 flex items-center gap-2 border-gray-100 border-b pb-3'>
						<SlUser className='h-4 w-4' />
						{/* <p className='font-medium text-sm'>{t('common:login')}</p> */}
					</div>

					<div className='flex flex-col gap-3 text-sm'>
						{/* Langue */}
						<button
							className='flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							onClick={onToggleLanguage}
							type='button'
						>
							<BsFlag className='h-4 w-4' />
							<span>{language}</span>
						</button>

						{/* Prestataire */}
						<Link
							className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							href='/devenir-prestataire'
							onClick={handleLinkClick}
						>
							<LiaHandshake className='h-4 w-4' />
							<span>Prestataire</span>
						</Link>

						{/* Favoris */}
						<Link
							className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							href='/favoris'
							onClick={handleLinkClick}
						>
							<IoMdHeartEmpty className='h-4 w-4' />
							<span>Favoris</span>
						</Link>

						{/* Panier */}
						<Link
							className='flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							href='/panier'
							onClick={handleLinkClick}
						>
							<div className='flex items-center gap-2'>
								<SlBasket className='h-4 w-4' />
								<span>Panier</span>
							</div>

							{isMounted && basketLength > 0 && (
								<span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 font-caviarDreams-bold text-[10px] text-white'>
									{basketLength}
								</span>
							)}
						</Link>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
