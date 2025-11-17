"use client";

import { useMemo, useState } from "react";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import { mockNewsletters } from "@/mocks/newsletters";

export default function TopicsBar() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(mockNewsletters.map((n) => n.category)));
    return ["All", ...unique];
  }, []);

  const handleSelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      return;
    }
    setSelectedCategory(category);
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
              const isSelected = selectedCategory === category;

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
                const isSelected = selectedCategory === category;

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

