import TagWrapper from "@/components/TagWrapper";
import cn from "@/utils/general/cn";
import { motion, MotionConfig } from "motion/react";
import Image from "next/image";

interface IInspirationCardProps {
  title: string;
  description: string;
  images: { src: string; isThumbnail: boolean }[];
  tags: string[];
  className?: string;
}

export default function InspirationCard({
  title,
  description,
  tags,
  images,
  className,
}: IInspirationCardProps) {
  return (
    <MotionConfig transition={{ type: "spring", duration: 0.25, bounce: 0 }}>
      <motion.article
        layoutId={`inspiration-card-wrapper-${title}`}
        className={cn(
          "bg-background-tint px-1 pt-1 rounded-lg flex flex-col h-full",
          className
        )}
      >
        <motion.div className='px-1 pt-1 rounded-lg flex flex-col h-full'>
          <div className='flex px-4 py-4 flex-col items-start gap-y-2 grow'>
            <motion.div
              layoutId={`inspiration-card-metadata-${title}`}
              className='flex flex-col items-start gap-y-2'
            >
              {title && (
                <motion.h2 className='text-body font-bold'>{title}</motion.h2>
              )}
              {Array.isArray(tags) && tags.length > 0 && (
                <motion.div layout>
                  <TagWrapper tags={tags} />
                </motion.div>
              )}
            </motion.div>
            {description && (
              <motion.p
                layout='position'
                className='text-small font-regular text-start text-foreground-shade'
              >
                {description}
              </motion.p>
            )}
            {!!images.length && (
              <motion.div
                layoutId={`inspiration-card-thumbnail-wrapper-${title}`}
                className='flex gap-x-2 justify-center'
              >
                {images.map((img) => (
                  <motion.div
                    className='aspect-square size-12 rounded-lg'
                    key={`img-card-${title}-${img.src}`}
                    layout='position'
                  >
                    <Image
                      src={img.src}
                      className='w-full h-full object-cover rounded-lg'
                      alt=''
                      width={40}
                      height={40}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.article>
    </MotionConfig>
  );
}
