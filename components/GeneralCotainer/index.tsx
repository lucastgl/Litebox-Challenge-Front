"use client";
import TodayBanner from "@/components/TodayBanner";
import TopicsBar from "@/components/TopicsBar";
import NewsLetterContainer from "@/components/NewsLetterContainer";
import { usePathname } from "next/navigation";

export default function GeneralContainer() {
  const pathname = usePathname();
  const isNewsletterDetail = pathname?.startsWith("/newsletter/");

  return (
    <div className={`w-full ${isNewsletterDetail ? "bg-white" : "bg-black"}`}>
      {/* Bloque 2: Today story banner */}
      <TodayBanner />
      
      {/* Bloque 3: Topics bar */}
      <TopicsBar />
      
      {/* Bloque 4: Newsletters container */}
      <NewsLetterContainer />
    </div>
  );
}

