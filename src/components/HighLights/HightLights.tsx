'use client'

import { useTranslation } from '@/app/i18n/client'
import { HIGHLIGHTS_DATA } from '@/data/HighLightData'
import HightListItem from './HighLightItem'

export default function HightLights() {
	const { t } = useTranslation() as { t: (key: string) => string }

	return (
		<section className='mt-24 px-5 sup-md:px-40'>
			<h1 className='text-center font-caviarDreams-bold sup-md:text-3xl text-2xl text-greeny-100 uppercase'>
				{t('landing.quietConfidence')}
			</h1>

			<section className='my-12 flex sup-md:flex-row flex-col items-center sup-md:justify-between gap-9 sup-md:gap-0'>
				{HIGHLIGHTS_DATA.map((item) => (
					<HightListItem description={item.description} key={item.id} title={item.title} />
				))}
			</section>
		</section>
	)
}
