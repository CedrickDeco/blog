// lib/models/post.ts
import mongoose, { Schema, Document } from "mongoose";

// Définir l'interface IPost pour TypeScript
interface IPost extends Document {
  title: string; // Titre du post
  content: string; // Contenu du post (avec mise en forme HTML)
  imagePath?: string; // Chemin de l'image dans le projet (optionnel)
  category: string; // Catégorie du post
  authorId: string; // ID de l'utilisateur qui a créé le post
  createdAt: Date; // Date de création
  updatedAt: Date; // Date de mise à jour
}

// Définir le schéma Mongoose pour le post
const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true }, // Titre obligatoire
    content: { type: String, required: true }, // Contenu obligatoire (HTML)
    imagePath: { type: String }, // Chemin de l'image (optionnel)
    category: { type: String, required: true }, // Catégorie obligatoire
    authorId: { type: String, required: true }, // ID de l'auteur (obligatoire)
  },
  { timestamps: true } // Ajoute automatiquement `createdAt` et `updatedAt`
);

// Créer ou récupérer le modèle Post
const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

// Exporter le modèle Post
export default Post;