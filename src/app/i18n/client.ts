'use client'

import { getCookie, setCookie } from 'cookies-next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'

import type { TLocales, TNameSpacesKey } from './settings'
import { cookieName, getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'
// TODO: check (https://www.i18next.com/overview/typescript) for fix bug typescript key i18n
i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
	.init({
		...getOptions(),
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator']
		},
		lng: undefined, // let detect the language on client side
		preload: runsOnServerSide ? languages : []
	})

export function useTranslation(data?: { lng?: TLocales; ns?: TNameSpacesKey; options: Record<string, string> }) {
	const { lng: lngOpt, ns, options } = data || {}
	const lngParams = useParams()?.lng
	const lng = lngOpt || lngParams

	const i18nextCookie = getCookie(cookieName)
	const ret = useTranslationOrg(ns, options)
	const { i18n } = ret

	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng)
	} else {
		// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
		const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

		// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
		useEffect(() => {
			if (activeLng === i18n.resolvedLanguage) return
			setActiveLng(i18n.resolvedLanguage)
		}, [activeLng, i18n.resolvedLanguage])
		// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
		useEffect(() => {
			if (!lng || i18n.resolvedLanguage === lng) return
			i18n.changeLanguage(lng)
		}, [lng, i18n])
		// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
		useEffect(() => {
			if (i18nextCookie === lng) return
			setCookie(cookieName, lng, { path: '/' })
		}, [lng, i18nextCookie])
	}

	return ret
}
