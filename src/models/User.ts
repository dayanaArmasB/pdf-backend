import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  address: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    address: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // agrega createdAt y updatedAt
);

export default mongoose.model<IUser>('User', UserSchema);
