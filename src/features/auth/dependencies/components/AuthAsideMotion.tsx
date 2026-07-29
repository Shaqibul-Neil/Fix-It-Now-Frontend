"use client";

import type { ReactNode } from "react";
import { useAuthAsideTimeline } from "../animation/useAuthAsideTimeline";

const AuthAsideMotion = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const asideRef = useAuthAsideTimeline();

  return (
    <aside ref={asideRef} className={className}>
      {children}
    </aside>
  );
};

export default AuthAsideMotion;
