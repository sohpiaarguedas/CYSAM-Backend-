import { defineConfig } from "drizzle-kit";
import env from "./env";

export default defineConfig({
    dialect: "postgresql",

    dbCredentials: {
        url: env.DATABASE_URL
    },

    schema: "./src/db/schema.ts",

    out: "./migrations",

    verbose: true,

    strict: true
});