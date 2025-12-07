'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { FOOTER_DESTINATION_CONTENT, FOOTER_LEGALES_INFORMATIONS_CONTENT } from './Footer.data'

export default function Footer() {
	const [_, setEmailNewsletter] = useState('')
	const handleSubmit = () => {
		// console.log('submit')
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailNewsletter(e.target.value)
	}

	const loading = false

	return (
		<section className='bg-greeny-100'>
			<div className='flex items-center'>
				<div className='h-px w-full bg-white opacity-20' />
				<div className='flex w-[740px] flex-col items-center pt-10'>
					<Image
						alt='logo_background'
						className='opacity-50'
						height={100}
						priority
						src='/assets/images/logo_grey.png'
						width={100}
					/>
					<h2 className='font-caviarDreams sup-md:text-xl text-lg text-white opacity-60'>GABON DECOUVERTE</h2>
				</div>
				<div className='h-px w-full bg-white opacity-20' />
			</div>

			<section className='mt-14 flex sup-lg:flex-row flex-col sup-lg:items-start items-center justify-between gap-16 sup-md:px-40'>
				{/* Deux blocks footer */}
				<div className='flex gap-16'>
					<div className='text-center'>
						<h3 className='mb-6 font-caviarDreams text-lg text-white uppercase'>
							{FOOTER_DESTINATION_CONTENT.title}
						</h3>
						<ul>
							{FOOTER_DESTINATION_CONTENT.links.map((element) => (
								<li className='mb-2' key={element.title}>
									<Link
										className='font-caviarDreams sup-md:text-base text-sm text-white transition-all duration-300 ease-in-out hover:scale-[1.03] hover:opacity-80'
										href={element.href}
									>
										{element.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='text-center'>
						<h3 className='mb-6 font-caviarDreams text-lg text-white uppercase'>
							{FOOTER_LEGALES_INFORMATIONS_CONTENT.title}
						</h3>
						<ul>
							{FOOTER_LEGALES_INFORMATIONS_CONTENT.links.map((element) => (
								<li className='mb-2' key={element.title}>
									<Link
										className='font-caviarDreams sup-md:text-base text-sm text-white transition-all duration-300 ease-in-out hover:scale-[1.03] hover:opacity-80'
										href={element.href}
									>
										{element.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* blcok Fomulaire */}
				<div className='flex min-w-[350px] max-w-[400px] flex-col text-white'>
					<label className='mb-6 text-center font-caviarDreams text-lg uppercase' htmlFor='newsletter'>
						Newsletter
					</label>
					<p className='mb-3 text-center sup-md:text-base text-sm'>
						En saisissant votre adresse e-mail ci-dessous, vous acceptez de recevoir notre newsletter.
					</p>

					<form className='flex items-end gap-2' id='newsletter' onSubmit={handleSubmit}>
						<input
							aria-label='Recevoir la newsletter'
							className='w-full max-w-xs rounded border border-white px-3 py-2 text-sm placeholder:text-xs'
							id='email'
							onChange={handleEmailChange}
							placeholder='Votre adresse email'
							type='text'
						/>
						<button
							className={twMerge(
								'min-w-32 cursor-pointer rounded px-4 py-2',
								loading
									? 'bg-white text-black opacity-60'
									: 'min-w-32 cursor-pointer rounded bg-white p-2 text-greeny-100 hover:bg-white'
							)}
							disabled={loading}
							type='submit'
						>
							{loading ? 'En cours' : 'SOUSCRIRE'}
						</button>
					</form>
				</div>
			</section>

			<small className='mt-14 block pb-5 text-center text-white text-xs'>
				Site créé par{' '}
				<Link
					className='decoration font-medium transition hover:decoration-from-font focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
					href='mailto:mathieu.elisa@gmail.com?subject=Demande de renseignements'
				>
					Mathieu ELISA{' '}
				</Link>
				- Tous Droits réservés
				<br />
				Copyright © 2025
			</small>
		</section>
	)
}
