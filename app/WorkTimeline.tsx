"use client";

import { useEffect, useRef, useState } from "react";

type WorkTimelineProps = {
  onProgressChange?: (
    progress: number,
    activeIndex: number
  ) => void;
};

export default function WorkTimeline({
  onProgressChange,
}: WorkTimelineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const line = lineRef.current;

      if (!line) return;

      const timeline = line.parentElement;

      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.15;

      const rawProgress =
        (start - rect.top) /
        (rect.height + start - end);

      const nextProgress = Math.min(
        1,
        Math.max(0, rawProgress)
      );

      setProgress(nextProgress);

      const works =
        timeline.querySelectorAll<HTMLElement>(
          ".amir-work-item"
        );

      let closestIndex = 0;
      let closestDistance = Infinity;

      const screenCenter =
        viewportHeight / 2;

      works.forEach((work, index) => {
        const workRect =
          work.getBoundingClientRect();

        const workCenter =
          workRect.top +
          workRect.height / 2;

        const distance = Math.abs(
          workCenter - screenCenter
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      onProgressChange?.(
        nextProgress,
        closestIndex
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, [onProgressChange]);

  return (
    <div
      ref={lineRef}
      className="amir-scroll-line"
    >
      <div
        className="amir-scroll-line-progress"
        style={{
          height: `${progress * 100}%`,
        }}
      />

      <div
        className="amir-scroll-playhead"
        style={{
          top: `${progress * 100}%`,
        }}
      />
    </div>
  );
}