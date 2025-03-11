import mongoose from "mongoose";

let isConnected = false; // Vérifier la connexion

export const connectDB = async () => {
 if (isConnected) return;

  console.log("MONGO_URI:", process.env.MONGO_URI); // Ajoutez ce log

  try {
    await mongoose.connect(process.env.MONGO_URI as string, { dbName: "blogdb", serverSelectionTimeoutMS: 30000 });
    isConnected = true;
    console.log("✅ MongoDB connecté !");
  } catch (error) {
    console.error(" Erreur connexion MongoDB :", error);
    throw new Error("Impossible de se connecter à MongoDB.");
  }
};

connectDB();




