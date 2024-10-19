/*import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  driver: "pg",
  schema: ".lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;*/

import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const config: Config = {
  driver: 'pg' as const, // Explicitly asserting the type
  schema: "./lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
};

export default config;
