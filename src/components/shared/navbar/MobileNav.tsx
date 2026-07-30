"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AppButton, Text } from "@/src/components";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { isActiveMenuItem, PUBLIC_MENU } from "@/src/lib/menus/menus";
import { cn } from "@/src/lib/utils/cn";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex size-9 items-center justify-center border border-project-primary bg-project-primary text-white transition-colors duration-300 hover:bg-project-primary/85 cursor-pointer lg:hidden"
        >
          <Menu className="size-4" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-80 max-w-[85vw] gap-0 border-project-border bg-project-card p-0",
          // Slow-out easing instead of shadcn's ease-in-out — the panel lands
          // without the abrupt stop at the end.
          "ease-[cubic-bezier(0.32,0.72,0,1)]",
          "data-[state=open]:duration-500 data-[state=closed]:duration-400",
        )}
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-project-border px-6">
          <SheetTitle asChild>
            <Text
              variant="medium-xs"
              as="span"
              className="uppercase tracking-[0.28em] text-project-primary"
            >
              Menu
            </Text>
          </SheetTitle>

          <SheetClose
            aria-label="Close menu"
            className="text-project-muted-foreground transition-colors duration-300 hover:text-project-primary cursor-pointer"
          >
            <X className="size-5" />
          </SheetClose>
        </div>

        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col overflow-y-auto"
        >
          {PUBLIC_MENU.map((item, index) => {
            const isActive = isActiveMenuItem(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                // Rows land one after another once the panel is in.
                style={{ animationDelay: `${140 + index * 55}ms` }}
                className={cn(
                  "group flex items-center gap-4 border-b border-project-border px-6 py-4 transition-colors duration-300",
                  "animate-in fade-in slide-in-from-right-6 fill-mode-both duration-500",
                  isActive
                    ? "bg-project-muted-primary/40 text-project-primary"
                    : "text-project-muted-foreground hover:text-project-accent",
                )}
              >
                <span className="font-mono text-xs tracking-[0.2em] text-project-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Text variant="medium-base" as="span" className="flex-1">
                  {item.label}
                </Text>

                <ArrowRight className="size-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-project-border p-6">
          <AppButton
            text="Sign in"
            href="/login"
            rightIcon={ArrowRight}
            onClick={() => setIsOpen(false)}
            className="h-11 w-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
