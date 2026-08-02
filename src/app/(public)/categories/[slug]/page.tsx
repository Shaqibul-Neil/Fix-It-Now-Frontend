import type { Metadata } from "next";
import { CATEGORY_DETAILS } from "@/src/features/public/category/dependencies/constants/category.dummy";
import CategoryDetailsPage from "@/src/features/public/category/pages/CategoryDetailsPage";

type TRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(CATEGORY_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_DETAILS[slug];

  if (!category) return { title: "Category not found" };

  const title = `${category.name} services — ${category.technicianCount} verified technicians`;
  const description = category.description ?? category.tagline;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      type: "website",
      url: `/categories/${category.slug}`,
      title,
      description,
      images: [{ url: category.coverImage }],
    },
  };
}

export default async function CategoryDetailsRoute({ params }: TRouteProps) {
  const { slug } = await params;

  return <CategoryDetailsPage slug={slug} />;
}
