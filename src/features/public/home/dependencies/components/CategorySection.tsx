import { ArrowRight } from "lucide-react";
import { PageHeader, ScrollReveal } from "@/src/components";
import { CATEGORY_LIST } from "@/src/features/public/category/dependencies/constants/category.dummy";
import CategoryIndex from "./CategoryIndex";

const CategorySection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal>
        <PageHeader
          as="h2"
          textVariant="display"
          eyebrow="Browse by trade"
          title="Whatever broke, someone here fixes it"
          description={`${CATEGORY_LIST.length} trades live right now. Point at one to see the work behind it.`}
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

      <CategoryIndex categories={CATEGORY_LIST} />
    </section>
  );
};

export default CategorySection;
