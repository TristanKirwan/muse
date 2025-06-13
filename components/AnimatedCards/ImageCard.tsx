import Image from "next/image";
import ParagraphSkeleton from "../Skeleton/Paragraph";
import SingleLineSkeleton from "../Skeleton/SingleLine";
import Base from "./Base";

export default function ImageCard({
  className,
  innerClassName,
  image,
}: {
  className?: string;
  innerClassName?: string;
  image?: string;
}) {
  if (!image) return null;

  return (
    <Base className={className} innerClassName={innerClassName}>
      <Image
        src={image}
        alt=''
        width={250}
        height={140}
        className='rounded-lg w-full object-cover aspect-video'
      />
      <div className='flex flex-col gap-y-4 px-4 py-2'>
        <SingleLineSkeleton heightVariation='large' className='w-3/5' />
        <ParagraphSkeleton />
      </div>
    </Base>
  );
}
