import Link from "next/link";
import { Text } from "@/src/components";

interface IAuthSwitchPromptProps {
  question: string;
  linkLabel: string;
  href: string;
}

// The "already have an account?" line at the bottom of every auth screen.
const AuthSwitchPrompt = ({
  question,
  linkLabel,
  href,
}: IAuthSwitchPromptProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-project-border pt-6">
      <Text variant="normal-sm" as="span" className="text-project-muted-foreground">
        {question}
      </Text>

      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm font-semibold text-project-primary"
      >
        {linkLabel}
        <span className="h-px w-4 bg-project-primary transition-all duration-300 group-hover:w-7" />
      </Link>
    </div>
  );
};

export default AuthSwitchPrompt;
