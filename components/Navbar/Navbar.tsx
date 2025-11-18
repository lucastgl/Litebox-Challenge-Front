"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import Modal from "@/components/Modal";
import ModalContent from "@/components/ModalContent/ModalContent";

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
        <ModalContent />
      </Modal>
    </>
  );
}