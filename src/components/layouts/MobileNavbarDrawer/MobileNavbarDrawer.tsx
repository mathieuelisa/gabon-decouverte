'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'

import { useTranslation } from '@/app/i18n/client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader } from '../../ui/drawer'

type MobileNavbarDrawerProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	language: string
	onToggleLanguage: (lng: 'fr' | 'en') => void
}

export default function MobileNavbarDrawer({
	open,
	onOpenChange,
	language,
	onToggleLanguage
}: MobileNavbarDrawerProps) {
	const { t } = useTranslation() as { t: (key: string) => string }

	return (
		<Drawer direction='left' onOpenChange={onOpenChange} open={open}>
			<DrawerContent className='max-w-[520px] border-none bg-greeny-100'>
				<DrawerClose className='absolute top-4 right-4 z-200 cursor-pointer text-gray-300'>
					<IoClose size={24} />
				</DrawerClose>

				<div className='relative mx-auto w-full px-4'>
					{/* Background image */}
					<Image
						alt='logo_background'
						className='-z-10 pointer-events-none absolute top-1/2 left-1/2 h-full w-full object-contain opacity-5'
						fill
						src='/assets/images/logo_grey.png'
					/>

					<DrawerHeader>
						<Image
							alt='logo gabon decouverte'
							className='relative'
							height={60}
							priority
							src='/assets/images/logo.png'
							width={60}
						/>
					</DrawerHeader>

					{/* Accordion content above the background image */}
					<Accordion className='relative z-10 w-full' collapsible defaultValue='item-1' type='single'>
						{/* ACTIVITÉ */}
						<AccordionItem className='px-8' value='item-1'>
							<AccordionTrigger className='cursor-pointer font-caviarDreams text-white text-xl uppercase no-underline transition-all duration-300 ease-in-out hover:no-underline data-[state=open]:scale-[1] data-[state=open]:text-gray-50 data-[state=open]:tracking-wide" [&>svg]:text-gray-200'>
								{t('navbar.activities')}
							</AccordionTrigger>

							<AccordionContent className='flex flex-col gap-4'>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/activite?type=art-et-culture'
									onClick={() => onOpenChange(false)}
								>
									Art & Culture
								</Link>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/activite?type=ecotourisme-et-balneaire'
									onClick={() => onOpenChange(false)}
								>
									{t('navbar.ecotourismSeaside')}
								</Link>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/activite?type=nature-et-decouverte'
									onClick={() => onOpenChange(false)}
								>
									{t('navbar.natureDiscovery')}
								</Link>
							</AccordionContent>
						</AccordionItem>

						{/* DÉCOUVERTE */}
						<AccordionItem className='px-8' value='item-2'>
							<AccordionTrigger className='cursor-pointer font-caviarDreams text-white text-xl uppercase no-underline transition-all duration-300 ease-in-out hover:no-underline data-[state=open]:scale-[1] data-[state=open]:text-gray-50 data-[state=open]:tracking-wide [&>svg]:text-gray-200'>
								{t('navbar.discovery')}
							</AccordionTrigger>

							<AccordionContent className='flex flex-col gap-4'>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/libreville'
									onClick={() => onOpenChange(false)}
								>
									Libreville
								</Link>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/lambarene'
									onClick={() => onOpenChange(false)}
								>
									Lambaréné
								</Link>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/mayumba'
									onClick={() => onOpenChange(false)}
								>
									Mayumba
								</Link>
								<Link
									className='font-caviarDreams text-base text-gray-200 transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/oyem'
									onClick={() => onOpenChange(false)}
								>
									Oyem
								</Link>
							</AccordionContent>
						</AccordionItem>

						{/* CONTACT */}
						<div className='px-8 py-4'>
							<Link
								className='block cursor-pointer font-caviarDreams text-white text-xl no-underline hover:no-underline'
								href='/contact'
								onClick={() => onOpenChange(false)}
							>
								CONTACT
							</Link>
						</div>
					</Accordion>
				</div>

				<DrawerFooter>
					<div className='flex items-center justify-end'>
						<div className='flex items-center justify-center gap-3 rounded-full border border-gray-200 px-3 py-1.5 transition-all hover:bg-gray-50'>
							<div className='relative flex items-center gap-1'>
								{/* FR */}
								<button
									className={`flex h-6 w-10 cursor-pointer items-center justify-center rounded-full font-caviarDreams-bold text-xs transition-all ${
										language === 'fr' ? 'bg-gray-200 text-greeny-100' : 'text-white'
									}`}
									onClick={() => {
										onToggleLanguage('fr')
									}}
									type='button'
								>
									FR
								</button>

								{/* EN */}
								<button
									className={`flex h-6 w-10 cursor-pointer items-center justify-center rounded-full font-caviarDreams-bold text-xs transition-all ${
										language === 'en' ? 'bg-gray-200 text-greeny-100' : 'text-white'
									}`}
									onClick={() => {
										onToggleLanguage('en')
									}}
									type='button'
								>
									EN
								</button>
							</div>
						</div>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
