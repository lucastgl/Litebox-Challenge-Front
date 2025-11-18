import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

/**
 * Ruta API para obtener el contenido del post desde newPost.txt
 * Sirve el contenido del archivo markdown para ser usado en el frontend
 */
export async function GET() {
  try {
    const filePath = join(process.cwd(), "mocks", "newPost.txt");
    const content = readFileSync(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error al leer newPost.txt:", error);
    return NextResponse.json(
      { error: "Error al cargar el contenido del post" },
      { status: 500 }
    );
  }
}

