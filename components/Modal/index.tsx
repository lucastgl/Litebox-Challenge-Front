"use client";

import { useEffect, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width = "640px",
  height = "552px",
}: ModalProps) {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-lemonGreen p-6 flex items-center justify-center"
        style={{
          width,
          height,
          boxShadow: "10px 10px 0px 0px rgba(0, 0, 0, 1)",
          border: "1px solid black",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors z-10"
          aria-label="Cerrar modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Contenedor blanco interno con contenido centrado */}
        <div className="w-full max-w-[90%] p-8 flex flex-col items-center justify-center gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}

