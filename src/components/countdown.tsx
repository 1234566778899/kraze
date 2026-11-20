"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const tick = () => setT(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks = [
    ["Días", t?.days],
    ["Horas", t?.hours],
    ["Min", t?.minutes],
    ["Seg", t?.seconds],
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3" role="timer" aria-label="Tiempo para el próximo drop">
      {blocks.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center gap-1 bg-ink px-2 py-4 md:w-30 md:py-5">
          <span className="display text-5xl text-cream tabular-nums md:text-7xl">{value === undefined ? "--" : pad(value)}</span>
          <span className="label text-fire">{label}</span>
        </div>
      ))}
    </div>
  );
}
