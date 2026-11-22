import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { measurements } from "@/lib/products";

export const metadata: Metadata = {
  title: "Guía de tallas boxy fit",
  description: "Medidas en centímetros de los polos boxy fit KRAZE en tallas S, M y L, y cómo elegir tu talla según el fit que prefieras.",
  alternates: { canonical: "/guia-de-tallas" },
};

export default function SizeGuidePage() {
  return (
    <ContentPage
      kicker="Ayuda"
      title="Guía de tallas"
      intro="Nuestros polos son boxy fit: más anchos, un poco más cortos y con hombros caídos. Compara con un polo que ya tengas."
    >
      <h2>Medidas de la prenda (cm)</h2>
      <table>
        <thead>
          <tr>
            {["Talla", "Largo", "Pecho", "Hombro", "Manga"].map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measurements.map((m) => (
            <tr key={m.size}>
              <th scope="row">{m.size}</th>
              <td>{m.length}</td>
              <td>{m.chest}</td>
              <td>{m.shoulder}</td>
              <td>{m.sleeve}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Medidas del polo en plano. Pecho = de axila a axila. Puede haber una variación de ±1 cm.</p>

      <h2>Cómo elegir tu talla</h2>
      <ul>
        <li>
          <strong>Fit boxy (como en las fotos):</strong> pide tu talla de siempre.
        </li>
        <li>
          <strong>Fit más regular:</strong> pide una talla menos.
        </li>
        <li>
          <strong>Más oversize:</strong> pide una talla más.
        </li>
      </ul>

      <h2>Cómo medir un polo que ya tienes</h2>
      <ol>
        <li>Extiéndelo sobre una superficie plana.</li>
        <li>Largo: desde el punto más alto del hombro hasta el borde inferior.</li>
        <li>Pecho: de axila a axila, en línea recta.</li>
        <li>Compara con la tabla y elige la talla más cercana.</li>
      </ol>
      <p>
        ¿Aún con dudas? Si no te queda, tienes 7 días para <Link href="/cambios-y-devoluciones">cambiar la talla</Link>.
      </p>
    </ContentPage>
  );
}
