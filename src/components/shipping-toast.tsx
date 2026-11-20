"use client";

import { useState } from "react";
import { CloseIcon, TruckIcon } from "./icons";

export function ShippingToast() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="tech fixed bottom-5 left-5 z-40 hidden items-center gap-3 rounded-full border border-line bg-surface/90 px-4 py-2.5 text-[10px] text-mute backdrop-blur sm:flex">
      <TruckIcon className="size-3.5" />
      Envíos a todo el Perú // Delivery 24h en Pucallpa
      <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar aviso" className="text-snow/70 hover:text-snow">
        <CloseIcon className="size-3" />
      </button>
    </div>
  );
}
