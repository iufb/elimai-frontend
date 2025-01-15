import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const defaultPages = [
        {
            url: process.env.NEXT_PUBLIC_FRONT_URL ?? "https://fcelimai.kz/",
            lastModified: new Date(),
            changeFrequency: "daily" as "daily",
            priority: 1
        }
    ];


    const sitemap = [
        ...defaultPages,
    ];

    return sitemap;
}
