import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import manifest from "@/data/manifest.json";

/**
 * The canonical project shape the UI consumes. Identical to the old
 * data/manifest.json entry shape, so no component props change when the
 * source moves to the database.
 */
export type Project = {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  date: string;
  year: number;
  legacy: boolean;
  tier: "hero" | "gallery";
  images: string[];
};

/** A project plus its sort position, as the admin dashboard reads/writes it. */
export type ProjectRecord = Project & { sort_order: number };

/** Row as stored in public.projects (adds sort_order the UI doesn't need). */
type ProjectRow = {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  date: string;
  year: number;
  legacy: boolean;
  tier: string;
  images: string[] | null;
  sort_order: number;
};

/** The columns the UI needs, selected explicitly and ordered on the server. */
const COLUMNS =
  "id, title, type, category, location, date, year, legacy, tier, images, sort_order";

const FALLBACK = manifest as Project[];

function fromManifest(reason: string): Project[] {
  console.warn(
    `[projects] Supabase unavailable — serving data/manifest.json instead (${reason}).`,
  );
  return FALLBACK;
}

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    category: row.category,
    location: row.location,
    date: row.date,
    year: row.year,
    legacy: row.legacy,
    tier: row.tier === "hero" ? "hero" : "gallery",
    images: row.images ?? [],
  };
}

/**
 * Load every project from Supabase, ordered by sort_order ascending, mapped
 * back to the exact shape the components expect. Memoized per request with
 * React.cache so the four pages that call it in one render don't re-query.
 *
 * If the fetch fails or returns no rows, falls back to data/manifest.json so
 * the site never renders empty, logging a clear server-side warning.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  // createClient() reads cookies(). During static generation that triggers
  // Next's dynamic bailout, which must propagate (not be caught) so the route
  // is correctly marked dynamic — hence it stays outside the try below, which
  // only guards the actual database round-trip.
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select(COLUMNS)
      .order("sort_order", { ascending: true });

    if (error) return fromManifest(`query error: ${error.message}`);
    if (!data || data.length === 0) return fromManifest("zero rows returned");

    // Temporary (Phase B4): confirm the live data source and row count.
    console.log(`[projects] Loaded ${data.length} projects from Supabase.`);

    return (data as ProjectRow[]).map(toProject);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return fromManifest(`unexpected failure: ${message}`);
  }
});
