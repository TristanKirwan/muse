import { IconItemProps } from "..";

export default function Plus({ className }: IconItemProps) {
  return (
    <svg viewBox='0 0 24 24' fill='none' className={className}>
      <path
        d='M4 12h16m-8-8v16'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
