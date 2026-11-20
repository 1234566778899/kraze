"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/";

/** Muestra el texto con un efecto de "decodificación" la primera vez que entra en pantalla. */
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let raf = 0;
    const run = () => {
      const total = 28;
      const step = () => {
        frame++;
        const revealed = Math.floor((frame / total) * text.length);
        setDisplay(
          text
            .split("")
            .map((ch, i) => (ch === " " || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        );
        if (frame < total) raf = requestAnimationFrame(step);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
