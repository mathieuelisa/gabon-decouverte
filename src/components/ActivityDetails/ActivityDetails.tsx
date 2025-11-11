'use client'

import { useParams } from 'next/navigation'

export default function ActivityDetails() {
	const { id } = useParams()

	// const ACTIVITY_ID = ACTVITY_MOCK_DATA.find((element) => element.slug === id)

	return <div>ActivityDetails {id}</div>
}
