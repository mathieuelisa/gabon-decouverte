export type TFooterDestination = {
	title: string
	links: { href: string; title: string }[]
}

export const FOOTER_DESTINATION_CONTENT: TFooterDestination = {
	links: [
		{
			href: '/',
			title: 'Libreville'
		},
		{
			href: '/contact',
			title: 'Lambarané'
		},
		{
			href: '/contact',
			title: 'Mayumba'
		},
		{
			href: '/contact',
			title: 'Oyem'
		}
	],
	title: 'Où partir ?'
}
