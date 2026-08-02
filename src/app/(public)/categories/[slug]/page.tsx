import type { Metadata } from "next";
import {
  getCategories,
  getCategoryBySlug,
} from "@/src/features/public/category/dependencies/api/category.api";
import CategoryDetailsPage from "@/src/features/public/category/pages/CategoryDetailsPage";

type TRouteProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: TRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Category not found" };

  const title = `${category.name} services — ${category.technicianCount} verified technicians`;
  const description = category.description ?? category.tagline ?? undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      type: "website",
      url: `/categories/${category.slug}`,
      title,
      description,
      images: category.coverImage ? [{ url: category.coverImage }] : undefined,
    },
  };
}

export default async function CategoryDetailsRoute({ params }: TRouteProps) {
  const { slug } = await params;

  return <CategoryDetailsPage slug={slug} />;
}
