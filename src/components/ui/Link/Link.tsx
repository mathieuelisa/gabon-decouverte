'use client'

import type { LinkProps } from 'next/link'
import type React from 'react'

import { useTranslation } from '@/app/i18n/client'
import { LinkBase } from './LinkBase'

type Props = {
	children?: React.ReactNode | undefined
	className?: string
} & React.RefAttributes<HTMLAnchorElement> &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps<any>> &
	LinkProps<any>
export default function Link({ href, children, className, ...props }: Props) {
	const { i18n } = useTranslation()

	return (
		<LinkBase className={className} href={href} lng={i18n.resolvedLanguage} {...props}>
			{children}
		</LinkBase>
	)
}
