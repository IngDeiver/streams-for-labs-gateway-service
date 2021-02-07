import { Document } from 'mongoose';

/**
 * Define a user interface to managament with mongoose
 * @category Interfaces
 * @interface   IUser
 * @extends {Document}
 */
interface   IUser extends Document{
    username: { type: String, required: true },
    email: { type: String, required: true },
    oaid: { type: String, required: true }
}
export default  IUser;
