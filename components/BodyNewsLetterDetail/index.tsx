import ReactMarkdown from "react-markdown";
import MostViewed from "@/components/MostViewed";
import { readFileSync } from "fs";
import { join } from "path";

export default function BodyNewsLetterDetail() {
  // Leer el contenido del archivo markdown
  const markdownContent = readFileSync(
    join(process.cwd(), "mocks", "newPost.txt"),
    "utf-8"
  );

  return (
    <section className="w-full bg-white min-h-[400px]">
      <div className="w-full flex justify-center py-8">
        <div className="w-full px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[304px_1fr_304px] gap-8 items-start">
            {/* Bloque izquierdo - a 2rem del borde izquierdo */}
            <div className="hidden lg:block w-[304px]">
              <p className="text-black">redes sociales</p>
            </div>

            {/* Bloque central: Contenido markdown - centrado */}
            <div className="w-full max-w-[641px] mx-auto">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="w-full h-auto my-4 rounded-lg"
                        alt={props.alt || ""}
                      />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1
                        {...props}
                        className="text-2xl font-bold mb-4 mt-6 text-gray-900"
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        {...props}
                        className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700"
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} className="mb-4 text-gray-700 leading-relaxed" />
                    ),
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </div>

            {/* Sección derecha: Most viewed sidebar - a 2rem del borde derecho */}
            <div className="hidden lg:block w-[304px]">
              <MostViewed variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

