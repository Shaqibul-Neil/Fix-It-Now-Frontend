import AuthCard from "../dependencies/components/AuthCard";
import AuthShell from "../dependencies/components/AuthShell";
import AuthSwitchPrompt from "../dependencies/components/AuthSwitchPrompt";
import ForgotPasswordForm from "../dependencies/components/ForgotPasswordForm";
import { LOGIN_ASIDE } from "../dependencies/constants/auth.content";

const ForgotPasswordPage = () => {
  return (
    <AuthShell aside={{ ...LOGIN_ASIDE, eyebrow: "Account recovery" }}>
      <AuthCard
        eyebrow="Reset password"
        title="Forgot your password?"
        description="Enter the email you signed up with and we will send you a link to set a new password."
        backHref="/login"
        backLabel="Back to sign in"
        footer={
          <AuthSwitchPrompt
            question="Remembered it?"
            linkLabel="Sign in instead"
            href="/login"
          />
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthShell>
  );
};

export default ForgotPasswordPage;
