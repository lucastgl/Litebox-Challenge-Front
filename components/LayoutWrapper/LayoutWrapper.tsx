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

    if (isHome) {
      bodyClassList.add("bg-black");
      htmlClassList.add("bg-black");
      bodyClassList.remove("bg-white");
      htmlClassList.remove("bg-white");
    } else {
      bodyClassList.add("bg-white");
      htmlClassList.add("bg-white");
      bodyClassList.remove("bg-black");
      htmlClassList.remove("bg-black");
    }
  }, [pathname]);

  return <>{children}</>;
}

