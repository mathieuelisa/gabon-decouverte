'use client'

import type { Transition } from 'framer-motion'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'

export default function ActivityExplorer() {
	const searchParams = useSearchParams()
	const type = searchParams.get('type')
	const prefersReduced = useReducedMotion()

	const [activeLink, setActiveLink] = useState(type)

	// console.log('type', type)

	const handleSelectType = (type: string) => {
		setActiveLink(type)
	}

	// console.log('activeLink: ', activeLink)

	// const activeClass = 'rounded-4xl bg-greeny-100 px-4 text-white'

	const btnBase = 'relative min-w-[200px] px-1 py-2 rounded-4xl cursor-pointer text-sm md:text-base select-none'
	const btnText = 'relative z-10'

	const pillTransition: Transition = prefersReduced
		? { duration: 0, type: 'tween' }
		: { damping: 40, mass: 0.3, stiffness: 500, type: 'spring' }

	return (
		<section className='h-screen sup-md:px-12'>
			<div className='flex w-[460px] justify-between rounded-4xl border border-gray-300 px-2'>
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
			<div className='mt-6 min-h-[120px]'>
				<AnimatePresence mode='wait'>
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						initial={{ opacity: 0, y: 8 }}
						key={activeLink}
						transition={prefersReduced ? { duration: 0 } : { duration: 0.18 }}
					>
						{activeLink === 'art-et-culture' && <div>Contenu Art & culture</div>}
						{activeLink === 'ecotourisme-et-balneaire' && <div>Contenu Écotourisme & balnéaire</div>}
						{activeLink === 'nature-et-decouverte' && <div>Contenu Nature & découverte</div>}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	)
}
