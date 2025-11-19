"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === "/" || pathname === undefined;
    const bodyClassList = document.body.classList;
    const htmlClassList = document.documentElement.classList;

    // Ajustar clases utilitarias para componentes que dependan de ellas
    bodyClassList.toggle("bg-black", isHome);
    htmlClassList.toggle("bg-black", isHome);
    bodyClassList.toggle("bg-white", !isHome);
    htmlClassList.toggle("bg-white", !isHome);

    // Forzar los valores de los CSS custom properties utilizados en globals.css
    const root = document.documentElement;
    root.style.setProperty("--background", isHome ? "#000000" : "#ffffff");
    root.style.setProperty("--foreground", isHome ? "#ffffff" : "#171717");
  }, [pathname]);

  return <>{children}</>;
}

