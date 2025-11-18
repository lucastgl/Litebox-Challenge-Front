"use client";

import { useMemo } from "react";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import { useTopicsStore } from "@/store/topicsStore";

export default function TopicsBar() {
  // Obtener topics y selectedTopic del store global
  const topics = useTopicsStore((state) => state.topics);
  const selectedTopic = useTopicsStore((state) => state.selectedTopic);
  const setSelectedTopic = useTopicsStore((state) => state.setSelectedTopic);

  // Agregar "All" al inicio de la lista de categories
  const categories = useMemo(() => {
    return ["All", ...topics];
  }, [topics]);

  const handleSelect = (category: string) => {
    // Si se selecciona "All", establecer selectedTopic a null
    if (category === "All") {
      setSelectedTopic(null);
      return;
    }

    // Si se hace click en el mismo topic, deseleccionar (volver a "All")
    if (selectedTopic === category) {
      setSelectedTopic(null);
      return;
    }

    // Seleccionar el nuevo topic
    setSelectedTopic(category);
  };

  return (
    <section className="w-full">
      <div className="w-full flex justify-center py-4">
        <div className="w-full max-w-[327px] md:max-w-[1309px]">
          {/* Mobile: Fila horizontal scrolleable con Topics al inicio */}
          <div 
            className="flex md:hidden gap-4 items-center overflow-x-auto pb-2 scrollbar-hide"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            <span className="text-base font-semibold text-white flex-shrink-0">Topics</span>
            {categories.map((category) => {
              // "All" está seleccionado cuando selectedTopic es null
              const isSelected = category === "All" 
                ? selectedTopic === null 
                : selectedTopic === category;

              return (
                <Chip
                  key={category}
                  variant={isSelected ? "solid" : "bordered"}
                  radius="full"
                  className={`h-[45px] flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer transition-colors flex-shrink-0 ${
                    isSelected
                      ? "bg-lemonGreen text-black border-transparent"
                      : "bg-transparent text-white border border-lightGray hover:border-lightGray"
                  }`}
                  style={{ padding: "8px 16px", borderRadius: "56px" }}
                  onClick={() => handleSelect(category)}
                  endContent={
                    isSelected ? (
                      <Image
                        src="/icons/Cross.svg"
                        alt="Remove filter"
                        width={10}
                        height={10}
                        className="ml-2"
                      />
                    ) : null
                  }
                >
                  {category}
                </Chip>
              );
            })}
          </div>
          
          {/* Desktop: Layout con Topics a la izquierda */}
          <div className="hidden md:flex md:flex-row md:items-center gap-4">
            <span className="text-base font-semibold text-white flex-shrink-0">Topics</span>
            <div 
              className="flex gap-3 overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE and Edge */
              }}
            >
              {categories.map((category) => {
                // "All" está seleccionado cuando selectedTopic es null
                const isSelected = category === "All" 
                  ? selectedTopic === null 
                  : selectedTopic === category;

                return (
                  <Chip
                    key={category}
                    variant={isSelected ? "solid" : "bordered"}
                    radius="full"
                    className={`h-[45px] flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer transition-colors flex-shrink-0 ${
                      isSelected
                        ? "bg-lemonGreen text-black border-transparent"
                        : "bg-transparent text-white border border-lightGray hover:border-lightGray"
                    }`}
                    style={{ padding: "8px 16px", borderRadius: "56px" }}
                    onClick={() => handleSelect(category)}
                    endContent={
                      isSelected ? (
                        <Image
                          src="/icons/Cross.svg"
                          alt="Remove filter"
                          width={10}
                          height={10}
                          className="ml-2"
                        />
                      ) : null
                    }
                  >
                    {category}
                  </Chip>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

