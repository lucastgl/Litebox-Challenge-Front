"use client";

import { useState, useEffect } from "react";

/**
 * Interfaz para representar un post detallado desde la API
 * Mapea la estructura de respuesta del backend para el detalle
 */
export interface PostDetailFromAPI {
  id: number;
  attributes: {
    title: string;
    subtitle: string | null;
    topic: string;
    author: string;
    readTime: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    coverImg: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      } | null;
    };
  };
}

/**
 * Interfaz para la respuesta completa del detalle de post
 */
export interface PostDetailResponse {
  data: PostDetailFromAPI;
  meta: Record<string, unknown>;
}

/**
 * Interfaz para el estado del hook
 */
interface UsePostDetailState {
  post: PostDetailFromAPI | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook personalizado para obtener el detalle de un post por ID desde el backend
 * Consulta el endpoint GET /api/posts/:id del backend
 * 
 * @param id - ID del post a obtener
 * @returns {UsePostDetailState} Objeto con post, estado de carga y errores
 */
export function usePostDetail(id: string | number): UsePostDetailState {
  const [post, setPost] = useState<PostDetailFromAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Función para obtener el detalle del post desde el backend
     */
    const fetchPostDetail = async () => {
      // Validar que el ID existe
      if (!id) {
        setError("ID del post no proporcionado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/api/posts/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post no encontrado");
          }
          throw new Error(`Error al obtener el post: ${response.statusText}`);
        }

        const data: PostDetailResponse = await response.json();
        setPost(data.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido al obtener el post";
        setError(errorMessage);
        console.error("Error en usePostDetail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  return { post, loading, error };
}

