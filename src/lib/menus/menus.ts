import {
  BadgeCheck,
  CalendarRange,
  ChartNoAxesColumn,
  ClipboardList,
  CreditCard,
  Folders,
  Home,
  Info,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Settings,
  Star,
  UserRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import type { ElementType } from "react";
import { USER_ROLES, type TUserRole } from "../auth/auth.roles";

export interface IMenuItem {
  label: string;
  href: string;
  icon: ElementType;
  // Section roots ("/", "/dashboard/admin") would stay highlighted for every
  // child route, so they match the pathname exactly instead.
  exact?: boolean;
}

// Shared by the sidebar, the public nav and the mobile drawer.
export const isActiveMenuItem = (pathname: string, item: IMenuItem) =>
  item.exact ? pathname === item.href : pathname.startsWith(item.href);

// Public site navigation — also used by the mobile drawer.
export const PUBLIC_MENU: IMenuItem[] = [
  { label: "Home", href: "/", icon: Home, exact: true },
  { label: "About", href: "/about", icon: Info },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Technicians", href: "/technicians", icon: BadgeCheck },
  { label: "Contact", href: "/contact", icon: Mail },
];

const ADMIN_MENU: IMenuItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
  { label: "Bookings", href: "/dashboard/admin/bookings", icon: ClipboardList },
  { label: "Services", href: "/dashboard/admin/services", icon: Wrench },
  { label: "Categories", href: "/dashboard/admin/categories", icon: Folders },
  { label: "Technicians", href: "/dashboard/admin/technicians", icon: Users },
  { label: "Users", href: "/dashboard/admin/users", icon: UserRound },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "Reviews", href: "/dashboard/admin/reviews", icon: Star },
  {
    label: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: ChartNoAxesColumn,
  },
  { label: "Support", href: "/dashboard/admin/support", icon: LifeBuoy },
  { label: "Profile", href: "/dashboard/admin/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const CUSTOMER_MENU: IMenuItem[] = [
  { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard, exact: true },
  {
    label: "My bookings",
    href: "/dashboard/customer/bookings",
    icon: ClipboardList,
  },
  { label: "Browse services", href: "/dashboard/customer/services", icon: Wrench },
  { label: "Payments", href: "/dashboard/customer/payments", icon: CreditCard },
  { label: "My reviews", href: "/dashboard/customer/reviews", icon: Star },
  {
    label: "Spending",
    href: "/dashboard/customer/analytics",
    icon: ChartNoAxesColumn,
  },
  { label: "Support", href: "/dashboard/customer/support", icon: LifeBuoy },
  { label: "Profile", href: "/dashboard/customer/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/customer/settings", icon: Settings },
];

const TECHNICIAN_MENU: IMenuItem[] = [
  { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard, exact: true },
  { label: "Jobs", href: "/dashboard/technician/jobs", icon: ClipboardList },
  {
    label: "Availability",
    href: "/dashboard/technician/availability",
    icon: CalendarRange,
  },
  { label: "My services", href: "/dashboard/technician/services", icon: Wrench },
  { label: "Earnings", href: "/dashboard/technician/earnings", icon: Wallet },
  { label: "Reviews", href: "/dashboard/technician/reviews", icon: Star },
  {
    label: "Performance",
    href: "/dashboard/technician/analytics",
    icon: ChartNoAxesColumn,
  },
  { label: "Support", href: "/dashboard/technician/support", icon: LifeBuoy },
  { label: "Profile", href: "/dashboard/technician/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/technician/settings", icon: Settings },
];

// One lookup for the sidebar — the role decides which list it renders.
export const DASHBOARD_MENU: Record<TUserRole, IMenuItem[]> = {
  [USER_ROLES.ADMIN]: ADMIN_MENU,
  [USER_ROLES.CUSTOMER]: CUSTOMER_MENU,
  [USER_ROLES.TECHNICIAN]: TECHNICIAN_MENU,
};

// Footer links carry no icons, so they get their own shape.
export interface IFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_MENU: IFooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Plumbing", href: "/services?category=plumbing" },
      { label: "Electrical", href: "/services?category=electrical" },
      { label: "AC & cooling", href: "/services?category=ac-cooling" },
      { label: "Appliance repair", href: "/services?category=appliance" },
      { label: "All categories", href: "/categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our technicians", href: "/technicians" },
      { label: "Contact", href: "/contact" },
      { label: "Become a technician", href: "/register?role=technician" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", href: "/contact" },
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

// Links inside the avatar dropdown. Logout is an action, so it is not listed here.
export const PROFILE_MENU: Record<TUserRole, IMenuItem[]> = {
  [USER_ROLES.ADMIN]: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
    { label: "Profile", href: "/dashboard/admin/profile", icon: UserRound },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
  [USER_ROLES.CUSTOMER]: [
    { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard, exact: true },
    { label: "Profile", href: "/dashboard/customer/profile", icon: UserRound },
    { label: "Settings", href: "/dashboard/customer/settings", icon: Settings },
  ],
  [USER_ROLES.TECHNICIAN]: [
    {
      label: "Dashboard",
      href: "/dashboard/technician",
      icon: LayoutDashboard,
      exact: true,
    },
    { label: "Profile", href: "/dashboard/technician/profile", icon: UserRound },
    {
      label: "Settings",
      href: "/dashboard/technician/settings",
      icon: Settings,
    },
  ],
};
