import cn from "@/utils/general/cn";
import Link from "next/link";

export default function TertiaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("text-extra-small underline text-foreground/40", className)}
    >
      {children}
    </Link>
  );
}
