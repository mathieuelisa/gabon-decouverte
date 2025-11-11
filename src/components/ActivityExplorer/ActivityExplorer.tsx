'use client'

import type { Transition } from 'framer-motion'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { twJoin } from 'tailwind-merge'

import { ACTVITY_MOCK_DATA } from '@/mocks/Activity'
import ActivityExplorerItem from './ActivityExplorerItem'

export default function ActivityExplorer() {
	const searchParams = useSearchParams()
	const type = searchParams.get('type')
	const prefersReduced = useReducedMotion()

	const [activeLink, setActiveLink] = useState(type)

	// Function to update the currently selected activity type
	const handleSelectType = (type: string) => {
		setActiveLink(type)
	}

	// Base styles for the category buttons of the filter
	const btnBase = 'relative min-w-[200px] px-1 py-2 rounded-4xl cursor-pointer select-none'
	const btnText = 'relative z-10'

	// Animation settings for the active "pill" (the green highlight behind the selected button)
	// If the user prefers reduced motion (accessibility setting), use a simple tween instead of a spring
	const pillTransition: Transition = prefersReduced
		? { duration: 0, type: 'tween' }
		: { damping: 40, mass: 0.3, stiffness: 500, type: 'spring' }

	// Title text displayed for each activity category
	const TITLES = {
		'art-et-culture': 'Explorez l’essence de l’art et de la culture à travers des expériences inspirantes.',
		'ecotourisme-et-balneaire': 'Entre nature préservée et rivages apaisants, vivez l’écotourisme autrement.',
		'nature-et-decouverte':
			'Entre nature préservée et aventures inattendues, vivez des moments de découverte inoubliables.'
	}

	// Filtered list of activities based on the currently selected category.
	// useMemo prevents re-filtering on every render unless dependencies change
	const items = useMemo(() => ACTVITY_MOCK_DATA.filter((e) => e.type === activeLink), [ACTVITY_MOCK_DATA, activeLink])

	return (
		<section className='mb-10 sup-md:px-12'>
			<div className='flex w-[460px] justify-between px-2'>
				<button
					className={twJoin(btnBase, activeLink === 'art-et-culture' && 'text-white')}
					onClick={() => handleSelectType('art-et-culture')}
					type='button'
				>
					{activeLink === 'art-et-culture' && (
						<motion.span
							className='absolute inset-0 rounded-4xl bg-greeny-100'
							layoutId='active-pill'
							transition={pillTransition}
						/>
					)}
					<span className={btnText}>Art & culture</span>
				</button>
				{/* Bouton 2 */}
				<button
					className={twJoin(
						btnBase,
						activeLink === 'ecotourisme-et-balneaire' ? 'text-white' : 'text-gray-700'
					)}
					onClick={() => handleSelectType('ecotourisme-et-balneaire')}
					type='button'
				>
					{activeLink === 'ecotourisme-et-balneaire' && (
						<motion.span
							className='absolute inset-0 rounded-4xl bg-greeny-100'
							layoutId='active-pill'
							transition={pillTransition}
						/>
					)}
					<span className={btnText}>Ecotourisme & balnéaire</span>
				</button>
				{/* Bouton 3 */}
				<button
					className={twJoin(btnBase, activeLink === 'nature-et-decouverte' ? 'text-white' : 'text-gray-700')}
					onClick={() => handleSelectType('nature-et-decouverte')}
					type='button'
				>
					{activeLink === 'nature-et-decouverte' && (
						<motion.span
							className='absolute inset-0 rounded-4xl bg-greeny-100'
							layoutId='active-pill'
							transition={pillTransition}
						/>
					)}
					<span className={btnText}>Nature & découverte</span>
				</button>
			</div>

			{/* Contenu animé */}
			<div className='mt-6 min-h-[120px] px-12'>
				<AnimatePresence mode='wait'>
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						initial={{ opacity: 0, y: 8 }}
						key={activeLink}
						transition={{ duration: 0.18 }}
					>
						<h3 className='mb-5'>{TITLES[activeLink]}</h3>

						<div className='grid grid-cols-1 sup-lg:grid-cols-3 sup-sm:grid-cols-2 sup-xl:grid-cols-4 gap-6'>
							{items.map((el) => (
								<motion.div
									className='transform-gpu will-change-transform'
									key={el.slug}
									transition={{ duration: 0.25, type: 'tween' }}
									whileHover={{ y: -8 }}
								>
									<Link className='flex justify-center' href={`/activity/${el.slug}`}>
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
			<ToastContainer
				autoClose={2000}
				hideProgressBar={true}
				icon={false}
				toastStyle={{
					borderRadius: '10px',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
					color: '#121212'
				}}
			/>
		</section>
	)
}
