import { HIGHLIGHTS_DATA } from '@/data/HighLightData'
import HightListItem from './HighLightItem'

export default function HightLights() {
	return (
		<section className='mt-24 sup-md:px-40'>
			<h1 className='text-center text-3xl'>LES AVANTAGES DE GABON DECOUVERTE</h1>

			<section className='my-16 flex sup-md:flex-row flex-col items-center sup-md:justify-between gap-9 sup-md:gap-0'>
				{HIGHLIGHTS_DATA.map((item) => (
					<HightListItem description={item.description} key={item.id} title={item.title} />
				))}
			</section>
		</section>
	)
}
