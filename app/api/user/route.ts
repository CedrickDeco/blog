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
