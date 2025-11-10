'use client'

import { useSearchParams } from 'next/navigation'

export default function ActivityExplorer() {
	const searchParams = useSearchParams()

	const type = searchParams.get('type')

	return <div>ActivityExplorer - {type}</div>
}
