import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
// import LocizeBackend from 'i18next-locize-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import fr from '@/app/i18n/locales/fr'
import { defaultNS, fallbackLng, languages, resources } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
	// .use(runsOnServerSide ? LocizeBackend : resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`))) // locize backend could be used, but prefer to keep it in sync with server side
	.init({
		// backend: {
		//   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
		// }
		debug: false,
		defaultNS,
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator']
		},
		fallbackLng,
		fallbackNS: defaultNS,
		interpolation: {
			escapeValue: false
		},
		lng: undefined, // let detect the language on client side
		ns: Object.keys(fr),
		preload: runsOnServerSide ? languages : [],
		react: {
			bindI18n: 'languageChanged',
			bindI18nStore: '',
			transEmptyNodeValue: '',
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'span'],
			transSupportBasicHtmlNodes: true,
			useSuspense: true
		},
		resources,

		// debug: true,
		supportedLngs: languages
	})

export default i18next
