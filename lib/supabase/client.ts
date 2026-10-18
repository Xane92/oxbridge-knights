import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for use in the browser (Client Components).
 *
 * Reads the public env vars at call time. The browser client handles its own
 * cookie storage, so no custom cookie methods are required here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
