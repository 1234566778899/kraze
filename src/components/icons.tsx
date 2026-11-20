type P = { className?: string };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const SearchIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const UserIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);

export const HeartIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
);

export const BagIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const TruckIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.5" />
    <circle cx="17" cy="17.5" r="1.5" />
  </svg>
);

export const ArrowIcon = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PlusIcon = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
