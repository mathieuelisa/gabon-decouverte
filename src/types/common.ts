export type TIcons = {
	className: string
	onClick?: () => void
}

export type TPricing = {
	id: number
	title: string
}

export type TPanelKey = 'activité' | 'decouverte'
export type TActiviteKey = 'art' | 'eco' | 'nature'
export type TDecouverteKey = 'libreville' | 'oyem' | 'mayumba' | 'lambarene'

export type TSlide = {
	id: number
	image: string
	title?: string
}

export type THighlight = {
	description: string
	id: number
	title: string
}

export type TActivity = {
	id: number
	long_description: string
	presentation_organizer: string
	proposed_by: string
	rating: number
	short_description: string
	type: string
	title: string
	img: string
	slug: string
	duration: string
	price_eur: number
	price_cfa: number
}

export type TFavorite = {
	key: string
	title: string
	description: string
	imgSrc: string
	rating: number | string
	slug?: string
}
