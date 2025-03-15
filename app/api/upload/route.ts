import { NextResponse } from "next/server"; // Pour la réponse HTTP
import fs from "fs"; // Pour manipuler les fichiers
import path from "path"; // Pour manipuler les chemins de fichiers

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Récupère les données du formulaire
    const file = formData.get("file") as File; // Récupère le fichier

    // Vérifie si un fichier a été téléversé
    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier téléversé" },
        { status: 400 }
      );
    }

    // Crée un répertoire pour stocker les images si nécessaire
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Génère un nom de fichier unique
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Convertit le fichier en buffer et l'écrit dans le répertoire
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Retourne le chemin de l'image
    return NextResponse.json(
      { imagePath: `/uploads/${fileName}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du téléversement de l'image :", error); // Affiche l'erreur
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}