"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { PostDetailFromAPI } from "@/hooks/usePostDetail";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface BannerNewsLetterDetailProps {
  post: PostDetailFromAPI;
}

export default function BannerNewsLetterDetail({ post }: BannerNewsLetterDetailProps) {
  // Formatear readTime: convertir el número a string con formato "X mins"
  const formattedReadTime = `${post.attributes.readTime || 6} mins`;

  // Construir la URL de la imagen de fondo
  const coverImageUrl = post.attributes.coverImg?.data?.attributes?.url;
  let backgroundImageUrl = "/exampleBannerToday.png"; // Imagen por defecto

  if (coverImageUrl) {
    if (coverImageUrl.startsWith("http")) {
      backgroundImageUrl = coverImageUrl;
    } else {
      backgroundImageUrl = `https://lite-tech-api.litebox.ai${coverImageUrl}`;
    }
  }

  return (
    <section className="w-full">
      <div
        className="w-full h-[677px] overflow-hidden bg-center bg-cover p-4 md:p-8 flex flex-col justify-center"
        style={{ backgroundImage: `url("${backgroundImageUrl}")` }}
      >
        {/* Author section */}
        <div className="flex items-center gap-3  md:mb-0 bg-white w-fit p-4">
          <Image
            src="/author.png"
            alt="Author"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
            className={`text-black ${spaceGrotesk.className}`}
            style={{
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "180%",
              letterSpacing: "0px",
            }}
          >
            By {post.attributes.author}
          </span>
        </div>
        
        {/* NewsLetterArticle */}
        <div className="w-full md:w-[557px] md:h-[246px]">
          <div className="bg-white text-black p-4 md:p-6 flex flex-col min-h-0 w-full h-full">
            <h3
              className={`${spaceGrotesk.className} font-bold text-[35px] leading-[120%] tracking-normal pb-2`}
            >
              {post.attributes.title}
            </h3>

            <div className="flex items-center text-sm mt-auto">
              <div className="inline-flex items-center gap-2 text-black/80">
                <Image
                  src="/icons/Newspaper.svg"
                  alt="Read time"
                  width={16}
                  height={16}
                  style={{ filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }}
                />
                <span>{formattedReadTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

