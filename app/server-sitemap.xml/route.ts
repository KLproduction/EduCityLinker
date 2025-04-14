import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { db } from "@/lib/db";

export async function GET() {
  const organizations = await db.organization.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const urls = organizations.map((org) => ({
    loc: `https://edu-city-linker.vercel.app/listing/${org.id}`, // 或 org.slug
    lastmod: org.updatedAt.toISOString(),
    changefreq: "weekly" as const,
    priority: 0.8,
  }));

  return getServerSideSitemap(urls as ISitemapField[]);
}
