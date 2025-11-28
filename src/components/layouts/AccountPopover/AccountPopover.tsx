'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { IoMdHeartEmpty } from 'react-icons/io'
import { LiaHandshake } from 'react-icons/lia'
import { SlUser } from 'react-icons/sl'
import { twMerge } from 'tailwind-merge'

import { useTranslation } from '@/app/i18n/client'

type AccountPopoverProps = {
	isOpen: boolean
	language: string
	onToggleLanguage: (lng: string) => void
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
	const { t } = useTranslation() as { t: (key: string) => string }

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
					className='absolute top-12 right-4 z-100 w-[190px] rounded-md border border-gray-100 bg-white p-4 shadow-lg'
					exit={{ opacity: 0, y: -8 }}
					initial={{ opacity: 0, y: -8 }}
					role='dialog'
					transition={{ duration: 0.2 }}
				>
					<div className='mb-4 flex items-center gap-2 border-gray-100 border-b pb-3'>
						<SlUser className='h-4 w-4' />
						<p className='font-medium text-sm'>{t('login')}</p>
					</div>

					<div className='flex flex-col gap-3 text-sm'>
						{/* Langue */}
						<div className='flex items-center justify-center gap-3 rounded-full border px-3 py-1.5 transition-all hover:bg-gray-50'>
							<div className='relative flex items-center gap-1'>
								{/* FR */}
								<button
									className={twMerge(
										'flex h-6 w-10 cursor-pointer items-center justify-center rounded-full font-caviarDreams-bold text-xs transition-all',
										language === 'fr' ? 'bg-greeny-100 text-white' : 'text-gray-500'
									)}
									onClick={() => onToggleLanguage('fr')}
									type='button'
								>
									FR
								</button>

								{/* EN */}
								<button
									className={twMerge(
										'flex h-6 w-10 cursor-pointer items-center justify-center rounded-full font-caviarDreams-bold text-xs transition-all',
										language === 'en' ? 'bg-greeny-100 text-white' : 'text-gray-500'
									)}
									onClick={() => onToggleLanguage('en')}
									type='button'
								>
									EN
								</button>
							</div>
						</div>

						{/* Prestataire */}
						<Link
							className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							href='/devenir-prestataire'
							onClick={handleLinkClick}
						>
							<LiaHandshake className='h-4 w-4' />
							<span>{t('popover.becomePartner')}</span>
						</Link>

						{/* Favoris */}
						<Link
							className='flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							href='/favoris'
							onClick={handleLinkClick}
						>
							<IoMdHeartEmpty className='h-4 w-4' />
							<span>{t('popover.wishlist')}</span>
						</Link>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
