import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import { cn } from "@/src/lib/utils/cn";
import type { ICategoryListItem } from "../types/category.types";

// Heights alternate down the masonry so no two neighbours line up.
const RATIO = {
  tall: "aspect-4/5",
  wide: "aspect-4/3",
  square: "aspect-square",
} as const;

interface ICategoryCardProps {
  category: ICategoryListItem;
  ratio?: keyof typeof RATIO;
}

const CategoryCard = ({ category, ratio = "wide" }: ICategoryCardProps) => (
  <Link
    href={`/categories/${category.slug}`}
    className="group block break-inside-avoid border border-project-border bg-project-card transition-colors duration-300 hover:border-project-primary"
  >
    <div className={cn("relative w-full overflow-hidden", RATIO[ratio])}>
      {category.image && (
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <span
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent"
      />

      {category.isTrending && (
        <Text
          variant="medium-xs"
          as="span"
          className="absolute right-0 top-0 bg-project-primary px-3 py-1.5 uppercase tracking-[0.18em] text-project-primary-foreground"
        >
          Trending
        </Text>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
        <div className="min-w-0">
          <h3 className="font-semibold leading-tight tracking-tight text-[clamp(1.35rem,2.4vw,1.75rem)]">
            {category.name}
          </h3>

          <Text
            variant="medium-xs"
            as="span"
            className="mt-1.5 block uppercase tracking-[0.2em] text-white/70"
          >
            {`${category.technicianCount} technicians`}
          </Text>
        </div>

        <span className="flex size-9 shrink-0 items-center justify-center border border-white/40 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-project-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </div>

    <div className="space-y-4 p-5">
      {category.description && (
        <Text
          variant="normal-sm"
          as="p"
          className="line-clamp-2 leading-relaxed text-project-muted-foreground"
        >
          {category.description}
        </Text>
      )}

      <div className="flex flex-wrap gap-1.5">
        {category.popularServices.map((service) => (
          <Text
            key={service}
            variant="normal-xs"
            as="span"
            className="border border-project-border px-2.5 py-1 text-project-muted-foreground"
          >
            {service}
          </Text>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-project-border pt-4">
        <Text
          variant="medium-xs"
          as="span"
          className="flex items-center gap-1.5 text-project-accent"
        >
          <Star className="size-3.5 fill-project-primary text-project-primary" />
          {category.averageRating}
          <span className="text-project-muted-foreground">
            {`(${category.totalReviews})`}
          </span>
        </Text>

        <Text variant="semibold-sm-2" as="span" className="text-project-accent">
          {category.startingPrice
            ? `from ${formatMoney(category.startingPrice)}`
            : "No live pricing"}
        </Text>
      </div>
    </div>
  </Link>
);

export default CategoryCard;
