import { Logo, Text } from "@/src/components";
import type { IAuthAsideContent } from "../constants/auth.content";

const AuthAside = ({
  eyebrow,
  headlineLines,
  stats,
  marqueeItems,
}: IAuthAsideContent) => {
  return (
    <div className="relative z-10 flex h-full flex-col justify-between gap-10 p-10 xl:p-14">
      <div className="flex items-center justify-between" data-aside-brand>
        {/* text-current so the wordmark picks up the dark panel's ink. */}
        <Logo wordmarkClassName="text-current" />

        <Text
          variant="medium-xs"
          as="span"
          className="uppercase tracking-[0.28em] opacity-60"
        >
          {eyebrow}
        </Text>
      </div>

      <div className="space-y-6">
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
      </div>

      <div className="space-y-8">
        {/* No rule above the numbers — the headline's brass line already divides
            the panel, a second one made this block look boxed in. */}
        <dl className="grid grid-cols-3 gap-6">
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
