"use client";

import { Button } from "@heroui/button";
import { Space_Grotesk } from "next/font/google";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function BannerIntermedio() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
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
          className="bg-lemonGreen text-black font-semibold rounded-none w-[247px] md:w-auto h-[56px] md:h-11 md:px-8"
          style={{
            gap: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
          radius="none"
          variant="solid"
          onPress={onOpen}
        >
          Subscribe
        </Button>
      </div>
      <Modal
        className="z-200"
        id="modalBannerIntermedio"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="queso flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
