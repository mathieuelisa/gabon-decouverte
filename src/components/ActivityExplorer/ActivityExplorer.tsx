'use client'

import type { Transition } from 'framer-motion'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { ACTVITY_MOCK_DATA } from '@/mocks/Activity'
import ActivityExplorerItem from './ActivityExplorerItem'

const OPTIONS = [
	{ id: 'art-et-culture', label: 'Art & culture' },
	{ id: 'ecotourisme-et-balneaire', label: 'Ecotourisme & balnéaire' },
	{ id: 'nature-et-decouverte', label: 'Nature & découverte' },
	{ id: 'toutes-nos-activites', label: 'Toutes nos activités' }
] as const
// Title text displayed for each activity category
const TITLES = {
	'art-et-culture': 'Explorez l’essence de l’art et de la culture à travers des expériences inspirantes.',
	'ecotourisme-et-balneaire': 'Entre nature préservée et rivages apaisants, vivez l’écotourisme autrement.',
	'nature-et-decouverte':
		'Entre nature préservée et aventures inattendues, vivez des moments de découverte inoubliables.',
	'toutes-nos-activites': 'Explorez toutes nos activités et voyages.'
}

export default function ActivityExplorer() {
	const searchParams = useSearchParams()
	const typeFromUrl = searchParams.get('type')
	const prefersReduced = useReducedMotion()

	// Valeur par défaut si aucun type dans l'URL
	const [activeLink, setActiveLink] = useState<string>(typeFromUrl ?? 'toutes-nos-activites')

	// Mise à jour du type sélectionné
	const handleSelectType = (type: string) => {
		setActiveLink(type)
	}

	// Styles de base des boutons
	const btnBase = 'relative min-w-[200px] px-1 py-2 rounded-4xl cursor-pointer select-none'
	const btnText = 'relative z-10'

	// Transition de la "pill" verte
	const pillTransition: Transition = prefersReduced
		? { duration: 0, type: 'tween' }
		: { damping: 40, mass: 0.3, stiffness: 500, type: 'spring' }

	// Items filtrés selon la catégorie active
	const items = useMemo(() => {
		if (!activeLink || activeLink === 'toutes-nos-activites') return ACTVITY_MOCK_DATA
		return ACTVITY_MOCK_DATA.filter((e) => e.type === activeLink)
	}, [activeLink])

	const currentTitle = TITLES[activeLink] ?? TITLES['toutes-nos-activites']

	return (
		<section className='my-10 sup-md:px-12'>
			{/* WRAPPER FILTRES : centré + responsive */}
			<div className='mx-auto flex w-full max-w-[960px] flex-col items-center px-4 sup-md:px-12'>
				{/* VERSION BOUTONS (desktop / sup-md et +) */}
				<div className='sup-lg:flex hidden w-full items-center justify-between gap-4'>
					{OPTIONS.map((opt) => (
						<button
							className={twJoin(
								btnBase,
								'flex-1 text-center',
								activeLink === opt.id ? 'text-white' : 'text-gray-700'
							)}
							key={opt.id}
							onClick={() => handleSelectType(opt.id)}
							type='button'
						>
							{activeLink === opt.id && (
								<motion.span
									className='absolute inset-0 rounded-4xl bg-greeny-100'
									layoutId='active-pill'
									transition={pillTransition}
								/>
							)}
							<span className={btnText}>{opt.label}</span>
						</button>
					))}
				</div>

				{/* VERSION MENU DÉROULANT (mobile / en dessous de sup-md) */}
				<div className='flex sup-lg:hidden w-full'>
					<select
						className='w-full rounded-4xl border border-gray-100 px-4 py-2 pr-8 text-sm'
						onChange={(e) => handleSelectType(e.target.value)}
						value={activeLink}
					>
						{OPTIONS.map((opt) => (
							<option key={opt.id} value={opt.id}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* CONTENU ANIMÉ */}
			<div className='mt-6 min-h-[120px] px-12'>
				<AnimatePresence mode='wait'>
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						initial={{ opacity: 0, y: 8 }}
						key={activeLink}
						transition={{ duration: 0.18 }}
					>
						<h3 className='mb-5 text-center sup-lg:text-start'>{currentTitle}</h3>

						<div className='grid grid-cols-1 sup-lg:grid-cols-3 sup-sm:grid-cols-2 sup-xl:grid-cols-4 gap-6'>
							{items.map((el) => (
								<motion.div
									className='transform-gpu will-change-transform'
									key={el.slug}
									transition={{ duration: 0.25, type: 'tween' }}
									whileHover={{ y: -8 }}
								>
									<Link className='flex justify-center' href={`/activite/${el.slug}`}>
										<ActivityExplorerItem
											description={el.short_description}
											imgSrc={el.img}
											rating={el.rating}
											slug={el.slug}
											title={el.title}
										/>
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	)
}
