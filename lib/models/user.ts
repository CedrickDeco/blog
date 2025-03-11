import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  // username: string;
  profilePicture?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // username: { type: String, required: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;





// import mongoose, { Schema, Document, Model } from 'mongoose';
// // import { isMongoConnected } from '../mongodb/mongoose';
// import { isMongoConnected, connect } from '../mongodb/mongoose';

// if (!isMongoConnected()) {
//   console.warn("MongoDB n'était pas connecté. Tentative de connexion...");
//   connect().catch(error => {
//     console.error("Erreur lors de la connexion à MongoDB :", error);
//     throw new Error('MongoDB est inaccessible.');
//   });
// }



// // if (!isMongoConnected()) {
// //   throw new Error('MongoDB is not connected.');
// // }

// // Définition de l'interface TypeScript pour le modèle User
// interface IUser extends Document {
//   clerkId: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   profilePicture?: string; // Optionnel
//   isAdmin?: boolean; // Optionnel, avec une valeur par défaut
// }

// // Définition du schéma Mongoose avec TypeScript
// const userSchema: Schema<IUser> = new Schema(
//   {
//     clerkId: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     profilePicture: { type: String, required: false },
//     isAdmin: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// // Création du modèle User en TypeScript
// const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// export default User;
