'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { LuMapPin } from 'react-icons/lu'
import { TbClockHour7 } from 'react-icons/tb'
import { ToastContainer, toast } from 'react-toastify'

import { ACTVITY_MOCK_DATA } from '@/mocks/Activity'
import { useBasketAtom } from '@/stores/useBasket.atom'
import ActivityExplorerItem from '../ActivityExplorer/ActivityExplorerItem'
import Counter from '../Counter'
import { Calendar } from '../ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

export default function ActivityDetails() {
	const { id } = useParams()

	const [open, setOpen] = useState(false)
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [participate, setParticipate] = useState(1)
	const [basket, setBasket] = useBasketAtom()

	const ACTIVITY_ID = useMemo(() => {
		return ACTVITY_MOCK_DATA.find((element) => element.slug === id)
	}, [id])

	const { img, price_cfa, price_eur, title, duration, short_description } = ACTIVITY_ID || {}

	const photos = ACTIVITY_ID?.img ? [ACTIVITY_ID.img, ACTIVITY_ID.img, ACTIVITY_ID.img] : []

	// Selects 3 random activities from the list, excluding the current one.
	const suggestions = useMemo(() => {
		const pool = ACTVITY_MOCK_DATA.filter((el) => el.slug !== id)

		const shuffled = [...pool].sort(() => Math.random() - 0.5)
		return shuffled.slice(0, 3)
	}, [id])

	// Toast with image
	const notifyWithImage = (title: string, img: string) => {
		toast.success(
			<div className='flex items-center gap-3'>
				<Image alt={title} className='rounded-md object-cover' height={40} src={img} width={40} />
				<span className='font-caviarDreams-bold'>{title} a été ajouté à votre panier</span>
			</div>,
			{
				autoClose: 3000,
				hideProgressBar: true,
				icon: false,
				position: 'bottom-left'
			}
		)
	}

	const handleAddBasketClick = () => {
		const newBasket = [...basket]

		const basketItemId = crypto.randomUUID?.() ? crypto.randomUUID() : `${id}-${Date.now()}-${Math.random()}`

		newBasket.push({
			basketItemId,
			date,
			duration,
			id: id.toString(),
			img,
			participate,
			price_cfa,
			price_eur,
			short_description,
			title,
			total_cfa: totalCfa,
			total_eur: totalEur
		})

		setBasket(newBasket)
		setOpen(false)
		setDate(new Date())
		setParticipate(0)

		notifyWithImage(title ?? "L'activité", img)
	}

	const getTotalPrice = (price: number, quantity: number) => price * quantity

	const totalEur = useMemo(() => getTotalPrice(price_eur, participate), [price_eur, participate])
	const totalCfa = useMemo(() => getTotalPrice(price_cfa, participate), [price_cfa, participate])

	// const activityAlreadySelected = basket.some((element) => element.id === id)

	return (
		<section className='mx-auto my-14 max-w-7xl px-5 sup-md:px-40'>
			<h1 className='mb-3 font-caviarDreams-bold text-2xl text-greeny-100'>{ACTIVITY_ID?.title}</h1>
			{/* Main grid: 1 mobile column */}
			<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				{/* Large pictures (left column, covering 2/3 of the width)*/}
				<div className='relative overflow-hidden rounded-2xl md:col-span-2'>
					<div className='relative aspect-4/3 h-full w-full'>
						<Image alt='Photo principale' className='object-cover' fill priority src={photos[0]} />
					</div>
				</div>

				{/* 4 small pictures on the right */}
				<div className='grid grid-cols-1 grid-rows-2 gap-4'>
					{photos.slice(1).map((photo, index) => (
						<div className='relative overflow-hidden rounded-2xl' key={index}>
							<div className='relative aspect-square'>
								<Image alt={`Photo ${index + 2}`} className='object-cover' fill src={photo} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Location part */}
			<section className='mt-5 flex justify-between'>
				<div className='flex items-center gap-3'>
					<LuMapPin className='h-6 w-6' />
					<p className='text-lg'>{ACTIVITY_ID?.city}</p>
				</div>

				{/* Duration part */}
				<div>
					<div className='flex items-center gap-2'>
						<TbClockHour7 className='h-6 w-6' />
						<p>{ACTIVITY_ID?.duration}</p>
					</div>
				</div>
			</section>

			<hr className='my-6 border-gray-200 border-t' />

			{/* Activity description */}
			<section>
				<h3 className='mb-2 font-caviarDreams-bold'>Description de l'activité</h3>
				<p>{ACTIVITY_ID?.long_description}</p>
			</section>

			<hr className='my-6 border-gray-200 border-t' />

			{/* Organizer informations */}
			<section>
				<h3 className='mb-2 font-caviarDreams-bold'>Présentation de l'organisateur</h3>
				<div className='min-w-60 rounded-lg border border-gray-100 p-4 shadow-lg'>
					<div className='flex flex-col gap-4'>
						<div className='flex gap-2'>
							<h4>Nom de l'organisateur: </h4>
							<h4>{ACTIVITY_ID?.proposed_by}</h4>
						</div>
						<div className='flex gap-2'>
							<h4>{ACTIVITY_ID?.presentation_organizer}</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Button of reservation */}
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogTrigger asChild>
					<button
						className='mt-6 w-full cursor-pointer rounded-md bg-red-700 p-2 font-caviarDreams-bold text-white transition-all duration-200 ease-in-out hover:bg-red-800'
						// disabled={activityAlreadySelected}
						type='button'
					>
						DEMANDE DE RESERVATION
					</button>
				</DialogTrigger>

				{/* modal of reservation */}
				<DialogContent className='sup-sm:max-w-[425px] p-9'>
					<DialogHeader>
						<DialogTitle className='font-caviarDreams-bold text-xl'>{ACTIVITY_ID?.title}</DialogTitle>
					</DialogHeader>

					<div className='grid gap-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<TbClockHour7 className='h-5 w-5' />
								<p>{ACTIVITY_ID?.duration}</p>
							</div>

							<div className='flex flex-col'>
								<p>A partir de:</p>

								<p className='font-caviarDreams-bold'>
									{ACTIVITY_ID?.price_eur} €{' '}
									<span className='text-xs'>/ {ACTIVITY_ID?.price_cfa} CFA</span>{' '}
									<small className='font-caviarDreams'>par personne</small>
								</p>
							</div>
						</div>

						<hr className='my-2 border-gray-200 border-t' />

						<div className='flex items-center justify-between'>
							<p className='font-caviarDreams-bold'>Participants :</p>

							<Counter count={participate} setCount={setParticipate} />
						</div>

						<hr className='my-2 border-gray-200 border-t' />

						<div className='flex items-center justify-between'>
							<p className='font-caviarDreams-bold'>Date :</p>
							<Calendar
								captionLayout='dropdown'
								className='rounded-md border shadow-sm'
								// disabled={(date) => date.getDay() === 0}
								mode='single'
								onSelect={setDate}
								selected={date}
							/>
						</div>

						<hr className='my-2 border-gray-200 border-t' />
					</div>

					<section className='flex items-center justify-between'>
						<div className='px-0'>
							<p className='font-caviarDreams-bold text-2xl'>{getTotalPrice(price_eur, participate)} €</p>
							<p className='text-gray-600 text-sm'>{getTotalPrice(price_cfa, participate)} CFA</p>

							<p className='mt-2 text-sm'>
								{participate} Adultes x {ACTIVITY_ID?.price_eur} €
							</p>
							<p className='text-sm'>Taxes et frais compris</p>
						</div>
						<button
							className='cursor-pointer rounded-md bg-greeny-50 p-2 font-caviarDreams-bold text-white transition-all duration-400 ease-in-out hover:bg-greeny-100'
							onClick={handleAddBasketClick}
							type='button'
						>
							AJOUTER AU PANIER
						</button>
					</section>
				</DialogContent>
			</Dialog>

			<hr className='my-6 border-gray-200 border-t' />

			{/* This section allows you to choose 3 activities at random. */}
			<section>
				<h3 className='mb-6 font-caviarDreams-bold text-xl'>
					Explorez d’autres univers tout aussi captivants.
				</h3>

				<div className='grid grid-cols-1 sup-lg:grid-cols-3 sup-sm:grid-cols-2 sup-xl:grid-cols-3 gap-6'>
					{suggestions.map((element) => (
						<Link className='flex justify-center' href={`/activite/${element.slug}`} key={element.id}>
							<ActivityExplorerItem
								description={element.short_description}
								imgSrc={element.img}
								rating={element.rating}
								slug={element.slug}
								title={element.title}
							/>
						</Link>
					))}
				</div>
			</section>

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
