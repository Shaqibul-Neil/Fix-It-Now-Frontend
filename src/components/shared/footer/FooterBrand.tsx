import { Mail, MapPin, Phone } from "lucide-react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

const CONTACT_LINES = [
  { icon: Phone, value: "+880 1700 000000", href: "tel:+8801700000000" },
  {
    icon: Mail,
    value: "support@fixitnow.com",
    href: "mailto:support@fixitnow.com",
  },
  { icon: MapPin, value: "Dhaka, Bangladesh", href: null },
];

const FooterBrand = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center bg-project-primary text-sm font-bold text-project-primary-foreground">
          F
        </span>
        <Text variant="semibold-base" as="span" className="tracking-tight">
          FixItNow
        </Text>
      </div>

      <Text variant="normal-sm" as="p" className="max-w-xs opacity-60">
        Verified technicians, same-day slots, and payment that only releases
        once you approve the work.
      </Text>

      <ul className="space-y-3">
        {CONTACT_LINES.map(({ icon: ContactIcon, value, href }) => (
          <li key={value} className="flex items-center gap-3">
            <ContactIcon className="size-4 shrink-0 text-project-primary" />

            {href ? (
              <a
                href={href}
                className="text-sm opacity-60 transition-opacity duration-300 hover:opacity-100"
              >
                {value}
              </a>
            ) : (
              <Text variant="normal-sm" as="span" className="opacity-60">
                {value}
              </Text>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterBrand;
