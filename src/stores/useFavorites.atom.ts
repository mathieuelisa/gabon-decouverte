'use client'

import { useAtom } from 'jotai'

import type { TFavorite } from '@/types/common'
import { atomWithLocalStorage } from '@/utils/atom.utils'

const favoritesAtom = atomWithLocalStorage<TFavorite[]>('favorites', [])

favoritesAtom.debugLabel = 'favorites'

export const useFavoritesAtom = () => {
	return useAtom(favoritesAtom)
}
