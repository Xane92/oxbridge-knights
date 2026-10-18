import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Supabase client for use on the server (Server Components, Route Handlers,
 * Server Functions). A new client must be created per request — never shared.
 *
 * Wired to Next.js `cookies()` (async in Next.js 15+). Session refreshes are
 * handled in `proxy.ts`; `setAll` is wrapped in try/catch because Server
 * Components are not allowed to write cookies during render.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component, which cannot set cookies.
            // Safe to ignore — the proxy refreshes the session instead.
          }
        },
      },
    }
  )
}
