"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return [Math.floor(ms / 86_400_000), Math.floor(ms / 3_600_000) % 24, Math.floor(ms / 60_000) % 60, Math.floor(ms / 1000) % 60];
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState<number[] | null>(null);

  useEffect(() => {
    const tick = () => setT(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const labels = ["Días", "Hrs", "Min", "Seg"];

  return (
    <div className="flex items-start gap-3 md:gap-5" role="timer" aria-label="Tiempo para el próximo drop">
      {labels.map((label, i) => (
        <div key={label} className="flex items-start gap-3 md:gap-5">
          {i > 0 && <span className="display text-4xl text-mute md:text-6xl">:</span>}
          <div className="flex flex-col items-center gap-2">
            <span className="display text-4xl tabular-nums md:text-6xl">{t ? pad(t[i]) : "--"}</span>
            <span className="tech text-[10px] text-mute">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
