import acceptLanguage from 'accept-language'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { cookieName, fallbackLng, headerName, languages } from './app/i18n/settings'

acceptLanguage.languages(languages as unknown as string[])

export function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname

	// Ignore paths with "icon" or "chrome"
	if (pathname.includes('icon') || pathname.includes('chrome')) {
		return NextResponse.next()
	}

	/**
	 * 1) Détecte la langue depuis l'URL si présente (prioritaire).
	 *    Sinon via cookie / header / fallback.
	 */
	const lngInPath = languages.find((loc) => pathname.startsWith(`/${loc}`))

	let lng: string | undefined = lngInPath

	if (!lng && req.cookies.has(cookieName)) {
		const cookieVal = req.cookies.get(cookieName)?.value
		if (cookieVal) lng = acceptLanguage.get(cookieVal)
	}

	if (!lng) {
		const headerVal = req.headers.get('Accept-Language')
		if (headerVal) lng = acceptLanguage.get(headerVal)
	}

	if (!lng) lng = fallbackLng

	const currentLng = lngInPath || lng

	/**
	 * 2) MODE MAINTENANCE (prioritaire)
	 *    - Redirige tout vers /{lng}/maintenance
	 *    - Laisse passer la page maintenance elle-même
	 */
	if (process.env.MAINTENANCE === 'true') {
		const maintenancePath = `/${currentLng}/maintenance`

		// autoriser la maintenance + les assets next
		if (!pathname.startsWith(maintenancePath) && !pathname.startsWith('/_next')) {
			const url = req.nextUrl.clone()
			url.pathname = maintenancePath
			return NextResponse.rewrite(url)
		}
	}

	/**
	 * 3) Ajoute le header langue (ton code)
	 */
	const headers = new Headers(req.headers)
	headers.set(headerName, currentLng)

	/**
	 * 4) Si la langue n'est pas dans l'URL -> redirect vers /{lng}/...
	 */
	if (!lngInPath && !pathname.startsWith('/_next')) {
		return NextResponse.redirect(new URL(`/${currentLng}${pathname}${req.nextUrl.search}`, req.url))
	}

	/**
	 * 5) Si referer présent -> détecte langue et set cookie (ton code, sans "!")
	 */
	const referer = req.headers.get('referer')
	if (referer) {
		try {
			const refererUrl = new URL(referer)
			const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))

			const response = NextResponse.next({ headers })
			if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
			return response
		} catch {
			// referer invalide -> on ignore
		}
	}

	return NextResponse.next({ headers })
}

export const config = {
	// Avoid matching for static files, API routes, etc.
	matcher: ['/((?!api|_next/static|_next/image|assets|fonts|favicon.ico|sw.js|site.webmanifest).*)']
}
