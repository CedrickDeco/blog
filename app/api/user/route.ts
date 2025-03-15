import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb/mongoose";
import User from "../../../lib/models/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Requête API reçue :", body);
    console.log("📩 L'Id du user dans la requête API reçue ===> :", body.clerkId);
    

    

    const { clerkId, firstName, lastName, email, profilePicture } = body;
    console.log("Contenu de body.clerkId ===> :", body.clerkId);
    

    let user;
    try {
      await connectDB(); 
      user = await User.findOne({ clerkId });
      console.log("contenu de clerkId ===> :", { clerkId });
      console.log("Contenu de user===>", user);
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur :", error);
      return NextResponse.json(
        { error: "Erreur lors de la recherche de l'utilisateur" },
        { status: 500 }
      );
    }

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    if (!user) {
      user = new User({ clerkId, firstName, lastName, email, profilePicture });
      await user.save();
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
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
