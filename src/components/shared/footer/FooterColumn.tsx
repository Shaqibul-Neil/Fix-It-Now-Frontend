import Link from "next/link";
import { Text } from "@/src/components";
import type { IFooterColumn } from "@/src/lib/menus/menus";

const FooterColumn = ({ title, links }: IFooterColumn) => {
  return (
    <div className="space-y-4">
      <Text
        variant="medium-xs"
        as="span"
        className="uppercase tracking-[0.28em] text-project-primary"
      >
        {title}
      </Text>

      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group inline-flex items-center gap-2 text-sm opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              <span className="h-px w-0 bg-project-primary transition-all duration-300 group-hover:w-3" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
