"use client";

import MostViewed from "@/components/MostViewed";

interface BodyNewsLetterDetailProps {
  body: string;
}

export default function BodyNewsLetterDetail({ body }: BodyNewsLetterDetailProps) {
  return (
    <section className="w-full bg-white min-h-[400px]">
      <div className="w-full flex justify-center py-8">
        <div className="w-full px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[304px_1fr_304px] gap-8 items-start">
            {/* Bloque izquierdo - a 2rem del borde izquierdo */}
            <div className="hidden lg:block w-[304px]">
              <p className="text-black">redes sociales</p>
            </div>

            {/* Bloque central: Contenido del body desde la API (HTML) - centrado */}
            <div className="w-full max-w-[641px] mx-auto">
              <div 
                className="prose prose-lg max-w-none text-black"
                // Renderizar el HTML del body directamente desde la API
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>

            {/* Sección derecha: Most viewed sidebar - a 2rem del borde derecho */}
            <div className="hidden lg:block w-[304px]">
              <MostViewed variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

