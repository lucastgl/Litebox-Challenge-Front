"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Space_Grotesk } from "next/font/google";
import Modal from "@/components/Modal";
import ModalContent from "@/components/ModalContent/ModalContent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function BannerIntermedio() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className={`w-[327px] md:w-full h-[263px] md:h-auto px-9 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 md:justify-between md:px-8 md:py-10 ${spaceGrotesk.className}`}
          style={{ backgroundColor: "#9C73F7" }}
        >
          <p 
            className="text-white font-normal md:font-medium text-[27px] md:text-xl lg:text-2xl"
            style={{
              lineHeight: "121%",
              letterSpacing: "0px",
            }}
          >
            Sign up for our newsletter{" "}
            <span className="font-bold">and get daily updates</span>
          </p>

          <Button
            onClick={openModal}
            className="bg-lemonGreen text-black font-semibold rounded-none w-[247px] md:w-auto h-[56px] md:h-11 md:px-8"
            style={{
              gap: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            radius="none"
            variant="solid"
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent onClose={closeModal} />
      </Modal>
    </>
  );
}
