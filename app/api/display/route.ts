import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb/mongoose";
import Post  from "../../../lib/models/post";
import User  from "../../../lib/models/user";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    if (!mongoose.connection.db) {
      throw new Error("La base de données n'est pas disponible.");
    }

    // Méthode pr récupérer les posts depuis la collection "posts"
    // const posts = await mongoose.connection.db
    //   .collection("posts")
    //   .find()
    //   .toArray();


    // Méthode pr récupérer les posts le modèle Mongoose 
    const posts = await Post.find().exec();

    // Pour chaque post, récupérer les informations de l'utilisateur en utilisant le modèle User
    const postsWithUser = await Promise.all(
      posts.map(async (post) => {
        // Récupérer l'utilisateur correspondant à authorId en utilisant le modèle User
        const user = await User.findOne({ clerkId: post.authorId }).exec();
        console.log("User trouvé:", user);

        const postWithUser = {
          ...post.toObject(), // Convertir le document Mongoose en objet JavaScript
          authorName: user ? user.firstName : "Utilisateur inconnu", // Ajoutez le nom de l'utilisateur
        };
        console.log("Post avec utilisateur:", postWithUser); 
        
        // Ajouter le nom de l'utilisateur au post
        return postWithUser
      })
    );
    

    return NextResponse.json(postsWithUser, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des posts" },
      { status: 500 }
    );
  }
}
