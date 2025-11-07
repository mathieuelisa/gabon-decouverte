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
