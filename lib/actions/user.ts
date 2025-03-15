"use server"

import { Document } from 'mongoose';
import User from '../models/user';
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Définition de l'interface EmailAddress
interface EmailAddress {
  email_address: string;
}

// Définition du type IUser basé sur ton modèle Mongoose
interface IUser extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  email: string;
  username: string;
  isAdmin?: boolean;
}

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: EmailAddress[],
  username: string
): Promise<IUser | null> => {  
  try {
    
    
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0]?.email_address, // Vérifie si l'email existe
          username,
        },
      },
      { new: true, upsert: true }
    );

    return user as IUser; 
  } catch (error) {
    console.error('Error creating or updating user:', error);
    return null; 
  }
};


// Fonction pour supprimer un utilisateur
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export async function checkAuthorization(userId: string) {
  console.log("Valeur de userId coté server action  =====>", userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await User.findOne({ clerkId: userId });
  console.log("Valeur de user coté server action  =====>", user);

  if (!user || user.firstName !== "tiako") {
    redirect("/");
  }

}
