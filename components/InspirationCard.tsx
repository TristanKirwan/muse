import TagWrapper from "@/components/TagWrapper";
import cn from "@/utils/general/cn";
import { motion, MotionConfig } from "motion/react";

interface IInspirationCardProps {
  title: string;
  description: string;
  image: { src: string; isThumbnail: boolean } | null;
  tags: string[];
  className?: string;
}

export default function InspirationCard({
  title,
  description,
  tags,
  image,
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
          {/* {image && (
            <NextImage
              src={image.src}
              alt=''
              className='w-full object-cover rounded-t-lg aspect-[12/4]'
              width='100'
              height='75'
            />
          )} */}
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
          </div>
        </motion.div>
      </motion.article>
    </MotionConfig>
  );
}
