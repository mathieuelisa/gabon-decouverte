export default function HightListItem({ description, title }) {
	return (
		<section className='flex max-w-80 flex-col sup-md:text-left text-center'>
			<div className='mb-2.5 text-greeny-100 text-xl'>{title}</div>
			<div className='font-display text-md'>{description}</div>
		</section>
	)
}
