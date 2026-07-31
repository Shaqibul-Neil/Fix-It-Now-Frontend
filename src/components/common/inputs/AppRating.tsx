"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

interface IAppRatingProps {
  value: number;
  onChange?: (value: number) => void;
  label?: string;
  error?: string;
  caption?: string;
  max?: number;
  size?: number;
  readOnly?: boolean;
  className?: string;
  // "inverted" reads white-on-dark, for ratings placed over a photo overlay.
  tone?: "default" | "inverted";
}

const AppRating = ({
  value,
  onChange,
  label,
  error,
  caption,
  max = 5,
  size = 22,
  readOnly = false,
  className,
  tone = "default",
}: IAppRatingProps) => {
  const [hovered, setHovered] = useState(0);
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  // Hovering previews the score without committing it.
  const shown = hovered || value;

  if (readOnly) {
    const isInverted = tone === "inverted";

    return (
      <span
        className={cn("inline-flex items-center gap-1", className)}
        aria-label={`${value} out of ${max}`}
      >
        {stars.map((star) => (
          <Star
            key={star}
            size={size}
            aria-hidden
            className={cn(
              "shrink-0",
              star <= value
                ? isInverted
                  ? "fill-white text-white"
                  : "fill-project-primary text-project-primary"
                : isInverted
                  ? "text-white/35"
                  : "text-project-border",
            )}
          />
        ))}

        {caption && (
          <Text
            variant="normal-xs"
            as="span"
            className={cn(
              "ml-1",
              isInverted ? "text-white/80" : "text-project-muted-foreground",
            )}
          >
            {caption}
          </Text>
        )}
      </span>
    );
  }

  return (
    <div className={cn("flex min-w-0 flex-col gap-1 text-left", className)}>
      {label && (
        <Text variant="label-sm" as="span" className="text-project-foreground">
          {label}
        </Text>
      )}

      <div
        role="radiogroup"
        aria-label={label ?? "Rating"}
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange?.(star)}
            className="cursor-pointer rounded-md p-1 outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-project-primary/40"
          >
            <Star
              size={size}
              className={cn(
                "shrink-0 transition-colors duration-200",
                star <= shown
                  ? "fill-project-primary text-project-primary"
                  : "text-project-border",
              )}
            />
          </button>
        ))}

        {caption && (
          <Text
            variant="normal-sm"
            as="span"
            className="ml-2 text-project-muted-foreground"
          >
            {caption}
          </Text>
        )}
      </div>

      {error && (
        <p className="ml-1 text-xs text-project-destructive">{error}</p>
      )}
    </div>
  );
};

export default AppRating;
