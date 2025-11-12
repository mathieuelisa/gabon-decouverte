import 'i18next'

import type { defaultNS, resources } from '@/app/i18n/settings'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS
		resources: (typeof resources)['fr']
	}
}
