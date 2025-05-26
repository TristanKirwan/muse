"use client";

import Icon from "@/components/Icon/index";
import cn from "@/utils/general/cn";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface IImageCarouselProps {
  images: { src: string; isThumbnail: boolean }[];
  className?: string;
  imageWrapperClassName?: string;
}

export default function ImageCarousel({
  images,
  className,
  imageWrapperClassName,
}: IImageCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(
    images.findIndex((image) => image.isThumbnail) || 0
  );

  if (!images || images.length === 0) return null;

  function handleNext() {
    setActiveImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < images.length ? nextIndex : 0; // Loop back to the start
    });
  }

  function handlePrev() {
    setActiveImageIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      return prevIndexValue >= 0 ? prevIndexValue : images.length - 1; // Loop to the end
    });
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <div className='relative group'>
        {images.length > 1 && (
          <div className='absolute w-full h-full pointer-events-none flex items-center justify-between z-10 opacity-0 transition-opacity rounded-lg overflow-hidden group-hover:opacity-100'>
            <div className='flex items-center pl-2 pr-10 bg-linear-to-r from-black/20 h-full'>
              <button
                onClick={handlePrev}
                aria-label='See previous image'
                className='pointer-events-auto'
              >
                <Icon
                  type='chevron'
                  className='w-6 h-6 text-foreground rotate-180'
                />
              </button>
            </div>
            <div className='flex items-center pl-10 pr-2 bg-linear-to-l from-black/20 h-full'>
              <button
                onClick={handleNext}
                aria-label='See next image'
                className='pointer-events-auto'
              >
                <Icon type='chevron' className='w-6 h-6 text-foreground' />
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode='popLayout'>
          {images[activeImageIndex] && images[activeImageIndex].src && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={`image-${activeImageIndex}`}
              className={cn(
                "w-full overflow-hidden rounded-lg",
                imageWrapperClassName
              )}
            >
              <Image
                src={images[activeImageIndex].src}
                alt={`Image ${activeImageIndex + 1}`}
                className='w-full h-full object-cover rounded-lg'
                width={600}
                height={400}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className='flex gap-x-2 justify-center'>
          {images.map((image, index) => (
            <button
              key={`thumbnail-${index}`}
              onClick={() => setActiveImageIndex(index)}
              disabled={index === activeImageIndex}
              className={cn(
                "aspect-square w-12 rounded-lg border-2 transition-all hover:opacity-80 focus-visible:opacity-80",
                index === activeImageIndex
                  ? "border-primary opacity-100"
                  : "opacity-40 border-transparent"
              )}
              aria-label={`Select image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className='w-full h-full object-cover rounded-lg'
                width={40}
                height={40}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
