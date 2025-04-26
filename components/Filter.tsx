"use client";
import { useAnimate } from "motion/react";
import { useEffect, useRef, useState, type UIEvent } from "react";

interface IFilterProps {
  possibleFilters: {
    label: string;
    value: string;
  }[];
}

const springAnimationConfig = {
  type: "spring" as const,
  duration: 0.2,
  bounce: 0,
};

export default function Filter({ possibleFilters }: IFilterProps) {
  const activeFilterRef = useRef<HTMLButtonElement>(null);
  const leftGradientRef = useRef<HTMLSpanElement>(null);
  const rightGradientRef = useRef<HTMLSpanElement>(null);
  const [indicatorRef, animate] = useAnimate();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    possibleFilters[0]?.value
  );

  useEffect(() => {
    if (!indicatorRef.current || !activeFilterRef.current) return;
    const targetValues = calcIndicatorValues(activeFilterRef.current);
    if (!targetValues) return;
    const { targetWidth, targetLeft } = targetValues;
    animateIndicator(targetWidth, targetLeft);
  }, [indicatorRef]);

  function handleMouseOver(event: React.MouseEvent<HTMLButtonElement>) {
    if (!indicatorRef.current) return;
    const target = event.currentTarget;

    const targetValues = calcIndicatorValues(target);
    if (!targetValues) return;
    const { targetWidth, targetLeft } = targetValues;
    animateIndicator(targetWidth, targetLeft);
  }

  function handleMouseLeave() {
    if (!indicatorRef.current || !activeFilterRef.current) return;
    const targetValues = calcIndicatorValues(activeFilterRef.current);
    if (!targetValues) return;
    const { targetWidth, targetLeft } = targetValues;
    animateIndicator(targetWidth, targetLeft);
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    if (!leftGradientRef.current || !rightGradientRef.current) return;
    const target = event.currentTarget;
    const scrollLeft = target.scrollLeft;
    if (scrollLeft > 0) {
      animate(leftGradientRef.current, { opacity: 1 }, springAnimationConfig);
    } else if (scrollLeft === 0) {
      animate(leftGradientRef.current, { opacity: 0 }, springAnimationConfig);
    }

    console.log(
      "scrollLeft, target.scrollWdith - target.clientWidth",
      scrollLeft,
      target.scrollWidth - target.clientWidth
    );

    if (scrollLeft < target.scrollWidth - target.clientWidth) {
      animate(rightGradientRef.current, { opacity: 1 }, springAnimationConfig);
    } else if (scrollLeft === target.scrollWidth - target.clientWidth) {
      animate(rightGradientRef.current, { opacity: 0 }, springAnimationConfig);
    }
  }

  function calcIndicatorValues(target: HTMLElement) {
    if (!target) return null;
    const targetRect = target.getBoundingClientRect();
    const targetWidth = targetRect.width;
    const targetLeft = target.offsetLeft;

    return {
      targetWidth,
      targetLeft,
    };
  }

  function animateIndicator(width: number, left: number) {
    if (!indicatorRef.current) return;

    animate(
      indicatorRef.current,
      { width: width, left },
      springAnimationConfig
    );
  }

  if (!Array.isArray(possibleFilters) || possibleFilters.length === 0)
    return null;

  return (
    <div className='relative overflow-hidden'>
      <span
        className='absolute right-0 h-full w-4 bg-gradient-to-l from-background pointer-events-none z-10'
        ref={rightGradientRef}
      />
      <span
        className='absolute left-0 h-full w-4 bg-gradient-to-r from-background pointer-events-none z-10 opacity-0'
        ref={leftGradientRef}
      />
      <div
        className='relative flex overflow-scroll scrollbar-hidden'
        onScroll={handleScroll}
      >
        <span
          className='absolute bg-background-tint rounded-full h-full -z-10'
          ref={indicatorRef}
        />
        {possibleFilters.map((filter) => (
          <button
            key={filter.value}
            className='px-4 py-1 text-small cursor-pointer'
            onClick={() => setSelectedFilter(filter.value)}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            ref={filter.value === selectedFilter ? activeFilterRef : null}
          >
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
