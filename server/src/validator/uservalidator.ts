import zod from "zod";

export const userValidator = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
  authProvider: zod.enum(["local", "google"]),
  googleId: zod.string().optional().nullable(),
  isEmailVerified: zod.boolean().optional(),
});