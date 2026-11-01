import zod from "zod";
export declare const userValidator: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
    authProvider: zod.ZodEnum<{
        google: "google";
        local: "local";
    }>;
    googleId: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
    isEmailVerified: zod.ZodOptional<zod.ZodBoolean>;
}, zod.core.$strip>;
//# sourceMappingURL=uservalidator.d.ts.map