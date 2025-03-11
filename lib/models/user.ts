import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;

