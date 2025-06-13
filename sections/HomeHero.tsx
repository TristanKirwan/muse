import ImageAnimationCard from "@/components/AnimatedCards/ImageCard";
import { domAnimation, LazyMotion } from "motion/react";
import * as m from "motion/react-m";

export default function HomeHero() {
  const mock = [1, 2, 3, 4, 5];
  return (
    <section className='container pt-(--hero-whitespace) overflow-hidden pb-20 -mb-20'>
      <div className='standard-grid'>
        <div className='flex flex-col gap-y-7 col-span-full md:col-span-4 lg:col-span-6'>
          <h1 className='text-heading-1 text-balance'>
            Your muse, close to the heart
          </h1>
          <p className='max-w-sm text-balance'>
            Keep your inspirations close and organized so you can focus on what
            matters most.
          </p>
        </div>
        <div className='grid col-span-full pt-15 md:pt-0 md:col-span-4 lg:col-span-6'>
          <LazyMotion features={domAnimation}>
            {mock.map((_, index) => (
              <m.div
                className='relative transform-3d row-start-1 col-start-1 translate-x-(--translationAmount) pointer-events-none'
                key={`decoration-image-animation-card-${index}`}
                style={
                  {
                    "--translationAmount": `${index * 2.5}rem`,
                    zIndex: mock.length - index,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  visualDuration: 0.5,
                  bounce: 0.6,
                  delay: index * 0.04,
                }}
              >
                <ImageAnimationCard
                  className='rotate-y-50 rotate-x-20 w-80 pointer-events-auto group/image-animation-card'
                  innerClassName='group-hover/image-animation-card:-translate-y-10 transition-transform'
                  image='https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                />
              </m.div>
            ))}
          </LazyMotion>
        </div>
      </div>
    </section>
  );
}
