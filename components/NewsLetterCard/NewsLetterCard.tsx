import Link from "next/link";
import Image from "next/image";
import { Newsletter } from "@/types/newsletter";
import NewsLetterArticle from "./NewsLetterArticle";

interface NewsLetterCardProps {
  newsletter: Newsletter;
  size: "large" | "small";
  position: "left" | "right";
  // OPTIMIZACIÓN: Prop para marcar imágenes prioritarias (above the fold)
  priority?: boolean;
}

export default function NewsLetterCard({
  newsletter,
  size,
  priority = false,
}: NewsLetterCardProps) {
  // Validar que newsletter existe
  if (!newsletter) {
    return null;
  }

  const dimensions =
    size === "large" 
      ? "w-[327px] md:w-[528px] h-[378px] md:h-[790px]" 
      : "w-[327px] md:w-[412px] h-[378px] md:h-[379px]";

  // OPTIMIZACIÓN: Usar la imagen de la API o una imagen por defecto si no está disponible
  const backgroundImage = newsletter?.image || "/exampleBG.png";

  return (
    <Link
      href={`/newsletter/${newsletter.id}`}
      className={`${dimensions} flex-shrink-0 relative`}
    >
      <article className="p-4 overflow-hidden hover:shadow-lg transition-shadow w-full h-full flex flex-col relative">
        {/* OPTIMIZACIÓN: Usar Next.js Image en lugar de backgroundImage para mejor rendimiento
            - fill: La imagen llena el contenedor padre
            - object-cover: Mantiene el aspect ratio y cubre el área
            - priority: Carga inmediata para imágenes above the fold (solo primeras 3-6)
            - loading: Lazy loading para imágenes fuera del viewport inicial
            - sizes: Informa al navegador qué tamaño cargar según el breakpoint
            - placeholder: Muestra un blur mientras carga (mejora percepción de velocidad)
        */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={newsletter.title || "Newsletter cover"}
            fill
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={
              size === "large"
                ? "(max-width: 768px) 327px, 528px"
                : "(max-width: 768px) 327px, 412px"
            }
            // OPTIMIZACIÓN: Configurar calidad de imagen (75 es un buen balance entre calidad y tamaño)
            quality={75}
            // OPTIMIZACIÓN: Placeholder blur solo para imágenes locales (las externas no lo soportan por defecto)
            // Para imágenes externas, Next.js mostrará un espacio vacío hasta que cargue
            {...(backgroundImage.startsWith("/") && {
              placeholder: "blur",
              blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
            })}
          />
        </div>
        
        {/* OPTIMIZACIÓN: Contenido con z-index para estar sobre la imagen */}
        <div className="relative z-10 flex flex-col h-full">
          <div
            className={`flex items-center justify-center ${
              size === "large" ? "flex-[2]" : "flex-1"
            }`}
          ></div>
          <div className="bg-white px-4 py-2 w-fit">
            <span className="bg-lemonGreen w-fit inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full text-black">
              {newsletter.category}
            </span>
          </div>
          <NewsLetterArticle newsletter={newsletter} size={size} />
        </div>
      </article>
    </Link>
  );
}
