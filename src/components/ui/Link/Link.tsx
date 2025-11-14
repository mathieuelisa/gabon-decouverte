import { useTranslation } from '@/app/i18n/client'
import { LinkBase } from './LinkBase'

export default function Link({ href, children }) {
	const { i18n } = useTranslation()
	return (
		<LinkBase href={href} lng={i18n.resolvedLanguage}>
			{children}
		</LinkBase>
	)
}
