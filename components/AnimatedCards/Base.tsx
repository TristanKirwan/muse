import cn from "@/utils/general/cn";
export default function Base({
  className,
  innerClassName,
  children,
}: {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      <div className={cn("bg-background-tint rounded-2xl p-2", innerClassName)}>
        <div className='border-background-tint-2 border rounded-lg'>
          {children}
        </div>
      </div>
    </div>
  );
}
