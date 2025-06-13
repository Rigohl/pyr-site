"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type Props = {
  title: string;
  file: string;
};

export default function AudioCard({ title, file }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    waveRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#e879f9",
      progressColor: "#6366f1",
      barWidth: 2,
      height: 80,
    });
    waveRef.current.load(file);
    return () => {
      waveRef.current?.destroy();
    };
  }, [file]);

  const toggle = () => {
    if (!waveRef.current) return;
    waveRef.current.playPause();
    setPlaying(waveRef.current.isPlaying());
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h3 className="font-semibold">{title}</h3>
      <div ref={containerRef} className="cursor-pointer" onClick={toggle} />
      <button
        onClick={() => alert('Checkout aún no configurado')}
        className="w-full bg-indigo-600 text-white rounded-full py-2 mt-2"
      >
        Comprar
      </button>
    </div>
  );
}
