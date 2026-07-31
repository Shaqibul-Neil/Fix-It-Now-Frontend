import {
  AirVent,
  Hammer,
  PaintRoller,
  PlugZap,
  Sparkles,
  Truck,
  Waves,
  WashingMachine,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Backend rows carry no icon — seeded slugs are known ahead of time, so each
// gets a real icon and anything added later still renders (Wrench).
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  plumbing: Waves,
  electrical: PlugZap,
  cleaning: Sparkles,
  painting: PaintRoller,
  "ac-repair": AirVent,
  carpentry: Hammer,
  "appliance-repair": WashingMachine,
  "home-shifting": Truck,
};

export const getCategoryIcon = (slug: string): LucideIcon =>
  CATEGORY_ICONS[slug] ?? Wrench;
