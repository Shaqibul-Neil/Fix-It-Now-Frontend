import AuthCard from "../dependencies/components/AuthCard";
import AuthShell from "../dependencies/components/AuthShell";
import AuthSwitchPrompt from "../dependencies/components/AuthSwitchPrompt";
import LoginForm from "../dependencies/components/LoginForm";
import { LOGIN_ASIDE } from "../dependencies/constants/auth.content";

const LoginPage = () => {
  return (
    <AuthShell aside={LOGIN_ASIDE}>
      <AuthCard
        eyebrow="Sign in"
        title="Welcome back to FixItNow"
        description="Sign in to book a technician, follow a job in progress, or pick up exactly where you left off."
        footer={
          <AuthSwitchPrompt
            question="New to FixItNow?"
            linkLabel="Create an account"
            href="/register"
          />
        }
      >
        <LoginForm />
      </AuthCard>
    </AuthShell>
  );
};

export default LoginPage;
