/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://edu-city-linker.vercel.app",
  generateRobotsTxt: true,
  sourceDir: "app",
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/admin/*",
    "/api/*",
    "/enrollment/*",
    "/auth/*",
    "/deposit-checkout/*",
    "/full-payment-checkout/*",
    "/dashboard/*",
    "/stripe/*",
    "/webhook/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/explore"],
        disallow: [
          "/admin/*",
          "/api/*",
          "/enrollment/*",
          "/auth/*",
          "/deposit-checkout/*",
          "/full-payment-checkout/*",
          "/dashboard/*",
          "/stripe/*",
          "/webhook/*",
        ],
      },
    ],
    additionalSitemaps: [
      "https://edu-city-linker.vercel.app/server-sitemap.xml",
    ],
  },
};
