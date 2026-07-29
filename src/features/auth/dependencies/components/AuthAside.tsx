import Link from "next/link";
import { Text } from "@/src/components";
import type { IAuthAsideContent } from "../constants/auth.content";

const AuthAside = ({
  eyebrow,
  headlineLines,
  intro,
  highlights,
  stats,
  marqueeItems,
}: IAuthAsideContent) => {
  return (
    <div className="relative z-10 flex h-full flex-col justify-between gap-12 p-10 xl:p-14">
      <div className="flex items-center justify-between" data-aside-brand>
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center bg-project-primary text-project-primary-foreground text-sm font-bold">
            F
          </span>
          <Text variant="semibold-base" as="span" className="tracking-tight">
            FixItNow
          </Text>
        </Link>

        <Text
          variant="medium-xs"
          as="span"
          className="uppercase tracking-[0.28em] opacity-60"
        >
          {eyebrow}
        </Text>
      </div>

      <div className="max-w-xl space-y-7">
        <h2 className="font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,3.6vw,3.5rem)]">
          {headlineLines.map((line, index) => (
            // Mask so the line can slide up from underneath.
            <span key={line} className="block overflow-hidden pb-1">
              <span
                data-aside-line
                className={
                  index === headlineLines.length - 1
                    ? "block text-project-primary"
                    : "block"
                }
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          data-aside-rule
          className="h-px w-40 bg-project-primary"
          aria-hidden
        />

        <Text variant="normal-base" as="p" className="max-w-md opacity-70">
          {intro}
        </Text>

        <ul className="space-y-5 pt-2">
          {highlights.map(({ icon: HighlightIcon, title, description }) => (
            <li key={title} data-aside-item className="flex gap-4">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-current/15 bg-current/5">
                <HighlightIcon className="size-4 text-project-primary" />
              </span>
              <span className="space-y-1">
                <Text variant="semibold-sm-2" as="span" className="block">
                  {title}
                </Text>
                <Text
                  variant="normal-sm"
                  as="span"
                  className="block opacity-60"
                >
                  {description}
                </Text>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        <dl className="grid grid-cols-3 gap-6 border-t border-current/10 pt-8">
          {stats.map(({ value, label }) => (
            <div key={label} data-aside-stat className="space-y-1">
              <dt className="sr-only">{label}</dt>
              <dd>
                <Text
                  variant="semibold-xl"
                  as="span"
                  className="block text-project-primary"
                >
                  {value}
                </Text>
                <Text
                  variant="normal-xs"
                  as="span"
                  className="block uppercase tracking-[0.18em] opacity-50"
                >
                  {label}
                </Text>
              </dd>
            </div>
          ))}
        </dl>

        {/* Categories ticker — decorative, so the second copy is hidden from AT. */}
        <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-8 pr-8"
              >
                {marqueeItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-8 whitespace-nowrap"
                  >
                    <Text
                      variant="medium-xs"
                      as="span"
                      className="uppercase tracking-[0.22em] opacity-45"
                    >
                      {item}
                    </Text>
                    <span className="size-1 bg-project-primary" aria-hidden />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAside;
