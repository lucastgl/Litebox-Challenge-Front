"use client";

import { useState, useEffect } from "react";
import { useTopicsStore } from "@/store/topicsStore";

/**
 * Interfaz para representar un post desde la API
 * Mapea la estructura de respuesta del backend
 */
export interface PostFromAPI {
  id: number;
  attributes: {
    title: string;
    topic: string;
    readTime: number;
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
 * Interfaz para la respuesta completa de la API
 */
export interface PostsResponse {
  data: PostFromAPI[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Interfaz para el estado del hook
 */
interface UsePostsState {
  posts: PostFromAPI[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook personalizado para obtener los posts desde el backend
 * Consulta el endpoint GET /api/posts del backend
 * 
 * @returns {UsePostsState} Objeto con posts, estado de carga y errores
 */
export function usePosts(): UsePostsState {
  const [posts, setPosts] = useState<PostFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const setTopics = useTopicsStore((state) => state.setTopics);

  useEffect(() => {
    /**
     * Función para obtener los posts desde el backend
     */
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/api/posts`);

        if (!response.ok) {
          throw new Error(`Error al obtener posts: ${response.statusText}`);
        }

        const data: PostsResponse = await response.json();
        setPosts(data.data);

        // Actualizar el store global con los topics únicos de los posts
        const uniqueTopics = Array.from(
          new Set(data.data.map((post) => post.attributes.topic))
        ).sort();
        setTopics(uniqueTopics);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido al obtener posts";
        setError(errorMessage);
        console.error("Error en usePosts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setTopics]);

  return { posts, loading, error };
}

