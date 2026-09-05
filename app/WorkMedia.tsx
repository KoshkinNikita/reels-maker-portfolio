"use client";

import { useRef } from "react";

type WorkMediaProps = {
  poster: string;
  video: string;
  alt: string;
};

export default function WorkMedia({
  poster,
  video,
  alt,
}: WorkMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.currentTime = 0;

    videoElement.play().catch(() => {
      // Браузер может запретить autoplay.
      // В таком случае просто остаётся poster.
    });
  };

  const handleMouseLeave = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.pause();
    videoElement.currentTime = 0;
  };

  return (
    <div
      className="amir-work-media"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={poster}
        alt={alt}
        className="amir-work-poster"
      />

      <video
        ref={videoRef}
        className="amir-work-video"
        src={video}
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
      />
    </div>
  );
}