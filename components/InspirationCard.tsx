import PopupBase from "@/components/PopupBase";
import TagWrapper from "@/components/TagWrapper";
import cn from "@/utils/general/cn";
import NextImage from "next/image";
import { useCallback, useState } from "react";
import TextLink from "./TextLink";

interface IInspirationCardProps {
  title: string;
  shortDescription: string;
  longDescription: string;
  images: {
    src: string;
    isThumbnail: boolean;
  }[];
  tags: string[];
  className?: string;
  inspirationLink: string;
}

export default function InspirationCard({
  title,
  shortDescription,
  longDescription,
  images,
  tags,
  className,
  inspirationLink,
}: IInspirationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const thumbnailImage = images.find((image) => image.isThumbnail);

  return (
    <article
      className={cn(
        "bg-background-tint px-1 pt-1 rounded-lg flex flex-col h-full",
        className
      )}
    >
      <button
        className='bg-background-tint px-1 pt-1 rounded-lg flex flex-col h-full'
        onClick={() => setIsOpen(true)}
        aria-label={`View more information about ${title}`}
      >
        {thumbnailImage && (
          <NextImage
            src={thumbnailImage.src}
            alt=''
            className='w-full object-cover rounded-t-lg aspect-[12/4]'
            width='100'
            height='75'
          />
        )}
        <div className='flex px-4 py-4 flex-col gap-y-2 grow'>
          {title && <h2 className='text-body font-bold'>{title}</h2>}
          {shortDescription && (
            <p className='text-small font-regular text-foreground-shade'>
              {shortDescription}
            </p>
          )}
          {Array.isArray(tags) && tags.length > 0 && <TagWrapper tags={tags} />}
        </div>
      </button>
      <PopupBase isOpen={isOpen} closeCallback={handleClose}>
        <div className='flex flex-col gap-y-4'>
          <h3 className='font-semibold text-heading-5'>{title}</h3>
          {Array.isArray(tags) && tags.length > 0 && <TagWrapper tags={tags} />}
          <p className='text-small'>{longDescription}</p>
          <TextLink
            href={inspirationLink}
            label={`View muse`}
            className='self-end'
          />
        </div>
      </PopupBase>
    </article>
  );
}
