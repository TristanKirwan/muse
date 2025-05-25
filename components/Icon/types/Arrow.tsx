import { IconItemProps } from "..";

export default function Arrow({ className }: IconItemProps) {
  return (
    <svg viewBox='0 0 24 24' fill='none' className={className}>
      <path
        d='M12 5v14m0-14-6 6m6-6 6 6'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
