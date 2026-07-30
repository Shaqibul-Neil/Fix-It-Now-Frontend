import { USER_ROLES } from "@/src/lib/auth/auth.roles";
import AuthCard from "../dependencies/components/AuthCard";
import AuthShell from "../dependencies/components/AuthShell";
import AuthSwitchPrompt from "../dependencies/components/AuthSwitchPrompt";
import RegisterForm from "../dependencies/components/RegisterForm";
import RegisterRoleChoice from "../dependencies/components/RegisterRoleChoice";
import {
  REGISTER_ASIDE,
  REGISTER_FORM_CONTENT,
  type TRegisterRole,
} from "../dependencies/constants/auth.content";

const resolveRegisterRole = (role?: string): TRegisterRole | null => {
  const upperCased = role?.toUpperCase();

  if (upperCased === USER_ROLES.CUSTOMER) return USER_ROLES.CUSTOMER;
  if (upperCased === USER_ROLES.TECHNICIAN) return USER_ROLES.TECHNICIAN;
  return null;
};

const signInPrompt = (
  <AuthSwitchPrompt
    question="Already have an account?"
    linkLabel="Sign in"
    href="/login"
  />
);

const RegisterPage = ({ role }: { role?: string }) => {
  const selectedRole = resolveRegisterRole(role);

  // Role choice runs without the aside: the two cards are the whole screen, so
  // they take the full width and sit next to each other.
  if (!selectedRole) {
    return (
      <AuthShell contentClassName="max-w-4xl">
        <AuthCard
          eyebrow="Create account"
          title="How will you use FixItNow?"
          description="Pick the side you are on. You can add the other one later from your dashboard."
          footer={signInPrompt}
        >
          <RegisterRoleChoice />
        </AuthCard>
      </AuthShell>
    );
  }

  const { eyebrow, title, description } = REGISTER_FORM_CONTENT[selectedRole];

  return (
    // Wider than the login column: this form runs two fields per row, so the
    // inputs need the extra width to stop reading as cramped.
    <AuthShell aside={REGISTER_ASIDE[selectedRole]} contentClassName="max-w-128">
      <AuthCard
        eyebrow={eyebrow}
        title={title}
        description={description}
        backHref="/register"
        backLabel="Change role"
        footer={signInPrompt}
      >
        <RegisterForm role={selectedRole} />
      </AuthCard>
    </AuthShell>
  );
};

export default RegisterPage;
