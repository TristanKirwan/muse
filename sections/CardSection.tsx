"use client";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useCallback, useRef, useState } from "react";

import Filter from "@/components/Filter";
import InspirationCard from "@/components/InspirationCard";
import InspirationCardPopup from "@/components/InspirationCardPopup";

interface ICard {
  title: string;
  shortDescription: SerializedEditorState;
  longDescription: SerializedEditorState;
  type: string;
  tags: string[];
  images: { src: string; isThumbnail: boolean }[];
}

const mockFilters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Web",
    value: "web",
  },
  {
    label: "Art",
    value: "art",
  },
  {
    label: "Movies",
    value: "movies",
  },
  {
    label: "Games",
    value: "games",
  },
  {
    label: "Music",
    value: "music",
  },
];

type Direction = "forward" | "backward";

export default function CardSection({ items }: { items: ICard[] }) {
  const [currentCards, setCurrentCards] = useState(items);
  const [direction, setDirection] = useState<Direction>("forward");
  const currentFilter = useRef(mockFilters[0].value);

  const changeFilter = useCallback((filterVal: string) => {
    const indexOfCurrentFilter = mockFilters.findIndex(
      (filter) => filter.value === currentFilter.current
    );
    const indexOfNewFilter = mockFilters.findIndex(
      (filter) => filter.value === filterVal
    );

    currentFilter.current = filterVal;
    setDirection(
      indexOfCurrentFilter < indexOfNewFilter ? "forward" : "backward"
    );
    const newCards = items.filter(
      (card) => filterVal === "all" || card.type === filterVal
    );
    setCurrentCards(newCards);
  }, []);

  return (
    <section className='flex flex-col gap-y-10 container'>
      <Filter possibleFilters={mockFilters} filterCallback={changeFilter} />
      <div className='standard-grid gap-y-6'>
        <AnimationWrapper cards={currentCards} direction={direction} />
      </div>
    </section>
  );
}

function AnimationWrapper({
  cards,
  direction,
}: {
  cards: ICard[];
  direction: Direction;
}) {
  const variants = {
    initial: (direction: Direction) => ({
      opacity: 0,
      x: direction === "forward" ? 48 : -48,
    }),
    target: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: Direction) => ({
      opacity: 0,
      x: direction === "forward" ? -48 : 48,
    }),
  };

  return (
    <MotionConfig>
      <AnimatePresence mode='popLayout' custom={direction}>
        {cards.map((card) => (
          <motion.div
            initial='initial'
            animate='target'
            exit='exit'
            variants={variants}
            custom={direction}
            className='col-span-full sm:col-span-2 md:col-span-4 lg:col-span-4'
            key={`card-${card.title}`}
            layout
          >
            <GridItem {...card} />
          </motion.div>
        ))}
      </AnimatePresence>
    </MotionConfig>
  );
}

function GridItem(card: ICard) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label={`Read more about ${card.title}`}
        className='h-full'
      >
        <InspirationCard
          title={card.title}
          description={card.shortDescription}
          tags={card.tags}
          images={card.images}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <InspirationCardPopup
            isOpen={isOpen}
            callback={handleClose}
            title={card.title}
            description={card.longDescription}
            images={card.images}
            tags={card.tags}
            link={"https://tristankirwan.com"}
          />
        )}
      </AnimatePresence>
    </>
  );
}
