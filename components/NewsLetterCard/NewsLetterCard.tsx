import Link from "next/link";
import { Newsletter } from "@/mocks/newsletters";
import NewsLetterArticle from "./NewsLetterArticle";

interface NewsLetterCardProps {
  newsletter: Newsletter;
  size: "large" | "small";
  position: "left" | "right";
}

export default function NewsLetterCard({
  newsletter,
  size,
}: NewsLetterCardProps) {
  const dimensions =
    size === "large" 
      ? "w-[327px] md:w-[528px] h-[378px] md:h-[790px]" 
      : "w-[327px] md:w-[412px] h-[378px] md:h-[379px]";

  return (
    <Link
      href={`/newsletter/${newsletter.id}`}
      className={`${dimensions} flex-shrink-0`}
    >
      <article
        className="p-4 overflow-hidden hover:shadow-lg transition-shadow w-full h-full flex flex-col bg-center bg-cover"
        style={{ backgroundImage: 'url("/exampleBG.png")' }}
      >
        <div
          className={`flex items-center justify-center ${
            size === "large" ? "flex-[2]" : "flex-1"
          }`}
        ></div>
        <div className="bg-white px-4 py-2 w-fit">
          <span className="bg-lemonGreen w-fit inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full text-black">
            {newsletter.category}
          </span>
        </div>
        <NewsLetterArticle newsletter={newsletter} size={size} />
      </article>
    </Link>
  );
}
