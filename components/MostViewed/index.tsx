"use client";

import MostViewedItem from "@/components/MostViewed/MostViewedItem/MostViewedItem";

const mostViewedItems = [
  {
    id: "mv1",
    title: "Your TV Sounds Awful. These Soundbars Can Fix That",
    image: "/MostViewed/mv1.png",
    href: "/newsletter/1",
  },
  {
    id: "mv2",
    title: "The Small Company at the Center of 'Gamergate 2.0'",
    image: "/MostViewed/mv2.png",
    href: "/newsletter/2",
  },
  {
    id: "mv3",
    title: "Craig Wright Is Not Bitcoin Creator Satoshi Nakamoto, Judge Declares",
    image: "/MostViewed/mv3.png",
    href: "/newsletter/3",
  },
  {
    id: "mv4",
    title:
      "Robert F. Kennedy Jr. Targets a Generation of Politically Disaffected, Extremely Online Men",
    image: "/MostViewed/mv4.png",
    href: "/newsletter/4",
  },
] as const;

interface MostViewedProps {
  variant?: "light" | "dark";
}

export default function MostViewed({ variant = "light" }: MostViewedProps) {
  const titleColorClass = variant === "dark" ? "text-gray-900" : "text-white";
  
  return (
    <aside className="hidden lg:block w-[304px] shrink-0">
      {/* Apartado 1: Título */}
      <h2 className={`text-xl font-semibold mb-[40px] ${titleColorClass}`}>Most viewed</h2>

      {/* Apartado 2: Lista de componentes */}
      <div className="flex flex-col gap-[13px]">
        {mostViewedItems.map((item) => (
          <MostViewedItem key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
}

