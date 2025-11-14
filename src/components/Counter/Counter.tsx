'use client'

import type { SetStateAction } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { FiMinus } from 'react-icons/fi'

type Props = {
	setCount: (value: SetStateAction<number>) => void
	count: number
}

export default function Counter({ count, setCount }: Props) {
	return (
		<section className='flex w-fit items-center justify-center gap-6 rounded-2xl bg-white p-2 shadow-md'>
			<button
				className='cursor-pointer rounded-full border border-gray-100 bg-white p-1 text-greeny-100 shadow-sm transition-all duration-200 active:scale-95 disabled:text-gray-300'
				disabled={count === 13}
				onClick={() => setCount((prev) => prev + 1)}
				type='button'
			>
				<FaPlus className='h-4 w-4' />
			</button>

			<span className='min-w-10 select-none text-center font-caviarDreams-bold font-semibold text-md'>
				{count}
			</span>

			<button
				className='cursor-pointer rounded-full border border-gray-100 bg-white p-1 text-greeny-100 shadow-sm transition-all duration-200 active:scale-95 disabled:text-gray-300'
				disabled={count === 0}
				onClick={() => setCount((prev) => prev - 1)}
				type='button'
			>
				<FiMinus className='h-5 w-5' />
			</button>
		</section>
	)
}
