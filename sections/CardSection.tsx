"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useCallback, useRef, useState } from "react";

import Filter from "@/components/Filter";
import InspirationCard from "@/components/InspirationCard";

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

const mockCards = [
  {
    title: "Pixel Art",
    description:
      "Explore a vibrant collection of pixel art creations from talented artists worldwide.",
    imageUrl:
      "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "art",
    tags: ["animation", "hover", "design"],
  },
  {
    title: "CodeHub",
    description:
      "A platform for developers to share and discover innovative web projects.",
    imageUrl:
      "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "web",
    tags: ["navigation", "page-transition", "responsive"],
  },
  {
    title: "CineScope",
    description:
      "Dive into reviews and behind-the-scenes stories of your favorite movies.",
    imageUrl:
      "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "movies",
    tags: ["hover", "animation", "media"],
  },
  {
    title: "GameVerse",
    description: "Discover the latest trends and updates in the gaming world.",
    imageUrl:
      "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "games",
    tags: ["page-transition", "interactive", "design"],
  },
  {
    title: "MelodyMix",
    description: "A hub for discovering new music and connecting with artists.",
    imageUrl:
      "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "music",
    tags: ["media", "responsive", "hover"],
  },
  {
    title: "ArtSphere",
    description:
      "Showcasing stunning digital and traditional art from creators around the globe.",
    imageUrl:
      "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "art",
    tags: ["animation", "design", "interactive", "Other", "Bother"],
  },
  {
    title: "WebCraft",
    description:
      "A collection of beautifully designed and functional websites for inspiration.",
    imageUrl:
      "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "web",
    tags: ["page-transition"],
  },
  {
    title: "FilmFanatics",
    description:
      "Join a community of movie enthusiasts sharing reviews and recommendations.",
    imageUrl:
      "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "movies",
    tags: ["media", "hover", "interactive", "design"],
  },
  {
    title: "PlayZone",
    description:
      "Stay updated with the latest gaming news and exclusive previews.",
    imageUrl:
      "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "games",
    tags: ["interactive", "animation", "page-transition"],
  },
  {
    title: "HarmonyHub",
    description:
      "Discover playlists and music recommendations tailored to your taste.",
    imageUrl:
      "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "music",
    tags: ["media", "responsive"],
  },
];

type Direction = "forward" | "backward";

export default function CardSection() {
  const [currentCards, setCurrentCards] = useState(mockCards);
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
    const newCards = mockCards.filter(
      (card) => filterVal === "all" || card.type === filterVal
    );
    setCurrentCards(newCards);
  }, []);

  return (
    <section className='flex flex-col gap-y-10'>
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
  cards: typeof mockCards;
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
            // Brother please enlighten me why this works but initial="initial" doesn't. That would make sense, except for that exit="exit" works?????
            initial={{
              opacity: 0,
              x: direction === "forward" ? 48 : -48,
            }}
            animate='target'
            exit='exit'
            variants={variants}
            className='col-span-full sm:col-span-2 md:col-span-4 lg:col-span-4'
            key={`card-${card.title}`}
            layout
          >
            <InspirationCard
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              tags={card.tags}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </MotionConfig>
  );
}
