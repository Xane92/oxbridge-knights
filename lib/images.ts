/**
 * Resolve a stored project image value to a usable <img>/<Image> src.
 *
 * Two kinds of values coexist in a project's `images` array:
 *  - Bare filenames (e.g. "p03_a.webp") for the original work migrated from
 *    data/manifest.json, which live in public/library.
 *  - Full URLs (e.g. a Supabase Storage public URL) for anything uploaded
 *    through the admin dashboard.
 *
 * A value that already looks like an absolute URL is returned untouched;
 * anything else is treated as a library filename. Keeping both working means
 * no existing project's images break when the source moves to Storage.
 */
export function resolveImage(value: string | null | undefined): string {
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `/library/${value}`;
}
