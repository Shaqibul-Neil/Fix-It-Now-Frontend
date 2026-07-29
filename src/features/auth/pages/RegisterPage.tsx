import { USER_ROLES } from "@/src/lib/auth/auth.roles";
import AuthCard from "../dependencies/components/AuthCard";
import AuthShell from "../dependencies/components/AuthShell";
import AuthSwitchPrompt from "../dependencies/components/AuthSwitchPrompt";
import RegisterForm from "../dependencies/components/RegisterForm";
import RegisterRoleChoice from "../dependencies/components/RegisterRoleChoice";
import {
  LOGIN_ASIDE,
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

  if (!selectedRole) {
    return (
      <AuthShell aside={{ ...LOGIN_ASIDE, eyebrow: "Create account" }}>
        <AuthCard
          eyebrow="Create account"
          title="How will you use FixItNow?"
          description="Pick the side you are on. You can always add the other one later from your dashboard."
          footer={signInPrompt}
        >
          <RegisterRoleChoice />
        </AuthCard>
      </AuthShell>
    );
  }

  const { eyebrow, title, description, submitLabel } =
    REGISTER_FORM_CONTENT[selectedRole];

  return (
    <AuthShell aside={REGISTER_ASIDE[selectedRole]}>
      <AuthCard
        eyebrow={eyebrow}
        title={title}
        description={description}
        backHref="/register"
        backLabel="Change role"
        footer={signInPrompt}
      >
        <RegisterForm role={selectedRole} submitLabel={submitLabel} />
      </AuthCard>
    </AuthShell>
  );
};

export default RegisterPage;
