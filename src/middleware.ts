import acceptLanguage from 'accept-language'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { cookieName, fallbackLng, headerName, languages } from './app/i18n/settings'

acceptLanguage.languages(languages as unknown as string[])

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	/* =========================
     1️⃣ MODE MAINTENANCE
     ========================= */
	if (process.env.MAINTENANCE === 'true' && !pathname.startsWith('/maintenance') && !pathname.startsWith('/_next')) {
		const url = req.nextUrl.clone()
		url.pathname = '/maintenance'
		return NextResponse.rewrite(url)
	}

	/* =========================
     2️⃣ IGNORE CERTAINS PATHS
     ========================= */
	if (pathname.includes('icon') || pathname.includes('chrome')) {
		return NextResponse.next()
	}

	/* =========================
     3️⃣ I18N LOGIC (TON CODE)
     ========================= */
	let lng: string | undefined

	if (req.cookies.has(cookieName)) {
		lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
	}

	if (!lng) {
		lng = acceptLanguage.get(req.headers.get('Accept-Language'))
	}

	if (!lng) {
		lng = fallbackLng
	}

	const lngInPath = languages.find((loc) => pathname.startsWith(`/${loc}`))

	const headers = new Headers(req.headers)
	headers.set(headerName, lngInPath || lng)

	if (!lngInPath && !pathname.startsWith('/_next')) {
		return NextResponse.redirect(new URL(`/${lng}${pathname}${req.nextUrl.search}`, req.url))
	}

	const referer = req.headers.get('referer')

	if (referer) {
		const refererUrl = new URL(referer)
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))

		const response = NextResponse.next({ headers })
		if (lngInReferer) {
			response.cookies.set(cookieName, lngInReferer)
		}
		return response
	}

	return NextResponse.next({ headers })
}

/* =========================
   4️⃣ MATCHER UNIQUE
   ========================= */
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|assets|fonts|favicon.ico|sw.js|site.webmanifest).*)']
}
