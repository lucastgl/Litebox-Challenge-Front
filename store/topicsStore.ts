import { create } from "zustand";

/**
 * Store global de Zustand para gestionar los topics y el filtro seleccionado
 * 
 * Este store mantiene:
 * - topics: Lista de todos los topics únicos disponibles desde la API
 * - selectedTopic: El topic actualmente seleccionado para filtrar (null = "All")
 * 
 * Acciones:
 * - setTopics: Actualiza la lista de topics desde los posts de la API
 * - setSelectedTopic: Establece el topic seleccionado para filtrar
 * - clearFilter: Limpia el filtro (vuelve a "All")
 */
interface TopicsStore {
  topics: string[];
  selectedTopic: string | null;
  setTopics: (topics: string[]) => void;
  setSelectedTopic: (topic: string | null) => void;
  clearFilter: () => void;
}

export const useTopicsStore = create<TopicsStore>((set) => ({
  // Estado inicial
  topics: [],
  selectedTopic: null, // null significa "All" (mostrar todos)

  // Acción para actualizar la lista de topics desde los posts
  setTopics: (topics) => set({ topics }),

  // Acción para establecer el topic seleccionado
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),

  // Acción para limpiar el filtro (volver a mostrar todos)
  clearFilter: () => set({ selectedTopic: null }),
}));

