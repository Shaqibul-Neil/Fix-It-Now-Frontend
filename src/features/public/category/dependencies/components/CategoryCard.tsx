import Link from "next/link";
import { AppAvatar, Text } from "@/src/components";
import type { ICategory } from "../types/category.types";

const CategoryCard = ({ category }: { category: ICategory }) => (
  <Link
    href={`/services?category=${category.slug}`}
    className="group flex flex-col overflow-hidden border border-project-border bg-project-card transition-all duration-300 hover:-translate-y-1 hover:border-project-primary hover:shadow-lg"
  >
    <div className="relative aspect-video w-full">
      <AppAvatar
        src={category.image}
        name={category.name}
        className="size-full border-0 transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="flex flex-col gap-2 p-4">
      <Text variant="semibold-base" as="h3" truncate>
        {category.name}
      </Text>

      {category.description && (
        <Text
          variant="normal-xs"
          as="p"
          className="line-clamp-2 text-project-muted-foreground"
        >
          {category.description}
        </Text>
      )}
    </div>
  </Link>
);

export default CategoryCard;
