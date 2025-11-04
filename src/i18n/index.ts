import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import fr from './locales/fr'

export const defaultNS = 'common'
export const resources = {
	fr
} as const

let lng = process.env['LANGUE'] || 'fr'

if (typeof window !== 'undefined') {
	const valueLng = localStorage.getItem('language')
	lng = valueLng || lng
}
// TODO: check (https://www.i18next.com/overview/typescript) for fix bug typescript key i18n
i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		defaultNS,
		fallbackLng: ['fr'],
		interpolation: {
			escapeValue: false
		},
		lng,
		ns: Object.keys(fr),
		react: {
			bindI18n: 'languageChanged',
			bindI18nStore: '',
			transEmptyNodeValue: '',
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'span'],
			transSupportBasicHtmlNodes: true,
			useSuspense: true
		},
		resources
	})
export default i18n
