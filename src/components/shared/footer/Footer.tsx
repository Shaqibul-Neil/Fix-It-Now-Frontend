import { Text } from "@/src/components";
import { FOOTER_MENU } from "@/src/lib/menus/menus";
import FooterBrand from "./FooterBrand";
import FooterColumn from "./FooterColumn";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-project-aside text-project-aside-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[72px_72px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 xl:px-8">
        {/* 2-1-1-1: the brand block takes twice the width of a link column. */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <FooterBrand className="lg:col-span-2" />

          {FOOTER_MENU.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 pt-8">
          <Text
            variant="normal-xs"
            as="p"
            align="center"
            className="opacity-50"
          >
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </Text>
        </div>
      </div>

      <span aria-hidden className="block h-0.5 w-full bg-project-primary" />
    </footer>
  );
};

export default Footer;
