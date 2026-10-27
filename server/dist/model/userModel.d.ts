import mongoose, { type Document } from "mongoose";
export type AuthProvider = "local" | "google";
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    authProvider: AuthProvider;
    googleId?: string;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=userModel.d.ts.map