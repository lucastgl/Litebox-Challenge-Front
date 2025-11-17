"use client";

import { mockNewsletters, Newsletter } from "@/mocks/newsletters";
import NewsLetterCard from "@/components/NewsLetterCard/NewsLetterCard";
import BannerIntermedio from "@/components/BannerIntermedio/BannerIntermedio";

export default function NewsLetterGrid() {
  // Agrupar newsletters en grupos de 3
  const groupNewsletters = (newsletters: Newsletter[]) => {
    const groups: Newsletter[][] = [];
    for (let i = 0; i < newsletters.length; i += 3) {
      groups.push(newsletters.slice(i, i + 3));
    }
    return groups;
  };

  const groups = groupNewsletters(mockNewsletters);

  return (
    <div className="w-full md:w-[976px]">
      <div className="space-y-6">
        {groups.map((group, groupIndex) => {
          const isFirstPattern = groupIndex % 2 === 0;
          
          return (
            <div key={groupIndex}>
              {/* Mobile: Layout vertical simple */}
              <div className="flex flex-col md:hidden gap-[33px]">
                {group.map((newsletter) => (
                  <NewsLetterCard
                    key={newsletter.id}
                    newsletter={newsletter}
                    size="large"
                    position="left"
                  />
                ))}
              </div>
              
              {/* Desktop: Layout con patrón alternado */}
              <div className="hidden md:flex md:flex-row gap-[33px]">
                {isFirstPattern ? (
                  // Patrón 1: Grande izquierda, pequeños derecha
                  <>
                    <NewsLetterCard
                      newsletter={group[0]}
                      size="large"
                      position="left"
                    />
                    <div className="flex flex-col gap-[33px]">
                      <NewsLetterCard
                        newsletter={group[1]}
                        size="small"
                        position="right"
                      />
                      <NewsLetterCard
                        newsletter={group[2]}
                        size="small"
                        position="right"
                      />
                    </div>
                  </>
                ) : (
                  // Patrón 2: Pequeños izquierda, grande derecha
                  <>
                    <div className="flex flex-col gap-[33px]">
                      <NewsLetterCard
                        newsletter={group[0]}
                        size="small"
                        position="left"
                      />
                      <NewsLetterCard
                        newsletter={group[1]}
                        size="small"
                        position="left"
                      />
                    </div>
                    <NewsLetterCard
                      newsletter={group[2]}
                      size="large"
                      position="right"
                    />
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

