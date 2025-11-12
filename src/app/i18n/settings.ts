import type { Resource } from 'i18next'
import { merge, partial, spread } from 'lodash'

import en from './locales/en'
import fr from './locales/fr'

export const fallbackLng = 'fr'
export const languages = [fallbackLng, 'en'] as const

export const defaultNS = 'common'
export const cookieName = 'i18next'

// ----------------------------------------------------------------------

const loadedNameSpaces = {
	...fr
}

export const defaultNameSpace: TNameSpacesKey = 'common'
type SupportedLocale = 'fr'
export type TLocales = (typeof languages)[number]
export const defaultLanguage: SupportedLocale = 'fr'
export const keySeparator = '.'

export type TNameSpacesKey = keyof typeof loadedNameSpaces
type LoadedResources = { [locale in SupportedLocale]: Translation }
type Translation = { [key: string]: string | Translation }

export type Translations = {
	[nameSpace in TNameSpacesKey]: Translation
}

export function adaptLoadedResources(ns: Record<string, any>) {
	const flatNameSpaces = Object.entries(ns) as [TNameSpacesKey, LoadedResources][]
	const flatResources = flatNameSpaces.map((nameSpace) => {
		const locales = Object.entries(nameSpace[1]) as [SupportedLocale, Translation][]
		return locales.reduce<Resource>((accumulator, locale) => {
			accumulator[locale[0]] = {
				[`${nameSpace[0]}`]: locale[1]
			} as Translations
			return accumulator
		}, {} as Resource)
	})

	return spread(partial(merge, {}))(flatResources)
}

export type RecursiveKeyOf<TObj extends Record<string, unknown>> = {
	[TKey in keyof TObj & (string | number)]: TObj[TKey] extends unknown[]
		? `${TKey}`
		: TObj[TKey] extends Record<string, unknown>
			? `${TKey}${typeof keySeparator}${RecursiveKeyOf<TObj[TKey]>}`
			: `${TKey}`
}[keyof TObj & (string | number)]

export const resourcesFr = { ...fr } as const
export const nameSpaceNames = Object.keys(loadedNameSpaces) as TNameSpacesKey[]

// create an instance for nameSpace which contains keys as values, to simplify accessibility to nameSpaces
// this variable is used everywhere when we need to call a translation from a specific nameSpace
export const nameSpaces: Record<TNameSpacesKey, TNameSpacesKey> = nameSpaceNames.reduce(
	(record, ns) => Object.assign(record, { [ns]: ns }),
	{} as Record<TNameSpacesKey, TNameSpacesKey>
)

export type TNameSpaceResources<NAME_SPACE extends TNameSpacesKey> = (typeof resourcesFr)[NAME_SPACE]
export type TTranslationKey<E extends TNameSpacesKey = 'common'> = RecursiveKeyOf<TNameSpaceResources<E>>

export const resources = {
	en,
	fr
} as const
export function getOptions(lng = fallbackLng, ns: TNameSpacesKey = defaultNS) {
	return {
		debug: false,
		defaultNS,
		fallbackLng,
		fallbackNS: defaultNS,
		interpolation: {
			escapeValue: false
		},
		lng,
		ns: ns || Object.keys(fr),
		react: {
			bindI18n: 'languageChanged',
			bindI18nStore: '',
			transEmptyNodeValue: '',
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'span'],
			transSupportBasicHtmlNodes: true,
			useSuspense: true
		},
		resources,
		supportedLngs: languages
	}
}
