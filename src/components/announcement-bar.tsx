import { site } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-black">
      <p className="flex h-10 items-center justify-center font-[family-name:var(--font-inter)] text-[8.75px] font-bold tracking-[5px] uppercase">
        {site.currentDrop.name} disponible
      </p>
    </div>
  );
}
