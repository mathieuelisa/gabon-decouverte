'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AboutUs() {
	const targetRef = useRef(null)

	const { scrollYProgress } = useScroll({
		offset: ['start 80%', 'end 40%'],
		target: targetRef
	})

	const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

	return (
		<section className='flex min-h-[600px] items-center px-5 sup-md:px-40 text-center font-caviarDreams-bold'>
			<h2 className='font-caviarDreams text-4xl text-greeny-100'>
				Découvrez le Gabon autrement.
				<br />
				<br /> Plongez dans ses eaux turquoise, goûtez à sa cuisine vibrante, explorez ses galeries et
				rencontrez ceux qui font battre le cœur du pays.
				<br />
				<br /> Ici,
				<span className='relative inline-block' ref={targetRef}>
					chaque rencontre devient une aventure.
					<motion.span
						className='-bottom-1 absolute left-0 sup-lg:block hidden h-px w-full origin-left bg-greeny-100'
						style={{ scaleX }}
					/>
				</span>
			</h2>
		</section>
	)
}
