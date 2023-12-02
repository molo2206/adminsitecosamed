import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { En, ES, SW, FR, PT } from './utils/translation'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)

	.init({
		resources: {
			en: { translation: En },
			fr: { translation: FR },
			sw: { translation: SW },
			es: { translation: ES },
			pt: { translation: PT },
		},
		debug: true,
		//lng: "en",
		fallbackLng: 'fr',
		nonExplicitSupportedLngs: true,

		interpolation: {
			escapeValue: false,
		},
		detection: {
			//order: ['path', 'cookie', 'htmlTag'],
			caches: ['cookie'],
		},
	})

export default i18n
