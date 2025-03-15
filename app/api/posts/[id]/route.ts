import { NextResponse } from "next/server";
import User  from "../../../../lib/models/user";
import Post  from "../../../../lib/models/post";
import { connectDB } from "../../../../lib/mongodb/mongoose";


export async function GET(request: Request, { params }: { params: { id: string } }) {
const { id } = params;

  try {
    await connectDB(); // Assurez-vous que la connexion à MongoDB est établie
    const post = await Post.findOne({ _id: id }).exec();
    const user = await User.findOne({ clerkId: post.authorId }).exec();
        console.log("User trouvé:", user);
        
            if (!post) {
                return NextResponse.json({ message: "Post non trouvé" }, { status: 404 });
            }
        const postWithUser = {
          ...post.toObject(), // Convertir le document Mongoose en objet JavaScript
          authorName: user ? user.firstName : "Utilisateur inconnu", // Ajoutez le nom de l'utilisateur
        };
    console.log("Post avec utilisateur:", postWithUser); 
    
    return NextResponse.json(postWithUser);
  } catch (error) {
    console.error("Erreur lors de la récupération du post :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

