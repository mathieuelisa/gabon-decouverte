'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { CiMenuBurger } from 'react-icons/ci'
import { SlBasket, SlUser } from 'react-icons/sl'
import { twJoin, twMerge } from 'tailwind-merge'

import { useTranslation } from '@/app/i18n/client'
import MobileNavbarDrawer from '@/components/layouts/MobileNavbarDrawer'
import { useBasketAtom } from '@/stores/useBasket.atom'
import type { TActiviteKey, TDecouverteKey, TPanelKey } from '@/types/common'
import AccountPopover from '../AccountPopover'

export default function Navbar() {
	const { t } = useTranslation() as { t: (key: string) => string }
	const { i18n } = useTranslation()
	const pathname = usePathname()
	const router = useRouter()

	const [isOpenDialog, setIsOpenDialog] = useState(false)
	const [activePanel, setActivePanel] = useState<TPanelKey | null>(null)
	const [selectedActivite, setSelectedActivite] = useState<TActiviteKey | null>(null)
	const [selectedDecouverte, setSelectedDecouverte] = useState<TDecouverteKey | null>(null)
	const [isMounted, setIsMounted] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const accountAreaRef = useRef<HTMLElement | null>(null)

	const [basket] = useBasketAtom()

	const toggleDialog = () => {
		setIsOpenDialog((prev) => !prev)
	}

	const closeDialog = () => {
		setIsOpenDialog(false)
	}

	// Cover images for activity part
	const activiteImageMap: Record<TActiviteKey, { src: string; alt: string }> = {
		art: {
			alt: 'Art & culture au Gabon',
			src: '/assets/images/activites/art-culture.avif'
		},
		eco: {
			alt: 'Ecotourisme & balnéaire au Gabon',
			src: '/assets/images/activites/ecotourisme-balneaire.avif'
		},
		nature: {
			alt: 'Nature & Découverte au Gabon',
			src: '/assets/images/activites/nature-decouverte.avif'
		}
	}

	// Cover images for discovery part
	const decouverteImageMap: Record<TDecouverteKey, { src: string; alt: string }> = {
		lambarene: {
			alt: 'Ecotourisme & balnéaire au Gabon',
			src: '/assets/images/decouverte/sunset.avif'
		},
		libreville: {
			alt: 'Art & culture au Gabon',
			src: '/assets/images/decouverte/homme_african.avif'
		},
		mayumba: {
			alt: 'Nature & Découverte au Gabon',
			src: '/assets/images/decouverte/girafe.avif'
		},
		oyem: {
			alt: 'Nature & Découverte au Gabon',
			src: '/assets/images/decouverte/africa.avif'
		}
	}

	const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

	const panelLinkClass = (href: string) => twMerge('text-black', isActive(href) && 'text-greeny-50')

	const isOpen = activePanel !== null

	const basketLength = basket?.length ?? 0

	useEffect(() => {
		// --- Activités ---
		if (isActive('/activité/art-et-culture')) {
			setSelectedActivite('art')
		} else if (isActive('/activité/ecotourisme-et-balneaire')) {
			setSelectedActivite('eco')
		} else if (isActive('/activité/nature-et-decouverte')) {
			setSelectedActivite('nature')
		} else if (isActive('/activité/toutes-nos-activites')) {
			setSelectedActivite(null)
		}

		// --- Découvrir ---
		if (isActive('/voyage-decouverte/libreville')) {
			setSelectedDecouverte('libreville')
		} else if (isActive('/voyage-decouverte/lambarene')) {
			setSelectedDecouverte('lambarene')
		} else if (isActive('/voyage-decouverte/mayumba')) {
			setSelectedDecouverte('mayumba')
		} else if (isActive('/voyage-decouverte/oyem')) {
			setSelectedDecouverte('oyem')
		}
	}, [pathname])

	// Close the extended navbar panel automatically when the viewport
	// becomes smaller than the `sup-md` breakpoint. This prevents the
	// desktop dropdown panel from staying open when switching to mobile view.
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closePanel()
				if (isOpenDialog) {
					closeDialog()
				}
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (!isOpenDialog) return

			if (accountAreaRef.current && !accountAreaRef.current.contains(e.target as Node)) {
				closeDialog()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpenDialog])

	useEffect(() => {
		// Mark component as mounted (for client-only UI bits)
		setIsMounted(true)

		const SUP_LG_BREAKPOINT = 768

		const handleResize = () => {
			// If we're under the breakpoint value we close the panel
			if (window.innerWidth < SUP_LG_BREAKPOINT) {
				setActivePanel(null)
			}
		}

		// We check for the first render
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// Prevent scrolling when the panel is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const closePanel = () => setActivePanel(null)

	const handleNavClick = () => {
		closePanel()
	}

	const handleSwitchLanguageClick = (lng) => {
		let newPathUrl = pathname

		if (lng === 'fr') {
			newPathUrl = pathname.replace('/en', `/${lng}`)
		} else if (lng === 'en') {
			newPathUrl = pathname.replace('/fr', `/${lng}`)
		}

		router.replace(newPathUrl)
	}
	const togglePanel = (key: TPanelKey) => {
		setActivePanel((prev) => (prev === key ? null : key))
	}

	return (
		<header className='sticky top-0 z-50 flex h-[140px] flex-col items-center justify-between sup-md:px-0'>
			<section className='w-full'>
				<div className='flex h-[81px] items-center justify-between border-gray-100 border-b bg-white'>
					{/* Burger menu - open mobile menu */}
					<button
						className='ml-4 flex sup-md:hidden cursor-pointer flex-col'
						onClick={() => setIsMobileMenuOpen(true)}
						type='button'
					>
						<CiMenuBurger aria-label='Ouvrir le menu mobile' className='h-5 w-5' />
					</button>

					<Link
						aria-label='Se rendre a la page daccueil'
						className='flex items-center justify-center pl-0 sup-lg:pl-14 font-grayson sup-md:text-3xl sup-md:text-[33px] text-2xl text-greeny-100'
						href='/'
					>
						<Image
							alt='logo gabon decouverte'
							className='relative'
							height={60}
							priority
							src='/assets/images/logo.png'
							width={60}
						/>
						GABON DECOUVERTE
					</Link>

					<section className='relative flex items-center gap-5 pr-3.5 text-black' ref={accountAreaRef}>
						{/* Button that opens the small dialog / popover box */}
						<button
							aria-expanded={isOpenDialog}
							aria-haspopup='dialog'
							className='flex cursor-pointer items-center gap-2 rounded-md border border-gray-100 bg-white px-3 py-2 text-sm transition-all duration-300 ease-in-out hover:bg-gray-50'
							onClick={toggleDialog}
							type='button'
						>
							<SlUser className='h-4 w-4' />
						</button>

						{/* small dialog component / popover */}
						<AccountPopover
							isOpen={isOpenDialog}
							language={i18n.language}
							onClose={closeDialog}
							onNavClick={handleNavClick}
							onToggleLanguage={handleSwitchLanguageClick}
						/>

						{/* Basket icon */}
						<Link
							className='relative flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-gray-50'
							href='/panier'
							onClick={() => {
								closeDialog()
								handleNavClick()
							}}
						>
							<div className='relative flex items-center gap-2'>
								<div className='relative flex items-center justify-center'>
									<SlBasket className='h-[15px] w-[15px]' />
									{isMounted && basketLength > 0 && (
										<span className='-right-1.5 -top-1.5 absolute flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-red-600 px-0.5 font-caviarDreams-bold text-[8px] text-white leading-none shadow-sm'>
											{basketLength}
										</span>
									)}
								</div>

								<span className='sup-md:block hidden'>{t('cart')}</span>
							</div>
						</Link>
					</section>
				</div>
			</section>

			<section className='after:-bottom-14 -top-0.5 relative z-50 sup-md:flex hidden h-24 w-full items-center justify-between bg-white after:pointer-events-none after:absolute after:right-0 after:left-0 after:h-14 after:bg-linear-to-b after:from-white after:to-transparent'>
				<nav aria-label='Navigation principale'>
					<ul className='flex items-center pl-14'>
						<Link
							className={twMerge('mr-5 font-caviarDreams text-black text-lg uppercase')}
							href='/'
							onClick={handleNavClick}
						>
							{t('navbar.home')}
						</Link>
						<li className='flex items-center justify-center gap-2'>
							<button
								aria-controls='navbar-extended-panel'
								aria-expanded={isOpen && activePanel === 'activité'}
								className={twMerge(
									'mr-5 flex cursor-pointer items-center gap-2 font-caviarDreams text-black text-lg uppercase duration-300',
									isOpen && activePanel === 'activité' ? 'text-black' : ''
								)}
								onClick={() => togglePanel('activité')}
								type='button'
							>
								{t('navbar.activities')}

								<motion.div
									animate={{ rotate: activePanel === 'activité' ? 180 : 0 }}
									transition={{ duration: 0.25 }}
								>
									<BsChevronCompactDown />
								</motion.div>
							</button>
						</li>
						<li className='flex items-center justify-center gap-2'>
							<button
								aria-controls='navbar-extended-panel'
								aria-expanded={isOpen && activePanel === 'decouverte'}
								className={twMerge(
									'mr-5 flex cursor-pointer items-center gap-2 font-caviarDreams text-black text-lg uppercase duration-300',
									isOpen && activePanel === 'decouverte' ? 'text-black' : ''
								)}
								onClick={() => togglePanel('decouverte')}
								type='button'
							>
								{t('navbar.discovery')}

								<motion.div
									animate={{ rotate: activePanel === 'decouverte' ? 180 : 0 }}
									transition={{ duration: 0.25 }}
								>
									<BsChevronCompactDown />
								</motion.div>
							</button>
						</li>

						<Link
							className={twMerge('mr-5 font-caviarDreams text-black text-lg uppercase')}
							href='/contact'
							onClick={handleNavClick}
						>
							Contact
						</Link>
					</ul>
				</nav>
			</section>

			{/* Expandable panel that opens below the navbar */}
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						animate={{ height: 'calc(100vh - 132px)', opacity: 1 }}
						className='fixed top-33 z-60 flex w-full overflow-hidden bg-white'
						exit={{ height: 0, opacity: 0 }}
						id='navbar-extended-panel'
						initial={{ height: 0, opacity: 0 }}
						key='extended-wrapper'
						transition={{
							duration: 0.65,
							ease: [0.25, 0.1, 0.25, 1],
							opacity: { duration: 0.25 }
						}}
					>
						<AnimatePresence initial={false} mode='wait'>
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className='flex w-full'
								exit={{ opacity: 0, y: -8 }}
								initial={{ opacity: 0, y: 8 }}
								key={activePanel}
								transition={{ duration: 0.25 }}
							>
								{activePanel === 'activité' ? (
									<>
										<div className='flex w-[30%] flex-col gap-14 px-4 sup-md:px-12 py-4'>
											<ul className='flex flex-col gap-4'>
												<li>
													<Link
														className={twJoin(
															panelLinkClass('/activité/art-et-culture'),
															'text-lg'
														)}
														href={{
															pathname: '/activite',
															query: { type: 'art-et-culture' }
														}}
														onClick={handleNavClick}
														onFocus={() => setSelectedActivite('art')}
														onMouseEnter={() => setSelectedActivite('art')}
													>
														Art & culture
													</Link>
												</li>
												<li>
													<Link
														className={twJoin(
															panelLinkClass('/activité/ecotourisme-et-balneaire'),
															'text-lg'
														)}
														href={{
															pathname: '/activite',
															query: { type: 'ecotourisme-et-balneaire' }
														}}
														onClick={handleNavClick}
														onFocus={() => setSelectedActivite('eco')}
														onMouseEnter={() => setSelectedActivite('eco')}
													>
														{t('navbar.ecotourismSeaside')}
													</Link>
												</li>
												<li>
													<Link
														className={twJoin(
															panelLinkClass('/activité/nature-et-decouverte'),
															'text-lg'
														)}
														href={{
															pathname: '/activite',
															query: { type: 'nature-et-decouverte' }
														}}
														onClick={handleNavClick}
														onFocus={() => setSelectedActivite('nature')}
														onMouseEnter={() => setSelectedActivite('nature')}
													>
														{t('navbar.natureDiscovery')}
													</Link>
												</li>
											</ul>

											<Link
												className='flex cursor-pointer justify-center rounded-sm bg-greeny-100 p-3 font-caviarDreams-bold text-base text-white uppercase transition-all duration-400 ease-in-out hover:bg-greeny-50'
												href={{
													pathname: '/activite',
													query: { type: 'toutes-nos-activites' }
												}}
												onClick={handleNavClick}
												onFocus={() => setSelectedActivite('nature')}
												onMouseEnter={() => setSelectedActivite('nature')}
												type='button'
											>
												{t('button.discoverOurActivities')}
											</Link>
										</div>
										<div className='relative w-full'>
											{selectedActivite ? (
												<div className='relative h-full w-full overflow-hidden'>
													<Image
														alt={activiteImageMap[selectedActivite].alt}
														className='object-cover'
														fill
														priority
														sizes='(max-width: 768px) 100vw, 70vw'
														src={activiteImageMap[selectedActivite].src}
													/>
												</div>
											) : (
												// Default image
												<div className='relative h-full w-full overflow-hidden'>
													<Image
														alt='Activités'
														className='object-cover'
														fill
														src='/assets/images/activites/art-culture.avif'
													/>
												</div>
											)}
										</div>
									</>
								) : (
									activePanel === 'decouverte' && (
										<>
											<div className='flex w-[30%] flex-col gap-14 px-4 sup-md:px-12 py-4'>
												<ul className='flex flex-col gap-4'>
													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/libreville'),
																'text-lg'
															)}
															href='/voyage-decouverte/libreville'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('libreville')}
															onMouseEnter={() => setSelectedDecouverte('libreville')}
														>
															{t('navbar.discoverLibreville')}
														</Link>
													</li>
													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/lambarene'),
																'text-lg'
															)}
															href='/voyage-decouverte/lambarene'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('lambarene')}
															onMouseEnter={() => setSelectedDecouverte('lambarene')}
														>
															{t('navbar.visitLambarene')}
														</Link>
													</li>

													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/mayumba'),
																'text-lg'
															)}
															href='/voyage-decouverte/mayumba'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('mayumba')}
															onMouseEnter={() => setSelectedDecouverte('mayumba')}
														>
															{t('navbar.exploreMayumba')}
														</Link>
													</li>
													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/oyem'),
																'text-lg'
															)}
															href='/voyage-decouverte/oyem'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('oyem')}
															onMouseEnter={() => setSelectedDecouverte('oyem')}
														>
															{t('navbar.exploreOyem')}
														</Link>
													</li>
												</ul>
											</div>
											<div className='w-full'>
												{selectedDecouverte ? (
													<div className='relative h-full w-full overflow-hidden'>
														<Image
															alt={decouverteImageMap[selectedDecouverte].alt}
															className='object-cover'
															fill
															priority
															sizes='(max-width: 768px) 100vw, 70vw'
															src={decouverteImageMap[selectedDecouverte].src}
														/>
													</div>
												) : (
													// Image par defaut.
													<div className='relative h-full w-full overflow-hidden'>
														<Image
															alt='Activités'
															className='object-cover'
															fill
															src='/assets/images/decouverte/africa.avif'
														/>
													</div>
												)}
											</div>
										</>
									)
								)}
							</motion.div>
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Drawer mobile part */}
			<MobileNavbarDrawer
				language={i18n.language}
				onOpenChange={setIsMobileMenuOpen}
				onToggleLanguage={handleSwitchLanguageClick}
				open={isMobileMenuOpen}
			/>
		</header>
	)
}
