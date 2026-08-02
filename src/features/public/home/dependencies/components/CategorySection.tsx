import { ArrowRight } from "lucide-react";
import { PageHeader, ScrollReveal } from "@/src/components";
import type { ICategoryListItem } from "@/src/features/public/category/dependencies/types/category.types";
import CategoryIndex from "./CategoryIndex";

const CategorySection = ({
  categories,
}: {
  categories: ICategoryListItem[];
}) => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal>
        <PageHeader
          as="h2"
          textVariant="display"
          eyebrow="Browse by trade"
          title="Whatever broke, someone here fixes it"
          description={`The ${categories.length} trades booked most this month. Point at one to see the work behind it.`}
          action={{
            text: "All categories",
            href: "/categories",
            variant: "outline",
            rightIcon: ArrowRight,
          }}
          divClassName="mb-10 md:items-end sm:mb-14"
          contentClassName="max-w-xl"
        />
      </ScrollReveal>

      <CategoryIndex categories={categories} />
    </section>
  );
};

export default CategorySection;
