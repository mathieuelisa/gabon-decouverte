'use client'

import Link from 'next/link'

export const LinkBase = ({ lng, href, children, className, ...props }) => {
	return (
		<Link
			className={className}
			href={
				typeof href === 'string'
					? `/${lng}/${href}`
					: {
							...href,
							pathname: `/${lng}/${href.pathname}`
						}
			}
			{...props}
		>
			{children}
		</Link>
	)
}
