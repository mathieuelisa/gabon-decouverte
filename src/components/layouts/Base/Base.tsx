'use client'

import { I18nextProvider } from 'react-i18next'

import i18n from '@/i18n'
import Footer from '../Footer'
import Navbar from '../Navbar/Navbar'

export default function Base({ children }: { children: React.ReactNode }) {
	return (
		<I18nextProvider defaultNS={'common'} i18n={i18n}>
			<main className='z-50'>
				<Navbar />
				{children}
				<Footer />
			</main>
		</I18nextProvider>
	)
}
