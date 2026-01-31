import Image from 'next/image'

import Link from '@/components/ui/Link'

export default function BecomePartner() {
	return (
		<main className='min-h-[722px] sup-lg:px-28'>
			<section className='flex sup-lg:flex-row flex-col gap-10 pt-32'>
				<div className='relative sup-lg:block hidden h-[400px] w-3/5 border border-shark-200'>
					<Image
						alt='Poignée de main symbolisant un partenariat'
						className='relative object-cover'
						fill
						priority
						sizes='(min-width: 1024px) 60vw, 100vw'
						src='/assets/images/handshake.avif'
					/>
				</div>

				<section className='relative flex sup-lg:w-2/5 w-full flex-col justify-between gap-12 sup-lg:gap-0 px-5 sup-lg:px-0'>
					<Image
						alt=''
						aria-hidden='true'
						className='-z-1 absolute w-11/12 opacity-20'
						height={500}
						src='/assets/images/logo_grey.png'
						width={600}
					/>
					<div className='flex flex-col items-center gap-5 font-caviarDreams'>
						<h1 className='text-center sup-lg:text-start text-4xl'>
							Ensemble, construisons un partenariat durable
						</h1>
						<h2 className='sr-only'>Devenir partenaire de Gabon Découverte</h2>
						<p className='w-full text-center sup-lg:text-start sup-md:text-lg text-base'>
							Gabon Découverte grandit et souhaite collaborer avec de nouveaux partenaires : hôtels,
							chambres d’hôtes, artisans, restaurateurs et prestataires d’activités.
						</p>
						<p className='w-full text-center sup-lg:text-start sup-md:text-lg text-base'>
							Cliquez sur le lien ci-dessous pour remplir le formulaire et rejoindre l’aventure.
						</p>
					</div>

					<section className='flex w-full sup-lg:justify-end justify-center'>
						<Link
							className='mr-0 cursor-pointer justify-center rounded-xs bg-greeny-100 p-3 font-caviarDreams-bold text-base text-white transition-all duration-400 ease-in-out hover:bg-greeny-50'
							href={'/contact'}
						>
							REJOIGNEZ-NOUS
						</Link>
					</section>
				</section>
			</section>
		</main>
	)
}
