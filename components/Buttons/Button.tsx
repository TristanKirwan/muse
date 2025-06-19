"use client";

import cn from "@/utils/general/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default";
  type: "submit" | "button" | "reset";
}

export default function Button({
  type,
  variant,
  className,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    "px-4 py-1.5",
    variant === "default" &&
      "rounded-lg bg-primary text-small text-black font-semibold",
    className
  );

  if (props.onClick || type === "submit" || type === "reset") {
    return (
      <button className={cn(buttonClasses)} type={type} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
}
