import Image from 'next/image'
import { IoMdHeartEmpty } from 'react-icons/io'
import { MdOutlineStar } from 'react-icons/md'

export default function ActivityExplorerItem({ title, description, imgSrc, rating }) {
	return (
		<section className='relative min-h-[420px] min-w-[200px] max-w-[300px] cursor-pointer rounded-lg'>
			<Image alt='Balade sur le lac Oguemoué' className='rounded-t-md' height={300} src={imgSrc} width={400} />

			<IoMdHeartEmpty className='absolute top-5 right-5 h-6 w-6 fill-black/50 stroke-white text-white' />

			<div className='mt-2 flex items-center justify-between'>
				<h2 className='font-caviarDreams-bold'>{title}</h2>
				<div className='flex items-center gap-1'>
					<MdOutlineStar />
					<p>{rating}</p>
				</div>
			</div>

			<p className='my-3'>{description}</p>
		</section>
	)
}
