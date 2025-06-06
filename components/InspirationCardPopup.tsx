import PopupBase from "@/components/PopupBase";
import TagWrapper from "@/components/TagWrapper";
import TextLink from "@/components/TextLink";
import { motion, MotionConfig } from "motion/react";
import ImageCarousel from "./ImageCarousel";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "./RichText";

interface IInspirationCardPopupProps {
  isOpen: boolean;
  callback: () => void;
  title: string;
  description: SerializedEditorState;
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
    <MotionConfig transition={{ type: "spring", duration: 0.25, bounce: 0 }}>
      <PopupBase
        isOpen={isOpen}
        closeCallback={callback}
        layoutId={`inspiration-card-wrapper-${title}`}
      >
        <div className='grid gap-y-8 gap-x-10 @2xl:grid-cols-2'>
          <div className='flex flex-col gap-y-4 @2xl:col-start-1 @2xl:row-start-1'>
            <motion.div
              layoutId={`inspiration-card-metadata-${title}`}
              className='flex flex-col gap-y-4'
            >
              <h3 className='font-semibold text-heading-5'>{title}</h3>
              {Array.isArray(tags) && tags.length > 0 && (
                <TagWrapper tags={tags} />
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className='text-small grow inline-block'
            >
              <RichText data={description} />
            </motion.div>
            {link && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className='inline-flex justify-end'
              >
                <TextLink
                  href={link}
                  label={`View muse`}
                  className='self-end'
                />
              </motion.div>
            )}
          </div>
          {Array.isArray(images) && images.length > 0 && (
            <div className='max-w-md w-full mx-auto @2xl:col-start-2 @2xl:row-start-1'>
              <ImageCarousel
                images={images}
                className='flex-col-reverse @2xl:flex-col'
                imageWrapperClassName='aspect-square'
                layoutIdImageWrapper={`inspiration-card-thumbnail-wrapper-${title}`}
              />
            </div>
          )}
        </div>
      </PopupBase>
    </MotionConfig>
  );
}
