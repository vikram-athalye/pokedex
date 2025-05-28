"use client";

import { useState, useRef } from "react";

type PlayCryButtonProps = {
  src: string;
};

export default function PlayCryButton({ src }: PlayCryButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isPlaying}
      className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {isPlaying ? "Playing..." : "Play Sound"}
    </button>
  );
}
