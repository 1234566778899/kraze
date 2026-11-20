const items = [
  ["01", "Envíos a todo el Perú", "Olva / Shalom · 2 a 5 días"],
  ["02", "Paga como quieras", "Yape · Plin · Tarjeta · Transferencia"],
  ["03", "Cambios en 7 días", "Si no te queda, lo cambiamos"],
  ["04", "Te atendemos por WhatsApp", "Lun a Sáb · 9am – 9pm"],
];

export function Benefits() {
  return (
    <section className="bg-paper px-4 py-10 md:px-12" aria-label="Beneficios">
      <div className="mx-auto grid max-w-[1344px] grid-cols-2 gap-y-8 lg:grid-cols-4">
        {items.map(([n, title, sub], i) => (
          <div key={n} className={`flex flex-col gap-2 px-3 md:px-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
            <span className="label text-fire">{n}</span>
            <p className="text-base font-bold md:text-lg">{title}</p>
            <p className="text-[13px] text-stone">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
