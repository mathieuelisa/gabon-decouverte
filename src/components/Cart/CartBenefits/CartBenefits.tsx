import { GrValidate } from 'react-icons/gr'

import { CART_BENEFITS_DATA } from './CartBenefitsMock.data'

export default function CartBenefits() {
	return (
		<div className='flex w-72 flex-col gap-3 rounded-lg border border-gray-200 p-3'>
			{CART_BENEFITS_DATA.map((item) => (
				<section className='flex items-center gap-3' key={item.id}>
					<GrValidate className='h-5 w-5 text-greeny-100' />
					<p>{item.title}</p>
				</section>
			))}
		</div>
	)
}
