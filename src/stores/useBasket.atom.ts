'use client'

import { useAtom } from 'jotai'

import { atomWithSessionStorage } from '@/utils/atom.utils'

type TBasketAtom = {
	date: Date
	id: string
	participate: number
	price_cfa: number
	price_eur: number
	title: string
}[]

const basketAtom = atomWithSessionStorage<TBasketAtom>('basket', [])

basketAtom.debugLabel = 'basket'

export const useBasketAtom = () => {
	return useAtom(basketAtom)
}
