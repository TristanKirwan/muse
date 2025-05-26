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
      <div className='grid gap-y-8 gap-x-10 @2xl:grid-cols-2'>
        <div className='flex flex-col gap-y-4 @2xl:col-start-2 @2xl:row-start-1'>
          <h3 className='font-semibold text-heading-5'>{title}</h3>
          {Array.isArray(tags) && tags.length > 0 && <TagWrapper tags={tags} />}
          <p className='text-small grow'>{description}</p>
          {link && (
            <TextLink href={link} label={`View muse`} className='self-end' />
          )}
        </div>
        {Array.isArray(images) && images.length > 0 && (
          <div className='max-w-md w-full mx-auto @2xl:col-start-1 @2xl:row-start-1'>
            <ImageCarousel
              images={images}
              className='flex-col-reverse @2xl:flex-col'
              imageWrapperClassName='aspect-square'
            />
          </div>
        )}
      </div>
    </PopupBase>
  );
}
