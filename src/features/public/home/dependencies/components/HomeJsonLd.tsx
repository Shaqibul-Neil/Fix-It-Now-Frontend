import { config } from "@/src/lib/config/config";
import { BANNER_INTRO, BANNER_SLIDES } from "../constants/home.content";

const HomeJsonLd = () => {
  const siteUrl = config.app_url ?? "http://localhost:3000";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "FixItNow",
        url: siteUrl,
        description: BANNER_INTRO.description,
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
        "@id": `${siteUrl}/#featured-services`,
        name: "Featured services",
        itemListElement: BANNER_SLIDES.map((slide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: slide.category,
            description: slide.description,
            url: `${siteUrl}${slide.cta.href}`,
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
