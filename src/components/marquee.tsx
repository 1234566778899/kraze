const words = ["KRAZE", "New drop", "Heavyweight", "Boxy fit", "Pucallpa-Perú"];

/** Franja inclinada en movimiento. */
export function Marquee() {
  const line = words.join(" // ") + " // ";
  return (
    <div className="relative overflow-hidden py-14" aria-hidden="true">
      <div className="-mx-10 -rotate-2 border-y border-line bg-ink py-3">
        <div className="flex w-max animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="display shrink-0 pr-4 text-lg not-italic md:text-xl" style={{ fontStretch: "110%" }}>
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
