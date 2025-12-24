'use client'

import type { DevToolsProps } from 'jotai-devtools'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/app/i18n/i18next'
import Footer from '../Footer'
import Navbar from '../Navbar/Navbar'

// biome-ignore lint/suspicious/noRedeclare: <explanation>
let DevTools: ComponentType<DevToolsProps> | null = null

if (process.env.NODE_ENV !== 'production') {
	DevTools = dynamic(() => import('@/components/ui/DevTools').then((mod) => ({ default: mod.DevTools })), {
		ssr: false
	})
}

export default function Base({ children }: { children: React.ReactNode }) {
	return (
		<>
			<I18nextProvider defaultNS={'common'} i18n={i18n}>
				<main className='z-50'>
					<Navbar />
					{children}
					<Footer />
				</main>
			</I18nextProvider>
			{DevTools && <DevTools position='bottom-right' theme='dark' />}
		</>
	)
}
