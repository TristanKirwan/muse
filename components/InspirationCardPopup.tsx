import PopupBase from "@/components/PopupBase";
import TagWrapper from "@/components/TagWrapper";
import TextLink from "@/components/TextLink";
import ImageCarousel from "./ImageCarousel";

interface IInspirationCardPopupProps {
  isOpen: boolean;
  callback: () => void;
  title: string;
  description: string;
  images: { src: string; isThumbnail: boolean }[];
  tags: string[];
  link: string | null;
}

export default function InspirationCardPopup({
  isOpen,
  callback,
  title,
  description,
  images,
  tags,
  link,
}: IInspirationCardPopupProps) {
  return (
    <PopupBase isOpen={isOpen} closeCallback={callback}>
      <div>
        {Array.isArray(images) && images.length > 0 && (
          <ImageCarousel images={images} />
        )}
        <div className='flex flex-col gap-y-4'>
          <h3 className='font-semibold text-heading-5'>{title}</h3>
          {Array.isArray(tags) && tags.length > 0 && <TagWrapper tags={tags} />}
          <p className='text-small'>{description}</p>
          {link && (
            <TextLink href={link} label={`View muse`} className='self-end' />
          )}
        </div>
      </div>
    </PopupBase>
  );
}
