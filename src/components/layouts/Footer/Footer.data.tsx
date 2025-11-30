export type TFooter = {
	title: string
	links: { href: string; title: string }[]
}

export const FOOTER_DESTINATION_CONTENT: TFooter = {
	links: [
		{
			href: '/voyage-decouverte/libreville',
			title: 'Libreville'
		},
		{
			href: '/voyage-decouverte/lambarene',
			title: 'Lambarané'
		},
		{
			href: '/voyage-decouverte/mayumba',
			title: 'Mayumba'
		},
		{
			href: '/voyage-decouverte/oyem',
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
			title: 'Mentions légales'
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
