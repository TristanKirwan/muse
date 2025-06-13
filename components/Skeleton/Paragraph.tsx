import cn from "@/utils/general/cn";
import SingleLine from "./SingleLine";

export default function ParagraphSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <SingleLine className='w-5/5' />
      <SingleLine className='w-3/5' />
      <SingleLine className='w-4/5' />
      <SingleLine className='w-5/5' />
    </div>
  );
}
