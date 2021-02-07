import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  oaid: { type: String, required: true }
});

const User: Model<IUser> = mongoose.model('User', UserSchema);
export default User;
