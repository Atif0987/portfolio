/**
 * Absolute site URL for metadata, sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the
 * production URL is used automatically until then.
 */
export function getSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL("http://localhost:3000");
}
