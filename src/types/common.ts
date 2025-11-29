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
	city: string
	city_activity: string
	gender: 'male' | 'female'
}

export type TDiscover = {
	id: number
	long_description: string
	short_description: string
	title: string
	img: string
	second_img: string
	slug: string
	type: string
	city: string
	best_period: string
	airport_transfer_duration: string
}

export type TFavorite = {
	key: string
	title: string
	description: string
	imgSrc: string
	rating: number | string
	slug?: string
}

export type TBasketItem = {
	date: Date
	id: string
	participate: number
	price_cfa: number
	price_eur: number
	title: string
	img: string
	duration: string
	short_description: string
	total_eur: number
	total_cfa: number
	basketItemId: string
}
