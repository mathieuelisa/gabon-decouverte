'use client'

import { useBasketAtom } from '@/stores/useBasket.atom'

export default function Cart() {
	const [basket] = useBasketAtom()

	console.log(basket)
	return <p>Panier</p>
}
