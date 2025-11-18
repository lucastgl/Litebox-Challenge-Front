"use client";

import { use } from "react";
import { usePostDetail } from "@/hooks/usePostDetail";
import BannerNewsLetterDetail from "@/components/BannerNewsLetterDetail";
import BodyNewsLetterDetail from "@/components/BodyNewsLetterDetail";
import RelatedPost from "@/components/RelatedPost";

export default function NewsletterDetail({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Unwrappear params si es una Promise (Next.js 15+)
  const resolvedParams = use(
    params instanceof Promise ? params : Promise.resolve(params)
  );
  
  // Obtener el detalle del post desde la API
  const { post, loading, error } = usePostDetail(resolvedParams.id);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <p className="text-gray-500">Cargando post...</p>
      </div>
    );
  }

  // Mostrar error si hay alguno
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <p className="text-red-500">Error: {error || "Post no encontrado"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Sección 1: BannerNewsLetterDetail */}
      <BannerNewsLetterDetail post={post} />
      
      {/* Sección 2: BodyNewsLetterDetail */}
      <BodyNewsLetterDetail body={post.attributes.body} />
      
      {/* Sección 3: RelatedPost */}
      <RelatedPost />
    </div>
  );
}

