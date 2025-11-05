import Image from 'next/image'

export default function Banner() {
	return (
		<section>
			<div className='relative h-[722px]'>
				<Image alt='savane africaine' fill={true} priority src='/assets/images/savane_africa.avif' />
			</div>
			<div className='absolute inset-0 bg-linear-to-b from-0% from-white via-30% via-white to-80% to-transparent'></div>
		</section>
	)
}
