'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useState } from 'react'
import type { FieldError } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { LuCircleAlert, LuLoader, LuSend } from 'react-icons/lu'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

const Contactchema = z.object({
	email: z.string().email("L'email doit être valide").min(1, "L'email est requis"),
	firstname: z.string().min(1, 'Veuillez compléter le champ "Prénom"'),
	lastname: z.string().min(1, 'Veuillez compléter le champ "Nom"'),
	message: z.string().min(1, 'Veuillez compléter le champ "Message"'),
	phone: z.string().optional()
})

type ReservationSchemaType = z.infer<typeof Contactchema>

const fieldClassName = (hasError?: boolean) =>
	twMerge(
		'w-full rounded-xl border bg-white px-4 py-2.5 font-caviarDreams text-shark-900 text-sm transition-colors duration-200 placeholder:text-shark-400 focus:outline-none focus:ring-2',
		hasError
			? 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
			: 'border-shark-200 focus:border-greeny-100 focus:ring-greeny-100/15'
	)

type TFormFieldProps = {
	label: string
	htmlFor: string
	error?: FieldError
	hint?: string
	className?: string
	children: ReactNode
}

function FormField({ label, htmlFor, error, hint, className, children }: TFormFieldProps) {
	return (
		<div className={twMerge('flex flex-col gap-1.5', className)}>
			<label className='font-caviarDreams-bold text-shark-700 text-sm' htmlFor={htmlFor}>
				{label}
				{hint && <span className='ml-1.5 font-caviarDreams font-normal text-shark-400 text-xs'>{hint}</span>}
			</label>

			{children}

			{error && (
				<span className='flex items-center gap-1.5 font-caviarDreams text-red-600 text-xs'>
					<LuCircleAlert className='h-3.5 w-3.5 shrink-0' />
					{error.message}
				</span>
			)}
		</div>
	)
}

export default function Contact() {
	const [loading, setLoading] = useState(false)

	const notify = () =>
		toast.success('Votre message a bien été envoyé.', {
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

	const onSubmit = async (data: ReservationSchemaType) => {
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
		<main className='relative z-10 mx-auto flex flex-col items-start justify-center gap-5 overflow-hidden p-5 sup-md:px-28 pt-0 sup-lg:pt-14 sup-md:pt-14'>
			<section className='relative z-10 flex w-full flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					<h1 className='font-caviarDreams-bold sup-md:text-4xl text-2xl text-greeny-100'>
						UNE QUESTION ? UN BESOIN PARTICULIER ?
					</h1>
					<p className='font-caviarDreams sup-md:text-lg text-base text-shark-500'>
						Ce formulaire permet à nos équipes d’en savoir plus sur vos besoins et/ou désirs de voyages et
						d'activités.
					</p>
				</div>

				<form
					className='w-full rounded-3xl border border-shark-100 bg-white p-6 sup-md:p-10 shadow-sm'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='grid grid-cols-1 sup-md:grid-cols-2 gap-6 sup-md:gap-10'>
						{/* Colonne 1 : coordonnées */}
						<div className='flex flex-col gap-5'>
							<div className='grid grid-cols-1 sup-sm:grid-cols-2 gap-5'>
								<FormField error={errors.firstname} htmlFor='firstname' label='Prénom'>
									<input
										className={fieldClassName(!!errors.firstname)}
										id='firstname'
										placeholder='Votre prénom'
										type='text'
										{...register('firstname')}
									/>
								</FormField>

								<FormField error={errors.lastname} htmlFor='lastname' label='Nom'>
									<input
										className={fieldClassName(!!errors.lastname)}
										id='lastname'
										placeholder='Votre nom'
										type='text'
										{...register('lastname')}
									/>
								</FormField>
							</div>

							<FormField error={errors.email} htmlFor='email' label='Email'>
								<input
									className={fieldClassName(!!errors.email)}
									id='email'
									placeholder='vous@exemple.com'
									type='email'
									{...register('email')}
								/>
							</FormField>

							<FormField error={errors.phone} hint='(optionnel)' htmlFor='phone' label='Téléphone'>
								<input
									className={fieldClassName(!!errors.phone)}
									id='phone'
									placeholder='+33 00 00 00 00'
									type='tel'
									{...register('phone')}
								/>
							</FormField>
						</div>

						{/* Colonne 2 : message */}
						<FormField className='sup-md:h-full' error={errors.message} htmlFor='message' label='Message'>
							<textarea
								className={twMerge(
									fieldClassName(!!errors.message),
									'min-h-[220px] sup-md:min-h-0 flex-1 resize-none'
								)}
								id='message'
								placeholder='Décrivez-nous votre projet, vos envies de voyage ou votre question...'
								{...register('message')}
							/>
						</FormField>
					</div>

					<div className='mt-8 flex sup-sm:flex-row flex-col-reverse items-center sup-sm:justify-between gap-4 border-shark-100 border-t pt-6'>
						<p className='font-caviarDreams text-shark-800 text-xs'>* Champs requis</p>

						<button
							className={twMerge(
								'group flex sup-sm:w-auto w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-greeny-100 px-8 py-3 font-caviarDreams-bold text-sm text-white transition-all duration-300 ease-in-out hover:bg-greeny-50',
								loading && 'cursor-not-allowed opacity-70 hover:bg-greeny-100'
							)}
							disabled={loading}
							type='submit'
						>
							{loading ? (
								<>
									<LuLoader className='h-4 w-4 animate-spin' />
									Envoi en cours
								</>
							) : (
								<>
									ENVOYER LE MESSAGE
									<LuSend className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
								</>
							)}
						</button>
					</div>
				</form>
			</section>
		</main>
	)
}
