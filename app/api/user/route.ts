// app/api/user/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb/mongoose"; // Assurez-vous que le chemin est correct
import User from "../../../lib/models/user"; // Assurez-vous que le chemin est correct

export async function POST(req: Request) {
  try {
    await connectDB(); 
    const body = await req.json();
    console.log("📩 Requête API reçue :", body);

    

    const { clerkId, firstName, lastName, email, profilePicture } = body;

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ clerkId });
    console.log("Contenu de user===>", user);
    
    if (!user) {
      user = new User({ clerkId, firstName, lastName, email, profilePicture });
      await user.save();
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      // user.username = username;
      user.profilePicture = profilePicture;
      await user.save();
    }

    console.log("✅ Utilisateur enregistré :", user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API :", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}





// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "../../../../lib/mongodb/mongoose";
// import User from "../../../../lib/models/user";

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();
//     const { clerkId, firstName, lastName, email, username, profilePicture } = await req.json();

//     if (!clerkId || !email) {
//       return NextResponse.json({ error: "Données utilisateur incomplètes" }, { status: 400 });
//     }

//     let user = await User.findOne({ clerkId });
//     if (!user) {
//       user = new User({
//         clerkId,
//         firstName,
//         lastName,
//         email,
//         username,
//         profilePicture,
//       });
//       await user.save();
//     } else {
//       user.firstName = firstName;
//       user.lastName = lastName;
//       user.username = username;
//       user.profilePicture = profilePicture;
//       await user.save();
//     }

//     return NextResponse.json({ message: "Utilisateur enregistré", user }, { status: 200 });
//   } catch (error) {
//     console.error("Erreur API :", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }






// import type { NextApiRequest, NextApiResponse } from "next";
// import { connectDB } from "../../../../lib/mongodb/mongoose";
// import User from "../../../../lib/models/user";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Méthode non autorisée" });
//   }

//   try {
//     await connectDB();

//     const { clerkId, firstName, lastName, email, username, profilePicture } = req.body;

//     if (!clerkId || !email) {
//       return res.status(400).json({ error: "Données utilisateur incomplètes" });
//     }

//     // Vérifie si l'utilisateur existe déjà
//     let user = await User.findOne({ clerkId });

//     if (!user) {
//       // Crée un nouvel utilisateur
//       user = new User({
//         clerkId,
//         firstName,
//         lastName,
//         email,
//         username,
//         profilePicture,
//       });
//       await user.save();
//     } else {
//       // Mise à jour des données existantes
//       user.firstName = firstName;
//       user.lastName = lastName;
//       user.username = username;
//       user.profilePicture = profilePicture;
//       await user.save();
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error("Erreur API:", error);
//     return res.status(500).json({ error: "Erreur serveur" });
//   }
// }





// // pages/api/user/update.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { connect, isMongoConnected } from "../../../lib/mongodb/mongoose";
// import User from "../../../lib/models/user.model";
// import { createOrUpdateUser } from "../../../lib/actions/user";

// // Définition des types pour la requête API
// interface EmailAddress {
//   email_address: string;
// }

// interface UserData {
//   id: string;
//   first_name: string;
//   last_name: string;
//   image_url: string;
//   email_addresses: EmailAddress[];
//   username: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     console.log("API POST request received:", req.body);
//     const { id, first_name, last_name, image_url, email_addresses, username }: UserData = req.body;

//     try {
//       console.log("Checking MongoDB connection...");
//       if (!isMongoConnected()) {
//         console.error("MongoDB is not connected.");
//         throw new Error('MongoDB is not connected.');
//       }
//       console.log("MongoDB is connected, proceeding with user update...");
//       await connect();

//       const user = await createOrUpdateUser(
//         id,
//         first_name,
//         last_name,
//         image_url,
//         email_addresses,
//         username
//       );

//       if (user) {
//         console.log("User created or updated:", user);
//         return res.status(200).json(user);
//       } else {
//         return res.status(500).json({ error: "Failed to create or update user." });
//       }
//     } catch (error) {
//       console.error("Error creating or updating user:", error);
//       return res.status(500).json({ error: "Server error" });
//     }
//   } else {
//     // Méthode non autorisée
//     return res.status(405).json({ error: "Method not allowed" });
//   }
// }
