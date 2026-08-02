import type { LucideIcon } from "lucide-react";

export interface IContactChannel {
  id: string;
  label: string;
  value: string;
  href?: string;
  meta: string;
  icon: LucideIcon;
}

export interface IContactDesk {
  id: string;
  title: string;
  description: string;
  email: string;
  responseHours: number;
  icon: LucideIcon;
}
