'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { IoMdHeartEmpty } from 'react-icons/io'
import { LiaHandshake } from 'react-icons/lia'
import { SlUser } from 'react-icons/sl'
import { twMerge } from 'tailwind-merge'

type AccountPopoverProps = {
	isOpen: boolean
	language: string
	onToggleLanguage: () => void
	onClose: () => void
	onNavClick: () => void
}

export default function AccountPopover({
	isOpen,
	language,
	onToggleLanguage,
	onClose,
	onNavClick
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
							className='flex items-center gap-3 rounded-full border px-3 py-1.5 transition-all hover:bg-gray-50'
							onClick={onToggleLanguage}
							type='button'
						>
							<div className='relative flex items-center gap-1'>
								{/* FR */}
								<span
									className={twMerge(
										'flex h-6 w-10 items-center justify-center rounded-full text-xs transition-all',
										language === 'FR' ? 'bg-greeny-100 text-white' : 'text-gray-500'
									)}
								>
									FR
								</span>

								{/* EN */}
								<span
									className={twMerge(
										'flex h-6 w-10 items-center justify-center rounded-full text-xs transition-all',
										language === 'EN' ? 'bg-greeny-100 text-white' : 'text-gray-500'
									)}
								>
									EN
								</span>
							</div>
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
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
