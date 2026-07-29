"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils/cn";

interface IProviderAvatarProps {
  src?: string | null;
  name: string;
  className?: string;
}

// "Rahim Uddin" -> "RU". Falls back to "?" so the box is never empty.
const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

  return initials || "?";
};

const ProviderAvatar = ({ src, name, className }: IProviderAvatarProps) => {
  const [isBroken, setIsBroken] = useState(false);
  const showImage = Boolean(src) && !isBroken;

  return (
    <span
      title={name}
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden",
        "border border-project-border bg-project-muted-primary select-none",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          fill
          unoptimized
          sizes="96px"
          className="object-cover"
          onError={() => setIsBroken(true)}
        />
      ) : (
        <span className="text-xs font-semibold leading-none text-project-primary">
          {getInitials(name)}
        </span>
      )}
    </span>
  );
};

export default ProviderAvatar;
