// import mongoose from "mongoose";

// let isConnected = false; // Vérifier la connexion

// export const connectDB = async () => {
//  if (isConnected) return;

//   console.log("MONGO_URI:", process.env.MONGO_URI); // Ajoutez ce log

//   try {
//     await mongoose.connect(process.env.MONGO_URI as string, { dbName: "blogdb", serverSelectionTimeoutMS: 100000 });
//     isConnected = true;
//     console.log("✅ MongoDB connecté !");
//   } catch (error) {
//     console.error(" Erreur connexion MongoDB :", error);
//     throw new Error("Impossible de se connecter à MongoDB.");
//   }
// };

// connectDB();




import mongoose, { ConnectOptions } from "mongoose";

// Variable pour vérifier si la connexion est déjà établie
let isConnected = false;

// Fonction pour établir la connexion à MongoDB
export const connectDB = async () => {
  // Si déjà connecté, ne pas réessayer
  if (isConnected) {
    console.log("✅ MongoDB déjà connecté !");
     return { db: mongoose.connection.db };
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI non défini dans les variables d'environnement.");
  }

  console.log("Tentative de connexion à MongoDB...");

  try {
    // Options de connexion
    const options: ConnectOptions = {
      dbName: "blogdb", // Nom de la base de données
      serverSelectionTimeoutMS: 5000, // Délai d'attente pour la sélection du serveur
      socketTimeoutMS: 5000, // Délai d'attente pour les opérations de socket
      connectTimeoutMS: 3000, // Délai d'attente pour la connexion initiale
      maxPoolSize: 10, // Nombre maximal de connexions dans le pool
      retryWrites: true, // Activer les réessais pour les écritures
      w: "majority" as const, // Niveau de confirmation des écritures
    };

    // Établir la connexion
    await mongoose.connect(process.env.MONGO_URI, options);

    // Marquer la connexion comme établie
    isConnected = true;
    console.log("✅ MongoDB connecté avec succès !");
    return { db: mongoose.connection.db };
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);

    // Relancer l'erreur pour que l'appelant puisse la gérer
    throw new Error("Impossible de se connecter à MongoDB.");
  }
};

// Gestion des événements de connexion
mongoose.connection.on("connected", () => {
  console.log("✅ Connexion à MongoDB établie.");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ Erreur de connexion à MongoDB :", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("❌ Déconnecté de MongoDB.");
  isConnected = false; // Réinitialiser l'état de connexion
});

// Connexion initiale
connectDB().catch((error) => {
  console.error("❌ Échec de la connexion initiale à MongoDB :", error);
});