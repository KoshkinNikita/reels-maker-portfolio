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
      // Активному видео даём приоритет на загрузку
      videoElement.preload = "auto";
      videoElement.load();

      const playVideo = () => {
        videoElement.currentTime = 0;
        videoElement.play().catch(() => {});
      };

      if (videoElement.readyState >= 2) {
        playVideo();
      } else {
        videoElement.addEventListener("canplay", playVideo, {
          once: true,
        });
      }

      return () => {
        videoElement.removeEventListener("canplay", playVideo);
      };
    }

    // Неактивные видео не конкурируют за сеть
    videoElement.pause();
    videoElement.currentTime = 0;
    videoElement.preload = "none";
  }, [isActive]);

  const handleMouseEnter = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // При наведении разрешаем браузеру начать загрузку
    if (videoElement.preload === "none") {
      videoElement.preload = "auto";
      videoElement.load();
    }

    videoElement.play().catch(() => {});
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
        preload={isActive ? "auto" : "none"}
        aria-hidden="true"
      />
    </div>
  );
}