import NewsLetterArticle from "@/components/NewsLetterCard/NewsLetterArticle";
import { mockNewsletters } from "@/mocks/newsletters";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function TodayBanner() {
  const featuredNewsletter = mockNewsletters[0];

  return (
    <section className="w-full">
      {/* Today story banner */}
      <div className="w-full flex justify-center py-8">
        <div className="w-full max-w-[327px] md:max-w-[1309px] flex flex-col items-start">
        <h2 className="text-xl font-semibold mb-4">Today story</h2>
        {/* Bloque principal */}
         <div
           className="relative w-full md:w-full h-[378px] md:h-[348px] overflow-hidden bg-center bg-cover p-4 md:p-8 flex flex-col justify-end md:block"
           style={{ backgroundImage: 'url("/exampleBannerToday.png")' }}
         >
           <div className="bg-black px-4 py-2 w-fit md:mb-0">
             <span className="bg-lemonGreen w-fit inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full text-black">
               {featuredNewsletter.category}
             </span>
           </div>
          <div className="w-full md:w-[557px] md:h-[246px]">
            <NewsLetterArticle
              newsletter={featuredNewsletter}
              size="large"
              variant="dark"
              className="w-full p-4 md:p-6 rounded-none"
              titleClassName={`${spaceGrotesk.className} font-bold text-[18px] md:text-[41px] leading-[150%] md:leading-[130%]`}
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
