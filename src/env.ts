import path from "node:path";
import { configDotenv } from "dotenv";
import { coerce, object, string } from "zod";

const nodeEnv = process.env.NODE_ENV ?? "development";
const rootDir = path.resolve(import.meta.dirname, "../..");
const envPath = path.join(rootDir, `.env.${nodeEnv}`);

configDotenv({
	path: envPath,
	debug: Boolean(process.env.DEBUG) ?? false,
});

const envSchema = object({
	DATABASE_URL: string().startsWith("postgresql://"),
	SERVER_PORT: coerce.number(),
});

export const env = envSchema.parse(process.env);
