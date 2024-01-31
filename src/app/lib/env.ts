import z, { number } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    HASH_SALT: z.string()
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    throw new Error(
        `❌ Invalid environment variables: ${JSON.stringify(env.error.format(), null, 4)}`
    );
}

export default env.data;
