import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AppButton, Text } from "@/src/components";
import type { ICategory } from "@/src/features/dashboard/category/dependencies/types/category.types";
import { getCategoryIcon } from "../constants/category.icons";

const CategorySection = ({ categories }: { categories: ICategory[] }) => {
  if (!categories.length) return null;

  return (
    <section className="border-y border-project-border bg-project-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 xl:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <Text
              variant="medium-xs"
              as="span"
              className="uppercase tracking-[0.28em] text-project-primary"
            >
              Browse by trade
            </Text>
            <Text
              variant="semibold-2xl"
              as="h2"
              className="tracking-tight text-project-accent"
            >
              Popular categories
            </Text>
          </div>

          <AppButton
            text="View all categories"
            href="/categories"
            rightIcon={ArrowRight}
            variant="outline"
            className="w-fit"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            return (
              <Link
                key={category.id}
                href={`/services?category=${category.slug}`}
                className="group flex flex-col items-center gap-4 border border-project-border bg-project-card px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-project-primary hover:shadow-lg"
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-project-border bg-project-muted-primary text-project-primary transition-colors duration-300 group-hover:bg-project-primary group-hover:text-project-primary-foreground">
                  <Icon className="size-6" />
                </span>

                <Text
                  variant="semibold-sm-2"
                  as="span"
                  className="text-project-accent"
                >
                  {category.name}
                </Text>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
