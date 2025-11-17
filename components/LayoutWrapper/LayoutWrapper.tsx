"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isNewsletterDetail = pathname?.startsWith("/newsletter/");

  useEffect(() => {
    if (isNewsletterDetail) {
      document.body.classList.add("bg-white");
      document.documentElement.classList.add("bg-white");
    } else {
      document.body.classList.remove("bg-white");
      document.documentElement.classList.remove("bg-white");
    }
  }, [isNewsletterDetail]);

  return <>{children}</>;
}

