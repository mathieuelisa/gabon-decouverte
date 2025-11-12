import type { ClassNameValue } from 'tailwind-merge'
import { twJoin, twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassNameValue[]) {
	return twMerge(twJoin(inputs))
}
