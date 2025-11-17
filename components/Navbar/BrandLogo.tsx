import Image from "next/image";

export default function BrandLogo() {
  return (
    <div className="w-[148px] h-[23px] md:w-[179px] md:h-[28px] relative">
      <Image 
        src="/icons/Logo.svg" 
        alt="Lite-tech logo" 
        fill
        className="object-contain"
      />
    </div>
  );
}

