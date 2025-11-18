import Image from "next/image";
import { Newsletter } from "@/types/newsletter";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface NewsLetterArticleProps {
  newsletter: Newsletter;
  size: "large" | "small";
  variant?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}

export default function NewsLetterArticle({
  newsletter,
  size,
  variant = "light",
  className = "",
  titleClassName,
}: NewsLetterArticleProps) {
  const isDark = variant === "dark";
  const defaultTitleClasses =
    size === "large"
      ? `${spaceGrotesk.className} font-bold text-[18px] md:font-semibold md:text-2xl leading-[150%] md:leading-snug tracking-normal`
      : `${spaceGrotesk.className} font-bold text-[18px] md:font-semibold md:text-lg leading-[150%] md:leading-snug tracking-normal`;
  const headingClasses = titleClassName ?? defaultTitleClasses;

  return (
    <div
      className={`p-4 flex flex-col min-h-0 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } ${className}`}
    >
      <h3 className={`pb-2 ${headingClasses}`}>
        {newsletter.title}
      </h3>

      <div className="flex items-center justify-between text-sm">
        <button
          className={`inline-flex items-center gap-2 font-semibold transition-colors ${
            isDark
              ? "text-white hover:text-lemonGreen"
              : "text-mainPurple hover:text-lemonGreen"
          }`}
        >
          Read
          <Image
            src="/icons/RightArrow.svg"
            alt="Read more"
            width={16}
            height={16}
          />
        </button>

        <div
          className={`inline-flex items-center gap-2 ${
            isDark ? "text-white/80" : "text-lightGray"
          }`}
        >
          <Image
            src="/icons/Newspaper.svg"
            alt="Read time"
            width={16}
            height={16}
          />
          <span>{newsletter.readTime}</span>
        </div>
      </div>
    </div>
  );
}

