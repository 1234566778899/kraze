import { site } from "@/lib/site";

const items = ["Envíos a todo el Perú", "Delivery 24h en Pucallpa y Huánuco", `${site.currentDrop.name} ya disponible`, `Promo ${site.promo}`];

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-ink text-cream">
      <div className="flex h-9 items-center justify-center gap-6 px-4 font-mono text-[11px] tracking-wider uppercase md:gap-12">
        {items.map((item, i) => (
          <span key={item} className={`flex items-center gap-6 md:gap-12 ${i > 0 ? "hidden md:flex" : ""}`}>
            {i > 0 && <span className="text-fire">✦</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
