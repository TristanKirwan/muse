export default function Tag({ name }: { name: string }) {
  return (
    <span className='capitalize rounded-full px-2 py-1 text-extra-small text-foreground-shade border border-background-tint bg-background-tint-2'>
      {name}
    </span>
  );
}
