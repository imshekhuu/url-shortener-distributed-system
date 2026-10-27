import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        select: false,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        required: true,
        default: "local",
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
        select: false,
    },
    emailVerificationExpires: {
        type: Date,
        select: false,
    },
}, {
    timestamps: true,
});
// Google users don't need a local password.
userSchema.pre("validate", function () {
    if (this.authProvider === "google") {
        this.isEmailVerified = true;
    }
    if (this.authProvider === "local" && !this.password) {
        this.invalidate("password", "Password is required for local authentication.");
    }
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=userModel.js.map