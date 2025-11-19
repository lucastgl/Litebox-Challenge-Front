"use client";

import { useState, useEffect } from "react";
import { PostFromAPI, PostsResponse } from "./usePosts";

/**
 * Interfaz para el estado del hook
 */
interface UseRelatedPostsState {
  posts: PostFromAPI[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook personalizado para obtener los posts relacionados desde el backend
 * Consulta el endpoint GET /api/posts/related del backend
 * Estos son los posts creados desde el modal y almacenados en Firebase Firestore
 * 
 * @returns {UseRelatedPostsState & { refresh: () => void }} Objeto con posts, estado de carga, errores y función para refrescar
 */
export function useRelatedPosts(): UseRelatedPostsState & { refresh: () => void } {
  const [posts, setPosts] = useState<PostFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    /**
     * Función para obtener los posts relacionados desde el backend
     */
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/api/posts/related`);

        if (!response.ok) {
          throw new Error(`Error al obtener posts relacionados: ${response.statusText}`);
        }

        const data: PostsResponse = await response.json();
        setPosts(data.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido al obtener posts relacionados";
        setError(errorMessage);
        console.error("Error en useRelatedPosts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [refreshTrigger]);

  /**
   * Función para refrescar los posts relacionados
   */
  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return { posts, loading, error, refresh };
}

