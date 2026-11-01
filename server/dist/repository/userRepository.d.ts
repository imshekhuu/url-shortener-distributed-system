import { type IUser } from "../model/userModel.js";
import { Types } from "mongoose";
/**
 * Creates a new user in the database.
 * @param userData - The data for the new user.
 * @returns The created user document.
 */
interface CreatedUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    authProvider: "local" | "google";
    googleId?: string;
    isEmailVerified: boolean;
}
declare const createUser: (userData: Partial<IUser>) => Promise<CreatedUser>;
export { createUser };
//# sourceMappingURL=userRepository.d.ts.map