'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { useTranslation } from '@/app/i18n/client'

export default function AboutUs() {
	const { t } = useTranslation() as { t: (key: string) => string }

	const targetRef = useRef(null)

	const { scrollYProgress } = useScroll({
		offset: ['start 80%', 'end 40%'],
		target: targetRef
	})

	const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

	return (
		<section className='flex min-h-[600px] items-center px-5 sup-md:px-40 text-center font-caviarDreams-bold'>
			<h2 className='font-caviarDreams sup-md:text-4xl text-2xl text-greeny-100'>
				{t('landing.discoverGabon')}
				<br />
				<br /> {t('landing.diveIntoTurquoiseWater')}
				<br />
				<br /> {t('words.here')}
				<span className='relative inline-block' ref={targetRef}>
					{t('landing.becomeAdventure')}
					<motion.span
						className='-bottom-1 absolute left-0 sup-lg:block hidden h-px w-full origin-left bg-greeny-100'
						style={{ scaleX }}
					/>
				</span>
			</h2>
		</section>
	)
}
