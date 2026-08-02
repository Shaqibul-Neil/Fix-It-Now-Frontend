import type { ICategory } from "@/src/features/public/category/dependencies/types/category.types";
import { config } from "@/src/lib/config/config";
import { BANNER_SCENES } from "../constants/home.content";

const HomeJsonLd = ({ categories }: { categories: ICategory[] }) => {
  const siteUrl = config.app_url ?? "http://localhost:3000";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "FixItNow",
        url: siteUrl,
        description: BANNER_SCENES[0].description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "FixItNow",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#service-categories`,
        name: "Service categories",
        itemListElement: categories.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: category.name,
            description: category.description ?? undefined,
            image: category.image ?? undefined,
            url: `${siteUrl}/services?category=${category.slug}`,
            provider: { "@id": `${siteUrl}/#organization` },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};

export default HomeJsonLd;
