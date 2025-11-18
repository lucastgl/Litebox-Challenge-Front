import { Space_Grotesk } from "next/font/google";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ModalContent() {
  return (
    <>
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
          input: "bg-white border-t border-b border-black rounded-none h-[56px] placeholder:text-darkGray",
          inputWrapper: "bg-white border border-black rounded-none hover:border-black focus-within:border-black h-[56px]",
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
        className="bg-black text-white border border-black rounded-none font-semibold hover:bg-gray-900"
        radius="none"
        style={{
          width: "132px",
          height: "56px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        Confirm
      </Button>
    </>
  );
}

