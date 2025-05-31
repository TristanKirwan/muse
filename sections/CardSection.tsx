"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useCallback, useRef, useState } from "react";

import Filter from "@/components/Filter";
import InspirationCard from "@/components/InspirationCard";
import InspirationCardPopup from "@/components/InspirationCardPopup";

interface ICard {
  title: string;
  shortDescription: string;
  longDescription: string;
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

const mockCards = [
  {
    title: "Pixel Art",
    shortDescription:
      "Explore a vibrant collection of pixel art creations from talented artists worldwide.",
    longDescription:
      "Pixel Art is a platform dedicated to showcasing the beauty and creativity of pixel art. Dive into a world of intricate designs and colorful creations crafted by talented artists from around the globe. Whether you're a fan of retro aesthetics or modern pixel masterpieces, this collection offers endless inspiration and a chance to connect with the pixel art community.",
    type: "art",
    tags: ["animation", "hover", "design"],
    images: [
      {
        src: "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: true,
      },
      {
        src: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
      {
        src: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
    ],
  },
  {
    title: "CodeHub",
    shortDescription:
      "A platform for developers to share and discover innovative web projects.",
    longDescription:
      "CodeHub is the ultimate destination for developers looking to share their work and find inspiration in cutting-edge web projects. From responsive designs to advanced animations, this platform highlights the best in web development. Join a community of like-minded creators and explore a curated collection of innovative ideas and solutions.",
    type: "web",
    tags: ["navigation", "page-transition", "responsive"],
    images: [
      {
        src: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: true,
      },
      {
        src: "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
      {
        src: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
    ],
  },
  {
    title: "CineScope",
    shortDescription:
      "Dive into reviews and behind-the-scenes stories of your favorite movies.",
    longDescription:
      "CineScope is your go-to hub for all things cinema. Discover in-depth reviews, exclusive behind-the-scenes stories, and fascinating insights into your favorite movies. Whether you're a casual viewer or a film enthusiast, CineScope offers a rich collection of content to deepen your appreciation for the art of filmmaking.",
    type: "movies",
    tags: ["hover", "animation", "media"],
    images: [
      {
        src: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: true,
      },
      {
        src: "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
      {
        src: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
    ],
  },
  {
    title: "GameVerse",
    shortDescription:
      "Discover the latest trends and updates in the gaming world.",
    longDescription:
      "GameVerse is the ultimate destination for gamers seeking the latest news, trends, and updates in the gaming industry. From exclusive previews to in-depth analyses, this platform keeps you informed and entertained. Whether you're into console, PC, or mobile gaming, GameVerse has something for everyone.",
    type: "games",
    tags: ["page-transition", "interactive", "design"],
    images: [
      {
        src: "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: true,
      },
      {
        src: "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
      {
        src: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
    ],
  },
  {
    title: "MelodyMix",
    shortDescription:
      "A hub for discovering new music and connecting with artists.",
    longDescription:
      "MelodyMix is a vibrant platform for music lovers to explore new tracks, discover emerging artists, and connect with the music community. From curated playlists to artist spotlights, MelodyMix offers a rich and immersive experience for anyone passionate about music. Dive in and let the rhythm guide you.",
    type: "music",
    tags: ["media", "responsive", "hover"],
    images: [
      {
        src: "https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: true,
      },
      {
        src: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
      {
        src: "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        isThumbnail: false,
      },
    ],
  },
  // Add similar transformations for the remaining cards...
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

  const thumbnailImage = card.images.find((image) => image.isThumbnail) || null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={`Read more about ${card.title}`}
        className='h-full'
      >
        <InspirationCard
          title={card.title}
          description={card.shortDescription}
          image={thumbnailImage}
          tags={card.tags}
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
