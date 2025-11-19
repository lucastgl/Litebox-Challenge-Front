# Frontend Litebox Challenge

Frontend desarrollado con Next.js 16 para el Challenge Litebox. Aplicación web moderna y responsive que muestra newsletters y permite crear nuevos posts relacionados.

## 🚀 Características

- **Home Page**: Muestra una lista de newsletters con filtrado por topics
- **Newsletter Detail**: Página de detalle con contenido HTML o Markdown
- **Modal de Creación**: Permite crear nuevos posts relacionados con imagen y título
- **Responsive Design**: Optimizado para mobile y desktop
- **Filtrado por Topics**: Sistema de filtrado dinámico usando Zustand
- **Integración con Backend**: Consume API REST para obtener y crear posts

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend NestJS corriendo (ver [back-litebox-challenge](../back-litebox-challenge/README.md))

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# O con yarn
yarn install
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# URL del backend NestJS
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Para producción (Vercel)**, configura estas variables en el dashboard de Vercel. Ver `CREDENTIALS.txt` para más detalles.

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# O con yarn
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
front-litebox-challenge/
├── app/                      # App Router de Next.js
│   ├── layout.tsx           # Layout principal con Navbar y Footer
│   ├── page.tsx              # Página principal (Home)
│   └── newsletter/
│       └── [id]/
│           └── page.tsx     # Página de detalle de newsletter
├── components/               # Componentes React
│   ├── BannerIntermedio/    # Banner intermedio con botón Subscribe
│   ├── BannerNewsLetterDetail/  # Banner del detalle de newsletter
│   ├── BodyNewsLetterDetail/    # Cuerpo del detalle (HTML/Markdown)
│   ├── Footer/              # Footer con logo y redes sociales
│   ├── GeneralContainer/    # Contenedor principal de la home
│   ├── Modal/               # Componente modal reutilizable
│   ├── ModalContent/        # Contenido del modal de creación
│   ├── MostViewed/          # Sidebar de posts más vistos
│   ├── Navbar/              # Barra de navegación
│   ├── NewsLetterCard/      # Tarjeta de newsletter
│   ├── NewsLetterGrid/      # Grid de newsletters con paginación
│   ├── NewsLetterContainer/ # Contenedor de newsletters
│   ├── RelatedPost/         # Posts relacionados en detalle
│   ├── TodayBanner/         # Banner "Today story"
│   └── TopicsBar/           # Barra de filtros por topics
├── hooks/                    # Custom hooks
│   ├── usePostDetail.ts     # Hook para obtener detalle de post
│   ├── usePosts.ts          # Hook para obtener lista de posts
│   └── useRelatedPosts.ts   # Hook para obtener posts relacionados
├── store/                    # Estado global (Zustand)
│   └── topicsStore.ts       # Store para topics y filtrado
├── types/                    # Tipos TypeScript
│   └── newsletter.ts        # Tipos e interfaces de newsletters
├── mocks/                    # Datos mock (solo para desarrollo)
│   ├── newsletters.ts       # Mock de newsletters (usado en TodayBanner)
│   └── newPost.txt          # Contenido Markdown para nuevos posts
└── public/                   # Archivos estáticos
    ├── icons/               # Iconos SVG
    └── *.png                # Imágenes de ejemplo
```

## 🎨 Tecnologías Utilizadas

- **Next.js 16**: Framework React con App Router
- **React 19**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Estilos utility-first
- **Hero UI**: Componentes UI (Button, Modal, Input, Chip)
- **Zustand**: Gestión de estado global
- **React Markdown**: Renderizado de Markdown
- **Space Grotesk**: Fuente principal

## 📡 Integración con Backend

El frontend consume los siguientes endpoints del backend:

### Endpoints Principales

- `GET /api/posts` - Obtiene lista de posts (API externa)
- `GET /api/posts/:id` - Obtiene detalle de un post (API externa o Firebase)
- `GET /api/posts/related` - Obtiene posts relacionados (Firebase)
- `POST /api/post/related` - Crea un nuevo post relacionado (Firebase)

### Flujo de Datos

1. **Posts Principales**: Se obtienen de la API externa (`https://lite-tech-api.litebox.ai`)
2. **Posts Relacionados**: Se almacenan en Firebase Firestore y se obtienen del backend
3. **Creación de Posts**: El frontend envía data URL base64, el backend la sube a Cloud Storage

## 🎯 Funcionalidades Principales

### Home Page

- **Today Banner**: Banner destacado con el primer post
- **Topics Bar**: Filtros por categorías (chips seleccionables)
- **Newsletter Grid**: Grid responsive con paginación (9 posts iniciales, botón "Load more")
- **Banner Intermedio**: Banner promocional con botón Subscribe

### Newsletter Detail

- **Banner**: Muestra título, autor, topic y tiempo de lectura
- **Body**: Renderiza HTML (API externa) o Markdown (Firebase)
- **Share on**: Redes sociales para compartir (mobile: al final del texto)
- **Related Posts**: Muestra 3 posts relacionados creados desde el modal

### Modal de Creación

- **Upload de Imagen**: Subida de imágenes .jpg/.png con barra de progreso
- **Título**: Input con validación
- **Confirmación**: Envía al backend y muestra mensaje de éxito

## 🎨 Sistema de Diseño

### Colores Personalizados

Definidos en `tailwind.config.ts`:

- `lemonGreen`: #D8F34E
- `mainPurple`: #9C73F7
- `darkGray`: #595959
- `lightGray`: #8C8C8C

### Fuentes

- **Space Grotesk**: Fuente principal (400, 500, 600, 700)
- **Geist**: Fuente secundaria

## 📱 Responsive Design

- **Mobile**: 327px de ancho máximo, layout vertical
- **Desktop**: 1309px de ancho máximo, layout horizontal
- Breakpoint principal: `lg` (1024px)

## 🚀 Despliegue en Vercel

### Pasos para Desplegar

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno** (ver `CREDENTIALS.txt`)
3. **Build automático**: Vercel detecta Next.js automáticamente
4. **Deploy**: Se despliega automáticamente en cada push

### Variables de Entorno en Vercel

Ve a **Settings → Environment Variables** y agrega:

```
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
```

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linter
npm run lint
```

## 📝 Notas Importantes

- **TodayBanner**: Actualmente usa datos mock (`mocks/newsletters.ts`). Considerar migrar a API.
- **Imágenes**: Las imágenes de posts relacionados se suben a Firebase Cloud Storage automáticamente.
- **Markdown**: Los posts relacionados se renderizan como Markdown, los de la API externa como HTML.

## 🔗 Enlaces Útiles

- [Documentación Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Hero UI](https://heroui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## 📄 Licencia

Este proyecto es parte del Challenge Litebox.
