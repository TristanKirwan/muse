import TagWrapper from "@/components/TagWrapper";
import cn from "@/utils/general/cn";
import NextImage from "next/image";

interface IInspirationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  className?: string;
}

export default function InspirationCard({
  title,
  description,
  imageUrl,
  tags,
  className,
}: IInspirationCardProps) {
  return (
    <article
      className={cn(
        "bg-background-tint px-1 pt-1 rounded-lg flex flex-col",
        className
      )}
    >
      <NextImage
        src={imageUrl}
        alt=''
        className='w-full h-full object-cover rounded-t-lg aspect-[12/4]'
        width='100'
        height='75'
      />
      <div className='flex px-4 py-4 flex-col gap-y-2'>
        {title && <h2 className='text-body font-bold'>{title}</h2>}
        {description && (
          <p className='text-small font-regular text-foreground-shade'>
            {description}
          </p>
        )}
        {Array.isArray(tags) && tags.length > 0 && <TagWrapper tags={tags} />}
      </div>
    </article>
  );
}
