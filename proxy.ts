import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Proxy (the Next.js 16 rename of Middleware; a `middleware.ts` would be
 * ignored by this version). It refreshes the Supabase session on every
 * matched request (Phase B1) and, since Phase B6, enforces the admin wall:
 * /admin and /admin/* require an authenticated session, with /admin/login the
 * only exception. This server-side check is the real security boundary, not
 * client-side hiding.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          // Cache-control headers that keep auth cookie responses out of any
          // CDN / reverse proxy cache.
          if (headers) {
            Object.entries(headers).forEach(([key, value]) =>
              supabaseResponse.headers.set(key, value)
            )
          }
        },
      },
    }
  )

  // IMPORTANT: Do not run code between createServerClient and getClaims().
  // This refreshes the session (and triggers setAll above when tokens rotate).
  const { data } = await supabase.auth.getClaims()
  const isAuthenticated = Boolean(data?.claims)

  // --- Admin wall (Phase B6) ---------------------------------------------
  const { pathname } = request.nextUrl
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/")
  const isLoginRoute = pathname === "/admin/login"

  // Any admin route other than the login page needs a session; without one,
  // send the visitor to the login page.
  if (isAdminArea && !isLoginRoute && !isAuthenticated) {
    return redirectWithSession(request, supabaseResponse, "/admin/login")
  }

  // An already-signed-in visitor has no business on the login page.
  if (isLoginRoute && isAuthenticated) {
    return redirectWithSession(request, supabaseResponse, "/admin")
  }

  return supabaseResponse
}

/**
 * Redirect to a path within the site while carrying over any auth cookies the
 * session refresh just set, so a rotated token is not dropped on the redirect.
 */
function redirectWithSession(
  request: NextRequest,
  supabaseResponse: NextResponse,
  pathname: string
) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ""
  const redirect = NextResponse.redirect(url)
  supabaseResponse.cookies
    .getAll()
    .forEach((cookie) => redirect.cookies.set(cookie))
  return redirect
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static asset file extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
}
