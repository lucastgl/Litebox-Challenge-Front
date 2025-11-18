/**
 * Interfaz para representar un Newsletter en el frontend
 * Compatible con la estructura esperada por los componentes
 */
export interface Newsletter {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
}

/**
 * Función helper para mapear un PostFromAPI a Newsletter
 * Convierte la estructura de la API a la estructura esperada por los componentes
 * 
 * @param post - Post desde la API
 * @returns Newsletter mapeado
 */
export function mapPostToNewsletter(post: {
  id: number;
  attributes: {
    title: string;
    topic: string;
    readTime: number;
    coverImg: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
  };
} | null | undefined): Newsletter | null {
  // Validar que el post existe
  if (!post || !post.attributes) {
    return null;
  }

  // Construir la URL completa de la imagen
  // Si la URL no comienza con http, asumimos que es relativa a la API externa
  const imageUrl = post.attributes.coverImg?.data?.attributes?.url;
  let fullImageUrl = "/exampleBG.png"; // Imagen por defecto

  if (imageUrl) {
    // Si la URL ya es completa (comienza con http/https), usarla directamente
    if (imageUrl.startsWith("http")) {
      fullImageUrl = imageUrl;
    } else {
      // Si es relativa, construir la URL completa con el dominio de la API externa
      fullImageUrl = `https://lite-tech-api.litebox.ai${imageUrl}`;
    }
  }

  // Formatear readTime: convertir el número a string con formato "X mins"
  // Si readTime no está disponible, usar "6 mins" como valor por defecto
  const readTimeValue = post.attributes.readTime || 6;
  const formattedReadTime = `${readTimeValue} mins`;

  return {
    id: post.id.toString(),
    title: post.attributes.title || "",
    category: post.attributes.topic || "",
    readTime: formattedReadTime, // Usar el valor real de la API en lugar del valor fijo
    image: fullImageUrl,
  };
}

