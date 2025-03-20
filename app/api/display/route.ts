import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb/mongoose";
import Post from "../../../lib/models/post";
import User from "../../../lib/models/user";

export async function GET() {
  try {
    // Établir la connexion à MongoDB
    await connectDB();

    // Récupérer les posts avec les informations de l'utilisateur
    const posts = await Post.find().exec();

    // Pour chaque post, récupérer les informations de l'utilisateur
    const postsWithUser = await Promise.all(
      posts.map(async (post) => {
        // Récupérer l'utilisateur correspondant à authorId
        const user = await User.findOne({ clerkId: post.authorId }).exec();

        // Retourner le post avec le nom de l'utilisateur
        return {
          ...post.toObject(), // Convertir le document Mongoose en objet JavaScript
          authorName: user ? user.firstName : "Utilisateur inconnu",
        };
      })
    );

    // Retourner les posts avec les informations de l'utilisateur
    return NextResponse.json(postsWithUser, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des posts" },
      { status: 500 }
    );
  }
}





// import { NextResponse } from "next/server";
// import { connectDB } from "../../../lib/mongodb/mongoose";
// import Post  from "../../../lib/models/post";
// import User  from "../../../lib/models/user";


// export async function GET() {
//   try {
//     await connectDB();
//         // Méthode pr récupérer les posts le modèle Mongoose 
//     const posts = await Post.find().exec();

//     // Pour chaque post, récupérer les informations de l'utilisateur en utilisant le modèle User
//     const postsWithUser = await Promise.all(
//       posts.map(async (post) => {
//         // Récupérer l'utilisateur correspondant à authorId en utilisant le modèle User
//         const user = await User.findOne({ clerkId: post.authorId }).exec();
//         console.log("User trouvé:", user);

//         const postWithUser = {
//           ...post.toObject(), // Convertir le document Mongoose en objet JavaScript
//           authorName: user ? user.firstName : "Utilisateur inconnu", // Ajoutez le nom de l'utilisateur
//         };
//         console.log("Post avec utilisateur:", postWithUser); 
        
//         // Ajouter le nom de l'utilisateur au post
//         return postWithUser
//       })
//     );
    

//     return NextResponse.json(postsWithUser, { status: 200 });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des posts :", error);
//     return NextResponse.json(
//       { message: "Erreur lors de la récupération des posts" },
//       { status: 500 }
//     );
//   }
// }
