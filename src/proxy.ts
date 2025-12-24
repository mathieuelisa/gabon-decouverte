import acceptLanguage from 'accept-language'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { cookieName, fallbackLng, headerName, languages } from './app/i18n/settings'

// Configure supported languages for accept-language
acceptLanguage.languages(languages as unknown as string[])

export function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname

	// Ignore paths containing "icon" or "chrome"
	if (pathname.includes('icon') || pathname.includes('chrome')) {
		return NextResponse.next()
	}

	/**
	 * 1) Detect language from the URL if present (highest priority).
	 *    Otherwise, fallback to cookie, Accept-Language header,
	 *    or default language.
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
	 * 2) MAINTENANCE MODE (highest priority)
	 *    - Rewrite all requests to /{lng}/maintenance
	 *    - Allow the maintenance page itself to be accessed
	 */
	if (process.env.MAINTENANCE === 'true') {
		const maintenancePath = `/${currentLng}/maintenance`

		// Allow maintenance page and Next.js internal assets
		if (!pathname.startsWith(maintenancePath) && !pathname.startsWith('/_next')) {
			const url = req.nextUrl.clone()
			url.pathname = maintenancePath
			return NextResponse.rewrite(url)
		}
	}

	/**
	 * 3) Attach the detected language to request headers
	 */
	const headers = new Headers(req.headers)
	headers.set(headerName, currentLng)

	/**
	 * 4) If the language is not present in the URL,
	 *    redirect to /{lng}/...
	 */
	if (!lngInPath && !pathname.startsWith('/_next')) {
		return NextResponse.redirect(new URL(`/${currentLng}${pathname}${req.nextUrl.search}`, req.url))
	}

	/**
	 * 5) If a referer exists, detect its language
	 *    and store it in a cookie for future requests
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
			// Invalid referer, safely ignore
		}
	}

	return NextResponse.next({ headers })
}

export const config = {
	// Avoid matching static files, API routes, and other non-page assets
	matcher: ['/((?!api|_next/static|_next/image|assets|fonts|favicon.ico|sw.js|site.webmanifest).*)']
}
