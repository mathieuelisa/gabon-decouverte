import { headers } from 'next/headers'
import type { UseTranslationOptions } from 'react-i18next'

import i18next from './i18next'
import type { TNameSpacesKey } from './settings'
import { headerName } from './settings'

export async function getT(ns: TNameSpacesKey = 'common', options?: UseTranslationOptions<undefined>) {
	const headerList = await headers()
	const lng = headerList.get(headerName)
	if (lng && i18next.resolvedLanguage !== lng) {
		await i18next.changeLanguage(lng)
	}
	if (ns && !i18next.hasLoadedNamespace(ns)) {
		await i18next.loadNamespaces(ns)
	}
	return {
		i18n: i18next,
		t: i18next.getFixedT(lng ?? i18next.resolvedLanguage, Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix)
	}
}
