"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Logo, Text } from "@/src/components";
import { DURATION, EASE, STAGGER } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP);

// A pointer that can hover is the whole premise of the torch.
const HOVER_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Read like a technician's docket for a callout that found nothing.
const DIAGNOSIS = [
  { term: "Fault", detail: "No page is wired to this address." },
  { term: "Likely cause", detail: "A stale link, a typo, or work we removed." },
  { term: "Next step", detail: "Take one of the routes below — all of them live." },
];

const EXITS = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Browse trades" },
  { href: "/technicians", label: "Find a technician" },
  { href: "/contact", label: "Talk to us" },
];

const NotFound = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const pick = <TElement extends HTMLElement>(selector: string) =>
        gsap.utils.toArray<TElement>(selector, root);

      const [torch] = pick("[data-torch]");
      const [bulb] = pick("[data-bulb]");
      const digits = pick("[data-digit]");
      const lines = pick("[data-line]");

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // The digits drop in behind a wipe, tallest thing on the page first.
        gsap.from(digits, {
          clipPath: "inset(0 0 100% 0)",
          y: 40,
          duration: DURATION.slow,
          ease: EASE.out,
          stagger: STAGGER * 2,
          clearProps: "clipPath",
        });

        gsap.from(lines, {
          opacity: 0,
          y: 18,
          duration: DURATION.base,
          ease: EASE.out,
          stagger: STAGGER,
          delay: 0.3,
        });

        // The middle zero is the dead bulb — it never settles.
        if (bulb) {
          gsap
            .timeline({ repeat: -1, repeatDelay: 2.4, delay: 1.2 })
            .to(bulb, { opacity: 0.15, duration: 0.06 })
            .to(bulb, { opacity: 1, duration: 0.06 })
            .to(bulb, { opacity: 0.3, duration: 0.09 })
            .to(bulb, { opacity: 1, duration: 0.12 })
            .to(bulb, { opacity: 0.5, duration: 0.05 })
            .to(bulb, { opacity: 1, duration: 0.2 });
        }
      });

      media.add(HOVER_QUERY, () => {
        if (!torch) return;

        gsap.set(torch, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

        const xTo = gsap.quickTo(torch, "x", {
          duration: DURATION.base,
          ease: EASE.out,
        });

        const yTo = gsap.quickTo(torch, "y", {
          duration: DURATION.base,
          ease: EASE.out,
        });

        const follow = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          xTo(event.clientX - bounds.left);
          yTo(event.clientY - bounds.top);
          gsap.to(torch, { autoAlpha: 1, duration: 0.4 });
        };

        const hide = () => gsap.to(torch, { autoAlpha: 0, duration: 0.3 });

        root.addEventListener("pointermove", follow);
        root.addEventListener("pointerleave", hide);

        return () => {
          root.removeEventListener("pointermove", follow);
          root.removeEventListener("pointerleave", hide);
        };
      });

      return () => media.kill();
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-project-aside text-project-aside-foreground"
    >
      {/* Blueprint grid, the surface the whole page is drawn on. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] bg-[linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] bg-[size:72px_72px]"
      />

      {/* Torchlight — the page is dark, the cursor is what you search with. */}
      <span
        data-torch
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10 hidden size-120 rounded-full bg-[radial-gradient(circle,var(--color-project-aside-primary)_0%,transparent_65%)] opacity-25 blur-2xl lg:block"
      />

      <header className="flex items-center justify-between gap-4 px-4 py-6 sm:px-8">
        <Logo wordmarkClassName="text-current" />

        <Text
          variant="medium-xs"
          as="span"
          className="uppercase tracking-[0.28em] text-current/50"
        >
          Error 404
        </Text>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-12 px-4 py-16 sm:px-8 lg:flex-row lg:items-center lg:gap-20">
        <div className="min-w-0 lg:flex-1">
          <div
            aria-hidden
            className="flex items-start font-semibold leading-[0.78] tracking-tighter text-[clamp(6rem,20vw,15rem)]"
          >
            <span data-digit className="block">
              4
            </span>

            <span
              data-digit
              data-bulb
              className="block text-project-aside-primary"
            >
              0
            </span>

            <span data-digit className="block">
              4
            </span>
          </div>

          <Text variant="normal-sm" as="p" className="sr-only">
            404 — page not found
          </Text>
        </div>

        <div className="min-w-0 space-y-8 lg:max-w-md lg:flex-1">
          <div className="space-y-4">
            <Text
              data-line
              variant="medium-xs"
              as="span"
              className="block uppercase tracking-[0.28em] text-project-aside-primary"
            >
              Nothing at this address
            </Text>

            <h1
              data-line
              className="text-balance font-semibold leading-[1.05] tracking-tight text-[clamp(1.9rem,3.6vw,3rem)]"
            >
              We sent someone. The address was empty.
            </h1>
          </div>

          <dl data-line className="border-t border-current/15">
            {DIAGNOSIS.map((row) => (
              <div
                key={row.term}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-current/15 py-4"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-current/50">
                  {row.term}
                </dt>

                <dd className="text-sm leading-relaxed text-current/80">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>

          <nav data-line aria-label="Ways out">
            <ul>
              {EXITS.map((exit) => (
                <li key={exit.href}>
                  <Link
                    href={exit.href}
                    className="group relative flex items-center justify-between gap-4 border-b border-current/15 py-4"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-project-aside-primary transition-transform duration-500 group-hover:scale-x-100"
                    />

                    <Text
                      variant="semibold-base"
                      as="span"
                      className="transition-colors duration-300 group-hover:text-project-aside-primary"
                    >
                      {exit.label}
                    </Text>

                    <ArrowUpRight className="size-4 shrink-0 -rotate-45 text-current/40 transition-all duration-300 group-hover:rotate-0 group-hover:text-project-aside-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
