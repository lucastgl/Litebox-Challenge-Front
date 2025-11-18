"use client";

import { useState, useRef, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ModalContentProps {
  onClose?: () => void;
}

export default function ModalContent({ onClose }: ModalContentProps) {
  const [postTitle, setPostTitle] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Nota: El contenido de newPost.txt está disponible pero no se envía en el POST
  // ya que el DTO del backend solo acepta title e image
  // Si en el futuro se necesita enviar el contenido, se debe actualizar el DTO

  // Limpiar el intervalo y la URL de la imagen al desmontar el componente
  useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
        uploadIntervalRef.current = null;
      }
    };
  }, []);

  // Limpiar la URL del blob cuando cambia
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Función para manejar la selección de archivo
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea .jpg o .png
    const validExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
    
    if (!validExtensions.includes(fileExtension)) {
      alert("Solo se permiten archivos .jpg o .png");
      return;
    }

    // Guardar el archivo y crear una URL para la imagen
    setSelectedImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    startUploadSimulation();
  };

  // Función para iniciar la simulación de carga
  const startUploadSimulation = () => {
    // Limpiar cualquier intervalo previo
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }

    // Resetear estados
    setIsUploading(true);
    setIsUploadSuccessful(false);
    setUploadProgress(0);

    // Simular progreso de carga
    let progress = 0;
    const updateProgress = () => {
      progress += Math.random() * 15 + 5; // Incremento aleatorio entre 5-20%
      
      if (progress >= 100) {
        progress = 100;
        setUploadProgress(100);
        setIsUploading(false);
        setIsUploadSuccessful(true);
        if (uploadIntervalRef.current) {
          clearInterval(uploadIntervalRef.current);
          uploadIntervalRef.current = null;
        }
      } else {
        const newProgress = Math.min(Math.round(progress), 99);
        setUploadProgress(newProgress);
      }
    };

    // Iniciar inmediatamente con un pequeño progreso
    setUploadProgress(1);
    
    // Continuar con el intervalo
    uploadIntervalRef.current = setInterval(updateProgress, 200);
  };

  // Función para cancelar la carga
  const cancelUpload = () => {
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
    setIsUploading(false);
    setIsUploadSuccessful(false);
    setUploadProgress(0);
    setSelectedImageFile(null);
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Función para validar el formulario
  const validateForm = (): boolean => {
    return postTitle.trim().length > 0 && isUploadSuccessful;
  };

  // Función para convertir File a data URL (base64)
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Función para enviar el post al backend
  const handleConfirm = async () => {
    setHasAttemptedSubmit(true);

    // Validar que el título no esté vacío
    if (!postTitle.trim()) {
      setSubmitError("El título es requerido");
      return; // Los bordes rojos se mostrarán automáticamente
    }

    // Validar que la imagen esté cargada
    if (!isUploadSuccessful || !selectedImageFile) {
      setSubmitError("Por favor, carga una imagen primero");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Convertir la imagen a data URL (base64)
      const imageDataUrl = await fileToDataUrl(selectedImageFile);

      // Enviar POST al backend
      const response = await fetch("http://localhost:3001/api/posts/related", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle.trim(),
          image: imageDataUrl, // Enviar como data URL
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al subir el post");
      }

      // Éxito
      setSubmitSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido al subir el post";
      setSubmitError(errorMessage);
      console.error("Error al subir el post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para cerrar el modal después de éxito
  const handleDone = () => {
    if (onClose) {
      onClose();
    }
  };

  // Determinar si el título está vacío para mostrar bordes rojos
  // Solo mostrar error si se intentó enviar el formulario
  const isTitleEmpty = postTitle.trim().length === 0;
  const showTitleError = hasAttemptedSubmit && isTitleEmpty;

  // Función para abrir el selector de archivos
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Título */}
      <h2
        className={`
          text-[35px]
          leading-[120%]
          font-medium
          text-center
          text-gray-900
          ${spaceGrotesk.className}
        `}
        style={{
          letterSpacing: "0px",
          fontStyle: "normal",
          fontWeight: 500,
        }}
      >
        Upload your post
      </h2>
      
      {/* Descripción */}
      <p className="text-sm md:text-base text-gray-600 text-center max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
      </p>
      
      {/* Input */}
      <Input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        placeholder="Post Title"
        classNames={{
          base: "w-[400px]",
          input: "bg-white border-t border-b border-black rounded-none h-[56px] placeholder:text-darkGray",
          inputWrapper: `bg-white border rounded-none hover:border-black focus-within:border-black h-[56px] ${
            showTitleError ? "border-red-500" : "border-black"
          }`,
        }}
        variant="bordered"
        radius="none"
        style={{
          width: "400px",
          height: "56px",
        }}
      />
      
      {/* Barra de progreso (se muestra mientras se carga o cuando fue exitoso) */}
      {(isUploading || isUploadSuccessful) && (
        <div className="w-[400px] bg-lemonGreen p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {isUploadSuccessful ? (
              <div className="flex items-center gap-2">
                <span className="text-black font-semibold">Upload successful</span>
                {/* Checkmark icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <>
                <span className="text-black font-semibold">
                  Loading image {Math.round(uploadProgress)}%
                </span>
                <button
                  onClick={cancelUpload}
                  className="text-black font-semibold hover:underline"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-200"
              style={{ width: `${isUploadSuccessful ? 100 : uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Botón Upload image (solo se muestra si no se está cargando y no fue exitoso) */}
      {!isUploading && !isUploadSuccessful && (
        <Button
          onClick={handleUploadClick}
          className="bg-lemonGreen text-black border border-black rounded-none font-semibold hover:bg-lemonGreen/90"
          radius="none"
          style={{
            width: "400px",
            height: "56px",
          }}
          endContent={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12V4M4 8L8 4L12 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Upload image
        </Button>
      )}
      
      {/* Mensaje de éxito después de confirmar */}
      {submitSuccess && (
        <div className="w-[400px] flex flex-col items-center gap-4">
          <p className="text-black font-semibold text-center">
            Your post was successfully uploaded!
          </p>
          <Button
            onClick={handleDone}
            className="bg-black text-white border border-black rounded-none font-semibold hover:bg-gray-900"
            radius="none"
            style={{
              width: "132px",
              height: "56px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            Done
          </Button>
        </div>
      )}

      {/* Mensaje de error (solo se muestra si hay error y no hay éxito) */}
      {submitError && !submitSuccess && (
        <p className="text-red-500 font-semibold text-center w-[400px]">
          Error uploading post
        </p>
      )}

      {/* Botón Confirm (solo se muestra si no hay éxito) */}
      {!submitSuccess && (
        <Button
          onClick={handleConfirm}
          disabled={isSubmitting || !validateForm()}
          className="bg-black text-white border border-black rounded-none font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          radius="none"
          style={{
            width: "132px",
            height: "56px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          {isSubmitting ? "Submitting..." : "Confirm"}
        </Button>
      )}
    </>
  );
}

