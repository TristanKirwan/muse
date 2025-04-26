"use client";
import { useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface IFilterProps {
  possibleFilters: {
    label: string;
    value: string;
  }[];
}

export default function Filter({ possibleFilters }: IFilterProps) {
  const [indicatorRef, animate] = useAnimate();
  const activeFilterRef = useRef<HTMLButtonElement>(null);
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
      { type: "spring", duration: 0.2, bounce: 0 }
    );
  }

  if (!Array.isArray(possibleFilters) || possibleFilters.length === 0)
    return null;

  return (
    <div className='relative flex'>
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
  );
}
