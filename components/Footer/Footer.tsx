"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const socials = [
  { href: "#", label: "LinkedIn", icon: "/icons/LinkedIn.svg" },
  { href: "#", label: "Facebook", icon: "/icons/Fb.svg" },
  { href: "#", label: "X", icon: "/icons/X.svg" },
];

export default function Footer() {
  const pathname = usePathname();
  const isNewsletterDetail = pathname?.startsWith("/newsletter/");

  return (
    <footer className={`w-full flex justify-center ${isNewsletterDetail ? "bg-white" : "bg-black"} py-10 mt-auto`}>
      <div className="w-[327px] md:w-full md:max-w-[1328px] h-[342px] md:h-[267px] bg-[#9C73F7] flex flex-col justify-between pt-16 pb-16 px-6 md:px-[119px] md:py-[96px] gap-[10px] md:gap-0">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full max-w-[1090px] h-auto md:h-[74px] gap-[10px] md:gap-0">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-3 text-white">
            <Image
              src="/icons/Logo.svg"
              alt="Lite Tech Logo"
              width={178.26834106445312}
              height={28}
            />

            {/* Redes sociales - Mobile: debajo del logo */}
            <div className="flex items-center mt-12 md:mt-0 gap-6 md:hidden">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Redes sociales - Desktop: al lado del logo */}
          <div className="hidden md:flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>
        <p className="text-white text-sm mt-8 md:mt-12 text-center md:text-left">
          © Copyright Lite-Tech. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
