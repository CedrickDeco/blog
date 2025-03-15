import { NextResponse } from "next/server"; // Pour la réponse HTTP
import { connectDB } from "../../../lib/mongodb/mongoose"; // Pour se connecter à MongoDB
import Post from "../../../lib/models/post"; // Modèle de post

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Récupère les données de la requête
    const { title, content, imagePath, category, authorId } = body; // Extrait les champs

    // Vérifie que les champs obligatoires sont présents
    if (!title || !content || !category || !authorId) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    await connectDB(); // Se connecte à MongoDB

    // Crée un nouveau post
    const newPost = new Post({
      title,
      content,
      imagePath,
      category,
      authorId,
    });

    await newPost.save(); // Enregistre le post dans la base de données
    console.log("✅ Post crée avec success :", newPost);
    return NextResponse.json(newPost, { status: 201 }); // Retourne le post créé
  } catch (error) {
    console.error("Erreur lors de la création du post :", error); // Affiche l'erreur
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}