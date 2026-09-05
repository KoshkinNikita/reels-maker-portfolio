"use client";

import { useEffect, useRef } from "react";

type WorkMediaProps = {
  poster: string;
  video: string;
  alt: string;
  isActive?: boolean;
};

export default function WorkMedia({
  poster,
  video,
  alt,
  isActive = false,
}: WorkMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isActive) {
      videoElement.currentTime = 0;
      videoElement.play().catch(() => {});
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const videoElement = videoRef.current;
    if (!videoElement || isActive) return;

    videoElement.pause();
    videoElement.currentTime = 0;
  };

  return (
    <div
      className="amir-work-media"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={poster} alt={alt} className="amir-work-poster" />
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
