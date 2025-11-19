"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRelatedPosts } from "@/hooks/useRelatedPosts";
import { mapPostToNewsletter } from "@/types/newsletter";
import { Newsletter } from "@/types/newsletter";
import NewsLetterArticle from "@/components/NewsLetterCard/NewsLetterArticle";
import { Space_Grotesk } from "next/font/google";
import Modal from "@/components/Modal";
import ModalContent from "@/components/ModalContent/ModalContent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RelatedPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Obtener posts relacionados desde la API
  const { posts, loading, error, refresh } = useRelatedPosts();

  // Mapear posts a newsletters
  const relatedNewsletters: Newsletter[] = useMemo(() => {
    return posts
      .map(mapPostToNewsletter)
      .filter((newsletter): newsletter is Newsletter => newsletter !== null && newsletter !== undefined)
      .slice(0, 3); // Mostrar solo los primeros 3
  }, [posts]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Refrescar los posts cuando se cierra el modal (por si se creó uno nuevo)
    refresh();
  };

  return (
    <section className="w-full text-black py-8">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1309px] flex flex-col px-4 items-center">
          <div
            className={`flex items-center w-full max-w-[1088px] justify-between mb-6 ${spaceGrotesk.className}`}
          >
            <h2 className="text-2xl font-bold">Related Posts</h2>
            <button
              onClick={openModal}
              className="flex items-center gap-2 text-mainPurple hover:opacity-80 transition-opacity"
              style={{
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "0px",
              }}
            >
              New post
              <Image
                src="/icons/RightArrow.svg"
                alt="New post"
                width={24}
                height={24}
                style={{
                  filter:
                    "invert(48%) sepia(79%) saturate(2476%) hue-rotate(243deg) brightness(100%) contrast(100%)",
                }}
              />
            </button>
          </div>
          
          {/* Estado de carga */}
          {loading && (
            <div className="w-full flex justify-center py-12">
              <p className="text-gray-500">Cargando posts relacionados...</p>
            </div>
          )}

          {/* Estado de error */}
          {error && (
            <div className="w-full flex justify-center py-12">
              <p className="text-red-500">Error: {error}</p>
            </div>
          )}

          {/* Lista de posts relacionados */}
          {!loading && !error && (
            <div className="flex flex-wrap gap-6 justify-center">
              {relatedNewsletters.length === 0 ? (
                <p className="text-gray-500 py-12">No hay posts relacionados disponibles</p>
              ) : (
                relatedNewsletters.map((newsletter) => (
                  <Link
                    key={newsletter.id}
                    href={`/newsletter/${newsletter.id}`}
                    className="w-[341.3px] h-[378px] flex-shrink-0"
                  >
                    <article
                      className="p-4 overflow-hidden hover:shadow-lg transition-shadow w-full h-full flex flex-col bg-center bg-cover"
                      style={{ backgroundImage: `url("${newsletter.image}")` }}
                    >
                      <div className="flex items-center justify-center flex-1"></div>
                      <div className="bg-white px-4 py-2 w-fit">
                        <span className="bg-lemonGreen w-fit inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full text-black">
                          {newsletter.category}
                        </span>
                      </div>
                      <NewsLetterArticle newsletter={newsletter} size="small" />
                    </article>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent onClose={closeModal} />
      </Modal>
    </section>
  );
}
