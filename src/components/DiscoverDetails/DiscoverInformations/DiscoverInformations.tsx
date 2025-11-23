import { BsAirplane } from 'react-icons/bs'
import { CiCloudSun } from 'react-icons/ci'

export default function DiscoverInformations({ discoverItem }) {
	return (
		<section className='mt-4 flex w-full flex-col gap-3 lg:mt-0 lg:w-[70%]'>
			<h2 className='font-caviarDreams text-greeny-100 text-xl'>Votre séjour</h2>
			<p className='text-justify'>{discoverItem?.long_description}</p>

			<div className='mt-4 grid sup-md:w-[420px] w-full grid-cols-1 gap-3 self-end border border-gray-300 p-3 sm:grid-cols-2'>
				<div className='flex flex-col items-center justify-center gap-2'>
					<h3 className='font-caviarDreams-bold text-greeny-100 text-sm'>Meilleur période</h3>
					<div className='flex items-center gap-2'>
						<CiCloudSun className='h-5 w-5' />
						<p>{discoverItem?.best_period}</p>
					</div>
				</div>
				<div className='flex flex-col items-center justify-center gap-2'>
					<h3 className='font-caviarDreams-bold text-greeny-100 text-sm'>Aéroport</h3>
					<div className='flex items-center gap-2'>
						<BsAirplane className='h-5 w-5' />
						<p>{discoverItem?.airport_transfer_duration}</p>
					</div>
				</div>
			</div>
		</section>
	)
}
