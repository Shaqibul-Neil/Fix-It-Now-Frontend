import type { LucideIcon } from "lucide-react";

export interface IAboutPrinciple {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface IVettingStep {
  id: string;
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
}

export interface IMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
}
