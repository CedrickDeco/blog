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






// import mongoose, { ConnectOptions } from 'mongoose';

// let initialized: boolean = false;

// export const connect = async (): Promise<void> => {
//   mongoose.set('strictQuery', true);
  
//   if (initialized) {
//     console.log('Already connected to MongoDB');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI as string, {
//       dbName: 'next-blog',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as ConnectOptions);

//     console.log('Connected to MongoDB');
//     initialized = true;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };

// import mongoose from 'mongoose';


// let isConnected = false; // Indicateur de connexion

// export const connect = async () => {
//   if (isConnected) {
//     console.log('MongoDB est déjà connecté.');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI as string, {
//       dbName: 'next-blog',
      
//     } );
//     isConnected = true;
//     console.log('MongoDB connecté avec succès.');
//   } catch (error) {
//     console.error('Erreur de connexion MongoDB :', error);
//     throw new Error('Connexion à MongoDB échouée.');
//   }
// };

// export const isMongoConnected = () => isConnected;


