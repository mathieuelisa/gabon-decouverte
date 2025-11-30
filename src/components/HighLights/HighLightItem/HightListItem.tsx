export default function HightListItem({ description, title }) {
	return (
		<section className='flex max-w-80 flex-col sup-md:text-left text-center'>
			<h2 className='mb-2.5 text-center font-caviarDreams-bold text-greeny-100 text-xl'>{title}</h2>
			<p className='text-center sup-md:text-lg text-base'>{description}</p>
		</section>
	)
}
