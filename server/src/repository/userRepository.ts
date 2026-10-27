import userModel, { type IUser } from "../model/userModel.js";
import { Types } from "mongoose";

/**
 * Creates a new user in the database.
 * @param userData - The data for the new user.
 * @returns The created user document.
 */
// Define the shape of the user object returned by this function.
// Never return the password hash or email verification token unnecessarily.
interface CreatedUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  authProvider: "local" | "google";
  googleId?: string;
  isEmailVerified: boolean;
}

// Create a new user in the database.
const createUser = async (userData: Partial<IUser>): Promise<CreatedUser> => {
  // Normalize name and email to avoid inconsistent formatting.
  const username = userData.name?.trim();
  const email = userData.email?.toLowerCase().trim();

  // Read authentication details.
  const password = userData.password;
  const authProvider = userData.authProvider ?? "local";
  const googleId = userData.googleId;

  // A newly registered user should be unverified by default.
  const isEmailVerified = userData.isEmailVerified ?? false;

  // Read email verification fields.
  const emailVerificationToken = userData.emailVerificationToken;
  const emailVerificationExpires = userData.emailVerificationExpires;

  // 1. Validate required fields.
  if (!username || !email) {
    throw new Error("Name and email are required.");
  }

  // 2. Validate the authentication provider.
  if (authProvider !== "local" && authProvider !== "google") {
    throw new Error("Invalid authentication provider.");
  }

  // 3. Local authentication requires a password.
  if (authProvider === "local") {
    if (!password) {
      throw new Error("Password is required for local authentication.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // A local account must have a verification token and expiry
    // if your registration flow requires email verification.
    if (!emailVerificationToken || !emailVerificationExpires) {
      throw new Error("Email verification token and expiry are required.");
    }
  }

  // 4. Google authentication requires a Google account ID.
  if (authProvider === "google" && !googleId) {
    throw new Error("Google ID is required for Google authentication.");
  }

  // 5. Build the Mongoose document.
  const newUser = new userModel({
    name: username,
    email,
    password,
    authProvider,
    googleId,
    isEmailVerified,
    emailVerificationToken,
    emailVerificationExpires,
  });

  try {
    // 6. Save the user in MongoDB.
    const savedUser = await newUser.save();

    // 7. Return only the public user information.
    // Do not expose the password or verification token.
    return {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      authProvider: savedUser.authProvider,

      // Include googleId only if it exists.
      ...(savedUser.googleId !== undefined && {
        googleId: savedUser.googleId,
      }),

      isEmailVerified: savedUser.isEmailVerified,
    };
  } catch (error: unknown) {
    // 8. Handle MongoDB duplicate-key errors.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new Error("Email already exists.");
    }

    // 9. Handle all other database errors safely.
    throw new Error("Error creating user.");
  }
};


export { createUser };
