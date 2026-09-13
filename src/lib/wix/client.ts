/**
 * Server-only client for reading ISLAND SOL's public Wix Data (CMS)
 * collections. Uses the anonymous-visitor OAuth grant, which needs only a
 * public client ID — no client secret ever touches this codebase.
 *
 * This file must never be imported from a "use client" component; it's
 * meant to be called from Server Components, Route Handlers, and other
 * server-side code, then have the resolved data passed down as props.
 */
import "server-only";

const CLIENT_ID = process.env.WIX_CLIENT_ID ?? "0fa24b6e-cf58-4cef-9e21-2a547b02062a";
const META_SITE_ID = process.env.WIX_META_SITE_ID ?? "68b3cc37-d334-4f01-88d2-f1dbed413058";

/**
 * Visitor access tokens are valid for 4 hours (14,400s). Rather than a
 * manual in-memory cache (which would force this fetch to opt out of
 * Next.js's own caching and make every page that reads CMS data
 * uncacheable/dynamic), this lets Next.js's Data Cache hold the token
 * and revalidate it well before expiry — keeping pages statically
 * generated/ISR-eligible like any other cached fetch.
 */
async function getVisitorAccessToken(): Promise<string> {
  const response = await fetch("https://www.wixapis.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: CLIENT_ID, grantType: "anonymous" }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to obtain Wix visitor token: ${response.status}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  return data.access_token;
}

export interface WixDataItem<T> {
  id: string;
  data: T;
}

/**
 * Queries a public Wix Data collection. Returns an empty array on any
 * failure (missing env config, network error, collection not yet
 * created) so a CMS hiccup degrades a section gracefully instead of
 * crashing the page — callers should still apply their own empty-state
 * handling on top of this.
 */
export async function queryCollection<T>(
  collectionId: string,
  options?: { revalidateSeconds?: number }
): Promise<WixDataItem<T>[]> {
  try {
    const token = await getVisitorAccessToken();
    const response = await fetch("https://www.wixapis.com/wix-data/v2/items/query", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "wix-site-id": META_SITE_ID,
      },
      body: JSON.stringify({ dataCollectionId: collectionId, query: {} }),
      next: { revalidate: options?.revalidateSeconds ?? 60 },
    });

    if (!response.ok) {
      console.error(`Wix Data query failed for "${collectionId}": ${response.status}`);
      return [];
    }

    const data = (await response.json()) as { dataItems: WixDataItem<T>[] };
    return data.dataItems ?? [];
  } catch (error) {
    console.error(`Wix Data query error for "${collectionId}":`, error);
    return [];
  }
}
