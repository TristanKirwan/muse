import Icon, { type IconType } from "@/components/Icon/index";
import cn from "@/utils/general/cn";

export default function DisappearingIcon({
  iconType,
  className,
}: {
  iconType: IconType;
  className?: string;
}) {
  return (
    <span
      className={cn("grid relative overflow-hidden h-4", className)}
      aria-hidden
    >
      <span className='col-start-1 row-start-1'>
        <Icon
          type={iconType}
          className='w-4 h-4 transition-transform translate-y-0 group-hover:-translate-y-full group-focus:translate-y-full'
        />
      </span>
      <span className='col-start-1 row-start-1'>
        <Icon
          type={iconType}
          className='w-4 h-4 transition-transform translate-y-full group-hover:-translate-y-0 group-focus:translate-y-0'
        />
      </span>
    </span>
  );
}
