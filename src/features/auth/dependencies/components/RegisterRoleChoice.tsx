import { Reveal } from "@/src/components";
import { REGISTER_ROLE_OPTIONS } from "../constants/auth.content";
import RoleCard from "./RoleCard";

const RegisterRoleChoice = () => {
  return (
    <Reveal className="grid gap-4" delay={0.15}>
      {REGISTER_ROLE_OPTIONS.map(
        ({ index, role, icon, title, tagline, points }) => (
          <RoleCard
            key={role}
            index={index}
            href={`/register?role=${role.toLowerCase()}`}
            icon={icon}
            title={title}
            tagline={tagline}
            points={points}
          />
        ),
      )}
    </Reveal>
  );
};

export default RegisterRoleChoice;
