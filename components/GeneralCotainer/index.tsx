import TodayBanner from "@/components/TodayBanner";
import TopicsBar from "@/components/TopicsBar";
import NewsLetterContainer from "@/components/NewsLetterContainer";

export default function GeneralContainer() {
  return (
    <div className="w-full">
      {/* Bloque 2: Today story banner */}
      <TodayBanner />
      
      {/* Bloque 3: Topics bar */}
      <TopicsBar />
      
      {/* Bloque 4: Newsletters container */}
      <NewsLetterContainer />
    </div>
  );
}

