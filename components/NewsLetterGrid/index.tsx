"use client";

import { useMemo } from "react";
import { Newsletter } from "@/types/newsletter";
import { usePosts } from "@/hooks/usePosts";
import { mapPostToNewsletter } from "@/types/newsletter";
import { useTopicsStore } from "@/store/topicsStore";
import NewsLetterCard from "@/components/NewsLetterCard/NewsLetterCard";
import BannerIntermedio from "@/components/BannerIntermedio/BannerIntermedio";

export default function NewsLetterGrid() {
  // Obtener posts desde la API del backend
  const { posts, loading, error } = usePosts();
  
  // Obtener el topic seleccionado del store global
  const selectedTopic = useTopicsStore((state) => state.selectedTopic);

  // Agrupar newsletters en grupos de 3
  const groupNewsletters = (newsletters: Newsletter[]) => {
    const groups: Newsletter[][] = [];
    for (let i = 0; i < newsletters.length; i += 3) {
      groups.push(newsletters.slice(i, i + 3));
    }
    return groups;
  };

  // Mapear posts de la API a newsletters y filtrar por topic seleccionado
  const newsletters: Newsletter[] = useMemo(() => {
    const mapped = posts
      .map(mapPostToNewsletter)
      .filter((newsletter): newsletter is Newsletter => newsletter !== null && newsletter !== undefined);

    // Si hay un topic seleccionado, filtrar por ese topic
    // Si selectedTopic es null, mostrar todos (no filtrar)
    if (selectedTopic === null) {
      return mapped;
    }

    return mapped.filter((newsletter) => newsletter.category === selectedTopic);
  }, [posts, selectedTopic]);

  const groups = groupNewsletters(newsletters);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="w-full md:w-[976px] flex items-center justify-center py-12">
        <p className="text-gray-500">Cargando posts...</p>
      </div>
    );
  }

  // Mostrar error si hay alguno
  if (error) {
    return (
      <div className="w-full md:w-[976px] flex items-center justify-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Si no hay posts, mostrar mensaje
  if (newsletters.length === 0) {
    return (
      <div className="w-full md:w-[976px] flex items-center justify-center py-12">
        <p className="text-gray-500">No hay posts disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[976px]">
      <div className="space-y-6">
        {groups.map((group, groupIndex) => {
          const isFirstPattern = groupIndex % 2 === 0;
          
          return (
            <div key={groupIndex}>
              {/* Mobile: Layout vertical simple */}
              <div className="flex flex-col md:hidden gap-[33px]">
                {group.map((newsletter, index) => (
                  <NewsLetterCard
                    key={newsletter.id}
                    newsletter={newsletter}
                    size="large"
                    position="left"
                    // OPTIMIZACIÓN: Priorizar carga de las primeras 3 imágenes (above the fold en mobile)
                    priority={groupIndex === 0 && index < 3}
                  />
                ))}
              </div>
              
              {/* Desktop: Layout con patrón alternado */}
              <div className="hidden md:flex md:flex-row gap-[33px]">
                {isFirstPattern ? (
                  // Patrón 1: Grande izquierda, pequeños derecha
                  <>
                    {group[0] && (
                      <NewsLetterCard
                        newsletter={group[0]}
                        size="large"
                        position="left"
                        // OPTIMIZACIÓN: Priorizar primera imagen del primer grupo (above the fold)
                        priority={groupIndex === 0}
                      />
                    )}
                    <div className="flex flex-col gap-[33px]">
                      {group[1] && (
                        <NewsLetterCard
                          newsletter={group[1]}
                          size="small"
                          position="right"
                          // OPTIMIZACIÓN: Priorizar segunda imagen del primer grupo
                          priority={groupIndex === 0}
                        />
                      )}
                      {group[2] && (
                        <NewsLetterCard
                          newsletter={group[2]}
                          size="small"
                          position="right"
                          // OPTIMIZACIÓN: Priorizar tercera imagen del primer grupo
                          priority={groupIndex === 0}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  // Patrón 2: Pequeños izquierda, grande derecha
                  <>
                    <div className="flex flex-col gap-[33px]">
                      {group[0] && (
                        <NewsLetterCard
                          newsletter={group[0]}
                          size="small"
                          position="left"
                          // OPTIMIZACIÓN: Priorizar primera imagen del primer grupo
                          priority={groupIndex === 0}
                        />
                      )}
                      {group[1] && (
                        <NewsLetterCard
                          newsletter={group[1]}
                          size="small"
                          position="left"
                          // OPTIMIZACIÓN: Priorizar segunda imagen del primer grupo
                          priority={groupIndex === 0}
                        />
                      )}
                    </div>
                    {group[2] && (
                      <NewsLetterCard
                        newsletter={group[2]}
                        size="large"
                        position="right"
                        // OPTIMIZACIÓN: Priorizar tercera imagen del primer grupo
                        priority={groupIndex === 0}
                      />
                    )}
                  </>
                )}
              </div>
              {/* Banner intermedio solo después de los primeros 3 newsletters */}
              {groupIndex === 0 && (
                <div className="mt-6">
                  <BannerIntermedio />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

