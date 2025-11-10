export type TFooter = {
	title: string
	links: { href: string; title: string }[]
}

export const FOOTER_DESTINATION_CONTENT: TFooter = {
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

export const FOOTER_LEGALES_INFORMATIONS_CONTENT: TFooter = {
	links: [
		{
			href: '/',
			title: 'Politique de confidentialité'
		},
		{
			href: '/',
			title: 'Mention legales'
		},
		{
			href: '/',
			title: 'Gestion des cookies'
		},
		{
			href: '/',
			title: 'Conditions d’utilisation'
		}
	],
	title: 'Vie privée et conditions'
}
