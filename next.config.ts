import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OPTIMIZACIÓN: Configurar dominios permitidos para imágenes externas
  // Esto permite que Next.js Image optimice imágenes desde estos dominios
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lite-tech-api.litebox.ai",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
    // OPTIMIZACIÓN: Configurar formatos de imagen modernos para mejor compresión
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
