import mongoose, { Schema, Document, Model } from 'mongoose';

// Définition de l'interface TypeScript pour le modèle User
interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture?: string; // Optionnel
  isAdmin?: boolean; // Optionnel, avec une valeur par défaut
}

// Définition du schéma Mongoose avec TypeScript
const userSchema: Schema<IUser> = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Création du modèle User en TypeScript
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
