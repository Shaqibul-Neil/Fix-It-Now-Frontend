"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// UUIDs and other long id-looking segments are shortened and never linked.
const isLikelyId = (segment: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    segment,
  ) || (segment.length > 15 && !segment.includes("-"));

const formatSegment = (segment: string) =>
  isLikelyId(segment) ? `${segment.slice(0, 8)}…` : segment.replace(/-/g, " ");

const AppBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1);

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden items-center gap-2 border-l border-project-border pl-4 text-sm md:flex"
    >
      <Link
        href="/dashboard"
        className="text-project-muted-foreground transition-colors duration-300 hover:text-project-primary"
      >
        Dashboard
      </Link>

      {segments.map((segment, index) => {
        const href = `/dashboard/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const isLinkable = !isLast && !isLikelyId(segment);

        return (
          <span key={href} className="flex items-center gap-2">
            <ChevronRight
              aria-hidden
              className="size-3.5 text-project-muted-foreground/40"
            />

            {isLinkable ? (
              <Link
                href={href}
                className="capitalize text-project-muted-foreground transition-colors duration-300 hover:text-project-primary"
              >
                {formatSegment(segment)}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={
                  isLast
                    ? "font-semibold capitalize text-project-accent"
                    : "capitalize text-project-muted-foreground"
                }
              >
                {formatSegment(segment)}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default AppBreadcrumbs;
