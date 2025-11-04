'use client'

import Navbar from '../Navbar/Navbar'

export default function Base({ children }: { children: React.ReactNode }) {
	return (
		<main className='z-50'>
			<Navbar />
			{children}
		</main>
	)
}
