// Components only. Types live with the file that owns them, or in src/types
// when several files share them — the barrel never turns into a type index.

// Animation
export { default as PageTransition } from "./common/animation/PageTransition";
export { default as Reveal } from "./common/animation/Reveal";

// Buttons
export { default as AppButton } from "./common/buttons/AppButton";
export { default as IconButton } from "./common/buttons/IconButton";
export { default as StatusPill } from "./common/buttons/StatusPill";
export { default as FormNavigation } from "./common/buttons/FormNavigation";

// Cards
export { default as ProviderAvatar } from "./common/cards/ProviderAvatar";
export { default as StatCard } from "./common/cards/StatCard";
export { default as SummaryRow } from "./common/cards/SummaryRow";

// Inputs
export { default as AppCheckbox } from "./common/inputs/AppCheckbox";
export { default as AppDatePicker } from "./common/inputs/AppDatePicker";
export { default as AppInput } from "./common/inputs/AppInput";
export { default as AppMultipleSelect } from "./common/inputs/AppMultipleSelect";
export { default as AppPasswordInput } from "./common/inputs/AppPasswordInput";
export { default as AppSearch } from "./common/inputs/AppSearch";
export { default as AppSelect } from "./common/inputs/AppSelect";
export { default as AppTextArea } from "./common/inputs/AppTextArea";

// Skeletons
export { default as NotificationSkeleton } from "./common/skeleton/NotificationSkeleton";

// Text
export { default as PageHeader } from "./common/texts/PageHeader";
export { default as Text } from "./common/texts/Text";

// Theme
export { default as ThemeToggle } from "./common/theme/ThemeToggle";

// Footer
export { default as Footer } from "./shared/footer/Footer";

// Navbar
export { default as AppBreadcrumbs } from "./shared/navbar/AppBreadcrumbs";
export { default as DashboardNavbar } from "./shared/navbar/DashboardNavbar";
export { default as Logo } from "./shared/navbar/Logo";
export { default as MobileNav } from "./shared/navbar/MobileNav";
export { default as ProfileDropdown } from "./shared/navbar/ProfileDropdown";
export { default as PublicNavbar } from "./shared/navbar/PublicNavbar";

// Notifications
export { default as NotificationBell } from "./shared/notifications/NotificationBell";

// Sidebar
export { default as AppSidebar } from "./shared/sidebar/AppSidebar";
export { default as OnboardingSidebar } from "./shared/sidebar/OnboardingSidebar";
