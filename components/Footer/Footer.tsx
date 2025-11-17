import Image from "next/image";

const socials = [
  { href: "#", label: "LinkedIn", icon: "/icons/LinkedIn.svg" },
  { href: "#", label: "Facebook", icon: "/icons/Fb.svg" },
  { href: "#", label: "X", icon: "/icons/X.svg" },
];

export default function Footer() {
  return (
    <footer className="w-full flex justify-center bg-black py-10 mt-auto">
      <div className="w-[1328px] h-[267px] bg-[#9C73F7] flex flex-col justify-between px-[119px] py-[96px]">
        <div className="flex items-center justify-between w-full max-w-[1090px] h-[74px]">
          <div className="flex items-center gap-3 text-white">
            <Image
              src="/icons/Logo.svg"
              alt="Lite Tech Logo"
              width={179}
              height={28}
            />
          </div>

          <div className="flex items-center gap-6">
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
                  width={28}
                  height={28}
                />
              </a>
            ))}
          </div>
        </div>
        <p className="text-white text-sm mt-12">
          © Copyright Lite-Tech. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
