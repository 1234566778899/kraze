"use client";

import { useEffect, useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import { site } from "@/lib/site";

// Hoja de Reclamación Virtual (Libro de Reclamaciones, Perú).
// Solo diseño: falta conectar el envío (correo al consumidor con la copia de la hoja y registro del correlativo).
// Medidas de referencia: tarjeta 776px, padding 24px, campos 38px, botón 58px.

const input =
  "w-full rounded border border-field bg-white px-3 py-1.5 text-base leading-6 tracking-normal text-panel placeholder:text-gray transition-shadow focus:border-[#86b7fe] focus:shadow-[0_0_0_4px_rgba(13,110,253,0.25)] focus:outline-none";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="condensed mb-4 w-full border-b border-rule pb-2 text-base leading-[19px] font-bold">{title}</legend>
      {children}
    </fieldset>
  );
}

function Input({ label, ...props }: ComponentProps<"input"> & { label: string }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input placeholder={label} className={`${input} h-[38px]`} {...props} />
    </label>
  );
}

function Textarea({ label, rows = 2, ...props }: ComponentProps<"textarea"> & { label: string }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <textarea placeholder={label} rows={rows} className={`${input} resize-y`} {...props} />
    </label>
  );
}

function Select({ label, children, ...props }: ComponentProps<"select"> & { label: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select className={`${input} h-[38px] appearance-none pr-9`} {...props}>
        {children}
      </select>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </label>
  );
}

const today = () => new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });

export function ComplaintForm() {
  const [minor, setMinor] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [date, setDate] = useState("");

  // La fecha se calcula en el navegador para evitar diferencias entre servidor y cliente.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valor que solo existe en el cliente
    setDate(today());
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Número de hoja provisional; al conectar el backend debe ser un correlativo real.
    setSent(`KRZ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 border border-rule bg-sheet p-10 text-center shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <p className="condensed text-[32px] font-bold">Reclamación registrada</p>
        <p className="text-gray">
          Hoja N.° <strong className="text-panel">{sent}</strong> · {date}
        </p>
        <p className="max-w-md text-[13.125px] text-gray">
          Te enviaremos una copia a tu correo. Daremos respuesta en un plazo máximo de 15 días hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 border border-rule bg-sheet p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      {/* Datos del proveedor (obligatorios en la hoja) */}
      <div className="flex flex-col gap-1 rounded border border-rule bg-white px-4 py-3 text-[13.125px] text-gray sm:flex-row sm:justify-between">
        <p>
          <span className="font-bold text-panel">{site.legal.razonSocial}</span> · RUC {site.legal.ruc}
          <br />
          {site.legal.direccion}
        </p>
        <p className="sm:text-right">
          Fecha: <span className="font-bold text-panel">{date || "—"}</span>
          <br />
          Hoja N.°: <span className="text-panel">se asigna al enviar</span>
        </p>
      </div>

      <Section title="1. Identificación del consumidor">
        <Input label="Nombre completo" name="nombre" autoComplete="name" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="DNI / CE / RUC" name="documento" inputMode="numeric" required />
          <Input label="Email" name="email" type="email" autoComplete="email" required />
        </div>
        <Input label="Domicilio" name="domicilio" autoComplete="street-address" required />
        <Input label="Teléfono de contacto (9 dígitos)" name="telefono" type="tel" pattern="[0-9]{9}" autoComplete="tel" required />
        <label className="flex items-center gap-2 text-[13.125px] text-gray">
          <input type="checkbox" checked={minor} onChange={(e) => setMinor(e.target.checked)} className="size-4 accent-[#0d6efd]" />
          Soy menor de edad
        </label>
        {minor && <Input label="Nombre del padre, madre o apoderado" name="apoderado" required />}
      </Section>

      <Section title="2. Identificación del bien contratado">
        <div className="grid gap-4 sm:grid-cols-[231fr_479fr]">
          <Select label="Tipo de bien" name="tipo_bien" defaultValue="PRODUCTO">
            <option value="PRODUCTO">PRODUCTO</option>
            <option value="SERVICIO">SERVICIO</option>
          </Select>
          <Input label="Monto (S/)" name="monto" type="number" min="0" step="0.01" inputMode="decimal" />
        </div>
        <Textarea label="¿Qué compró?" name="descripcion_bien" required />
      </Section>

      <Section title="3. Detalle de reclamación">
        <Select label="Tipo" name="tipo_reclamo" defaultValue="RECLAMO">
          <option value="RECLAMO">RECLAMO (Producto)</option>
          <option value="QUEJA">QUEJA (Servicio)</option>
        </Select>
        <Textarea label="Detalle aquí..." name="detalle" rows={4} required />
        <Textarea label="¿Qué solución espera?" name="pedido" required />
      </Section>

      <div className="flex flex-col gap-2 text-[12px] leading-[18px] text-gray">
        <p>
          <strong>Reclamo:</strong> disconformidad relacionada a los productos o servicios. <strong>Queja:</strong> disconformidad no relacionada a los productos
          o servicios, o malestar respecto a la atención al público.
        </p>
        <p>
          La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el
          INDECOPI. El proveedor deberá dar respuesta al reclamo en un plazo no mayor a 15 días hábiles.
        </p>
        <label className="mt-1 flex items-start gap-2 text-[13.125px]">
          <input type="checkbox" required className="mt-1 size-4 shrink-0 accent-[#0d6efd]" />
          Declaro que los datos consignados son correctos y acepto que se me envíe la respuesta al correo indicado.
        </label>
      </div>

      <button type="submit" className="h-[58px] rounded border border-panel bg-panel text-base font-bold tracking-normal text-white uppercase transition-colors hover:bg-black">
        Enviar reclamación
      </button>
    </form>
  );
}
