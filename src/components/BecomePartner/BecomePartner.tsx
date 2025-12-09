import Image from 'next/image'
import Link from 'next/link'

export default function BecomePartner() {
	return (
		<section className='min-h-[722px] sup-lg:px-28'>
			<section className='flex sup-lg:flex-row flex-col gap-10 pt-32'>
				<div className='relative sup-lg:block hidden h-[400px] w-3/5 border border-shark-200'>
					<Image
						alt='savane africaine'
						className='relative object-cover'
						fill
						priority
						src='/assets/images/handshake.avif'
					/>
				</div>

				<section className='relative flex sup-lg:w-2/5 w-full flex-col justify-between gap-12 sup-lg:gap-0 px-5 sup-lg:px-0'>
					<Image
						alt='logo_background'
						className='-z-1 absolute w-11/12 opacity-20'
						height={500}
						priority
						src='/assets/images/logo_grey.png'
						width={600}
					/>
					<div className='flex flex-col items-center gap-5'>
						<h1 className='text-center sup-lg:text-start text-4xl'>
							Ensemble, construisons un partenariat durable
						</h1>
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
							className='mr-0 cursor-pointer justify-center rounded-sm bg-greeny-100 p-3 font-caviarDreams-bold text-base text-white transition-all duration-400 ease-in-out hover:bg-greeny-50'
							href={'/contact'}
							type='button'
						>
							REJOIGNEZ-NOUS
						</Link>
					</section>
				</section>
			</section>
		</section>
	)
}
