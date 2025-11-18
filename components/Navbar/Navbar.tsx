"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import Modal from "@/components/Modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const isDetailPage = pathname?.startsWith("/newsletter/");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-gray-200 dark:border-gray-800">
        <div className={`w-full flex justify-center py-4 ${spaceGrotesk.className}`}>
          <div className="w-full max-w-[327px] md:max-w-[1309px] flex items-center justify-between px-4 md:px-0">
          {isDetailPage ? (
            <Link href="/" aria-label="Volver a Home">
              <BrandLogo />
            </Link>
          ) : (
            <BrandLogo />
          )}
          <button
            onClick={openModal}
            className="flex items-center gap-2 text-white hover:text-lemonGreen transition-colors"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "150%",
              letterSpacing: "0px",
            }}
          >
            New post
            <Image
              src="/icons/RightArrow.svg"
              alt="Ir al post"
              width={24}
              height={24}
              style={{ filter: "invert(79%) sepia(74%) saturate(415%) hue-rotate(32deg) brightness(101%) contrast(103%)" }}
            />
          </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Título */}
        <h2
          className={`
            text-[35px]
            leading-[120%]
            font-medium
            text-center
            text-gray-900
            ${spaceGrotesk.className}
          `}
          style={{
            letterSpacing: "0px",
            fontStyle: "normal",
            fontWeight: 500,
          }}
        >
          Upload your post
        </h2>
        
        {/* Descripción */}
        <p className="text-sm md:text-base text-gray-600 text-center max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
        </p>
        
        {/* Input */}
        <Input
          placeholder="Post Title"
          classNames={{
            base: "w-[400px]",
            // input: "bg-white border border-black rounded-none h-[56px]",
            // inputWrapper: "bg-white border border-black rounded-none hover:border-black focus-within:border-black h-[56px]",
          }}
          variant="bordered"
          radius="none"
          style={{
            width: "400px",
            height: "56px",
          }}
        />
        
        {/* Botón Upload image */}
        <Button
          className="bg-lemonGreen text-black border border-black rounded-none font-semibold hover:bg-lemonGreen/90"
          radius="none"
          style={{
            width: "400px",
            height: "56px",
          }}
          endContent={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12V4M4 8L8 4L12 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Upload image
        </Button>
        
        {/* Botón Confirm */}
        <Button
          className="bg-black text-white border border-black rounded-none font-semibold hover:bg-gray-900 w-full max-w-md"
          radius="none"
        >
          Confirm
        </Button>
      </Modal>
    </>
  );
}