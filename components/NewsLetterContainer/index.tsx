import NewsLetterGrid from "@/components/NewsLetterGrid";
import MostViewed from "@/components/MostViewed";

export default function NewsLetterContainer() {
  return (
    <section className="w-full">
      <div className="w-full flex justify-center py-8">
        <div className="w-full max-w-[1309px] flex justify-center md:justify-start">
        <div className="w-full max-w-[327px] md:max-w-none grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[39px]">
          {/* Sección izquierda: Grid de newsletters */}
          <NewsLetterGrid />
          
          {/* Sección derecha: Most viewed sidebar */}
          <MostViewed />
        </div>
        </div>
      </div>
    </section>
  );
}

