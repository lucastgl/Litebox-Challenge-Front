"use client";

import MostViewed from "@/components/MostViewed";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const socials = [
  { href: "#", label: "LinkedIn", icon: "/icons/LinkedIn.svg" },
  { href: "#", label: "Facebook", icon: "/icons/Fb.svg" },
  { href: "#", label: "X", icon: "/icons/X.svg" },
];

interface BodyNewsLetterDetailProps {
  body: string;
}

/**
 * Detecta si el contenido es HTML o Markdown
 * @param content - Contenido a analizar
 * @returns true si parece ser HTML, false si parece ser Markdown
 * 
 * Lógica de detección:
 * - Si contiene tags HTML (como <p>, <div>, <h1>, etc.), es HTML
 * - Si no contiene tags HTML pero tiene sintaxis Markdown, es Markdown
 * - Los posts de la API externa vienen con HTML
 * - Los posts relacionados de Firebase vienen con Markdown
 */
function isHTML(content: string): boolean {
  // Si el contenido está vacío, asumimos que es HTML por defecto
  if (!content || content.trim().length === 0) {
    return true;
  }

  // Verificar si contiene tags HTML comunes
  // Buscar patrones como <tag>, </tag>, <tag/>, etc.
  // Ejemplos: <p>, <div>, <h1>, <span>, <img>, etc.
  const htmlTagPattern = /<\/?[a-z][a-z0-9]*\s*[^>]*>/i;
  
  // Si encuentra tags HTML, es HTML
  if (htmlTagPattern.test(content)) {
    return true;
  }

  // Si no tiene tags HTML, asumimos que es Markdown
  // (los posts relacionados de Firebase vienen en Markdown)
  return false;
}

export default function BodyNewsLetterDetail({ body }: BodyNewsLetterDetailProps) {
  // Detectar si el body es HTML o Markdown
  const isHTMLContent = isHTML(body);

  return (
    <section className="w-full bg-white min-h-[400px]">
      <div className="w-full flex justify-center py-8">
        <div className="w-full px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[304px_1fr_304px] gap-8 items-start">
            {/* Bloque izquierdo - a 2rem del borde izquierdo */}
            <div className="hidden lg:block w-[304px]">
              <p 
                className={`text-black ${spaceGrotesk.className}`}
                style={{
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "18px",
                  lineHeight: "130%",
                  letterSpacing: "0px",
                }}
              >
                Share on
              </p>
              <div className="flex items-center gap-6 mt-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={24}
                      height={24}
                      style={{
                        filter: "brightness(0) saturate(100%)",
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Bloque central: Contenido del body - centrado */}
            <div className="w-full max-w-[641px] mx-auto">
              {isHTMLContent ? (
                // Renderizar HTML directamente desde la API externa
                <div 
                  className="prose prose-lg max-w-none text-black"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ) : (
                // Renderizar Markdown desde Firebase (posts relacionados)
                <div className="prose prose-lg max-w-none text-black">
                  <ReactMarkdown>{body}</ReactMarkdown>
                </div>
              )}
              
              {/* Share on - Mobile: aparece al final del texto */}
              <div className="lg:hidden mt-8">
                <p 
                  className={`text-black ${spaceGrotesk.className}`}
                  style={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontStyle: "normal",
                    fontSize: "18px",
                    lineHeight: "130%",
                    letterSpacing: "0px",
                  }}
                >
                  Share on
                </p>
                <div className="flex items-center gap-6 mt-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={social.icon}
                        alt={social.label}
                        width={24}
                        height={24}
                        style={{
                          filter: "brightness(0) saturate(100%)",
                        }}
                      />
                    </a>
                  ))}
                </div>
              </div>
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

