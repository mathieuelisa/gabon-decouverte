'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'
import { CiMenuBurger } from 'react-icons/ci'
import { SlUser } from 'react-icons/sl'
import { VscClose } from 'react-icons/vsc'
import { twJoin, twMerge } from 'tailwind-merge'

import { useMobileMenu } from '@/contexts/MobileMenuContext'
import i18n from '@/i18n'
import type { TActiviteKey, TDecouverteKey, TPanelKey } from '@/types/common'
import { NAVBAR_CONTENT } from './Navbar.data'

export default function Navbar() {
	const { t } = useTranslation()
	const [language, setLanguage] = useState('fr')
	const [activePanel, setActivePanel] = useState<TPanelKey | null>(null)
	const [selectedActivite, setSelectedActivite] = useState<TActiviteKey | null>(null)
	const [selectedDecouverte, setSelectedDecouverte] = useState<TDecouverteKey | null>(null)

	// Images de couverture pour activité part
	const activiteImageMap: Record<TActiviteKey, { src: string; alt: string }> = {
		art: {
			alt: 'Art & culture au Gabon',
			src: '/assets/images/activites/art-culture.jpg'
		},
		eco: {
			alt: 'Ecotourisme & balnéaire au Gabon',
			src: '/assets/images/activites/ecotourisme-balneaire.jpg'
		},
		nature: {
			alt: 'Nature & Découverte au Gabon',
			src: '/assets/images/activites/nature-decouverte.jpg'
		}
	}

	// Images de couverture pour decouverte part
	const decouverteImageMap: Record<TDecouverteKey, { src: string; alt: string }> = {
		lambarene: {
			alt: 'Ecotourisme & balnéaire au Gabon',
			src: '/assets/images/activites/ecotourisme-balneaire.jpg'
		},
		libreville: {
			alt: 'Art & culture au Gabon',
			src: '/assets/images/activites/art-culture.jpg'
		},
		mayumba: {
			alt: 'Nature & Découverte au Gabon',
			src: '/assets/images/activites/nature-decouverte.jpg'
		},
		oyem: {
			alt: 'Nature & Découverte au Gabon',
			src: '/assets/images/activites/nature-decouverte.jpg'
		}
	}

	const pathname = usePathname()

	const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

	const panelLinkClass = (href: string) => twMerge('text-black text-sm', isActive(href) && 'text-red-500')

	const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useMobileMenu()

	const isOpen = activePanel !== null

	const closePanel = () => setActivePanel(null)

	const handleNavClick = () => {
		closePanel()
		setMobileMenuOpen(false)
	}

	const togglePanel = (key: TPanelKey) => {
		setActivePanel((prev) => (prev === key ? null : key))
	}

	// useEffect(() => {
	// 	i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
	// }, [])
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closePanel()
		}

		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [])

	useEffect(() => {
		// --- Activités ---
		if (isActive('/activité/art-et-culture')) {
			setSelectedActivite('art')
		} else if (isActive('/activité/ecotourisme-et-balneaire')) {
			setSelectedActivite('eco')
		} else if (isActive('/activité/nature-et-decouverte')) {
			setSelectedActivite('nature')
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

	return (
		<header className='sticky top-0 z-50 flex h-[177px] flex-col items-center justify-between sup-md:px-0 pl-4'>
			<section className='w-full'>
				<div className='flex h-[81px] items-center justify-between border-gray-200 border-b sup-md:px-14'>
					<Link
						aria-label='Se rendre a la page daccueil'
						className='ml-5 flex items-center justify-center font-display sup-md:text-3xl text-2xl'
						href='/public'
						onClick={() => setMobileMenuOpen(false)}
					>
						GABON DECOUVERTE
					</Link>

					<section className='flex w-2xs items-center justify-center gap-4'>
						<SlUser />
						<p>{t('common:login')}</p>
						<button
							onClick={() => {
								i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr').then(() => {
									setLanguage(i18n.language)
								})
							}}
							type='button'
						>
							change langue {language}
						</button>
					</section>
				</div>
			</section>

			<section className='pl- sticky top-0 z-50 flex h-24 w-full items-center justify-between bg-white sup-md:px-14'>
				<nav aria-label='Navigation principale'>
					<ul className='flex items-center'>
						{NAVBAR_CONTENT.map((item) => {
							return (
								<Link
									className={twMerge(
										'ml-5 font-display text-black text-sm uppercase transition-all duration-500 ease-in-out'
									)}
									href={item.link}
									key={item.label}
									onClick={handleNavClick}
								>
									{item.label}
								</Link>
							)
						})}
						<li className='flex items-center justify-center gap-2'>
							<button
								aria-controls='navbar-extended-panel'
								aria-expanded={isOpen && activePanel === 'activité'}
								className={twMerge(
									'ml-5 flex cursor-pointer items-center gap-2 font-display text-black text-sm uppercase duration-300',
									isOpen && activePanel === 'activité' ? 'text-black' : ''
								)}
								onClick={() => togglePanel('activité')}
								type='button'
							>
								Activités
								{activePanel === 'activité' ? <BsChevronCompactDown /> : <BsChevronCompactUp />}
							</button>
						</li>
						<li className='flex items-center justify-center gap-2'>
							<button
								aria-controls='navbar-extended-panel'
								aria-expanded={isOpen && activePanel === 'decouverte'}
								className={twMerge(
									'ml-5 flex cursor-pointer items-center gap-2 font-display text-black text-sm uppercase duration-300',
									isOpen && activePanel === 'decouverte' ? 'text-black' : ''
								)}
								onClick={() => togglePanel('decouverte')}
								type='button'
							>
								Découvrir
								{activePanel === 'decouverte' ? <BsChevronCompactDown /> : <BsChevronCompactUp />}
							</button>
						</li>

						<Link
							className={twMerge('ml-5 font-display text-black text-sm uppercase')}
							href='/contact'
							onClick={handleNavClick}
						>
							Contact
						</Link>
					</ul>
				</nav>

				<nav className='flex sup-md:hidden flex-col'>
					{isMobileMenuOpen ? (
						<button
							aria-label='Fermer le menu mobile'
							className='flex'
							onClick={toggleMobileMenu}
							type='button'
						>
							<VscClose />
						</button>
					) : (
						<CiMenuBurger aria-label='Ouvrir le menu mobile' onClick={toggleMobileMenu} />
					)}
				</nav>
			</section>

			{/* Panneau extensible qui s'ouvre EN DESSOUS de la navbar */}
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						animate={{ height: 'calc(100vh - 177px)', opacity: 1 }}
						className='fixed top-41 z-60 flex w-full overflow-hidden rounded-b-2xl bg-white'
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
										<div className='w-[30%] border-red-500 border-r px-4 sup-md:px-14 py-4'>
											<ul className='flex flex-col gap-4'>
												<li>
													<Link
														className={twJoin(
															panelLinkClass('/activité/art-et-culture'),
															'hover:font-bold'
														)}
														href='/activité/art-et-culture'
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
															'hover:font-bold'
														)}
														href='/activité/ecotourisme-et-balneaire'
														onClick={handleNavClick}
														onFocus={() => setSelectedActivite('eco')}
														onMouseEnter={() => setSelectedActivite('eco')}
													>
														Ecotourisme & balnéaire
													</Link>
												</li>
												<li>
													<Link
														className={twJoin(
															panelLinkClass('/activité/nature-et-decouverte'),
															'hover:font-bold'
														)}
														href='/activité/nature-et-decouverte'
														onClick={handleNavClick}
														onFocus={() => setSelectedActivite('nature')}
														onMouseEnter={() => setSelectedActivite('nature')}
													>
														Nature & Découverte
													</Link>
												</li>
											</ul>
										</div>
										<div className='relative w-full bg-amber-200 sup-md:px-14'>
											{selectedActivite ? (
												<div className='relative h-full sup-md:h-[420px] w-full overflow-hidden rounded-xl'>
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
												// Image par defaut
												<div className='relative h-full sup-md:h-[420px] w-full overflow-hidden rounded-xl'>
													<Image
														alt='Activités'
														className='object-cover'
														fill
														src='/assets/images/activites/art-culture.jpg'
													/>
												</div>
											)}

											<button
												className='absolute bottom-56 cursor-pointer bg-black px-7 py-2 font-bold font-display text-white transition-all duration-400 ease-in-out hover:bg-shark-800'
												type='button'
											>
												DECOUVRIR NOS ACTIVITES
											</button>
										</div>
									</>
								) : (
									activePanel === 'decouverte' && (
										<>
											<div className='w-[30%] border-red-500 border-r px-4 sup-md:px-14 py-4'>
												<ul className='flex flex-col gap-4'>
													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/libreville'),
																'hover:font-bold'
															)}
															href='/voyage-decouverte/libreville'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('libreville')}
															onMouseEnter={() => setSelectedDecouverte('libreville')}
														>
															Partir à la découverte de libreville
														</Link>
													</li>
													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/lambarene'),
																'hover:font-bold'
															)}
															href='/voyage-decouverte/lambarene'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('lambarene')}
															onMouseEnter={() => setSelectedDecouverte('lambarene')}
														>
															Visitez Lambaréné, le cœur battant du Gabon
														</Link>
													</li>

													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/mayumba'),
																'hover:font-bold'
															)}
															href='/voyage-decouverte/mayumba'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('mayumba')}
															onMouseEnter={() => setSelectedDecouverte('mayumba')}
														>
															Explorez Mayumba, un joyau du Gabon
														</Link>
													</li>
													<li>
														<Link
															className={twJoin(
																panelLinkClass('/voyage-decouverte/oyem'),
																'hover:font-bold'
															)}
															href='/voyage-decouverte/oyem'
															onClick={handleNavClick}
															onFocus={() => setSelectedDecouverte('oyem')}
															onMouseEnter={() => setSelectedDecouverte('oyem')}
														>
															À la découverte de Oyem, entre traditions et modernité
														</Link>
													</li>
												</ul>
											</div>
											<div className='w-full bg-red-200 px-4 sup-md:px-14 py-4'>
												{selectedDecouverte ? (
													<div className='relative h-full sup-md:h-[420px] w-full overflow-hidden rounded-xl'>
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
													// Image par defaut
													<div className='relative h-full sup-md:h-[420px] w-full overflow-hidden rounded-xl'>
														<Image
															alt='Activités'
															className='object-cover'
															fill
															src='/assets/images/activites/art-culture.jpg'
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
		</header>
	)
}
