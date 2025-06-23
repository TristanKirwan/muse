import type { ChangeEvent } from "react";

import cn from "@/utils/general/cn";

interface ITextInputProps {
  type: "text" | "email" | "tel" | "password";
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  containerClass?: string;
  autoComplete?: string;
}

export default function TextInput({
  type = "text",
  label,
  name,
  placeholder,
  defaultValue,
  required,
  onChange,
  onKeyDown,
  containerClass = "",
  autoComplete,
}: ITextInputProps) {
  const placeholderValue = placeholder || label;
  const finalLabel = required ? `${label} *` : label;
  return (
    <div className={cn("flex flex-col gap-y-2 relative", containerClass)}>
      <label htmlFor={name}>{finalLabel}</label>
      <input
        type={type}
        placeholder={placeholderValue}
        name={name}
        required={required}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id={name}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className={cn(
          "border rounded-sm border-foreground-tint/40 px-2 py-1 outline-0 focus-visible:border-foreground-tint/80 !autofill:bg-primary"
        )}
      />
    </div>
  );
}
