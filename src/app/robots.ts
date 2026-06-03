import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/public/"],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/login/",
          "/register/",
          "/candidate/",
          "/agency/",
          "/interview/",
          "/applications/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
