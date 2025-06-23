import DisappearingIcon from "@/components/General/DisappearingIcon";
import cn from "@/utils/general/cn";
import Link from "next/link";

export default function TextLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  if (!href || !label) return null;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-small group w-fit underline focus-visible:no-underline decoration-dashed",
        className
      )}
    >
      {label}{" "}
      <span className='rotate-45'>
        <DisappearingIcon iconType='arrow' />
      </span>
    </Link>
  );
}
