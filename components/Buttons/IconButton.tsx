import type { WithRequired } from "@/types/general";
import cn from "@/utils/general/cn";
import React from "react";
import Icon, { type IconType } from "../Icon";

export interface IconButtonProps
  extends WithRequired<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "aria-label"
  > {
  size: "default";
  colorScheme: "default";
  className?: string;
  iconType: IconType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({
  size = "default",
  iconType,
  colorScheme = "default",
  className,
  onClick,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        `rounded-full flex items-center justify-center border`,
        size === "default" && "w-8 h-8",
        colorScheme === "default" && "border-foreground",
        className
      )}
      {...props}
      type='button'
      onClick={onClick}
    >
      <Icon
        type={iconType}
        className={cn(
          size === "default" && "w-4 h-4",
          colorScheme === "default" && "text-white"
        )}
      />
    </button>
  );
}
