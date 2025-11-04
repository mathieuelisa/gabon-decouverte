// utils
import type { Resource } from 'i18next'
import { merge, partial, spread } from 'lodash'

// locales
import fr from './locales/fr'

// ----------------------------------------------------------------------

const loadedNameSpaces = {
	...fr
}

export const defaultNameSpace: TNameSpacesKey = 'common'
type SupportedLocale = 'fr'

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

export const resources = { ...fr } as const
export const nameSpaceNames = Object.keys(loadedNameSpaces) as TNameSpacesKey[]

// create an instance for nameSpace which contains keys as values, to simplify accessibility to nameSpaces
// this variable is used everywhere when we need to call a translation from a specific nameSpace
export const nameSpaces: Record<TNameSpacesKey, TNameSpacesKey> = nameSpaceNames.reduce(
	(record, ns) => Object.assign(record, { [ns]: ns }),
	{} as Record<TNameSpacesKey, TNameSpacesKey>
)

export type TNameSpaceResources<NAME_SPACE extends TNameSpacesKey> = (typeof resources)[NAME_SPACE]
export type TTranslationKey<E extends TNameSpacesKey = 'common'> = RecursiveKeyOf<TNameSpaceResources<E>>
