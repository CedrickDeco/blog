import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;
let retryAttempts = 0; // Compteur de tentatives de reconnexion
const maxRetryAttempts = 5; // Nombre maximal de tentatives de reconnexion

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB déjà connecté !");
    return { db: mongoose.connection.db };
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI non défini dans les variables d'environnement.");
  }

  console.log("Tentative de connexion à MongoDB...");

  try {
    const options: ConnectOptions = {
      dbName: "blogdb",
      serverSelectionTimeoutMS: 30000, // Augmenté à 30 secondes
      socketTimeoutMS: 30000, // Augmenté à 30 secondes
      connectTimeoutMS: 20000, // Augmenté à 20 secondes
      maxPoolSize: 10,
      retryWrites: true,
      w: "majority" as const,
    };

    await mongoose.connect(process.env.MONGO_URI, options);

    // Augmenter le délai d'attente pour les opérations Mongoose
    mongoose.set("bufferTimeoutMS", 30000);

    isConnected = true;
    retryAttempts = 0; // Réinitialiser le compteur de tentatives
    console.log("✅ MongoDB connecté avec succès !");
    return { db: mongoose.connection.db };
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);

    // Si le nombre maximal de tentatives est atteint, arrêter les tentatives
    if (retryAttempts >= maxRetryAttempts) {
      console.error("❌ Nombre maximal de tentatives de reconnexion atteint.");
      throw new Error("Impossible de se connecter à MongoDB après plusieurs tentatives.");
    }

    // Incrémenter le compteur de tentatives
    retryAttempts++;

    // Relancer l'erreur pour que l'appelant puisse la gérer
    throw new Error("Impossible de se connecter à MongoDB.");
  }
};

mongoose.connection.on("connected", () => {
  console.log("✅ Connexion à MongoDB établie.");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ Erreur de connexion à MongoDB :", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("❌ Déconnecté de MongoDB.");
  isConnected = false;

  // Tentative de reconnexion automatique après 5 secondes
  setTimeout(() => {
    console.log("Tentative de reconnexion à MongoDB...");
    connectDB().catch((error) => {
      console.error("❌ Échec de la reconnexion à MongoDB :", error);
    });
  }, 5000);
});

// Connexion initiale avec gestion des erreurs
connectDB().catch((error) => {
  console.error("❌ Échec de la connexion initiale à MongoDB :", error);
});






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




// import mongoose, { ConnectOptions } from "mongoose";

// // Variable pour vérifier si la connexion est déjà établie
// let isConnected = false;

// // Fonction pour établir la connexion à MongoDB
// export const connectDB = async () => {
//   // Si déjà connecté, ne pas réessayer
//   if (isConnected) {
//     console.log("✅ MongoDB déjà connecté !");
//      return { db: mongoose.connection.db };
//   }

//   if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI non défini dans les variables d'environnement.");
//   }

//   console.log("Tentative de connexion à MongoDB...");

//   try {
//     // Options de connexion
//     const options: ConnectOptions = {
//       dbName: "blogdb", // Nom de la base de données
//       serverSelectionTimeoutMS: 5000, // Délai d'attente pour la sélection du serveur
//       socketTimeoutMS: 5000, // Délai d'attente pour les opérations de socket
//       connectTimeoutMS: 3000, // Délai d'attente pour la connexion initiale
//       maxPoolSize: 10, // Nombre maximal de connexions dans le pool
//       retryWrites: true, // Activer les réessais pour les écritures
//       w: "majority" as const, // Niveau de confirmation des écritures
//     };

//     // Établir la connexion
//     await mongoose.connect(process.env.MONGO_URI, options);

//     // Marquer la connexion comme établie
//     isConnected = true;
//     console.log("✅ MongoDB connecté avec succès !");
//     return { db: mongoose.connection.db };
//   } catch (error) {
//     console.error("❌ Erreur de connexion à MongoDB :", error);

//     // Relancer l'erreur pour que l'appelant puisse la gérer
//     throw new Error("Impossible de se connecter à MongoDB.");
//   }
// };

// // Gestion des événements de connexion
// mongoose.connection.on("connected", () => {
//   console.log("✅ Connexion à MongoDB établie.");
// });

// mongoose.connection.on("error", (error) => {
//   console.error("❌ Erreur de connexion à MongoDB :", error);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("❌ Déconnecté de MongoDB.");
//   isConnected = false; // Réinitialiser l'état de connexion
// });

// // Connexion initiale
// connectDB().catch((error) => {
//   console.error("❌ Échec de la connexion initiale à MongoDB :", error);
// });