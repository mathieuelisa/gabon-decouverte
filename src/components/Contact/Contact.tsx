'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export const Contactchema = z.object({
	email: z.string().email("L'email doit être valide").min(1, "L'email est requis"),
	firstname: z.string().min(1, 'Veuillez compléter le champ "Prénom"'),
	lastname: z.string().min(1, 'Veuillez compléter le champ "Nom"'),
	message: z.string().min(1, 'Veuillez compléter le champ "Message"'),
	phone: z.string().optional()
})

type ReservationSchemaType = z.infer<typeof Contactchema>

export default function Contact() {
	const [loading, setLoading] = useState(false)

	const notify = () =>
		toast.success('Votre message a bien été envoyé.', {
			autoClose: 4000,
			position: 'bottom-right'
		})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ReservationSchemaType>({
		defaultValues: {
			email: '',
			firstname: '',
			lastname: '',
			message: '',
			phone: ''
		},
		resolver: zodResolver(Contactchema)
	})

	const onSubmit = async (data) => {
		setLoading(true)
		try {
			const res = await fetch('/api/contact', {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})

			if (res.ok) {
				notify()
				reset() // We reset the form after successful submission
			} else {
				const error = await res.json()

				console.error('Erreur:', error.message || 'Erreur inconnue')
				toast.error("Une erreur est survenue lors de l'envoi. Veuillez réessayer.")
			}
		} catch (error) {
			console.error('Erreur inattendue :', error)
			toast.error('Une erreur inattendue est survenue.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className='relative z-10 mx-auto flex flex-col items-start justify-center gap-5 overflow-hidden p-5 sup-md:px-28 pt-0 sup-lg:pt-14 sup-md:pt-14'>
			<div className='relative z-10 flex w-full flex-col gap-5'>
				<h1 className='font-caviarDreams-bold sup-md:text-4xl text-2xl text-greeny-100'>
					UNE QUESTION ? UN BESOIN PARTICULIER ?
				</h1>
				<p className='sup-md:text-lg text-base'>
					Ce formulaire permet à nos equipes d’en savoir plus sur vos besoins et/ou désirs de voyages et
					d'activités.
				</p>

				<form
					className='flex min-h-[450px] w-full sup-md:flex-row flex-col-reverse items-center gap-7'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex sup-md:w-1/2 w-full flex-col gap-5'>
						<label className='sr-only' htmlFor='lastname'>
							Nom
						</label>
						<input
							id='lastname'
							{...register('lastname')}
							className={`h-11 rounded-sm border border-greeny-100 pl-2 text-sm placeholder:text-gray-600 ${
								errors.lastname && 'border-gray-400 placeholder:text-gray-200'
							}`}
							placeholder='Nom*'
							type='text'
						/>
						{errors.lastname && <span className='text-xs'>{errors.lastname?.message}</span>}
						<label className='sr-only' htmlFor='firstname'>
							Prenom
						</label>
						<input
							id='firstname'
							{...register('firstname')}
							className={`h-11 rounded-sm border border-greeny-100 pl-2 text-sm placeholder:text-gray-600 ${
								errors.lastname && 'border-gray-400 placeholder:text-gray-200'
							}`}
							placeholder='Prénom*'
							type='text'
						/>
						{errors.firstname && <span className='text-xs'>{errors.firstname?.message}</span>}
						<label className='sr-only' htmlFor='email'>
							Email
						</label>
						<input
							id='email'
							{...register('email')}
							className={`h-11 rounded-sm border border-greeny-100 pl-2 text-sm placeholder:text-gray-600 ${
								errors.email && 'border-gray-400 placeholder:text-gray-200'
							}`}
							placeholder='Email*'
							type='email'
						/>
						{errors.email && <span className='text-xs'>{errors.email?.message}</span>}
						<label className='sr-only' htmlFor='phone'>
							Telephone
						</label>
						<input
							id='phone'
							{...register('phone')}
							className={`h-11 rounded-sm border border-greeny-100 pl-2 text-sm placeholder:text-gray-600 ${
								errors.phone && 'border-gray-400 placeholder:text-gray-200'
							}`}
							placeholder='Téléphone'
							type='phone'
						/>
						{errors.phone && <span className='text-xs'>{errors.phone?.message}</span>}

						<div className='mt-4'>
							<button
								className={twMerge(
									'w-full transform rounded-sm bg-greeny-100 px-6 py-2 font-caviarDreams-bold text-base text-white transition duration-500 ease-in-out hover:bg-greeny-50',
									loading
										? 'cursor-not-allowed border border-gray-100 opacity-50'
										: 'cursor-pointer border border-gray-100 text-white'
								)}
								disabled={loading}
								type='submit'
							>
								{loading ? 'Chargement' : 'ENVOYER'}
							</button>
						</div>
					</div>
					<div className='calendar-container sup-md:w-1/2 w-full'>
						<label className='sr-only' htmlFor='email'>
							Message
						</label>
						<textarea
							id='message'
							{...register('message')}
							className={`min-h-[310px] w-full rounded-sm border border-greeny-100 border-b p-4 text-sm placeholder:text-gray-600 ${
								errors.message && 'border-red-500-50 placeholder:text-gray-200'
							}`}
							placeholder='Message*'
						/>
						{errors.message && <span className='text-xs'>{errors.message?.message}</span>}
					</div>
				</form>
				<small className='flex w-full justify-end'>* Champs requis</small>
				<ToastContainer />
			</div>
		</section>
	)
}
