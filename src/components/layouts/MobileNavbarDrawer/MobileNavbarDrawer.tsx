'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader } from '../../ui/drawer'

type MobileNavbarDrawerProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function MobileNavbarDrawer({ open, onOpenChange }: MobileNavbarDrawerProps) {
	return (
		<Drawer direction='left' onOpenChange={onOpenChange} open={open}>
			<DrawerContent className='max-w-[520px]'>
				<DrawerClose className='absolute top-4 right-4 cursor-pointer'>
					<IoClose size={24} />
				</DrawerClose>

				<div className='mx-auto w-full px-4'>
					<DrawerHeader>
						<Link href='/'>
							<Image
								alt='logo gabon decouverte'
								className='relative'
								height={60}
								priority
								src='/assets/images/logo.png'
								width={60}
							/>
						</Link>
					</DrawerHeader>

					<Accordion className='w-full' collapsible defaultValue='item-1' type='single'>
						{/* ACTIVITE */}
						<AccordionItem
							className='px-8 data-[state=open]:border-greeny-100 data-[state=open]:border-b-2 dark:data-[state=open]:border-greeny-50'
							value='item-1'
						>
							<AccordionTrigger className='cursor-pointer font-caviarDreams text-2xl no-underline hover:no-underline data-[state=open]:text-greeny-100 dark:data-[state=open]:text-greeny-50'>
								ACTIVITÉ
							</AccordionTrigger>
							<AccordionContent className='flex flex-col gap-4'>
								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/activite?type=art-et-culture'
								>
									Art & Culture
								</Link>

								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/activite?type=ecotourisme-et-balneaire'
								>
									Écotourisme & Balnéaire
								</Link>

								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/activite?type=nature-et-decouverte'
								>
									Nature & Découverte
								</Link>
							</AccordionContent>
						</AccordionItem>

						{/* DÉCOUVERTE */}
						<AccordionItem
							className='px-8 data-[state=open]:border-greeny-100 data-[state=open]:border-b-2 dark:data-[state=open]:border-greeny-50'
							value='item-2'
						>
							<AccordionTrigger className='cursor-pointer font-caviarDreams text-2xl no-underline hover:no-underline data-[state=open]:text-greeny-100 dark:data-[state=open]:text-greeny-50'>
								DÉCOUVERTE
							</AccordionTrigger>
							<AccordionContent className='flex flex-col gap-4'>
								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/libreville'
								>
									Libreville
								</Link>
								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/lambarene'
								>
									Lambaréné
								</Link>
								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/mayumba'
								>
									Mayumba
								</Link>
								<Link
									className='font-caviarDreams text-lg transition-all duration-200 hover:translate-x-1 hover:text-greeny-100'
									href='/voyage-decouverte/oyem'
								>
									Oyem
								</Link>
							</AccordionContent>
						</AccordionItem>

						{/* CONTACT */}
						<div className='px-8 py-4'>
							<Link
								className='block cursor-pointer font-caviarDreams text-2xl no-underline hover:no-underline'
								href='/contact'
							>
								CONTACT
							</Link>
						</div>
					</Accordion>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
